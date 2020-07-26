/**
 *
 * AddOrEditUser
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
import makeSelectAddOrEditUser from './selectors';
import reducer from './reducer';
import saga from './saga';
import MessageModal from '../../components/MessageModal/Loadable'
import axios from 'axios';
import { errorHandler } from '../../utils/commonUtils';

/* eslint-disable react/prefer-stateless-function */
export class AddOrEditUser extends React.Component {
  state = {
    isLoading: false,
    available: false,
    isOpenClassName: 'modal display-none container',
    payload: {
      legalName: "",
      tradeName: "",
      constitutionType: "",
      panNumber: "",
      gstinNumber: "",
      mobileNumber: "",
      secondaryMobileNumber: "",
      emailId: "",
      secondaryEmailId: "",
      gstnUsername: "",
      gstnPassword: "",
      confirmPassword: "",
      principalPlaceOfBusiness: "",
      additionalPlaceOfBusiness: "", // two col
      registrationType: "",
      returnType: "",
      startYear: "",
      startMonth: "",
      username: "",
    },
    message: "",
    gstnPassword: true,
    usernameCheck: false
  }

  getUserById = (id) => {
    let url = window.API_URL + `/userDetails/${id}`;
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
          isLoading: false
        }, () => setTimeout(this.modalTime, 1500))
      });
  };

  postUser = (payload, check) => {
    let accountantId = localStorage.getItem('userId')
    if (this.props.match.params.id) {
      let url = window.API_URL + `/updateUserDetails/${this.props.match.params.id}`;
      axios.put(url, payload)
        .then((res) => {
          const data = res.data.data;
          this.setState({
            message: res.data.message,
            isLoading: false,
            type: "success",
          }, () => this.props.history.push('/manageUser'));
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
    }
    else {
      let url = check ? window.API_URL + `/newUser/isAvailable/usernameAndGstin` : window.API_URL + `/newUser/${accountantId}`;
      axios.post(url, payload)
        .then((res) => {
          const data = res.data.data;
          this.setState({
            message: res.data.message,
            isLoading: false,
            isOpenClassName: localStorage.getItem('role') === "admin" && !check ? 'modal display-block container' : 'modal display-none container',
            type: "success",
            available: data.available,
          }, () => check ? null : localStorage.getItem('role') === "admin" ?<React.Fragment>{ () => setTimeout(this.modalTime, 1500), this.props.history.push('/admin') }</React.Fragment> :this.props.history.push('/manageUser'));
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
    }
  };


  componentWillMount() {
    if (this.props.match.params.id) {
      this.setState({
        isLoading: true
      }, () => this.getUserById(this.props.match.params.id))
    }
  }


  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload, message: ""
    });
  };

  SubmitUserHandler = () => {
    event.preventDefault()

    let payload = JSON.parse(JSON.stringify(this.state.payload));
    Object.keys(payload).map(val => {
      if (val === "legalName" || val === "tradeName" || val === "panNumber" || val === "emailId" || val === "secondaryEmailId" || val === "principalPlaceOfBusiness" || val === "additionalPlaceOfBusiness" || val === "secondaryEmailId" || val === "username" || val === "gstinNumber") {
        payload[val] = payload[val].toUpperCase();
      }
      return val
    })

    payload.createdByAdmin = localStorage.getItem('role') === "admin"

    this.setState({
      isLoading: true
    },
      () => this.postUser(payload)
    )

  }


  checkAvailabelHandler = () => {
    event.preventDefault()
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    Object.keys(payload).map(val => {
      payload[val] = payload[val].toUpperCase();
      return val
    })
    this.setState({
      isLoading: true,
      payload
    },
      () => this.postUser(payload, "check")
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
    if (id === "gstnPassword0") {
      gstnPassword = !gstnPassword
    }
    this.setState({
      gstnPassword
    })
  }

  modalCloseHandler = () => {
    this.setState({
      isOpenClassName: 'modal display-none container',
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>AddOrEditUser</title>
          <meta
            name="description"
            content="Description of NewRegistrationUser"
          />
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
            <div className="container">
              <p className="main-title-r">{this.props.match.params.id ? "Update User" : "Create User"}</p>
            <div>
              <ul className="breadCrumb-bg-r">
                <li onClick={() => localStorage.getItem('role') === "admin" ? this.props.history.push('/admin') : this.props.history.push('/manageUser')} className="breadCrumb-li-child-1-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
                <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >{this.props.match.params.id ? "Update User" : "Create User"}</span></li>
              </ul>
            </div>
              <ul id="progressbar">
                <li><span className="list1-r" > Check for Username & GSTIN </span></li>
                <li><span className="list2-r"> User Registration</span></li>
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
                        placeholder="Username*"
                        value={this.state.payload.username}
                        onChange={this.nameChangeHandler}
                        id="username"
                        required
                        autoFocus />
                      <label className="floating-label">Username <p className="required-check-mark-r">*</p></label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <input
                        disabled={this.props.match.params.id || this.state.available}
                        type="text"
                        className="form-control inputBox-r field"
                        placeholder="GSTIN*"
                        value={this.state.payload.gstinNumber}
                        onChange={this.nameChangeHandler}
                        pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
                        title="Please Enter GSTIN in corrected format"
                        id="gstinNumber"
                        required />
                      <label className="floating-label">GSTIN<p className="required-check-mark-r">*</p></label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <input
                        type="text"
                        className="form-control inputBox-r field"
                        placeholder="Legal Name*"
                        value={this.state.payload.legalName}
                        onChange={this.nameChangeHandler}
                        id="legalName"
                        required
                      />
                      <label className="floating-label">Legal Name <p className="required-check-mark-r">*</p></label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <input
                        type="text"
                        className="form-control inputBox-r field"
                        placeholder="Trade Name*"
                        value={this.state.payload.tradeName}
                        onChange={this.nameChangeHandler}
                        id="tradeName"
                        required />
                      <label className="floating-label">Trade Name <p className="required-check-mark-r">*</p></label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <input
                        type="text"
                        className="form-control inputBox-r field"
                        placeholder="PAN Number*"
                        value={this.state.payload.panNumber}
                        onChange={this.nameChangeHandler}
                        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                        title="Please Enter PAN in corrected format"
                        id="panNumber"
                        required />
                      <label className="floating-label">PAN Number <p className="required-check-mark-r">*</p></label>
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
                      <input
                        type="email"
                        className="form-control inputBox-r field"
                        placeholder="Primary Email-Id*"
                        value={this.state.payload.emailId}
                        onChange={this.nameChangeHandler}
                        id="emailId"
                        required />
                      <label className="floating-label">Primary Email-Id<p className="required-check-mark-r">*</p></label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <input
                        type="email"
                        className="form-control inputBox-r field"
                        placeholder="Secondary Email-Id"
                        value={this.state.payload.secondaryEmailId}
                        onChange={this.nameChangeHandler}
                        id="secondaryEmailId"
                      />
                      <label className="floating-label">Secondary Email-Id</label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <input
                        type="text"
                        className="form-control inputBox-r field"
                        placeholder="GSTN Username*"
                        value={this.state.payload.gstnUsername}
                        onChange={this.nameChangeHandler}
                        id="gstnUsername"
                        required />
                      <label className="floating-label">GSTN Username<p className="required-check-mark-r">*</p></label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <div>
                        <input
                          type={this.state.gstnPassword ? "password" : "text"}
                          className="form-control inputBox-r field"
                          placeholder="GSTN Password*"
                          value={this.state.payload.gstnPassword}
                          onChange={this.nameChangeHandler}
                          id="gstnPassword"
                          required />
                        <label className="floating-label">GSTN Password<p className="required-check-mark-r">*</p></label>
                        <button type="button" id="gstnPassword0" onClick={this.showHidePassword} aria-hidden="true" className={this.state.gstnPassword ? "fa fa-eye password-eye-open-r" : "fa fa-eye-slash password-eye-close-r"}></button>
                      </div>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <input
                        type="text"
                        className="form-control inputBox-r field"
                        placeholder="Principle Place Of Business*"
                        value={this.state.payload.principalPlaceOfBusiness}
                        onChange={this.nameChangeHandler}
                        id="principalPlaceOfBusiness"
                        required />
                      <label className="floating-label">Principle Place Of Business<p className="required-check-mark-r">*</p></label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <input
                        type="text"
                        className="form-control inputBox-r field"
                        placeholder="Additional Place Of Business"
                        value={this.state.payload.additionalPlaceOfBusiness}
                        onChange={this.nameChangeHandler}
                        id="additionalPlaceOfBusiness"
                      />
                      <label className="floating-label">Additional Place Of Business</label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <select
                        disabled={this.props.match.params.id}
                        id="startYear"
                        onChange={this.nameChangeHandler}
                        value={this.state.payload.startYear}
                        className={this.props.match.params.id ? "year-month-border-r inputBox-r field not-allowed" : "year-month-border-r inputBox-r field"}
                        required>
                        <option value="">Select Year*</option>
                        <option value="2020">2020-2021</option>
                        <option value="2019">2019-2020</option>
                        <option value="2018">2018-2019</option>
                        <option value="2017">2017-2018</option>
                      </select>
                      <label className="floating-label">Start Year<p className="required-check-mark-r">*</p></label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <select
                        disabled={this.props.match.params.id}
                        id="startMonth"
                        onChange={this.nameChangeHandler}
                        value={this.state.payload.startMonth}
                        className={this.props.match.params.id ? "year-month-border-r inputBox-r field not-allowed" : "year-month-border-r inputBox-r field"}
                        required>
                        <option value="">Select Month*</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="4">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                      </select>
                      <label className="floating-label">Start Month<p className="required-check-mark-r">*</p></label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <select
                        className="custom-select year-month-border-r inputBox-r field"
                        value={this.state.payload.constitutionType}
                        onChange={this.nameChangeHandler}
                        id="constitutionType"
                        required>
                        <option value="">Constitution Type*</option>
                        <option value="proprietorship">Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="huf">HUF</option>
                        <option value="aopBoi">AOP/BOI</option>
                        <option value="company">Company</option>
                        <option value="other">Other</option>
                      </select>
                      <label className="floating-label">Constitution Type<p className="required-check-mark-r">*</p></label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <select
                        className="custom-select year-month-border-r inputBox-r field"
                        value={this.state.payload.registrationType}
                        onChange={this.nameChangeHandler}
                        id="registrationType"
                        required>
                        <option value="">Registration Type*</option>
                        <option value="regular">Regular</option>
                        <option value="composition">Composition</option>
                        <option value="nrtp">NRTP</option>
                        <option value="ctp">CTP</option>
                        <option value="ecomOperators">ECOM Operators</option>
                      </select>
                      <label className="floating-label">Registration Type<p className="required-check-mark-r">*</p></label>
                    </div>

                    <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <select
                        className="custom-select year-month-border-r inputBox-r field"
                        value={this.state.payload.returnType}
                        onChange={this.nameChangeHandler}
                        id="returnType"
                        required>
                        <option value="">Return Type*</option>
                        <option value="monthly">Monthly</option>
                        <option value="quaterly">Quaterly</option>
                      </select>
                      <label className="floating-label">Return Type<p className="required-check-mark-r">*</p></label>
                    </div>
                    <div className="text-align-center-r">
                      <button className="button-base-r width-40-r margin-bottom-b-60-r margin-top-b-25-r">{this.props.match.params.id ? "Update User" : "Create User"}</button>
                    </div>
                </form> :
                  <form onSubmit={this.checkAvailabelHandler}>
                    <div className="check-container-r">
                      <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <input
                          type="text"
                          className={!this.state.available && this.state.message.includes('Username') ? "form-control inputBox-r field alert-box-r" : "form-control inputBox-r field"}
                          placeholder="Username*"
                          value={this.state.payload.username}
                          onChange={this.nameChangeHandler}
                          id="username"
                          autoFocus
                          required />
                        {!this.state.available && this.state.message.includes('Username') ? <p className="error-msg-r">{this.state.message}</p> : null}
                        <label className="floating-label">Username <p className="required-check-mark-r">*</p></label>
                      </div>

                      <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <input
                          type="text"
                          className={!this.state.available && this.state.message.includes('Gstin') ? "form-control inputBox-r field alert-box-r" : "form-control inputBox-r field"}
                          placeholder="GSTIN*"
                          value={this.state.payload.gstinNumber}
                          onChange={this.nameChangeHandler}
                          pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
                          title="Please Enter GSTIN in corrected format"
                          id="gstinNumber"
                          required />
                        {!this.state.available && this.state.message.includes('Gstin') ? <p className="error-msg-r">{this.state.message}</p> : null}
                        <label className="floating-label">GSTIN<p className="required-check-mark-r">*</p></label>
                      </div>
                    </div>
                    <div className="text-align-center-r">
                      <button className="button-base-r width-40-r margin-bottom-b-60-r margin-top-b-25-r">Check</button>
                    </div>
                  </form>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

AddOrEditUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addOrEditUser: makeSelectAddOrEditUser(),
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

const withReducer = injectReducer({ key: 'addOrEditUser', reducer });
const withSaga = injectSaga({ key: 'addOrEditUser', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddOrEditUser);
