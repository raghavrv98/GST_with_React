import { fromJS } from 'immutable';
import addOrEditTraderReducer from '../reducer';

describe('addOrEditTraderReducer', () => {
  it('returns the initial state', () => {
    expect(addOrEditTraderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
