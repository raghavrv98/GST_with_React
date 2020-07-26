import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userNotifications state domain
 */

const selectUserNotificationsDomain = state =>
  state.get('userNotifications', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserNotifications
 */

const makeSelectUserNotifications = () =>
  createSelector(selectUserNotificationsDomain, substate => substate.toJS());

export default makeSelectUserNotifications;
export { selectUserNotificationsDomain };
