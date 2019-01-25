import { actionTypes } from '../common/constants/actionTypes'

//특별히 하는것 없이 members 페이지에 값만 전달해 줌(값 바뀌면 변경됨)
export const membersReducer = (state: MemberEntity[] = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_MEMBERS_COMPLETED:
            return handleFetchMembersCompleted(state, action.payload)
    }

    return state
}

const handleFetchMembersCompleted = (state: MemberEntity[], payload: MemberEntity[]) => {
    return payload
}