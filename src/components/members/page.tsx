import * as React from "react";
import { memberAPI } from "../../api/member";
import { MemberHeader } from "./memberHeader";
import { MemberRow } from "./memberRow";
import { Link } from 'react-router-dom'

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
        <Link to='/member'>New Member</Link>
        <table className="table">
          <thead>
            <MemberHeader />
          </thead>
          <tbody>
            {this.state.members.map(member => (
              <MemberRow key={member.id} member={member} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
