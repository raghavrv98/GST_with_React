import { fromJS } from 'immutable';
import userNotificationsReducer from '../reducer';

describe('userNotificationsReducer', () => {
  it('returns the initial state', () => {
    expect(userNotificationsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
