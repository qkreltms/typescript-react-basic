import * as React from "react";
import { Input, Button } from "../../common/components/form";
import { MemberErrors } from "../../model";

interface Props {
  member: MemberEntity;
  memberErrors: MemberErrors
  onChange: (fieldName: string, value: string) => void;
  onSave: () => void;
}

export const MemberForm: React.SFC<Props> = props => {
  return (
    <form>
      <h1>Manage member</h1>
    
      <Input
        name="login"
        label="Login"
        value={props.member.login}
        onChange={props.onChange}
        error={
            props.memberErrors.login.succeeded ?
            '' :
            props.memberErrors.login.errorMessage
        }
      />

      <Input
        name="avatar_url"
        label="Avatar Url"
        value={props.member.avatar_url}
        onChange={props.onChange}
      />

      <Button label="Save" className="btn btn-default" onClick={props.onSave} />
    </form>
  );
};
