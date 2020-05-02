import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userBillDetails state domain
 */

const selectUserBillDetailsDomain = state =>
  state.get('userBillDetails', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserBillDetails
 */

const makeSelectUserBillDetails = () =>
  createSelector(selectUserBillDetailsDomain, substate => substate.toJS());

export default makeSelectUserBillDetails;
export { selectUserBillDetailsDomain };
