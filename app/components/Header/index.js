import React from 'react';
import { NavLink } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  state = {
    isResetModal: false,
    payload: {
      oldPassword: '',
      newPassword: '',
    },
    showHideClassName : 'modal display-none container'
  };

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
      showHideClassName : 'modal display-none container'
    });
  };

  resetPasswordHandler = () => {
    this.setState({
      isResetModal: true,
      showHideClassName : 'modal display-block container'
    });
  };

  resetPassword = id => {
    event.preventDefault();
    this.setState({
      isResetModal: false,
      showHideClassName : 'modal display-none container'
    });
  };

  userLogout = () => {
    event.preventDefault();
    sessionStorage.clear();
    localStorage.clear();
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
                className="navbar-brand text-color-r"
                exact
                to="#"
              >
                GST
              </NavLink>
            </div>

            {sessionStorage.getItem('user') || sessionStorage.getItem('trader') || sessionStorage.getItem('admin') ? (
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="nav navbar-nav navbar-right">
                  {sessionStorage.getItem('admin') ?
                      <NavLink
                        className="navbar-brand text-color-r"
                        exact
                        to="/manageTrader"
                      >
                        Manage Trader
                  </NavLink>
                    : null
                  }
                  <NavLink
                    className="navbar-brand text-color-r"
                    onClick={this.resetPasswordHandler}
                    exact
                    to="#"
                  >
                    Reset Password
                  </NavLink>

                  <NavLink
                    className="navbar-brand text-color-r"
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
                      className="navbar-brand text-color-r"
                      exact
                      to="/"
                    >
                      Home
                  </NavLink>
                    <NavLink
                      className="navbar-brand text-color-r"
                      exact
                      to="/aboutUs"
                    >
                      AboutUs
                  </NavLink>
                    <NavLink
                      className="navbar-brand text-color-r"
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

        <div className={this.state.showHideClassName} >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div
                  className="modal-header background-color-r"
                >
                  <span className="text-color-white-r">Reset Password</span>
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
                        <button
                          type="submit"
                          className="button-base-r width-40-r width-30-r"
                          name=""
                        >Reset</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* <!-- reset password modal end --> */}
      </div>
    );
  }
}

export default Header;
