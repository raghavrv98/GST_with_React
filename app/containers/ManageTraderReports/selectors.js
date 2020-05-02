import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageTraderReports state domain
 */

const selectManageTraderReportsDomain = state =>
  state.get('manageTraderReports', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageTraderReports
 */

const makeSelectManageTraderReports = () =>
  createSelector(selectManageTraderReportsDomain, substate => substate.toJS());

export default makeSelectManageTraderReports;
export { selectManageTraderReportsDomain };
