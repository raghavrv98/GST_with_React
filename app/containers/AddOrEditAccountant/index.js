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
    },
    passwordCheck: false,
    password: true,
    confirmPassword: true
  }

  getAccountantById = (id) => {
    axios.get(`https://gst-service-uat.herokuapp.com/AccountantDetails/${id}`)
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

  postAccountant = (payload) => {
    if (this.props.match.params.id) {
      axios.put(`https://gst-service-uat.herokuapp.com/updateAccountantDetails/${this.props.match.params.id}`, payload)
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
      axios.post(`https://gst-service-uat.herokuapp.com/newAccountant`, payload)
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
  };


  componentWillMount() {
    if (this.props.match.params.id) {
      this.setState({
        isLoading: true
      }, () => this.getAccountantById(this.props.match.params.id))
    }
  }


  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload, passwordCheck: false
    });
  };

  SubmitUserHandler = () => {
    event.preventDefault()
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    if (payload.password === payload.confirmPassword) {
      this.setState({
        isLoading: true
      }, () => this.postAccountant(payload))
    }
    else {
      this.setState({
        passwordCheck: true
      })
    }
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
              <form onSubmit={this.SubmitUserHandler}>

                <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="First Name"
                    value={this.state.payload.firstName}
                    onChange={this.nameChangeHandler}
                    id="firstName"
                  />
                </div>
                <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="Middle Name"
                    value={this.state.payload.middleName}
                    onChange={this.nameChangeHandler}
                    id="middleName"
                  />
                </div>
                <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <p className="required-check-mark-r">*</p>
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="Last Name"
                    value={this.state.payload.lastName}
                    onChange={this.nameChangeHandler}
                    id="lastName"
                    required
                  />
                </div>
                <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <p className="required-check-mark-r">*</p>
                  <input
                    type="date"
                    className="form-control inputBox-r"
                    placeholder="Date Of Birth :" id="date"
                    value={this.state.payload.dateOfBirth}
                    onChange={this.nameChangeHandler}
                    id="dateOfBirth"
                    required />
                </div>
                <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <p className="required-check-mark-r">*</p>
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="Address"
                    value={this.state.payload.address}
                    onChange={this.nameChangeHandler}
                    id="address"
                    required
                  />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <p className="required-check-mark-r">*</p>
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="City"
                    value={this.state.payload.city}
                    onChange={this.nameChangeHandler}
                    id="city"
                    required
                  />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <p className="required-check-mark-r">*</p>
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="District"
                    value={this.state.payload.district}
                    onChange={this.nameChangeHandler}
                    id="district"
                    required
                  />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <p className="required-check-mark-r">*</p>
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="state"
                    value={this.state.payload.state}
                    onChange={this.nameChangeHandler}
                    id="state"
                    required
                  />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <p className="required-check-mark-r">*</p>
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="Pincode Number"
                    value={this.state.payload.pincode}
                    onChange={this.nameChangeHandler}
                    id="pincode"
                    required
                  />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <p className="required-check-mark-r">*</p>
                  <input
                    type="tel"
                    className="form-control inputBox-r"
                    placeholder="Primary Mobile Number"
                    value={this.state.payload.mobileNumber}
                    onChange={this.nameChangeHandler}
                    id="mobileNumber"
                    pattern="[1-9]{1}[0-9]{9}"
                    title="Enter 10 digit mobile number"
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="tel"
                    className="form-control inputBox-r"
                    placeholder="Secondary Mobile Number"
                    value={this.state.payload.secondaryMobileNumber}
                    onChange={this.nameChangeHandler}
                    id="secondaryMobileNumber"
                    pattern="[1-9]{1}[0-9]{9}"
                    title="Enter 10 digit mobile number"
                  />
                </div>

                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <p className="required-check-mark-r">*</p>
                  <input
                    type="email"
                    className="form-control inputBox-r"
                    placeholder="Email-Id"
                    value={this.state.payload.emailId}
                    onChange={this.nameChangeHandler}
                    id="emailId"
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <p className="required-check-mark-r">*</p>
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="PAN Number"
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    title="Please Enter PAN in corrected format"
                    value={this.state.payload.panNumber}
                    onChange={this.nameChangeHandler}
                    id="panNumber"
                    required />
                </div>

                <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <p className="required-check-mark-r">*</p>
                  <select
                    className="custom-select year-month-border-r inputBox-r"
                    value={this.state.payload.qualification}
                    onChange={this.nameChangeHandler}
                    id="qualification"
                    required>
                    <option value="">Qualification</option>
                    <option value="postGraduate">Post Graduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="other">other</option>
                  </select>
                </div>

                {this.props.match.params.id ?
                  null :
                  <React.Fragment>
                    <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <p className="required-check-mark-r">*</p>
                      <input
                        type={this.state.password ? "password" : "text"}
                        className="form-control inputBox-r"
                        placeholder="Password"
                        value={this.state.payload.password}
                        onChange={this.nameChangeHandler}
                        id="password"
                        required
                      />
                      <button type="button" id="password0" onClick={this.showHidePassword} aria-hidden="true" className={this.state.password ? "fa fa-eye password-eye-open-r" : "fa fa-eye-slash password-eye-close-r"}></button>
                    </div>
                    <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <p className="required-check-mark-r">*</p>
                      <input
                        type={this.state.confirmPassword ? "password" : "text"}
                        className={this.state.passwordCheck ? "form-control inputBox-r alert-box-r" : "form-control inputBox-r"}
                        placeholder="Confirm Password"
                        value={this.state.payload.confirmPassword}
                        onChange={this.nameChangeHandler}
                        id="confirmPassword"
                        required
                      />
                      <button type="button" id="confirmPassword0" onClick={this.showHidePassword} aria-hidden="true" className={this.state.confirmPassword ? "fa fa-eye password-eye-open-r" : "fa fa-eye-slash password-eye-close-r"}></button>
                      {this.state.passwordCheck ? <p className="error-msg-r">Password and confirm password mismatch.</p> : null}
                    </div>
                  </React.Fragment>
                }
                <div className="text-align-center-r">
                  <button className="button-base-r width-40-r margin-bottom-b-60-r margin-top-b-25-r">{this.props.match.params.id ? "Update Accountant" : "Create Accountant"}</button>
                </div>
              </form>
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
