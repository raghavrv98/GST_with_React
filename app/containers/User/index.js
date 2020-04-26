/**
 *
 * User
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
import makeSelectUser from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ConfirmModal from '../../components/ConfirmModal/Loadable'
/* eslint-disable react/prefer-stateless-function */
export class User extends React.Component {

  state = {
    tabActive: true,
    isActiveTab: "purchaseBills",
    isConfirmModal: false,
    isResetModal: false,
    payload: {
      oldPassword: "",
      newPassword: ""
    }
  }

  loadFile = () => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
  };

  tabActive = (event) => {
    let id = event.target.id

    this.setState({
      isActiveTab: id
    })
  }

  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload
    });
  };

  confirmModalHandler = () => {
    this.setState({
      isConfirmModal: true
    })
  }

  modalCloseHandler = () => {
    this.setState({
      isConfirmModal: false,
      isResetModal: false
    })
  }

  confirmDeleteData = (id) => {
    event.preventDefault()
    this.setState({
      isConfirmModal: false
    })
  }

  resetPasswordHandler = () => {
    this.setState({
      isResetModal: true
    })
  }

  resetPassword = (id) => {
    event.preventDefault()
    this.setState({
      isResetModal: false
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>User</title>
          <meta name="description" content="Description of User" />
        </Helmet>

        {/* <!--view Reports for user modal start--> */}

        <div className="container">
          <div className="modal fade" id="openmodal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog modal-dialog-centered modal-width-r" role="document">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#f06d46" }}>
                  <span style={{ color: "white" }}>Download Reports</span>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i
                    className="fa fa-times" aria-hidden="true"></i></button>
                </div>

                <div className="container">
                  <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-3 col-xl-3 card-margin-r">
                    <div className="card card-price-r">
                      <h4 className="card-heading-r"> Summary Report</h4>
                      <h5 className="card-sub-heading-r"> Created at: 21-03-2020</h5>
                    </div>
                    <a data-toggle="modal" data-dismiss="modal" data-target="#warningmsg">
                      <i className="fa fa-times-circle icon-customization-download-r" aria-hidden="true"></i>
                    </a>
                    <img className="card-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                    <textarea disabled defaultValue="comments if any .." className="form-control" name="address" required
                      rows="4" />
                    <div className="browse-upload-margin-r">
                      <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <input type="submit" className="btn btn-primary btn-text-r full-width-r" name="" value="Download" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-3 col-xl-3 card-margin-r">
                    <div className="card card-price-r">
                      <h4 className="card-heading-r"> GST Report</h4>
                      <h5 className="card-sub-heading-r"> Created at: 21-03-2020</h5>
                    </div>
                    <a data-toggle="modal" data-dismiss="modal" data-target="#warningmsg">
                      <i className="fa fa-times-circle icon-customization-download-r" aria-hidden="true"></i>
                    </a>
                    <img className="card-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                    <textarea disabled defaultValue="comments if any .." className="form-control" name="address" required
                      rows="4" />
                    <div className="browse-upload-margin-r">
                      <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <input type="submit" className="btn btn-primary btn-text-r full-width-r" name="" value="Download" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!--view Reports for user download modal end--> */}

        {this.state.isConfirmModal ? <ConfirmModal
          onClose={this.modalCloseHandler}
          onConfirm={() => this.confirmDeleteData("1")}
        /> : null}

        <div className="container outer-box-r">
          <div className="container filter-year-month-r">
            <div className="row">
              <div className="col-xs-6 col-6 col-sm-6 col-md-5 col-lg-5 col-xl-5">
                <select className="custom-select year-month-border-r" name="lectureId">
                  <option defaultValue="">Select Year</option>
                  <option defaultValue="2017">2017-2018</option>
                  <option defaultValue="2018">2018-2019</option>
                  <option defaultValue="2019">2019-2020</option>
                  <option defaultValue="2020">2020-2021</option>
                </select>
              </div>
              <div className="col-xs-6 col-6 col-sm-6 col-md-5 col-lg-5 col-xl-5">
                <select className="custom-select year-month-border-r" name="lectureId">
                  <option defaultValue="">Select Month</option>
                  <option defaultValue="january">January</option>
                  <option defaultValue="february">February</option>
                  <option defaultValue="march">March</option>
                  <option defaultValue="april">April</option>
                  <option defaultValue="may">May</option>
                  <option defaultValue="june">June</option>
                  <option defaultValue="july">July</option>
                  <option defaultValue="august">August</option>
                  <option defaultValue="september">September</option>
                  <option defaultValue="october">October</option>
                  <option defaultValue="november">November</option>
                  <option defaultValue="december">December</option>
                </select>
              </div>
              <div className="col-xs-12 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="text-align-center-r"><p data-toggle="modal" className="view-reports-r" data-target="#openmodal">view Reports</p></div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div className="card-body-margin-r">
                <p id="purchaseBills" onClick={this.tabActive} className={this.state.isActiveTab == "purchaseBills" ? "btn btn-primary btn-lg btn-block tab-active-r" : "btn btn-primary btn-lg btn-block tab-inactive-r"}>
                  Purchase Bills<br />(0 entries)</p>
              </div>
            </div>

            <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div className="card-body-margin-r">
                <p id="saleBills" onClick={this.tabActive} className={this.state.isActiveTab == "saleBills" ? "btn btn-primary btn-lg btn-block tab-active-r" : "btn btn-primary btn-lg btn-block tab-inactive-r"}>
                  Sale Bills<br />(0 entries)</p>
              </div>
            </div>

            <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div className="card-body-margin-r">
                <p id="other" onClick={this.tabActive} className={this.state.isActiveTab == "other" ? "btn btn-primary btn-lg btn-block tab-active-r" : "btn btn-primary btn-lg btn-block tab-inactive-r"}>
                  Other<br />(0 entries)</p>
              </div>
            </div>
          </div>

          <div className="container card-button-r">

            <form action="/user">
              <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2">
                <div className="upload-box-border-r">
                  <img className="browse-image-r" id="output" />
                </div>

                <input className="display-none-r" accept="image/*" onChange={this.loadFile} id="file-input"
                  type="file" required />

                <div className="browse-upload-margin-r">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div><button type="button" className="btn btn-primary btn-text-r full-width-r">
                      <label className="cursor-pointer-r margin-0-r" htmlFor="file-input">Browse</label>
                    </button></div>
                  </div>
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input type="submit" className="btn btn-primary btn-text-r full-width-r" name="" value="Upload" />
                  </div>
                </div>
              </div>
            </form>
            <div className="col-xs-12 col-12 col-sm-8 col-md-9 col-lg-10 col-xl-10">
              {
                this.state.isActiveTab == "purchaseBills" ?
                  <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                    <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                    <span onClick={this.confirmModalHandler} className="delete-icon-r">
                      <i className="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div> :
                  this.state.isActiveTab == "saleBills" ?
                    <React.Fragment>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                        <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                        <span className="delete-icon-r">
                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                        <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                        <span className="delete-icon-r">
                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                        <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                        <span className="delete-icon-r">
                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                        <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                        <span className="delete-icon-r">
                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                        <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                        <span className="delete-icon-r">
                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                    </React.Fragment>
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
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

const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(User);
