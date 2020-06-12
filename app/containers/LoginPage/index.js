/**
 *
 * LoginPage
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
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import axios from 'axios';
import { errorHandler } from '../../utils/commonUtils';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
  state = {
    payload: {
      emailId: '',
      password: '',
    },
    isResetActive: false,
    loginError: false,
    isLoading: false,
    forgotMessageSuccessCheck: false,
    forgotLoginError: false
  };

  loginSubmitHandler = () => {
    event.preventDefault()
    this.setState({
      isLoading: true
    })
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    axios.post(`http://3.128.59.35:3000/login`, payload)
      .then((res) => {
        const data = res.data.data;
        localStorage.setItem('role', data.role)
        localStorage.setItem('emailId', data.emailId)
        localStorage.setItem('userId', data._id)

        if (data.role === "user") {
          localStorage.setItem('legalName', data.legalName)
          this.props.history.push('/user')
        }
        else if (data.role === "accountant") {
          localStorage.setItem('firstName', data.firstName)
          localStorage.setItem('middleName', data.middleName)
          localStorage.setItem('lastName', data.lastName)
          this.props.history.push('/manageUser')
        }
        else if (data.role === "admin") {
          localStorage.setItem("name", data.name)
          this.props.history.push('/admin')
        }
      }
      )
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          loginError: true,
          isLoading: false,
          message
        })
      });
  }

  forgotPasswordHandler = () => {
    event.preventDefault()
    this.setState({
      isLoading: true
    })
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    axios.post(`http://3.128.59.35:3000/forgotPassword`, payload)
      .then((res) => {
        const data = res.data.data;
        payload.emailId = ""
        payload.password = ""
        this.setState({
          message: res.data.message, isLoading: false, payload, forgotMessageSuccessCheck: true
        })
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          forgotLoginError: true,
          isLoading: false,
          message
        })
      });
  }

  componentWillMount() {
    {
      if (localStorage.getItem('role') === "user") {
        this.props.history.push('/user')
      }
      else if (localStorage.getItem('role') === "accountant") {
        this.props.history.push('/manageUser')
      }
      else if (localStorage.getItem('role') === "admin") {
        this.props.history.push('/admin')
      }
    }
  }

  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload,
      loginError: false,
      forgotMessageSuccessCheck: false,
      forgotLoginError: false
    });
  };

  forgotPassword = () => {
    let isResetActive = JSON.parse(JSON.stringify(this.state.isResetActive));
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    isResetActive = !isResetActive;
    payload.emailId = ""
    payload.password = ""
    this.setState({
      isResetActive,
      payload,
      loginError: false,
      forgotMessageSuccessCheck: false,
      forgotLoginError: false
    });
  };

  contactHandler = () => {
    this.props.history.push('/contact');
  };

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
                <img
                  className="logo-heading-r"
                  src={require('../../assets/img/logo.png')}
                />
                <p className="sub-heading-r">Easy to handle, Easy to use</p>
                <div className="text-align-center-r">
                  <button
                    type="button"
                    onClick={this.contactHandler}
                    className="button-base-r width-30-r width-40-r"
                  >
                    Get in touch
                  </button>
                </div>
              </div>

              <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 vertical-align-login-r">
                <div className="login-box">
                  <div className="modal-body,input-group input-group-lg universal-center-r reset-form-padding-r">
                    {this.state.isLoading ?
                      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                      :
                      <React.Fragment>
                        {this.state.isResetActive ? (
                          <React.Fragment>
                            <p className="forgot-title-r">Forgot Password</p>
                            {this.state.forgotMessageSuccessCheck ? (
                              <p className="error-msg-r">
                                Link has been sent successfully
                              </p>
                            ) : null}
                            <form onSubmit={this.forgotPasswordHandler}>
                              {!this.state.forgotMessageSuccessCheck ? <p className="forgot-msg-r">
                                You will receive an e-mail along with your
                                password.
                            </p> : null
                              }
                              <input
                                type="email"
                                value={this.state.payload.emailId}
                                onChange={this.nameChangeHandler}
                                id="emailId"
                                className="form-control forgot-input-box-r"
                                placeholder="Enter your email-Id"
                                required
                              />
                              {this.state.forgotLoginError ? (
                                <p className="error-msg-r">
                                  {this.state.message}
                                </p>
                              ) : null}
                              <span>
                                <button
                                  type="submit"
                                  className="button-base-r width-40-r button-margin-top"
                                >
                                  Send
                              </button>
                              </span>
                            </form>
                            <p
                              className="forgot-password-r"
                              onClick={this.forgotPassword}
                            >
                              Get back to login
                          </p>
                          </React.Fragment>
                        ) : (
                            <React.Fragment>
                              <p className="login-title-r">Login</p>
                              {this.state.loginError ? (
                                <p className="error-msg-r">
                                  {this.state.message}
                                </p>
                              ) : null}
                              <form onSubmit={this.loginSubmitHandler}>
                                <input
                                  type="email"
                                  value={this.state.payload.emailId}
                                  onChange={this.nameChangeHandler}
                                  id="emailId"
                                  className="form-control reset-input-box-r"
                                  placeholder="Enter your Email-Id"
                                  required
                                />
                                <input
                                  type="password"
                                  value={this.state.payload.password}
                                  onChange={this.nameChangeHandler}
                                  id="password"
                                  className="form-control reset-input-box-r"
                                  placeholder="Enter your password"
                                  required
                                />
                                <span>
                                  <button className="button-base-r width-40-r">
                                    Login
                              </button>
                                </span>
                              </form>
                              <p
                                className="forgot-password-r"
                                onClick={this.forgotPassword}
                              >
                                Forgot Password ?
                          </p>
                            </React.Fragment>
                          )}
                      </React.Fragment>
                    }
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

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
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

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
