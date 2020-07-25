import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the managePasswordRequests state domain
 */

const selectManagePasswordRequestsDomain = state =>
  state.get('managePasswordRequests', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManagePasswordRequests
 */

const makeSelectManagePasswordRequests = () =>
  createSelector(selectManagePasswordRequestsDomain, substate =>
    substate.toJS(),
  );

export default makeSelectManagePasswordRequests;
export { selectManagePasswordRequestsDomain };
