import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageUser state domain
 */

const selectManageUserDomain = state => state.get('manageUser', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageUser
 */

const makeSelectManageUser = () =>
  createSelector(selectManageUserDomain, substate => substate.toJS());

export default makeSelectManageUser;
export { selectManageUserDomain };
