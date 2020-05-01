import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addOrEditTrader state domain
 */

const selectAddOrEditTraderDomain = state =>
  state.get('addOrEditTrader', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddOrEditTrader
 */

const makeSelectAddOrEditTrader = () =>
  createSelector(selectAddOrEditTraderDomain, substate => substate.toJS());

export default makeSelectAddOrEditTrader;
export { selectAddOrEditTraderDomain };
