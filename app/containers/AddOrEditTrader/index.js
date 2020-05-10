/**
 *
 * AddOrEditTrader
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
import makeSelectAddOrEditTrader from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class AddOrEditTrader extends React.Component {
  state={
    payload :{
      traderId:"",
      name:"",
      mobile:"",
      email:"",
      pan:"",
      address:"",
      password:""
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
          <title>AddOrEditTrader</title>
          <meta name="description" content="Description of AddOrEditTrader" />
        </Helmet>
        <div className="container outer-box-r">
          <div className="container">
    <p className="main-title-r">{this.props.match.params.id ? "Update Trader" : "Create Trader"}</p>
            <form onSubmit={this.SubmitUserHandler}>
              
            <div className="row">
            <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input 
                    type="text"
                    className="form-control inputBox-r"
                    placeholder="Trader Id"
                    value={this.state.payload.traderId}
                    onChange={this.nameChangeHandler}
                    id="traderId"                    
                    required 
                    />
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input 
                    type="password"
                    className="form-control inputBox-r"
                    placeholder="Password"
                    value={this.state.payload.password}
                    onChange={this.nameChangeHandler}
                    id="password"                    
                    required 
                    />
                </div>
                </div>
              
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
                <button className="button-base-r width-40-r margin-top-b-25-r">{this.props.match.params.id ? "Update Trader" : "Create Trader"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddOrEditTrader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addOrEditTrader: makeSelectAddOrEditTrader(),
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

const withReducer = injectReducer({ key: 'addOrEditTrader', reducer });
const withSaga = injectSaga({ key: 'addOrEditTrader', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddOrEditTrader);
