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

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
  state = {
    payload: {
      name: '',
      password: '',
    },
    isResetActive: false,
    loginError: false,
  };

  componentWillMount() {
    localStorage.setItem('user', 'user');
    localStorage.setItem('password', '0000');
    localStorage.setItem('trader', 'trader');
    localStorage.setItem('admin', 'admin');
  }

  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload,
      loginError: false,
    });
  };

  loginHandler = () => {
    event.preventDefault();
    if (
      this.state.payload.name === localStorage.getItem('user') &&
      this.state.payload.password === localStorage.getItem('password')
    ) {
      sessionStorage.setItem('user', this.state.payload.name);
      this.props.history.push('/user');
      this.setState({
        loginError: false,
      });
    } else if (
      this.state.payload.name === localStorage.getItem('trader') &&
      this.state.payload.password === localStorage.getItem('password')
    ) {
      sessionStorage.setItem('trader', this.state.payload.name);
      this.props.history.push('/manageUser');
      this.setState({
        loginError: false,
      });
    } else if (
      this.state.payload.name === localStorage.getItem('admin') &&
      this.state.payload.password === localStorage.getItem('password')
    ) {
      sessionStorage.setItem('admin', this.state.payload.name);
      this.props.history.push('/admin');
      this.setState({
        loginError: false,
      });
    } else {
      this.setState({
        loginError: true,
      });
    }
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
                <p className="title-r">XYZ</p>
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
                      {this.state.isResetActive ? (
                        <React.Fragment>
                          <p className="forgot-title-r">Forgot Password</p>
                          <form onSubmit={this.resetPassword}>
                            <p className="forgot-msg-r">
                              You will receive an e-mail along with your
                              password.
                            </p>
                            <input
                              type="email"
                              value={this.state.payload.oldPassword}
                              onChange={this.nameChangeHandler}
                              id="email"
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
                          <form onSubmit={this.loginHandler}>
                            <input
                              type="text"
                              value={this.state.payload.name}
                              onChange={this.nameChangeHandler}
                              id="name"
                              className="form-control reset-input-box-r"
                              placeholder="Enter your Username"
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
