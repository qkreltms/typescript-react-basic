import {memberReducer} from './member';
import * as deepFreeze from 'deep-freeze';
import {actionTypes} from '../common/constants/actionTypes';
import { MemberFieldChangePayload } from '../components/member/actions/memberFieldChange';

//state가 undefined이고, action이 조건에 맞는게 없을 때
describe ('/reducers/member tests',()=>{
    it('should return an empty member when passing no undefined state and some action Type', () => {
        // Arrange
        const state= undefined;
        const action = {type:'some type'};

        // Act

        const nextState = memberReducer(state,action);

        // Assert
        expect (nextState.id).toEqual(-1);
        expect (nextState.login).toEqual('');
        expect (nextState.avatar_url).toEqual('');

    });
    //state는 값이 주어지고, action이 조건에 맞지 않을 때
    it('should return same state without mutate it when passing state and some action type', () => {
        // Arrange
        const state: MemberEntity =  { id: 1, login: 'test login', avatar_url: 'test avatar_url' };
        const action = { type: 'some type' };
        deepFreeze(state);

        // Act
        const nextState = memberReducer(state, action);

        // Assert
        expect(nextState).toEqual(
            { id: 1, login: 'test login', avatar_url: 'test avatar_url' },
        );
    });
///////////////////////////////FETCH_MEMBER_BY_ID_COMPLETED
    //state, action이 주어지고, payload가 undefined일 때 payload값이 그대로 나와야함
    it(`should return state when passing an undefined payload, actionTypes.FETCH_MEMBER_BY_ID_COMPLETED action type and member payload`, () => {
        // Arrange
        const state: MemberEntity =
            { id: 1, login: 'test login', avatar_url: 'test avatar_url' };

        const payload = undefined;

        const action = {
            type: actionTypes.FETCH_MEMBER_BY_ID_COMPLETED,
            payload,
        };
        deepFreeze(state);

        // Act
        const nextState = memberReducer(state, action);

        // Assert
        expect(nextState.id).toEqual(-1);
        expect(nextState.login).toEqual('');
        expect(nextState.avatar_url).toEqual('');
    });
    //3가지 값이 다 주어질 때 payload값이 그대로 나와야 함
    it(`should return updated state without mutate it when passing state and updated member, actionTypes.FETCH_MEMBER_BY_ID_COMPLETED action type and member payload`, () => {
        // Arrange
        const state: MemberEntity =
            { id: 1, login: 'test login', avatar_url: 'test avatar_url' };

        const payload = { id: 1, login: 'test login 2', avatar_url: 'test avatar_url 2' };

        const action = {
            type: actionTypes.FETCH_MEMBER_BY_ID_COMPLETED,
            payload,
        };
        deepFreeze(state);

        // Act
        const nextState = memberReducer(state, action);

        // Assert
        expect(nextState).toEqual(payload);
    });
///////////////////////////////SAVE_MEMBER
    ////////////////////////
    //저장된 맴버가 나와야됨 but, 업데이트 되지않고 state값이 그대로 나옴 => 리듀서에서 값 처리 안됨
    it(`should return updated state without mutate it when passing state and updated member, actionTypes.FETCH_MEMBER_BY_ID_COMPLETED action type and member payload`, () => {
        // Arrange
        const state: MemberEntity =
            { id: 1, login: 'test login', avatar_url: 'test avatar_url' };

        const payload = { id: 1, login: 'test login', avatar_url: 'test avatar_url' };

        const action = {
            type: actionTypes.SAVE_MEMBER,
            payload,
        };
        deepFreeze(state);

        // Act
        const nextState = memberReducer(state, action);

        // Assert
        expect(nextState).toEqual(payload);
    });
    ///////////////UPDATE_MEMBER_FIELD
    it(`should return a new value for field login, actionTypes.UPDATE_MEMBER_FIELD action type and member payload with new login`, () => {
        // Arrange
        const state: MemberEntity =
            { id: 1, login: 'test login', avatar_url: 'test avatar_url' };

        const payload: MemberFieldChangePayload = {fieldValidationResult:{key:"login", type:"", succeeded:true, errorMessage:""}, value:"new login"};

        const action = {
            type: actionTypes.UPDATE_MEMBER_FIELD,
            payload,
        };
        deepFreeze(state);

        // Act
        const nextState = memberReducer(state, action);

        // Assert
        expect(nextState.login).toEqual("new login");
    });
    
    it(`should return a new value for field avatar_url, actionTypes.UPDATE_MEMBER_FIELD action type and member payload with new avatar_url`, () => {
        // Arrange
        const state: MemberEntity =
            { id: 1, login: 'test login', avatar_url: 'test avatar_url' };

        const payload: MemberFieldChangePayload = { fieldValidationResult: { key: "avatar_url", type: "", succeeded: true, errorMessage: "" }, value:"new avatar_url"};

        const action = {
            type: actionTypes.UPDATE_MEMBER_FIELD,
            payload,
        };
        deepFreeze(state);

        // Act
        const nextState = memberReducer(state, action);

        // Assert
        expect(nextState.avatar_url).toEqual("new avatar_url");
    });
});