import { fromJS } from 'immutable';
import userDetailsReducer from '../reducer';

describe('userDetailsReducer', () => {
  it('returns the initial state', () => {
    expect(userDetailsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
