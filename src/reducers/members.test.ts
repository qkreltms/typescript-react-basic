import { membersReducer } from './members';
import * as deepFreeze from 'deep-freeze';
import { actionTypes } from '../common/constants/actionTypes';

//state, action이 다른 값 이면 초기값 []나와야함
describe('/reducers/member tests', () => {
    it('should return an empty member when passing no undefined state and some action Type', () => {
        // Arrange
        const state = undefined;
        const action = { type: 'some type' };

        // Act

        const nextState = membersReducer(state, action);

        // Assert
        expect(nextState).toEqual([]);    
    });
    //state값이 제대로 들어갔을때 그대로 값이 나옴
    it('should return same state without mutate it when passing state and some action type', () => {
        // Arrange
        const state: MemberEntity[] = [{ id: 1, login: 'test login', avatar_url: 'test avatar_url' }];
        const action = { type: 'some type' };
        deepFreeze(state);

        // Act
        const nextState = membersReducer(state, action);

        // Assert
        expect(nextState).toEqual(
            [{ id: 1, login: 'test login', avatar_url: 'test avatar_url' }]
        );
    });
    //3개다 제대로 들어갔을 때 payload 값 그대로 나와야 함
    it(`should return state without mutate it when passing state, actionTypes.FETCH_MEMBERS_COMPLETED action type and members payload`, () => {
        // Arrange
        const state: MemberEntity[] =
            [{ id: 1, login: 'test login', avatar_url: 'test avatar_url' }];

        const payload = [
                         { id: 2, login: 'test login 2', avatar_url: 'test avatar_url 2' },
                         { id: 3, login: 'test login 3', avatar_url: 'test avatar_url 3' }
                        ];

        const action = {
            type: actionTypes.FETCH_MEMBERS_COMPLETED,
            payload,
        };
        deepFreeze(state);

        // Act
        const nextState = membersReducer(state, action);

        // Assert
        expect(nextState).toEqual(payload);
    });
});