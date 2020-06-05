import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forbiddenPage state domain
 */

const selectForbiddenPageDomain = state =>
  state.get('forbiddenPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ForbiddenPage
 */

const makeSelectForbiddenPage = () =>
  createSelector(selectForbiddenPageDomain, substate => substate.toJS());

export default makeSelectForbiddenPage;
export { selectForbiddenPageDomain };
