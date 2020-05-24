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

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
  state = {
    payload: {
      emailId: '',
      password: '',
    },
    isResetActive: false,
    loginError: false,
    isLoading: false
  };

  errorCheck(error) {
    let errorMes = '';
    if (error.response) {
      if (error.response.data.status == 404) {
        errorMes = error.response.data.error;
      } else if (error.response.data.code == 400) {
        errorMes = error.response.data.message;
      } else {
        errorMes = error.response.data.message;
      }
    } else {
      errorMes = error.message;
    }
    this.setState({ errorMes, loginError: true, isLoading: false });
  }

  loginSubmitHandler = () => {
    event.preventDefault()
    this.setState({
      isLoading: true
    })
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    if (payload.emailId === "admin@gmail.com" && payload.password === "0000") {
      this.props.history.push('/admin')
    }
    axios.post(`http://localhost:3000/login`, payload)
      .then((res) => {
        const data = res.data.data;
        localStorage.setItem('role', data.role)
        localStorage.setItem('emailId', data.emailId)
        localStorage.setItem('userId', data._id)
        if (data.role === "accountant") {
          this.props.history.push('/manageUser')
        }
        else if (data.role === "user") {
          this.props.history.push('/user')
        }
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  }

  forgotPasswordHandler = () => {
    event.preventDefault()
    this.setState({
      isLoading: true
    })
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    axios.post(`http://localhost:3000/forgot`, payload)
      .then((res) => {
        const data = res.data.data;
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  }

  componentWillMount() {
  }

  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload,
      loginError: false,
    });
  };

  forgotPassword = () => {
    let isResetActive = JSON.parse(JSON.stringify(this.state.isResetActive));
    isResetActive = !isResetActive;
    this.setState({
      isResetActive,
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
                <p className="title-r">GST</p>
                <p className="sub-heading-r">"Your Own GST Software"</p>
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
                  <div className="modal-body,input-group input-group-lg">
                    <div className="reset-form-padding-r">
                      {this.state.isLoading ?
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        :
                        <React.Fragment>
                          {this.state.isResetActive ? (
                            <React.Fragment>
                              <p className="forgot-title-r">Forgot Password</p>
                              {this.state.loginError ? (
                                <p className="error-msg-r">
                                  Email-Id is incorrect
                                </p>
                              ) : null}
                              <form onSubmit={this.forgotPasswordHandler}>
                                <p className="forgot-msg-r">
                                  You will receive an e-mail along with your
                                  password.
                            </p>
                                <input
                                  type="email"
                                  value={this.state.payload.emailId}
                                  onChange={this.nameChangeHandler}
                                  id="emailId"
                                  className="form-control reset-input-box-r"
                                  placeholder="Enter your email-Id"
                                  autoFocus
                                  required
                                />
                                <span>
                                  <button
                                    type="submit"
                                    className="button-base-r width-40-r"
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
                                    Username or password is incorrect
                                  </p>
                                ) : null}
                                <form onSubmit={this.loginSubmitHandler}>
                                  <input
                                    type="email"
                                    value={this.state.payload.emailId}
                                    onChange={this.nameChangeHandler}
                                    id="emailId"
                                    className="form-control reset-input-box-r"
                                    placeholder="Enter your EmailId"
                                    autoFocus
                                    required
                                  />
                                  <input
                                    type="password"
                                    value={this.state.payload.password}
                                    onChange={this.nameChangeHandler}
                                    id="password"
                                    className="form-control reset-input-box-r"
                                    placeholder="Enter your password"
                                    autoFocus
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
