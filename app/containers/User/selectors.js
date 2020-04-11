import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the user state domain
 */

const selectUserDomain = state => state.get('user', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by User
 */

const makeSelectUser = () =>
  createSelector(selectUserDomain, substate => substate.toJS());

export default makeSelectUser;
export { selectUserDomain };
