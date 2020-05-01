import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageTrader state domain
 */

const selectManageTraderDomain = state =>
  state.get('manageTrader', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageTrader
 */

const makeSelectManageTrader = () =>
  createSelector(selectManageTraderDomain, substate => substate.toJS());

export default makeSelectManageTrader;
export { selectManageTraderDomain };
