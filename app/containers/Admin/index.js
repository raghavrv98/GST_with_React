/**
 *
 * Admin
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
import makeSelectAdmin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Admin extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Admin</title>
          <meta name="description" content="Description of Admin" />
        </Helmet>
        <div className="container outer-box-r">
        <img className="adminPage-r" src={require('../../assets/img/admin2.png')} />
      </div>
      </div>
    );
  }
}

Admin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  admin: makeSelectAdmin(),
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

const withReducer = injectReducer({ key: 'admin', reducer });
const withSaga = injectSaga({ key: 'admin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Admin);
