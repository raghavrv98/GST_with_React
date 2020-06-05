import { fromJS } from 'immutable';
import forbiddenPageReducer from '../reducer';

describe('forbiddenPageReducer', () => {
  it('returns the initial state', () => {
    expect(forbiddenPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
