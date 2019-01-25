import { FormValidationResult } from 'lc-form-validation'
import * as toastr from 'toastr'
import { actionTypes } from '../../../common/constants/actionTypes'
import { memberAPI } from '../../../api/member'
import { memberFormValidation } from '../memberFormValidation'

//save 버튼 누를시 실행됨
export const saveMemberAction = (member: MemberEntity) => (dispatch) => {
    memberFormValidation.validateForm(member)
    .then(formValidationResult => {
        if(formValidationResult.succeeded) {
            saveMember(member)
        }
        dispatch(saveMemberActionCompleted(formValidationResult))
    })
}

//이전 화면으로 넘어감
const saveMember = (member: MemberEntity) => {
    memberAPI.saveMember(member)
    .then(() => {
        toastr.success('Member saved.')
        history.back()
    })
    .catch(toastr.error)
}

const saveMemberActionCompleted = (formValidationResult: FormValidationResult) => ({
    type: actionTypes.SAVE_MEMBER,
    payload: formValidationResult
})