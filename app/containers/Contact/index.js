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

/* eslint-disable react/prefer-stateless-function */
export class Contact extends React.Component {

  state = {
    payload: {
      oldPassword: "",
      newPassword: ""
    },
    isResetActive: false
  }

  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload
    });
  };

  resetPassword = () => {
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Contact</title>
          <meta name="description" content="Description of Contact" />
        </Helmet>
        <div className="container outer-box-r">
          <p className="static-title-r">Contact Us</p>
          <div className="static-form-r">
            <div className="modal-body,input-group input-group-lg margin-top-25-r">
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
                    required />
                </div>
                <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">

                  <input type="text"
                    value={this.state.payload.newPassword}
                    onChange={this.nameChangeHandler}
                    id="subject"
                    className="form-control reset-input-box-r"
                    placeholder="Subject"
                    required />
                </div>
                <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <textarea defaultValue="Enter your message here..." className="form-control message-body-r" name="address" required
                    rows="8" />
                </div>
                <div className="text-align-center-r">
                  <button type="submit" className="button-base-r width-40-r margin-bottom-b-60-r width-30-r" name="">Send</button>
                </div>
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
