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

/* eslint-disable react/prefer-stateless-function */
export class AddOrEditUser extends React.Component {
  state = {
    isLoading: false,
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
      password: "",
      confirmPassword: "",
      principalPlaceOfBusiness: "",
      additionalPlaceOfBusiness: "", // two col
      registrationType: "",
      returnType: "",
      year: "",
      month: ""
    },
    passwordCheck: false
  }

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
    this.setState({ errorMes, isOpenClassName: 'modal display-block container', type: "failure", isLoading: false }, () => setTimeout(this.modalTime, 1500)
    );
  }

  getUserById = (id) => {
    axios.get(`http://localhost:3000/userDetails/${id}`)
      .then((res) => {
        const payload = res.data.data;
        this.setState({ payload, isLoading: false });
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  };

  postUser = (payload) => {
    let accountantId = localStorage.getItem('userId')
    if (this.props.match.params.id) {
      axios.put(`http://localhost:3000/updateUserDetails/${this.props.match.params.id}`, payload)
        .then((res) => {
          const message = res.data.message;
          this.setState({
            message,
            isLoading: false,
            type: "success",
          }, () => this.props.history.push('/manageUser'));
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
    else {
      axios.post(`http://localhost:3000/newUser/${accountantId}`, payload)
        .then((res) => {
          const message = res.data.message;
          this.setState({
            message,
            isLoading: false,
            type: "success",
          }, () => this.props.history.push('/manageUser'));
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
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
      payload, passwordCheck: false
    });
  };

  SubmitUserHandler = () => {
    event.preventDefault()

    let payload = JSON.parse(JSON.stringify(this.state.payload));
    if (payload.password === payload.confirmPassword) {
      this.setState({
        isLoading: true
      }, () => this.postUser(payload))
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

  render() {
    console.log('payload: ', this.state.payload);
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
            <div>
              <ul className="breadCrumb-bg-r">
                <li onClick={() => this.props.history.push('/manageUser')} className="breadCrumb-li-child-1-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
                <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >{this.props.match.params.id ? "Update User" : "Create User"}</span></li>
              </ul>
            </div>
            <div className="container">
              <p className="main-title-r">{this.props.match.params.id ? "Update User" : "Create User"}</p>
              <form onSubmit={this.SubmitUserHandler}>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="Legal Name"
                    value={this.state.payload.legalName}
                    onChange={this.nameChangeHandler}
                    id="legalName"
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="Trade Name"
                    value={this.state.payload.tradeName}
                    onChange={this.nameChangeHandler}
                    id="tradeName"
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="PAN Number"
                    value={this.state.payload.panNumber}
                    onChange={this.nameChangeHandler}
                    id="panNumber"
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="GSTIN"
                    value={this.state.payload.gstinNumber}
                    onChange={this.nameChangeHandler}
                    id="gstinNumber"
                    required />
                </div>

                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
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
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="email"
                    className="form-control inputBox-r"
                    placeholder="Primary Email-Id"
                    value={this.state.payload.emailId}
                    onChange={this.nameChangeHandler}
                    id="emailId"
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="email"
                    className="form-control inputBox-r"
                    placeholder="Secondary Email-Id"
                    value={this.state.payload.secondaryEmailId}
                    onChange={this.nameChangeHandler}
                    id="secondaryEmailId"
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="GSTN Username"
                    value={this.state.payload.gstnUsername}
                    onChange={this.nameChangeHandler}
                    id="gstnUsername"
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="password"
                    className="form-control inputBox-r"
                    placeholder="GSTN Password"
                    value={this.state.payload.gstnPassword}
                    onChange={this.nameChangeHandler}
                    id="gstnPassword"
                    required />
                </div>
                {this.props.match.params.id ? null :
                  <React.Fragment>
                    <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <input
                        type="password"
                        className="form-control inputBox-r"
                        placeholder="Password"
                        value={this.state.payload.password}
                        onChange={this.nameChangeHandler}
                        id="password"
                        required />
                    </div>
                    <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <input
                        type="password"
                        className={this.state.passwordCheck ? "form-control inputBox-r alert-box-r" : "form-control inputBox-r"}
                        placeholder="Confirm Password"
                        value={this.state.payload.confirmPassword}
                        onChange={this.nameChangeHandler}
                        id="confirmPassword"
                        required />
                      {this.state.passwordCheck ? <p className="error-msg-r">Password and confirm password mismatch.</p> : null}
                    </div>
                  </React.Fragment>
                }
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="Principle Place Of Business"
                    value={this.state.payload.principalPlaceOfBusiness}
                    onChange={this.nameChangeHandler}
                    id="principalPlaceOfBusiness"
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="Additional Place Of Business"
                    value={this.state.payload.additionalPlaceOfBusiness}
                    onChange={this.nameChangeHandler}
                    id="additionalPlaceOfBusiness"
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="Year for which the work is started"
                    value={this.state.payload.year}
                    onChange={this.nameChangeHandler}
                    id="year"
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="Month for which the work is started"
                    value={this.state.payload.month}
                    onChange={this.nameChangeHandler}
                    id="month"
                    required />
                </div>
                <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <select
                    className="custom-select year-month-border-r inputBox-r"
                    value={this.state.payload.constitutionType}
                    onChange={this.nameChangeHandler}
                    id="constitutionType"
                    required>
                    <option value="">Constitution Type</option>
                    <option value="proprietorship">Proprietorship</option>
                    <option value="partnership">Partnership</option>
                    <option value="huf">HUF</option>
                    <option value="aopBoi">AOP/BOI</option>
                    <option value="company">Company</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <select
                    className="custom-select year-month-border-r inputBox-r"
                    value={this.state.payload.registrationType}
                    onChange={this.nameChangeHandler}
                    id="registrationType"
                    required>
                    <option value="">Registration Type</option>
                    <option value="normal">Normal</option>
                    <option value="composition">Composition</option>
                    <option value="nrtp">NRTP</option>
                    <option value="ctp">CTP</option>
                    <option value="ecomOperators">ECOM Operators</option>
                  </select>
                </div>
                <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <select
                    className="custom-select year-month-border-r inputBox-r"
                    value={this.state.payload.returnType}
                    onChange={this.nameChangeHandler}
                    id="returnType"
                    required>
                    <option value="">Return Type</option>
                    <option value="monthly">Monthly</option>
                    <option value="quaterly">Quaterly</option>
                  </select>
                </div>
                <div className="text-align-center-r">
                  <button className="button-base-r width-40-r margin-bottom-b-60-r margin-top-b-25-r">{this.props.match.params.id ? "Update User" : "Create User"}</button>
                </div>
              </form>
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
