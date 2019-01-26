import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { memberFieldChangeAction } from './memberFieldChange';
import { memberFormValidation } from '../memberFormValidation';


const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('member/actions/memberFieldChange tests', () => {
    //memberFieldChangeAction의 값을 주었을 때 validateField값이 나오는데 이 값을 memberFormValidation.validateField()에 똑같은 값을 
    //주었을 때 같은 값이 나오는지 확인
    it('should call to memberFormValidation.validateField with value', (done) => {
        // Arrange
        
        const member: MemberEntity = {
            id: 12345,
            avatar_url: "avatar test",
            login: "login test"
        }

        const fieldName = "field test";
        const value = 12345; 
        const validateFormStub = jest.spyOn(memberFormValidation, 'validateField');

        //act
        const store = getMockStore();       
        store.dispatch<any>(memberFieldChangeAction(member,fieldName, value))
            .then(()=>{
                    expect(validateFormStub).toHaveBeenCalledWith(member, fieldName, value);
                    done();
                });      
    }); 

    //target.value가 undefined일 때 에러나는지 확인
    it('should call to memberFormValidation.validateField with no value. Returning error', (done) => {
        // Arrange

        const member: MemberEntity = {
            id: 12345,
            avatar_url: "avatar test",
            login: "login test"
        }

        const fieldName = "id"
        const value = undefined;
        const validateFormStub = jest.spyOn(memberFormValidation, 'validateField').mockRejectedValue(new Error ("some error message"));

        //act
        const store = getMockStore();
        store.dispatch<any>(memberFieldChangeAction(member, fieldName, value))
            .catch((e:Error) => {
                expect(validateFormStub).toHaveBeenCalledWith(member, fieldName, value);
                expect(e.message).toEqual("some error message");
                done();
            });
    }); 

});