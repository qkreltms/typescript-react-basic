import { FieldValidationResult, FormValidationResult } from 'lc-form-validation'
import { actionTypes } from '../common/constants/actionTypes'
import { MemberErrors } from '../model'
import { MemberFieldChangePayload } from '../components/member/actions/memberFieldChange'

const createEmptyMemberErrors = (): MemberErrors => ({
    //로그인 필드 label에 넣을 값
    login: new FieldValidationResult(),
    avatar_url: new FieldValidationResult()
})

export const memberErrorsReducer = (state = createEmptyMemberErrors(), action) => {
    switch (action.type) {
        //members 페이지 접속시 error초기화
        case actionTypes.FETCH_MEMBERS_COMPLETED:
            return handleFetchMembersCompleted(state, action.payload)
        case actionTypes.UPDATE_MEMBER_FIELD:
            return handleUpdateMemberField(state, action.payload)
        case actionTypes.SAVE_MEMBER:
            return handleSaveMember(state, action.payload)
    }

    return state
}

const handleFetchMembersCompleted = (state: MemberErrors, payload) => {
    return createEmptyMemberErrors()
}

const handleUpdateMemberField = (state: MemberErrors, payload: MemberFieldChangePayload): MemberErrors => {
    //해당 필드의 값 하나만 나옴

    return {
        ...state,
        [payload.fieldValidationResult.key]: payload.fieldValidationResult,
    }
}

const handleSaveMember = (state: MemberErrors, payload: FormValidationResult): MemberErrors => {
    const newMemberErrors = { ...state };

    return payload.fieldErrors.reduce((memberErrors, fieldValidationResult) => {
      memberErrors[fieldValidationResult.key] = fieldValidationResult;
      return memberErrors;
    }, newMemberErrors);
}