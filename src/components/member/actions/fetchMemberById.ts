import { actionTypes } from "../../../common/constants/actionTypes";
import { memberAPI } from "../../../api/member";

//param이 주어질 경우 실행됨
export const fetchMemberByIdAction = (id: number) => dispatch => {
  memberAPI.fetchMemberById(id).then(member => {
    dispatch(fetchMemberByIdCompleted(member));
  });
};

const fetchMemberByIdCompleted = (member: MemberEntity) => ({
  type: actionTypes.FETCH_MEMBER_BY_ID_COMPLETED,
  payload: member
});
