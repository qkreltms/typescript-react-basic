import * as React from "react";
import { Link } from 'react-router-dom'

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
        {/* 아이디 누르면 member 페이지로 이동 */}
        <Link
          to={`/member/${member.id}`}
          >
            {member.id}
          </Link>
      </td>
      <td>
        <span>{member.login}</span>
      </td>
    </tr>
  );
};
