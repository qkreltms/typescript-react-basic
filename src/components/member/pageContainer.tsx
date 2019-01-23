import * as React from "react";
import { MemberPage } from "./page";
import * as toastr from 'toastr'
import { memberAPI } from '../../api/member'
import { History } from 'history' //history는 리엑트에 내장되어 있는 듯?

//Container의 역할은 State를 관리함
interface State {
  member: MemberEntity;
}

//HACK 왜 모듈을 props통해서 들어오게 했을까??
interface Props {
    history: History
}

export class MemberPageContainer extends React.Component<Props, State> {
  //typescript는 리엑트가 자동으로 this 셋팅안하는것 같음.
    constructor(props: any) {
      super(props)

      this.state = {
        member: {
          id: -1,
          login: "",
          avatar_url: ""
        }
      };

      this.onFieldValueChange = this.onFieldValueChange.bind(this);
      this.onSave = this.onSave.bind(this);
  }

  private onFieldValueChange (fieldName: string, value: string) {
    const nextState = {
      ...this.state,
      member: {
        ...this.state.member,
        [fieldName]: value
      }
    };

    this.setState(nextState);
  }

  private onSave() {
      memberAPI.saveMember(this.state.member)
      .then(() => {
          toastr.success('Member saved.')
          this.props.history.goBack()
      })
    }

  public render() {
    return (
      <MemberPage
        member={this.state.member}
        onChange={this.onFieldValueChange}
        onSave={this.onSave}
      />
    );
  }
}
