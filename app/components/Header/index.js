import React from 'react';
import { NavLink } from 'react-router-dom';
import MessageModal from '../../components/MessageModal/Loadable'
import axios from 'axios';
import history from "./../../utils/history";
import { errorHandler } from '../../utils/commonUtils';
/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  state = {
    payload: {
      _id: '',
      emailId: '',
      oldPassword: '',
      newPassword: '',
    },
    isOpenClassName: 'modal display-none container',
    showHideClassName: 'modal display-none container'
  };

  componentWillMount() {
    if(window.location.pathname==="/resetPassword"){
      history.push("/resetPassword")
    }
    else if (!localStorage.getItem('role')) {
      history.push("/")
    }
  }
  resetPassword = () => {
    event.preventDefault();
    this.setState({
      showHideClassName: 'modal display-none container',
    })
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload["username"] = payload["username"].toUpperCase();
    let url = window.API_URL + "/changePassword";

    payload._id = localStorage.getItem('userId'),
      axios.post(url, payload)
        .then((res) => {
          const data = res.data.data;
          this.setState({
            message: res.data.message,
            type: "success",
            isOpenClassName: 'modal display-block container'
          }, () => setTimeout(this.modalTime, 1500), this.userLogout());
        })
        .catch((error) => {
          let message = errorHandler(error);
          this.setState({
            message,
            isOpenClassName: 'modal display-block container',
            type: "failure",
            isFetching: false,
          }, () => setTimeout(this.modalTime, 1500))
        });
  };

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container'
    })
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
      showHideClassName: 'modal display-none container'
    });
  };

  resetPasswordHandler = () => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload.oldPassword = "",
      payload.newPassword = "",
      payload.username = ""
    this.setState({
      payload,
      showHideClassName: 'modal display-block container'

    });
  };

  userLogout = () => {
    event.preventDefault();
    sessionStorage.clear();
    localStorage.clear();
    history.push("/")
  };

  render() {
    return (
      <div>

        <MessageModal
          showHideClassName={this.state.isOpenClassName}
          modalType={this.state.type}
          message={this.state.message}
          onClose={this.modalCloseHandler}
        />

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
                <img
                  className="logo-r"
                  src={require('../../assets/img/logo.png')}
                />
              </NavLink>
            </div>
            {localStorage.getItem('role') ?
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >

                <ul className="nav navbar-nav navbar-right">
                  {localStorage.getItem('role') === "admin" ?
                    <li><NavLink
                      className="navbar-brand welcome-name-r nav-css-r"
                      exact
                      to="#"
                      // data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1"
                    >
                      Welcome {localStorage.getItem('name')}
                    </NavLink>
                    </li>
                    : null}

                  {localStorage.getItem('role') === "accountant" ?
                    <li><NavLink
                      className="navbar-brand welcome-name-r nav-css-r"
                      exact
                      to="#"
                    >
                      Welcome {localStorage.getItem('firstName') + " " + localStorage.getItem('middleName') + " " + localStorage.getItem('lastName')}
                    </NavLink>
                    </li>
                    : null}

                  {localStorage.getItem('role') === "user" ?
                    <li>
                      <NavLink
                        exact
                        to="#"
                        className="navbar-brand welcome-name-r nav-css-r"
                      >
                        Welcome {localStorage.getItem('legalName')}
                      </NavLink>
                    </li>
                    : null}

                  {localStorage.getItem('role') === "admin" ?
                    <React.Fragment>
                      <li>
                        <NavLink
                          className="navbar-brand  text-color-r nav-css-r"
                          exact
                          to="/admin"
                          // data-toggle="collapse"
                          data-target="#bs-example-navbar-collapse-1"
                        >
                          Dashboard
                  </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="navbar-brand  text-color-r nav-css-r"
                          exact
                          to="/manageAccountant"
                          // data-toggle="collapse"
                          data-target="#bs-example-navbar-collapse-1"
                        >
                          Manage Accountant
                  </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="navbar-brand  text-color-r nav-css-r"
                          exact
                          to="/updateUserAccountant"
                          // data-toggle="collapse"
                          data-target="#bs-example-navbar-collapse-1"
                        >
                          Manage User
                  </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="navbar-brand  text-color-r nav-css-r"
                          exact
                          to="/adminNotifications"
                          // data-toggle="collapse"
                          data-target="#bs-example-navbar-collapse-1"
                        >
                          Notifications
                  </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="navbar-brand  text-color-r nav-css-r"
                          exact
                          to="/managePasswordRequests"
                          // data-toggle="collapse"
                          data-target="#bs-example-navbar-collapse-1"
                        >
                          Manage Password Requests
                  </NavLink>
                      </li>
                    </React.Fragment>
                    : null
                  }

                  <li>
                    <NavLink
                      className="navbar-brand text-color-r nav-css-r"
                      onClick={this.resetPasswordHandler}
                      exact
                      to="#"
                      // data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1"
                    >
                      Reset Password
                  </NavLink>
                  </li>


                  <li>
                    <NavLink
                      className="navbar-brand text-color-r nav-css-r"
                      onClick={this.userLogout}
                      exact
                      to="/"
                      // data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1"
                    >
                      Logout
                  </NavLink>
                  </li>

                </ul>
              </div>

              :
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="nav navbar-nav navbar-right">
                  <li><NavLink
                    className="navbar-brand text-color-r nav-css-r"
                    exact
                    to="/"
                    // data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                  >
                    Home
                  </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="navbar-brand text-color-r nav-css-r"
                      exact
                      to="/aboutUs"
                      // data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1"
                    >
                      AboutUs
                  </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="navbar-brand text-color-r nav-css-r"
                      exact
                      to="/contact"
                      // data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1"
                    >
                      ContactUs
                  </NavLink>
                  </li>
                </ul>
              </div>
            }
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

              <div className="modal-body,input-group input-group-lg padding-20-r">
                <div>
                  <form onSubmit={this.resetPassword}>
                    <input
                      type="text"
                      value={this.state.payload.username}
                      onChange={this.nameChangeHandler}
                      id="username"
                      className="form-control reset-input-box-r"
                      placeholder="Username"
                      autoFocus
                      required
                    />
                    <input
                      type="text"
                      value={this.state.payload.oldPassword}
                      onChange={this.nameChangeHandler}
                      id="oldPassword"
                      className="form-control reset-input-box-r"
                      placeholder="Old Password"
                      required
                    />
                    <input
                      type="password"
                      value={this.state.payload.newPassword}
                      onChange={this.nameChangeHandler}
                      id="newPassword"
                      minLength="4"
                      className="form-control reset-input-box-r"
                      placeholder="New Password"
                      autoFocus
                      required
                    />
                    <div className="text-align-center-r">
                      <button className="button-base-r width-40-r width-30-r">Reset</button>
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
