import { fromJS } from 'immutable';
import manageAccountantReportsReducer from '../reducer';

describe('manageAccountantReportsReducer', () => {
  it('returns the initial state', () => {
    expect(manageAccountantReportsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
