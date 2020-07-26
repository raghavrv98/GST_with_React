import { fromJS } from 'immutable';
import adminNotificationsReducer from '../reducer';

describe('adminNotificationsReducer', () => {
  it('returns the initial state', () => {
    expect(adminNotificationsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
