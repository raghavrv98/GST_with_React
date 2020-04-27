import { fromJS } from 'immutable';
import addOrEditUserReducer from '../reducer';

describe('addOrEditUserReducer', () => {
  it('returns the initial state', () => {
    expect(addOrEditUserReducer(undefined, {})).toEqual(fromJS({}));
  });
});
