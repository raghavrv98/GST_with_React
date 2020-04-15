import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the services state domain
 */

const selectServicesDomain = state => state.get('services', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Services
 */

const makeSelectServices = () =>
  createSelector(selectServicesDomain, substate => substate.toJS());

export default makeSelectServices;
export { selectServicesDomain };
