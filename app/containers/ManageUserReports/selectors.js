import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageUserReports state domain
 */

const selectManageUserReportsDomain = state =>
  state.get('manageUserReports', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageUserReports
 */

const makeSelectManageUserReports = () =>
  createSelector(selectManageUserReportsDomain, substate => substate.toJS());

export default makeSelectManageUserReports;
export { selectManageUserReportsDomain };
