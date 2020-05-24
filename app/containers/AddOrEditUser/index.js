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
      name: "",
      mobileNumber: "",
      emailId: "",
      panNumber: "",
      gstNumber: "",
      tradeName: "",
      legalName: "",
      principalPlaceOfBusiness: "",
      additionalPlaceOfBusiness: "",
      constitutionType: "",
      registrationType: "",
      returnType: "",
      address: "",
    }
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
      payload,
    });
  };

  SubmitUserHandler = () => {
    event.preventDefault()
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    this.setState({
      isLoading: true
    }, () => this.postUser(payload))
  }

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container'
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
            <div>
              <ul className="breadCrumb-bg-r">
                <li onClick={() => this.props.history.push('/manageUser')} className="breadCrumb-li-child-1-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
                <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >{this.props.match.params.id ? "Update User" : "Create User"}</span></li>
              </ul>
            </div>
            <div className="container">
              <p className="main-title-r">{this.props.match.params.id ? "Update User" : "Create User"}</p>
              <form onSubmit={this.SubmitUserHandler}>
                <div className="row">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input
                      type="text"
                      className="form-control inputBox-r"
                      placeholder="Name"
                      value={this.state.payload.name}
                      onChange={this.nameChangeHandler}
                      id="name"
                      required
                    />
                  </div>

                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input
                      type="tel"
                      className="form-control inputBox-r"
                      placeholder="Mobile Number"
                      value={this.state.payload.mobileNumber}
                      onChange={this.nameChangeHandler}
                      id="mobileNumber"
                      pattern="[1-9]{1}[0-9]{9}"
                      title="Enter 10 digit mobile number"
                      required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input
                      type="email"
                      className="form-control inputBox-r"
                      placeholder="Email-Id"
                      value={this.state.payload.emailId}
                      onChange={this.nameChangeHandler}
                      id="emailId"
                      required />
                  </div>
                  {this.props.match.params.id ? null : <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input
                      type="password"
                      className="form-control inputBox-r"
                      placeholder="Password"
                      value={this.state.payload.password}
                      onChange={this.nameChangeHandler}
                      id="password"
                      required />
                  </div>}
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input
                      type="text"
                      className="form-control inputBox-r"
                      placeholder="Address"
                      value={this.state.payload.address}
                      onChange={this.nameChangeHandler}
                      id="address"
                      required />
                  </div>
                </div>
                <div className="row">
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
                </div>
                <div className="row">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input
                      type="text"
                      className="form-control inputBox-r"
                      placeholder="GST Number"
                      value={this.state.payload.gstNumber}
                      onChange={this.nameChangeHandler}
                      id="gstNumber"
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
                </div>
                <div className="row">
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
                </div>
                <div className="row">
                  <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <select
                      className="custom-select year-month-border-r inputBox-r"
                      value={this.state.payload.constitutionType}
                      onChange={this.nameChangeHandler}
                      id="constitutionType"
                      required>
                      <option value="">Constitution Type</option>
                      <option value="2017">2017-2018</option>
                      <option value="2018">2018-2019</option>
                      <option value="2019">2019-2020</option>
                      <option value="2020">2020-2021</option>
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
                      <option value="2017">2017-2018</option>
                      <option value="2018">2018-2019</option>
                      <option value="2019">2019-2020</option>
                      <option value="2020">2020-2021</option>
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
                      <option value="2017">2017-2018</option>
                      <option value="2018">2018-2019</option>
                      <option value="2019">2019-2020</option>
                      <option value="2020">2020-2021</option>
                    </select>
                  </div>
                </div>
                <div className="text-align-center-r">
                  <button className="button-base-r width-40-r margin-top-b-25-r">{this.props.match.params.id ? "Update User" : "Create User"}</button>
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
