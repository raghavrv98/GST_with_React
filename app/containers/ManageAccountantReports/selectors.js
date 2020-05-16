import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageAccountantReports state domain
 */

const selectManageAccountantReportsDomain = state =>
  state.get('manageAccountantReports', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageAccountantReports
 */

const makeSelectManageAccountantReports = () =>
  createSelector(selectManageAccountantReportsDomain, substate =>
    substate.toJS(),
  );

export default makeSelectManageAccountantReports;
export { selectManageAccountantReportsDomain };
