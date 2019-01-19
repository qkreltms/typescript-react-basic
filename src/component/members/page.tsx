import * as React from "react";
import { memberAPI } from "../../api/member";

interface State {
  members: MemberEntity[];
}
interface Props {}

export class MembersPage extends React.Component<Props, State> {
  state = { members: [] };

  public componentDidMount() {
    memberAPI.fetchMembers().then(members => {
      this.setState({ members });
    });
  }

  public render() {
    return (
      <div className="row">
        <h2> Members Page </h2>
        <table className="table">
          <thead>{this.MemberHeader()}</thead>
          <tbody>{this.state.members.map(this.MemberRow)}</tbody>
        </table>
      </div>
    );
  }

  private MemberHeader = () => {
    return (
      <tr>
        <th>Avatar</th>
        <th>Id</th>
        <th>Name</th>
      </tr>
    );
  };

  private MemberRow = (member: MemberEntity) => {
    return (
      <tr key={member.id}>
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
}
