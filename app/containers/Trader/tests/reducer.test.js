import { fromJS } from 'immutable';
import traderReducer from '../reducer';

describe('traderReducer', () => {
  it('returns the initial state', () => {
    expect(traderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
