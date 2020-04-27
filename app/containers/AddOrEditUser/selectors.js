import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addOrEditUser state domain
 */

const selectAddOrEditUserDomain = state =>
  state.get('addOrEditUser', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddOrEditUser
 */

const makeSelectAddOrEditUser = () =>
  createSelector(selectAddOrEditUserDomain, substate => substate.toJS());

export default makeSelectAddOrEditUser;
export { selectAddOrEditUserDomain };
