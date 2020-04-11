/**
 *
 * Trader
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
import makeSelectTrader from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Trader extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Trader</title>
          <meta name="description" content="Description of Trader" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Trader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  trader: makeSelectTrader(),
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

const withReducer = injectReducer({ key: 'trader', reducer });
const withSaga = injectSaga({ key: 'trader', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Trader);
