import { fromJS } from 'immutable';
import addOrEditAccountantReducer from '../reducer';

describe('addOrEditAccountantReducer', () => {
  it('returns the initial state', () => {
    expect(addOrEditAccountantReducer(undefined, {})).toEqual(fromJS({}));
  });
});
