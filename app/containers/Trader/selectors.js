import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the trader state domain
 */

const selectTraderDomain = state => state.get('trader', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Trader
 */

const makeSelectTrader = () =>
  createSelector(selectTraderDomain, substate => substate.toJS());

export default makeSelectTrader;
export { selectTraderDomain };
