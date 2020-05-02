import { fromJS } from 'immutable';
import manageTraderReportsReducer from '../reducer';

describe('manageTraderReportsReducer', () => {
  it('returns the initial state', () => {
    expect(manageTraderReportsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
