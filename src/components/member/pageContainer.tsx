import * as React from "react";
import { MemberPage } from "./page";
import * as toastr from "toastr";
import { memberAPI } from "../../api/member";
import { memberFormValidation } from "./memberFormValidatoin";
import { MemberErrors } from "../../model";
import { FieldValidationResult } from "lc-form-validation";

//Container의 역할은 State를 관리함
interface State {
  member: MemberEntity;
  memberErrors: MemberErrors;
}

export class MemberPageContainer extends React.Component<any, State> {
  //typescript는 리엑트가 자동으로 this 셋팅안하는것 같음.
  constructor(props) {
    super(props);

    this.state = {
      member: {
        id: -1,
        login: "",
        avatar_url: ""
      },
      memberErrors: {
        login: new FieldValidationResult()
      }
    };

    this.onFieldValueChange = this.onFieldValueChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  public componentDidMount() {
    const memberId = Number(this.props.match.params.id) || 0;

    memberAPI.fetchMemberById(memberId)
    .then(member => {
      this.setState({
        ...this.state,
        member
      });
    });
  }

  private onFieldValueChange(fieldName: string, value: string) {
    memberFormValidation
      .validateField(this.state.member, fieldName, value)
      .then(fieldValidationResult => {
        const nextState = {
          ...this.state,
          member: {
            ...this.state.member,
            [fieldName]: value
          },
          memberErrors: {
            ...this.state.memberErrors,
            [fieldName]: fieldValidationResult
          }
        };

        this.setState(nextState);
      });
  }

  private onSave() {
    memberFormValidation
      .validateForm(this.state.member)
      .then(formValidationResult => {
        if (formValidationResult.succeeded) {
          memberAPI.saveMember(this.state.member)
          .then(() => {
            toastr.success("Member saved");
            this.props.history.goBack();
          });
        }
      });
  }

  public render() {
    return (
      <MemberPage
        member={this.state.member}
        memberErrors={this.state.memberErrors}
        onChange={this.onFieldValueChange}
        onSave={this.onSave}
      />
    );
  }
}
