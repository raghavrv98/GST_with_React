/**
 *
 * UserBillDetails
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
import makeSelectUserBillDetails from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ConfirmModal from '../../components/ConfirmModal/Loadable'
import MessageModal from '../../components/MessageModal/Loadable'
import axios from 'axios';
import moment from 'moment';

/* eslint-disable react/prefer-stateless-function */
export class UserBillDetails extends React.Component {

  state = {
    showHideClassName: 'modal display-none container',
    statusBoxArray: [],
    fullViewModalClassName: 'modal display-none container',
    isOpenClassName: 'modal display-none container',
    isLoading: true,
    getbill: []
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


  getbill = (id, month, year, bill) => {
    if (bill === "purchaseBills") {
      axios.get(`http://localhost:3000/purchaseBills/${id}/${month}/${year}`)
        .then((res) => {
          const getbill = res.data.data;
          this.setState({ getbill, isLoading: false });
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
    else if (bill === "saleBills") {
      axios.get(`http://localhost:3000/saleBills/${id}/${month}/${year}`)
        .then((res) => {
          const getbill = res.data.data;
          this.setState({ getbill, isLoading: false });
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
    else {
      axios.get(`http://localhost:3000/otherBills/${id}/${month}/${year}`)
        .then((res) => {
          const getbill = res.data.data;
          this.setState({ getbill, isLoading: false });
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
  };

  statusUpdate = (id, status) => {

    axios.put(`http://localhost:3000/changeBillStatus/${this.props.match.params.id}/${id}/${this.props.match.params.bill}`, { 'status': status })
      .then((res) => {
        const message = res.data.message;
        this.setState({
          message,
          isLoading: true,
          showHideClassName: 'modal display-none container',
        }, () => this.getbill('5ec90c578dd81634c4067ed8', this.props.match.params.month, this.props.match.params.year, this.props.match.params.bill));
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  };

  componentWillMount() {
    this.getbill('5ec90c578dd81634c4067ed8', this.props.match.params.month, this.props.match.params.year, this.props.match.params.bill)
  }

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container'
    })
  }

  modalCloseHandler = () => {
    this.setState({
      isResetModal: false,
      showHideClassName: 'modal display-none container',
      fullViewModalClassName: 'modal display-none container',
      deleteId: "",
      deleteName: "",
      isOpenClassName: 'modal display-none container',

    })
  }

  statusBoxHandler = (event) => {
    let id = event.target.id
    let status = event.target.checked
    this.setState({
      statusBoxIndex: id,
      status,
      showHideClassName: 'modal display-block container',
    })
  }

  fullviewModal = (img) => {
    this.setState({
      imgName: img,
      fullViewModalClassName: 'modal display-block container',
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>UserBillDetails</title>
          <meta name="description" content="Description of UserBillDetails" />
        </Helmet>

        <MessageModal
          showHideClassName={this.state.isOpenClassName}
          modalType={this.state.type}
          message={this.state.message}
          onClose={this.modalCloseHandler}
        />
        {this.state.imgName ?
          <div className={this.state.fullViewModalClassName} >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header background-color-r">
                  <span className="text-color-white-r">Bill Full View</span>
                  <button
                    type="button"
                    className="close"
                    onClick={this.modalCloseHandler}
                    aria-label="Close"
                  >
                    <i className="fa fa-times" aria-hidden="true" />
                  </button>
                </div>

                <div className="modal-body,input-group input-group-lg">
                  <div className="full-view-form-padding-r">
                    <img className="card-full-view-parent-img-r" src={"http://localhost:3000/bills/" + this.state.imgName} />
                  </div>
                </div>
              </div>
            </div>
          </div> : null
        }
        {this.state.isLoading ?
          <div className="lds-facebook"><div></div><div></div><div></div><span className="loading-text-r">Loading... </span></div>
          :
          <div className="container outer-box-r">
            <div>
              <ul className="breadCrumb-bg-r">
                <li onClick={() => this.props.history.push('/manageUser')} className="breadCrumb-li-child-1-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
                <li onClick={() => this.props.history.push(`/userDetails/${this.props.match.params.id}/${this.props.match.params.month}/${this.props.match.params.year}`)} className="breadCrumb-li-child-2-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >User Details</span></li>
                <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >{this.props.match.params.bill === "purchaseBills" ? "Purchase Bills" : this.props.match.params.bill === "saleBills" ? "Sale Bills" : "Other Bills"}</span></li>
              </ul>
            </div>
            {
              this.props.match.params.bill === "purchaseBills" ?
                <React.Fragment>
                  <p className="static-title-r">Purchase Bills</p>
                  <div className="text-align-center-r">
                    {this.state.getbill.map((val, index) =>
                      <React.Fragment key={index}>
                        <div className="card-base-r">
                          <input className="card-status-button-r" onChange={this.statusBoxHandler} checked={val.completeStatus} id={val._id} type="checkbox" />

                          {/* <div>
                        <input type="password" className="form-control status-input-button-r" id="pwd"
                          placeholder="Enter password" name="pwd" />
                        <button type="submit" className="btn btn-default status-submit-button-r"><i
                          className="fa fa-check submit-icon-r" aria-hidden="true"></i></button>
                      </div> */}
                          <div>
                            <img onClick={() => this.fullviewModal(val.img)} className={val.completeStatus ? "card-parent-img-r opacity-r" : "card-parent-img-r"} src={"http://localhost:3000/bills/" + val.img} />
                            {val.completeStatus ? <img onClick={this.fullviewModal} className="card-child-img-r" src={require('../../assets/img/download.png')} /> : null}
                            <div className="dropdown">
                              <button className="card-drop-down-r"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                              </button>
                              <div className="dropdown-content">
                                <a className="background-hover-r" href="#">Transfer to sale</a>
                                <a className="background-hover-r" href="#">Transfer to other</a>
                                <a className="background-hover-r" href="#">Return</a>
                              </div>
                            </div>
                          </div>
                          <p className="card-sub-heading-r">{val.originalName}</p>
                          <p className="card-sub-heading-r">Created At: {moment(val.timestamp).format("DD MMM YYYY")}</p>
                          <textarea
                            className="form-control card-comment-box-r card-text-r"
                            placeholder="Comment...."
                            value={val.comment}
                            onChange={this.nameChangeHandler}
                            id="returnComment"
                            rows="2"
                            required>
                          </textarea>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </React.Fragment>
                :
                this.props.match.params.bill === "saleBills" ?
                  <React.Fragment>
                    <p className="static-title-r">Sale Bills</p>
                    <div className="text-align-center-r">
                      {this.state.getbill.map((val, index) =>
                        <React.Fragment key={index}>
                          <div className="card-base-r">
                            <input className="card-status-button-r" onChange={this.statusBoxHandler} checked={val.completeStatus} id={val._id} type="checkbox" />

                            {/* <div>
                        <input type="password" className="form-control status-input-button-r" id="pwd"
                          placeholder="Enter password" name="pwd" />
                        <button type="submit" className="btn btn-default status-submit-button-r"><i
                          className="fa fa-check submit-icon-r" aria-hidden="true"></i></button>
                      </div> */}
                            <div>
                              <img className={this.state.statusBoxArray.includes("s" + index) ? "card-parent-img-r opacity-r" : "card-parent-img-r"} src={"http://localhost:3000/bills/" + val.img} />
                              {this.state.statusBoxArray.includes("s" + index) ? <img className="card-child-img-r" src={require('../../assets/img/download.png')} /> : null}
                              <div className="dropdown">
                                <button className="card-drop-down-r"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                </button>
                                <div className="dropdown-content">
                                  <a className="background-hover-r" href="#">Transfer to purchase</a>
                                  <a className="background-hover-r" href="#">Transfer to other</a>
                                  <a className="background-hover-r" href="#">Return</a>
                                </div>
                              </div>
                            </div>
                            <p className="card-sub-heading-r">{val.originalName}</p>
                            <p className="card-sub-heading-r">Created At: {moment(val.timestamp).format("DD MMM YYYY")}</p>
                            <textarea
                              className="form-control card-comment-box-r card-text-r"
                              placeholder="Comment...."
                              value={val.comment}
                              onChange={this.nameChangeHandler}
                              id="returnComment"
                              rows="2"
                              required>
                            </textarea>
                          </div>
                          {/* <span className="delete-report-icon-r">
                      <button name="purchaseBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                    </span> */}
                        </React.Fragment>
                      )}
                    </div>
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <p className="static-title-r">Other Bills</p>
                    <div className="text-align-center-r">
                      {this.state.getbill.map((val, index) =>
                        <React.Fragment key={index}>
                          <div className="card-base-r">
                            <input className="card-status-button-r" onChange={this.statusBoxHandler} checked={val.completeStatus} id={val._id} type="checkbox" />

                            {/* <div>
                        <input type="password" className="form-control status-input-button-r" id="pwd"
                          placeholder="Enter password" name="pwd" />
                        <button type="submit" className="btn btn-default status-submit-button-r"><i
                          className="fa fa-check submit-icon-r" aria-hidden="true"></i></button>
                      </div> */}
                            <div>
                              <img className={this.state.statusBoxArray.includes("s" + index) ? "card-parent-img-r opacity-r" : "card-parent-img-r"} src={"http://localhost:3000/bills/" + val.img} />
                              {this.state.statusBoxArray.includes("s" + index) ? <img className="card-child-img-r" src={require('../../assets/img/download.png')} /> : null}
                              <div className="dropdown">
                                <button className="card-drop-down-r"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                </button>
                                <div className="dropdown-content">
                                  <a className="background-hover-r" href="#">Transfer to purchase</a>
                                  <a className="background-hover-r" href="#">Transfer to sale</a>
                                  <a className="background-hover-r" href="#">Return</a>
                                </div>
                              </div>
                            </div>
                            <p className="card-sub-heading-r">OtherBills.png</p>
                            <p className="card-sub-heading-r">Created At: {moment(val.timestamp).format("DD MMM YYYY")}</p>
                            <textarea
                              className="form-control card-comment-box-r card-text-r"
                              placeholder="Comment...."
                              value={val.comment}
                              onChange={this.nameChangeHandler}
                              id="returnComment"
                              rows="2"
                              required>
                            </textarea>
                          </div>
                          {/* <span className="delete-report-icon-r">
                      <button name="purchaseBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                    </span> */}
                        </React.Fragment>
                      )}
                    </div>
                  </React.Fragment>
            }
          </div>
        }
        <ConfirmModal
          showHideClassName={this.state.showHideClassName}
          onClose={this.modalCloseHandler}
          onConfirm={() => this.statusUpdate(this.state.statusBoxIndex, this.state.status)}
          confirmMessage="Are you sure want to update ?"
        />
      </div>
    );
  }
}

UserBillDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userBillDetails: makeSelectUserBillDetails(),
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

const withReducer = injectReducer({ key: 'userBillDetails', reducer });
const withSaga = injectSaga({ key: 'userBillDetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserBillDetails);
