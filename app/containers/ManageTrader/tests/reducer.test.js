import { fromJS } from 'immutable';
import manageTraderReducer from '../reducer';

describe('manageTraderReducer', () => {
  it('returns the initial state', () => {
    expect(manageTraderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
