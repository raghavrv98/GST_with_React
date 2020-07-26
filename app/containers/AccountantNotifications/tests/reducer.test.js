import { fromJS } from 'immutable';
import accountantNotificationsReducer from '../reducer';

describe('accountantNotificationsReducer', () => {
  it('returns the initial state', () => {
    expect(accountantNotificationsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
