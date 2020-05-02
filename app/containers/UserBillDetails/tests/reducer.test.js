import { fromJS } from 'immutable';
import userBillDetailsReducer from '../reducer';

describe('userBillDetailsReducer', () => {
  it('returns the initial state', () => {
    expect(userBillDetailsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
