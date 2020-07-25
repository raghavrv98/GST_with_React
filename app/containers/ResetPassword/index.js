/**
 *
 * ResetPassword
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
import makeSelectResetPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import MessageModal from '../../components/MessageModal/Loadable'
import { errorHandler } from '../../utils/commonUtils';
import axios from 'axios';

/* eslint-disable react/prefer-stateless-function */
export class ResetPassword extends React.Component {

  state = {
    showHideClassName: 'modal display-none container',
    isOpenClassName: 'modal display-none container',
    payload: {
      tempPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    isLoading: false,
  }

  submitNewPasswordRequest = (payload) => {
    let url = window.API_URL + `/setPassword`;
    axios.put(url, payload)
      .then((res) => {
        const data = res.data.data;
        this.setState({
          message: res.data.message,
          type: "success",
          isOpenClassName: 'modal display-block container',
          isLoading: false
        }, () => setTimeout(this.modalTime, 1500), this.props.history.push('/'));
      })

      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure",
          isLoading: false
        }, () => setTimeout(this.modalTime, 1500))
      });
  };


  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload, message: ""
    });
  };

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container',
      isFetching: false
    })
  }

  modalCloseHandler = () => {
    this.setState({
      showHideClassName: 'modal display-none container',
    })
  }


  submitNewPasswordRequestHandler = () => {
    let payload = JSON.parse(JSON.stringify(this.state.payload))
    this.setState({
      payload, isLoading: true
    }, () => this.submitNewPasswordRequest(this.state.payload))
  }


  render() {
    return (
      <div>
        <Helmet>
          <title>ResetPassword</title>
          <meta name="description" content="Description of ResetPassword" />
        </Helmet>

        <MessageModal
          showHideClassName={this.state.isOpenClassName}
          modalType={this.state.type}
          message={this.state.message}
          onClose={this.modalCloseHandler}
        />
        {this.state.isLoading ?
          <div className="lds-facebook"><div></div><div></div><div></div><span className="loading-text-r">Loading... </span></div>
          :
          <div className="container outer-box-r">
            <p className="static-title-r">Reset Password</p>
            <div className="reset-password-outer">
            <form onSubmit={this.submitNewPasswordRequestHandler}>
            <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <input
                  type="text"
                  className="form-control inputBox-r field"
                  placeholder="Username*"
                  value={this.state.payload.username}
                  onChange={this.nameChangeHandler}
                  id="username"
                  required
                  autoFocus />
                <label className="floating-label">Username <p className="required-check-mark-r">*</p></label>
              </div>
              <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <input
                  disabled={this.props.match.params.id || this.state.available}
                  type="password"
                  className="form-control inputBox-r field"
                  placeholder="Current Password*"
                  value={this.state.payload.tempPassword}
                  onChange={this.nameChangeHandler}
                  id="tempPassword"
                  required
                  autoFocus />
                <label className="floating-label">Current Password <p className="required-check-mark-r">*</p></label>
              </div>

              <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <input
                  type="password"
                  className="form-control inputBox-r field"
                  placeholder="New Password*"
                  value={this.state.payload.newPassword}
                  onChange={this.nameChangeHandler}
                  id="newPassword"
                  required
                />
                <label className="floating-label">New Password<p className="required-check-mark-r">*</p></label>
              </div>

              <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <input
                  type="password"
                  className="form-control inputBox-r field"
                  placeholder="Confirm Password*"
                  value={this.state.payload.confirmPassword}
                  onChange={this.nameChangeHandler}
                  id="confirmPassword"
                  required
                />
                <label className="floating-label">Confirm Password <p className="required-check-mark-r">*</p></label>
              </div>

              <div className="text-align-center-r">
                <button className="button-base-r width-40-r margin-bottom-b-60-r margin-top-b-25-r">Reset</button>
              </div>
            </form>
            </div>
          </div>
        }
      </div>
    );
  }
}

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resetPassword: makeSelectResetPassword(),
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

const withReducer = injectReducer({ key: 'resetPassword', reducer });
const withSaga = injectSaga({ key: 'resetPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ResetPassword);
