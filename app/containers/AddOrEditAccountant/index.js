/**
 *
 * AddOrEditAccountant
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
import makeSelectAddOrEditAccountant from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import MessageModal from '../../components/MessageModal/Loadable'
import axios from 'axios';
import { errorHandler } from '../../utils/commonUtils';

/* eslint-disable react/prefer-stateless-function */
export class AddOrEditAccountant extends React.Component {
  state = {
    isLoading: false,
    isOpenClassName: 'modal display-none container',
    payload: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      address: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
      mobileNumber: "",
      secondaryMobileNumber: "",
      emailId: "",
      panNumber: "",
      qualification: "",
      password: "",
      username: ""
    },
    message: "",
    passwordCheck: false,
    password: true,
    confirmPassword: true,
    isUsername: false,
    states: [],
    cities: []
  }

  getAccountantById = (id) => {
    let url = window.API_URL + `/AccountantDetails/${id}`;
    axios.get(url)
      .then((res) => {
        const payload = res.data.data;
        this.setState({ payload, isLoading: false });
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure",
          isLoading: false,
        }, () => setTimeout(this.modalTime, 1500))
      });
  };

  getStates = () => {
    let url = window.API_URL + `/states`
    axios.get(url)
      .then((res) => {
        const states = res.data.data;
        this.setState({ states, isLoading: false });
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure",
          isLoading: false,
        }, () => setTimeout(this.modalTime, 1500))
      });
  };

  getCities = (state) => {
    let url = window.API_URL + `/cities/${state}`
    axios.get(url)
      .then((res) => {
        const cities = res.data.data;
        this.setState({ cities, isLoading: false });
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure",
          isLoading: false,
        }, () => setTimeout(this.modalTime, 1500))
      });
  };

  postAccountant = (payload, check) => {
    let url = window.API_URL + `/updateAccountantDetails/${this.props.match.params.id}`;
    if (this.props.match.params.id) {
      axios.put(url, payload)
        .then((res) => {
          const data = res.data.data;
          this.setState({
            message: res.data.message,
            isLoading: false,
            type: "success",
          }, () => this.props.history.push('/manageAccountant'));
        })
        .catch((error) => {
          let message = errorHandler(error);
          this.setState({
            message,
            isOpenClassName: 'modal display-block container',
            type: "failure",
            isLoading: false,
          }, () => setTimeout(this.modalTime, 1500))
        });
    }
    else {
      let url = check ? window.API_URL + `/newAccountant/isAvailable/username` : window.API_URL + `/newAccountant`;
      axios.post(url, payload)
        .then((res) => {
          const data = res.data.data;
          let isUsername = !data.available
          this.setState({
            message: res.data.message,
            isLoading: false,
            type: "success",
            available: data.available,
            isUsername
          }, () => check ? null : this.props.history.push('/manageAccountant'));
        })
        .catch((error) => {
          let message = errorHandler(error);
          this.setState({
            message,
            isOpenClassName: 'modal display-block container',
            type: "failure",
            isLoading: false,
          }, () => setTimeout(this.modalTime, 1500))
        });
    }
  };


  componentWillMount() {
    if (this.props.match.params.id) {
      this.setState({
        isLoading: true
      }, () => this.getAccountantById(this.props.match.params.id))
    }
    this.getStates()
  }


  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    payload.state ? this.getCities(payload.state) : null
    this.setState({
      payload, passwordCheck: false, isUsername: false
    });
  };

  SubmitUserHandler = () => {
    event.preventDefault()
    let payload = JSON.parse(JSON.stringify(this.state.payload));

    Object.keys(payload).map(val => {
      if (val === "firstName" || val === "middleName" || val === "lastName" || val === "address" || val === "city" || val === "district" || val === "state" || val === "emailId" || val === "panNumber" || val === "username") {
        payload[val] = payload[val].toUpperCase();
      }
      return val
    })

    if (payload.password === payload.confirmPassword) {
      this.setState({
        isLoading: true
      },
        () => this.postAccountant(payload)
      )
    }
    else {
      this.setState({
        passwordCheck: true
      })
    }
  }

  checkAvailabelHandler = () => {
    event.preventDefault()
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload["username"] = payload["username"].toUpperCase()
    this.setState({
      isLoading: true
    },
      () => this.postAccountant(payload, "check")
    )
  }

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container'
    })
  }

  showHidePassword = (event) => {
    let id = event.target.id
    let gstnPassword = this.state.gstnPassword
    let password = this.state.password
    let confirmPassword = this.state.confirmPassword
    if (id === "gstnPassword0") {
      gstnPassword = !gstnPassword
    }
    else if (id === "password0") {
      password = !password
    }
    else if (id === "confirmPassword0") {
      confirmPassword = !confirmPassword
    }
    this.setState({
      gstnPassword, password, confirmPassword
    })
  }


  render() {
    return (
      <div>
        <Helmet>
          <title>AddOrEditaccountant</title>
          <meta name="description" content="Description of AddOrEditaccountant" />
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
            <div>
              <ul className="breadCrumb-bg-r">
                <li onClick={() => this.props.history.push('/manageAccountant')} className="breadCrumb-li-child-1-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
                <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >{this.props.match.params.id ? "Update Accountant" : "Create Accountant"}</span></li>
              </ul>
            </div>
            <div className="container">
              <p className="main-title-r">{this.props.match.params.id ? "Update Accountant" : "Create Accountant"}</p>
              <ul id="progressbar">
                <li><span className="list1-r" > Check for Username</span></li>
                <li><span className="list2-r"> Accountant Registration</span></li>
              </ul>
              {this.props.match.params.id || this.state.available ? this.state.isLoading ?
                <div className="lds-facebook"><div></div><div></div><div></div><span className="loading-text-r">Loading... </span></div>
                :
                <form onSubmit={this.SubmitUserHandler}>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <input
                      disabled={this.props.match.params.id || this.state.available}
                      type="text"
                      className="form-control inputBox-r field"
                      placeholder="Username"
                      value={this.state.payload.username}
                      onChange={this.nameChangeHandler}
                      id="username"
                      autoFocus
                    />
                    <label className="floating-label">Username</label>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <p className="required-check-mark-r">*</p>
                    <input
                      type="date"
                      className="form-control inputBox-r field"
                      placeholder="Date Of Birth* :" id="date"
                      value={this.state.payload.dateOfBirth}
                      onChange={this.nameChangeHandler}
                      max = {new Date().toISOString().split("T")[0]}
                      id="dateOfBirth"
                      required />
                    <label className="floating-label">Date Of Birth<p className="required-check-mark-r">*</p></label>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <input
                      type="text"
                      className="form-control inputBox-r field"
                      placeholder="First Name"
                      value={this.state.payload.firstName}
                      onChange={this.nameChangeHandler}
                      id="firstName"
                    />
                    <label className="floating-label">First Name</label>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <input
                      type="text"
                      className="form-control inputBox-r field"
                      placeholder="Middle Name"
                      value={this.state.payload.middleName}
                      onChange={this.nameChangeHandler}
                      id="middleName"
                    />
                    <label className="floating-label">Middle Name</label>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <input
                      type="text"
                      className="form-control inputBox-r field"
                      placeholder="Last Name*"
                      value={this.state.payload.lastName}
                      onChange={this.nameChangeHandler}
                      id="lastName"
                      required
                    />
                    <label className="floating-label">Last Name<p className="required-check-mark-r">*</p></label>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <input
                      type="tel"
                      className="form-control inputBox-r field"
                      placeholder="Primary Mobile Number*"
                      value={this.state.payload.mobileNumber}
                      onChange={this.nameChangeHandler}
                      id="mobileNumber"
                      pattern="[1-9]{1}[0-9]{9}"
                      title="Enter 10 digit mobile number"
                      required />
                    <label className="floating-label">Primary Mobile Number<p className="required-check-mark-r">*</p></label>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <input
                      type="tel"
                      className="form-control inputBox-r field"
                      placeholder="Secondary Mobile Number"
                      value={this.state.payload.secondaryMobileNumber}
                      onChange={this.nameChangeHandler}
                      id="secondaryMobileNumber"
                      pattern="[1-9]{1}[0-9]{9}"
                      title="Enter 10 digit mobile number"
                    />
                    <label className="floating-label">Secondary Mobile Number</label>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <p className="required-check-mark-r">*</p>
                    <input
                      type="email"
                      className="form-control inputBox-r field"
                      placeholder="Email-Id"
                      value={this.state.payload.emailId}
                      onChange={this.nameChangeHandler}
                      id="emailId"
                      required />
                    <label className="floating-label">Email-Id<p className="required-check-mark-r">*</p></label>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <input
                      type="text"
                      className="form-control inputBox-r field"
                      placeholder="PAN Number*"
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                      title="Please Enter PAN in corrected format"
                      value={this.state.payload.panNumber}
                      onChange={this.nameChangeHandler}
                      id="panNumber"
                      required />
                    <label className="floating-label">PAN Number<p className="required-check-mark-r">*</p></label>
                  </div>

                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <select
                      className="custom-select year-month-border-r inputBox-r"
                      value={this.state.payload.qualification}
                      onChange={this.nameChangeHandler}
                      id="qualification"
                      required>
                      <option value="">Qualification</option>
                      <option value="postgraduate">Post Graduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="other">other</option>
                    </select>
                    <label className="floating-label">Qualification<p className="required-check-mark-r">*</p></label>
                  </div>

                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <select
                      className="custom-select year-month-border-r inputBox-r"
                      value={this.state.payload.state}
                      onChange={this.nameChangeHandler}
                      id="state"
                      required>
                      <option value="">State</option>
                      {this.state.states.map((val, index) => {
                        return <option key={"val_" + index} value={val}>{val}</option>
                      })}
                    </select>
                    <label className="floating-label">State<p className="required-check-mark-r">*</p></label>
                  </div>

                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <input
                      type="text"
                      className="form-control inputBox-r field"
                      placeholder="Pincode Number*"
                      value={this.state.payload.pincode}
                      onChange={this.nameChangeHandler}
                      id="pincode"
                      required
                    />
                    <label className="floating-label">Pincode Number<p className="required-check-mark-r">*</p></label>
                  </div>

                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <p className="required-check-mark-r">*</p>
                    <input
                      type="text"
                      className="form-control inputBox-r field"
                      placeholder="District*"
                      value={this.state.payload.district}
                      onChange={this.nameChangeHandler}
                      id="district"
                      required
                    />
                    <label className="floating-label">District<p className="required-check-mark-r">*</p></label>
                  </div>

                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <select
                      className={this.state.payload.state ? "custom-select year-month-border-r inputBox-r" : "custom-select year-month-border-r inputBox-r not-allowed"}
                      value={this.state.payload.city}
                      onChange={this.nameChangeHandler}
                      id="city"
                      required
                      disabled={!this.state.payload.state}
                      >
                      <option value="">City</option>
                      {this.state.cities.map((val, index) => {
                        return <option key={"val_" + index} value={val}>{val}</option>
                      })}
                    </select>
                    <label className="floating-label">City<p className="required-check-mark-r">*</p></label>
                  </div>

                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <input
                      type="text"
                      className="form-control inputBox-r field"
                      placeholder="Address*"
                      value={this.state.payload.address}
                      onChange={this.nameChangeHandler}
                      id="address"
                      required
                    />
                    <label className="floating-label">Address<p className="required-check-mark-r">*</p></label>
                  </div>

                  {this.props.match.params.id ?
                    null :
                    <React.Fragment>
                      <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <input
                          type={this.state.password ? "password" : "text"}
                          className={this.state.passwordCheck ? "form-control inputBox-r field alert-box-r" : "form-control inputBox-r field"}
                          placeholder="Password"
                          value={this.state.payload.password}
                          onChange={this.nameChangeHandler}
                          id="password"
                          minLength="4"
                          required
                        />
                        <label className="floating-label">Password<p className="required-check-mark-r">*</p></label>
                        <button type="button" id="password0" onClick={this.showHidePassword} aria-hidden="true" className={this.state.password ? "fa fa-eye password-eye-open-r" : "fa fa-eye-slash password-eye-close-r"}></button>
                      </div>
                      <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <p className="required-check-mark-r">*</p>
                        <input
                          type={this.state.confirmPassword ? "password" : "text"}
                          className={this.state.passwordCheck ? "form-control inputBox-r field alert-box-r" : "form-control inputBox-r field"}
                          placeholder="Confirm Password*"
                          value={this.state.payload.confirmPassword}
                          onChange={this.nameChangeHandler}
                          id="confirmPassword"
                          required
                        />
                        <label className="floating-label">Confirm Password<p className="required-check-mark-r">*</p></label>
                        <button type="button" id="confirmPassword0" onClick={this.showHidePassword} aria-hidden="true" className={this.state.confirmPassword ? "fa fa-eye password-eye-open-r" : "fa fa-eye-slash password-eye-close-r"}></button>
                        {this.state.passwordCheck ? <p className="error-msg-r">Password and confirm password mismatch.</p> : null}
                      </div>
                    </React.Fragment>
                  }
                  <div className="text-align-center-r">
                    <button className="button-base-r width-40-r margin-bottom-b-60-r margin-top-b-25-r">{this.props.match.params.id ? "Update Accountant" : "Create Accountant"}</button>
                  </div>
                </form>
                :
                <React.Fragment>
                  <form onSubmit={this.checkAvailabelHandler}>
                    <div className="check-container-acc-r">
                      <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 username-center-r">
                        <input
                          type="text"
                          className={!this.state.available && this.state.message.includes('Username') ? "form-control inputBox-r field alert-box-r" : "form-control inputBox-r field"}
                          placeholder="Username*"
                          value={this.state.payload.username}
                          onChange={this.nameChangeHandler}
                          id="username"
                          autoFocus
                          required />
                        {!this.state.available && this.state.isUsername && this.state.message.includes('Username') ? <p className="error-msg-r">{this.state.message}</p> : null}
                        <label className="floating-label">Username <p className="required-check-mark-r">*</p></label>
                      </div>
                    </div>
                    <div className="text-align-center-r">
                      <button className="button-base-r width-40-r margin-bottom-b-60-r margin-top-b-25-r">Check</button>
                    </div>
                  </form>
                </React.Fragment>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

AddOrEditAccountant.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addOrEditAccountant: makeSelectAddOrEditAccountant(),
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

const withReducer = injectReducer({ key: 'addOrEditAccountant', reducer });
const withSaga = injectSaga({ key: 'addOrEditAccountant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddOrEditAccountant);
