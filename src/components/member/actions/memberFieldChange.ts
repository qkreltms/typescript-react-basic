import { FieldValidationResult } from "lc-form-validation";
import { actionTypes } from "../../../common/constants/actionTypes";
import { memberFormValidation } from "../memberFormValidation";
import { trackPromise } from "react-promise-tracker";

//member/PageContainer의 onChange  함수가 호출되면 실행됨
export const memberFieldChangeAction = (
  member: MemberEntity,
  fieldName: string,
  value: any
) => dispatch => {
  trackPromise(
    //validates
    memberFormValidation
      .validateField(member, fieldName, value)
      .then(FieldValidationResult => {
        dispatch(memberFieldChangeCompleted(FieldValidationResult, value));
      })
  );
};

export interface MemberFieldChangePayload {
  fieldValidationResult: FieldValidationResult;
  value: any;
}

const memberFieldChangeCompleted = (
  fieldValidationResult: FieldValidationResult,
  value: any
) => ({
  type: actionTypes.UPDATE_MEMBER_FIELD,
  //validation 결과 반환
  payload: {
    fieldValidationResult,
    value
  } as MemberFieldChangePayload
});
