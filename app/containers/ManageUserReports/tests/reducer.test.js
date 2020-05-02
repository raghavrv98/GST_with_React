import { fromJS } from 'immutable';
import manageUserReportsReducer from '../reducer';

describe('manageUserReportsReducer', () => {
  it('returns the initial state', () => {
    expect(manageUserReportsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
