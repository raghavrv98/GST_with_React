import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addOrEditAccountant state domain
 */

const selectAddOrEditAccountantDomain = state =>
  state.get('addOrEditAccountant', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddOrEditAccountant
 */

const makeSelectAddOrEditAccountant = () =>
  createSelector(selectAddOrEditAccountantDomain, substate => substate.toJS());

export default makeSelectAddOrEditAccountant;
export { selectAddOrEditAccountantDomain };
