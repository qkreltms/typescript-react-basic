import * as React from "react";
import { MemberForm } from "./memberForm";
import { MemberErrors } from "../../model";
interface Props {
  member: MemberEntity;
  memberErrors: MemberErrors;
  onChange: (fieldName: string, value: string) => void;
  onSave: () => void;
}

export const MemberPage: React.SFC<Props> = props => {
  return (
    <MemberForm
      memberErrors={props.memberErrors}
      member={props.member}
      onChange={props.onChange}
      onSave={props.onSave}
    />
  );
};
