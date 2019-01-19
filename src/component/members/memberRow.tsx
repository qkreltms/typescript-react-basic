import * as React from "react";

interface Props {
  member: MemberEntity;
}

export const MemberRow: React.SFC<Props> = props => {
  const { member } = props;
  
  return (
    <tr>
      <td>
        <img src={member.avatar_url} className="avatar" />
      </td>
      <td>
        <span>{member.id}</span>
      </td>
      <td>
        <span>{member.login}</span>
      </td>
    </tr>
  );
};
