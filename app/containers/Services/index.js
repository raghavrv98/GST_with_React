/**
 *
 * Services
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
import makeSelectServices from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Services extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Services</title>
          <meta name="description" content="Description of Services" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Services.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  services: makeSelectServices(),
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

const withReducer = injectReducer({ key: 'services', reducer });
const withSaga = injectSaga({ key: 'services', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Services);
