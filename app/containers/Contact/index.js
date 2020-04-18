/**
 *
 * Contact
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
import makeSelectContact from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Contact extends React.Component {

  state = {
    payload : {
      oldPassword :"",
      newPassword:""
    },
    isResetActive : false
  }

  nameChangeHandler = event => {
    let payload =  JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload
    });
  };

  resetPassword = () =>{
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Contact</title>
          <meta name="description" content="Description of Contact" />
        </Helmet>
        <nav className="navbar navbar-default nav-bar-r">
          <div className="container-fluid">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a style={{ marginLeft: "44px" }} onClick={() => { this.props.history.push('/') }} className="navbar-brand">Brand</a>
            </div>

            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a style={{ marginTop: "-10px", color: "#255b7a" }} onClick={() => { this.props.history.push('/user') }} className="navbar-brand">User</a></li>
                <li><a style={{ marginTop: "-10px", color: "#255b7a" }} onClick={() => { this.props.history.push('/trader') }} className="navbar-brand">Trader</a></li>
                <li><a style={{ marginTop: "-10px", color: "#255b7a" }} onClick={() => { this.props.history.push('/userDetails') }} className="navbar-brand">UserDetails</a></li>
                {/* <li><a style={{ marginTop: "-10px", color: "#255b7a" }} onClick={() => { this.props.history.push('/') }} className="navbar-brand">Logout</a></li> */}
                <li><a style={{ marginTop: "-10px", color: "#255b7a" }} onClick={() => { this.props.history.push('/') }} className="navbar-brand">Home</a></li>
                <li><a style={{ marginTop: "-10px", color: "#255b7a" }} onClick={() => { this.props.history.push('/aboutUs') }} className="navbar-brand">About Us</a></li>
                {/* <li><a style={{ marginTop: "-10px", color: "#255b7a" }} onClick={() => { this.props.history.push('/services') }} className="navbar-brand">Services</a></li> */}
                <li><a style={{ marginTop: "-10px", color: "#255b7a" }} onClick={() => { this.props.history.push('/contact') }} className="navbar-brand">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
<div className="container">
  <div className="contact-form-r">
<p className="contact-title-r">Contact Us</p>
<div className="modal-body,input-group input-group-lg">
                    <form onSubmit={this.resetPassword}>
        <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <input type="text" 
                             value={this.state.payload.name}
                             onChange={this.nameChangeHandler} 
                             id="name" 
                             className="form-control reset-input-box-r"
                             placeholder="Name" 
                             autoFocus 
                             required />
                             </div>
        <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">

                      <input type="email" 
                             value={this.state.payload.newPassword}
                             onChange={this.nameChangeHandler} 
                             id="email" 
                             className="form-control reset-input-box-r"
                             placeholder="Email-Id" 
                             autoFocus 
                             required />
                             </div>
          <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">

                        <input type="text" 
                              value={this.state.payload.newPassword}
                              onChange={this.nameChangeHandler} 
                              id="subject" 
                              className="form-control reset-input-box-r"
                              placeholder="Subject" 
                              autoFocus 
                              required />
                              </div>
          <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <textarea defaultValue="Enter your message here..." className="form-control message-body-r" name="address" required
                      rows="8" />
                              </div>
                              <span>
                        <input type="submit" className="btn btn-primary btn-lg btn-block reset-button-r" name=""
                          value="Send" />
                      </span>
                    </form>
                </div>
  </div>
</div>
      </div>
    );
  }
}

Contact.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  contact: makeSelectContact(),
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

const withReducer = injectReducer({ key: 'contact', reducer });
const withSaga = injectSaga({ key: 'contact', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Contact);
