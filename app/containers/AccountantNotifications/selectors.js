import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accountantNotifications state domain
 */

const selectAccountantNotificationsDomain = state =>
  state.get('accountantNotifications', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AccountantNotifications
 */

const makeSelectAccountantNotifications = () =>
  createSelector(selectAccountantNotificationsDomain, substate =>
    substate.toJS(),
  );

export default makeSelectAccountantNotifications;
export { selectAccountantNotificationsDomain };
