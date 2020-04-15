import { fromJS } from 'immutable';
import servicesReducer from '../reducer';

describe('servicesReducer', () => {
  it('returns the initial state', () => {
    expect(servicesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
