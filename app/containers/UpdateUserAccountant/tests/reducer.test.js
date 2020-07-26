import { fromJS } from 'immutable';
import updateUserAccountantReducer from '../reducer';

describe('updateUserAccountantReducer', () => {
  it('returns the initial state', () => {
    expect(updateUserAccountantReducer(undefined, {})).toEqual(fromJS({}));
  });
});
