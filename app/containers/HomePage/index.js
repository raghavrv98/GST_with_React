/**
 *
 * HomePage
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
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {

  state = {
    payload: {
      oldPassword: "",
      newPassword: ""
    },
    isResetActive: false
  }

  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload
    });
  };

  resetPassword = () => {
    event.preventDefault()
  }

  forgotPassword = () => {
    let isResetActive = JSON.parse(JSON.stringify(this.state.isResetActive))
    isResetActive = !isResetActive
    this.setState({
      isResetActive
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login Page</title>
          <meta name="description" content="Description of HomePage" />
        </Helmet>
        <div className="loginBackgroundImage-r">
          <div className="loginLayout-r">
            <div className="container outer-box-r">

              <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 vertical-align-title-r">
                <p className="title-r">XYZ</p>
                <p className="sub-heading-r">"Your Own GST Software"</p>
                <div className="text-align-center-r"><button type="button" className="btn btn-primary btn-text-r">Get in touch
        </button></div>
              </div>

              <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 vertical-align-login-r">
                <div className="login-box">
                  <div className="modal-body,input-group input-group-lg">
                    <div className="reset-form-padding-r">
                      {this.state.isResetActive ?
                        <React.Fragment>
                          <p className="forgot-title-r">Forgot Password</p>
                          <form onSubmit={this.resetPassword}>
                            <p className="forgot-msg-r">You will receive an e-mail along with your password.</p>
                            <input type="email"
                              value={this.state.payload.oldPassword}
                              onChange={this.nameChangeHandler}
                              id="email"
                              className="form-control reset-input-box-r"
                              placeholder="Enter your email-Id"
                              autoFocus
                              required />
                            <span>
                              <input type="submit" className="btn btn-primary btn-text-r" name=""
                                value="Send" />
                            </span>
                          </form>
                          <p className="forgot-password-r" onClick={this.forgotPassword}>Get back to login</p>
                        </React.Fragment>
                        :
                        <React.Fragment>
                          <p className="login-title-r">Login</p>
                          <form onSubmit={this.resetPassword}>
                            <input type="text"
                              value={this.state.payload.oldPassword}
                              onChange={this.nameChangeHandler}
                              id="oldPassword"
                              className="form-control reset-input-box-r"
                              placeholder="Old Password"
                              autoFocus
                              required />
                            <input type="password"
                              value={this.state.payload.newPassword}
                              onChange={this.nameChangeHandler}
                              id="newPassword"
                              className="form-control reset-input-box-r"
                              placeholder="New Password"
                              autoFocus
                              required />
                            <span>
                              <input type="submit" className="btn btn-primary btn-text-r" name=""
                                value="Login" />
                            </span>
                          </form>
                          <p className="forgot-password-r" onClick={this.forgotPassword}>Forgot Password ?</p>
                        </React.Fragment>
                      }
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
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

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
