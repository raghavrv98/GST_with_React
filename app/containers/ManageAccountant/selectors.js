import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageAccountant state domain
 */

const selectManageAccountantDomain = state =>
  state.get('manageAccountant', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageAccountant
 */

const makeSelectManageAccountant = () =>
  createSelector(selectManageAccountantDomain, substate => substate.toJS());

export default makeSelectManageAccountant;
export { selectManageAccountantDomain };
