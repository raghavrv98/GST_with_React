import React from 'react';
import { NavLink } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  state = {
    isUserLogin: false,
    isTraderLogin: false,
    isResetModal: false,
    payload: {
      oldPassword: '',
      newPassword: '',
    },
  };

  componentWillMount() {
    localStorage.setItem('User', 'test');
    localStorage.setItem('Trader', 'trader1');
  }

  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload,
    });
  };

  modalCloseHandler = () => {
    this.setState({
      isConfirmModal: false,
      isResetModal: false,
    });
  };

  resetPasswordHandler = () => {
    this.setState({
      isResetModal: true,
    });
  };

  resetPassword = id => {
    event.preventDefault();
    this.setState({
      isResetModal: false,
    });
  };

  userLogin = () => {
    event.preventDefault();
    if (localStorage.getItem('User') == 'test') {
      this.setState({
        isUserLogin: true,
      });
    } else {
      localStorage.setItem('User', 'test');
      this.setState({
        isUserLogin: true,
      });
    }
  };

  traderLogin = () => {
    event.preventDefault();
    if (localStorage.getItem('Trader') == 'trader1') {
      this.setState({
        isTraderLogin: true,
      });
    } else {
      localStorage.setItem('Trader', 'trader1');
      this.setState({
        isTraderLogin: true,
      });
    }
  };

  userLogout = () => {
    event.preventDefault();
    localStorage.clear();
    this.setState({
      isUserLogin: false,
      isTraderLogin: false,
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-default nav-bar-r">
          <div className="container-fluid">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <NavLink
                style={{ color: '#255b7a' }}
                className="navbar-brand"
                exact
                activeClassName="active"
                to="/"
              >
                GST
              </NavLink>
            </div>

            {this.state.isUserLogin || this.state.isTraderLogin ? (
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="nav navbar-nav navbar-right">
                  <NavLink
                    style={{ color: '#255b7a' }}
                    className="navbar-brand"
                    exact
                    to="/aboutUs"
                  >
                    AboutUs
                  </NavLink>
                  <NavLink
                    style={{ color: '#255b7a' }}
                    className="navbar-brand"
                    exact
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                  <NavLink
                    style={{ color: '#255b7a' }}
                    className="navbar-brand"
                    onClick={this.resetPasswordHandler}
                    exact
                    to="/user"
                  >
                    Reset Password
                  </NavLink>
                  <NavLink
                    style={{ color: '#255b7a' }}
                    className="navbar-brand"
                    onClick={this.userLogout}
                    exact
                    to="/"
                  >
                    Logout
                  </NavLink>
                </ul>
              </div>
            ) : (
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="nav navbar-nav navbar-right">
                <NavLink
                    style={{ color: '#255b7a' }}
                    className="navbar-brand"
                    exact
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    style={{ color: '#255b7a' }}
                    className="navbar-brand"
                    onClick={this.userLogin}
                    exact
                    to="/user"
                  >
                    User
                  </NavLink>
                  <NavLink
                    style={{ color: '#255b7a' }}
                    className="navbar-brand"
                    onClick={this.traderLogin}
                    exact
                    to="/trader"
                  >
                    Trader
                  </NavLink>
                  <NavLink
                    style={{ color: '#255b7a' }}
                    className="navbar-brand"
                    onClick={this.traderLogin}
                    exact
                    to="/userDetails"
                  >
                    UserDetails
                  </NavLink>
                  <NavLink
                    style={{ color: '#255b7a' }}
                    className="navbar-brand"
                    exact
                    to="/aboutUs"
                  >
                    AboutUs
                  </NavLink>
                  <NavLink
                    style={{ color: '#255b7a' }}
                    className="navbar-brand"
                    exact
                    to="/contact"
                  >
                    ContactUs
                  </NavLink>
                </ul>
              </div>
            )}
          </div>
        </nav>
        {/* <!-- reset password modal start --> */}
        {this.state.isResetModal ? (
          <div className="container">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{ backgroundColor: '#f06d46' }}
                >
                  <span style={{ color: 'white' }}>Reset Password</span>
                  <button
                    type="button"
                    className="close"
                    onClick={this.modalCloseHandler}
                    aria-label="Close"
                  >
                    <i className="fa fa-times" aria-hidden="true" />
                  </button>
                </div>

                <div className="modal-body,input-group input-group-lg">
                  <div className="reset-form-padding-r">
                    <form onSubmit={this.resetPassword}>
                      <input
                        type="text"
                        value={this.state.payload.oldPassword}
                        onChange={this.nameChangeHandler}
                        id="oldPassword"
                        className="form-control reset-input-box-r"
                        placeholder="Old Password"
                        autoFocus
                        required
                      />
                      <input
                        type="password"
                        value={this.state.payload.newPassword}
                        onChange={this.nameChangeHandler}
                        id="newPassword"
                        className="form-control reset-input-box-r"
                        placeholder="New Password"
                        autoFocus
                        required
                      />
                      <div className="text-align-center-r">
                        <input
                          type="submit"
                          className="btn btn-primary btn-text-r"
                          name=""
                          value="Reset"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* <!-- reset password modal end --> */}
      </div>
    );
  }
}

export default Header;
