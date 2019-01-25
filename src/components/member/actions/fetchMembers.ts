import { actionTypes } from "../../../common/constants/actionTypes";
import { memberAPI } from "../../../api/member";

//처음 실행시 mock 데이터 가져옴
export const fetchMembersAction = () => (dispatch): void => {
  memberAPI.fetchMembers().then(members => {
    dispatch(fetchMembersCompleted(members));
  });
};

//mock 데이터와 엑션 타입을 반환함
const fetchMembersCompleted = (members: MemberEntity[]) => ({
  type: actionTypes.FETCH_MEMBERS_COMPLETED,
  payload: members
});
