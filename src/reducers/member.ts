import { actionTypes } from '../common/constants/actionTypes'
import { MemberFieldChangePayload } from '../components/member/actions/memberFieldChange'

const createEmptyMember = (): MemberEntity => ({
    id: -1,
    login: '',
    avatar_url: ''
})

//새로운 맴버를 추가시 작동되는 라우터
export const memberReducer = (state = createEmptyMember(), action) => {
    switch (action.type) {
        case actionTypes.FETCH_MEMBER_BY_ID_COMPLETED:
            return handleFetchMemberByIdCompleted(state, action.payload)
        case actionTypes.UPDATE_MEMBER_FIELD:
            return handleUpdateMemberField(state, action.payload)
        case actionTypes.SAVE_MEMBER:
            return handleSaveMember(state, action.payload)
    }

    return state
}

const handleSaveMember = (state: MemberEntity = createEmptyMember(), payload:MemberEntity=createEmptyMember()):MemberEntity =>{
    return payload
}

const handleFetchMemberByIdCompleted = (state: MemberEntity = createEmptyMember(), payload: MemberEntity = createEmptyMember()): MemberEntity => {
    return payload
}

const handleUpdateMemberField = (state: MemberEntity = createEmptyMember(), payload: MemberFieldChangePayload): MemberEntity => {
    return {
        ...state,
        [payload.fieldValidationResult.key]: payload.value,
      };
}


