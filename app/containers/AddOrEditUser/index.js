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

/* eslint-disable react/prefer-stateless-function */
export class AddOrEditUser extends React.Component {
  state={
    payload :{
      name:"",
      mobile:"",
      email:"",
      pan:"",
      gst:"",
      trade:"",
      principlePlace:"",
      additionalPlace:"",
      constitutionType:"",
      returnType:"",
      address:"",
      registrationType:""
    }
  }


  componentWillMount(){
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    if(this.props.match.params.id ){
    sessionStorage.setItem("id",this.props.match.params.id)
    Object.entries(this.state.payload).map(key =>{
      payload[key[0]] = localStorage.getItem(key[0])
      return key
  }
      )}
    this.setState({
      payload
    })
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
    Object.entries(this.state.payload).map(key =>
      localStorage.setItem(key[0],key[1])
    )
    this.props.history.push('/trader')
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
        <div className="container outer-box-r">
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
                    value={this.state.payload.mobile}
                    onChange={this.nameChangeHandler} 
                    id="mobile" 
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
                    value={this.state.payload.email}
                    onChange={this.nameChangeHandler}
                    id="email"                     
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input 
                    type="text" 
                    className="form-control inputBox-r"
                    placeholder="PAN Number" 
                    value={this.state.payload.pan}
                    onChange={this.nameChangeHandler}
                    id="pan" 
                    required />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input 
                    type="text" 
                    className="form-control inputBox-r"
                    placeholder="GST Number"
                    value={this.state.payload.gst}
                    onChange={this.nameChangeHandler}
                    id="gst" 
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input 
                    type="text" 
                    className="form-control inputBox-r"
                    placeholder="Trade Name" 
                    value={this.state.payload.trade}
                    onChange={this.nameChangeHandler}
                    id="trade" 
                    required />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input 
                    type="text" 
                    className="form-control inputBox-r"
                    placeholder="Principle Place Of Business"
                    value={this.state.payload.principlePlace}
                    onChange={this.nameChangeHandler} 
                    id="principlePlace" 
                    required />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input 
                    type="text" 
                    className="form-control inputBox-r"
                    placeholder="Additional Place Of Business" 
                    value={this.state.payload.additionalPlace}
                    onChange={this.nameChangeHandler}
                    id="additionalPlace" 
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
                <textarea 
                  className="form-control inputBox-r"
                  placeholder="Address" 
                  value={this.state.payload.address}
                  onChange={this.nameChangeHandler}
                  id="address" 
                  rows="5"
                  required>
                </textarea>
              <div className="text-align-center-r">
                <button className="button-base-r width-40-r margin-top-b-25-r">{this.props.match.params.id ? "Update User" : "Create User"}</button>
              </div>
            </form>
          </div>
        </div>
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
