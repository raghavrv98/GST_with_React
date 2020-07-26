import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminNotifications state domain
 */

const selectAdminNotificationsDomain = state =>
  state.get('adminNotifications', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminNotifications
 */

const makeSelectAdminNotifications = () =>
  createSelector(selectAdminNotificationsDomain, substate => substate.toJS());

export default makeSelectAdminNotifications;
export { selectAdminNotificationsDomain };
