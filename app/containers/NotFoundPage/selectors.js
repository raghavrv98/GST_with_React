import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notFoundPage state domain
 */

const selectNotFoundPageDomain = state =>
  state.get('notFoundPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NotFoundPage
 */

const makeSelectNotFoundPage = () =>
  createSelector(selectNotFoundPageDomain, substate => substate.toJS());

export default makeSelectNotFoundPage;
export { selectNotFoundPageDomain };
