import { fromJS } from 'immutable';
import managePasswordRequestsReducer from '../reducer';

describe('managePasswordRequestsReducer', () => {
  it('returns the initial state', () => {
    expect(managePasswordRequestsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
