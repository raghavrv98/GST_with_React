import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the updateUserAccountant state domain
 */

const selectUpdateUserAccountantDomain = state =>
  state.get('updateUserAccountant', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by UpdateUserAccountant
 */

const makeSelectUpdateUserAccountant = () =>
  createSelector(selectUpdateUserAccountantDomain, substate => substate.toJS());

export default makeSelectUpdateUserAccountant;
export { selectUpdateUserAccountantDomain };
