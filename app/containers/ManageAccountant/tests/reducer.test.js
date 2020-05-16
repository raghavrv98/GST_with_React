import { fromJS } from 'immutable';
import manageAccountantReducer from '../reducer';

describe('manageAccountantReducer', () => {
  it('returns the initial state', () => {
    expect(manageAccountantReducer(undefined, {})).toEqual(fromJS({}));
  });
});
