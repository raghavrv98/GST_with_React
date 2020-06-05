/**
 *
 * ForbiddenPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectForbiddenPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ForbiddenPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>ForbiddenPage</title>
          <meta name="description" content="Description of ForbiddenPage" />
        </Helmet>
        <div className="forbiddenBackgroundImage-r">
        {/* <div className="container outer-box-r">
          <div className="not-found-box-r">
        <h1 className ="heading-404-r" >404</h1>
        <h1 className ="sub-heading-404-r" >Page Not Found</h1>
          </div>
        </div> */}
        </div>
      </div>
    );
  }
}

ForbiddenPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  forbiddenPage: makeSelectForbiddenPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'forbiddenPage', reducer });
const withSaga = injectSaga({ key: 'forbiddenPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForbiddenPage);
