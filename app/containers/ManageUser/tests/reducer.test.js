import { fromJS } from 'immutable';
import manageUserReducer from '../reducer';

describe('manageUserReducer', () => {
  it('returns the initial state', () => {
    expect(manageUserReducer(undefined, {})).toEqual(fromJS({}));
  });
});
