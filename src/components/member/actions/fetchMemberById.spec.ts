import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import * as apiMember from '../../../api/member';
import { fetchMemberByIdAction } from './fetchMemberById';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

//action안의 fetchMemberById가 호출되는지 확인
describe('member/actions/fetchMemberById tests', () => {

    it('should call to apiMember.fetchMemberById', (done) => {
        // Arrange
        //함수 mock을 만듦
        const fetchMemberByIdStub = jest.spyOn(apiMember.memberAPI, 'fetchMemberById');

        const id = 1457912;

        // Act
        //mock 트리를 만듦
        const store = getMockStore();

        //mock 트리에서 
        store.dispatch<any>(fetchMemberByIdAction(id))
            .then(() => {
                // Assert
                //함수가 호출됐는지 확인 => 왜냐면 리턴하는것이 없고 dispatch 호출
                expect(fetchMemberByIdStub).toHaveBeenCalled();
                done();
            });
    });
});