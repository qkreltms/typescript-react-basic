import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { fetchMemberByIdAction } from './actions/fetchMemberById';
import { memberFieldChangeAction } from './actions/memberFieldChange';
import { saveMemberAction } from './actions/saveMember'
import { MemberPage } from './page';

//각 리듀서의 state값 넣어줌
const mapStateToProps = (state: State, ownProps: any) => {  
  return {
  memberId: Number(ownProps.match.params.id) || 0,
  member: state.member,
  memberErrors: state.memberErrors,
}};

//엑션을 디스패치하면 액션에 정의된 타입에 따라 리듀서 연결해줌
const mapDispatchToProps = (dispatch) => ({
  fetchMemberById: (id: number) => dispatch(fetchMemberByIdAction(id)),
  onChange: (member: MemberEntity, fieldName: string, value: string) => dispatch(memberFieldChangeAction(member, fieldName, value)),
  onSave: (member: MemberEntity) => dispatch(saveMemberAction(member)),
});

export const MemberPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberPage);
