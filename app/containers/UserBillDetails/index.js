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
    getBill: [],
    commentAlert: false,
    billId: ""
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


  getBill = (id, month, year, bill, date) => {
    if (bill === "purchase") {
      axios.get(`https://gst-service-uat.herokuapp.com/purchase/${id}/${month}/${year}/${date}`)
        .then((res) => {
          const getBill = res.data.data;
          this.setState({ getBill, isLoading: false });
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
    else if (bill === "sale") {
      axios.get(`https://gst-service-uat.herokuapp.com/sale/${id}/${month}/${year}/${date}`)
        .then((res) => {
          const getBill = res.data.data;
          this.setState({ getBill, isLoading: false });
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
    else {
      axios.get(`https://gst-service-uat.herokuapp.com/other/${id}/${month}/${year}/${date}`)
        .then((res) => {
          const getBill = res.data.data;
          this.setState({ getBill, isLoading: false });
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
  };

  statusUpdate = (id, status) => {
    axios.put(`https://gst-service-uat.herokuapp.com/changeBillStatus/${this.props.match.params.id}/${id}/${this.props.match.params.bill}`, { 'status': status })
      .then((res) => {
        const message = res.data.message;
        this.setState({
          message,
          isLoading: true,
          showHideClassName: 'modal display-none container',
        }, () => this.getBill(this.props.match.params.id, this.props.match.params.month, this.props.match.params.year, this.props.match.params.bill, this.props.match.params.date));
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  };

  billTransfer = (id, to, index) => {
    event.preventDefault()
    let payload
    let comment = this.state.getBill[index].comment
    if (comment === "") {
      this.setState({
        commentAlert: true,
        billId: id
      })
    }
    else {
      if (this.props.match.params.bill === "purchase") {
        payload = {
          from: "purchase",
          to,
          comment
        }
      }
      else if (this.props.match.params.bill === "sale") {
        payload = {
          from: "sale",
          to,
          comment
        }
      }
      else {
        payload = {
          from: "other",
          to,
          comment
        }
      }

      axios.put(`https://gst-service-uat.herokuapp.com/transferBill/${this.props.match.params.id}/${id}`, payload)
        .then((res) => {
          const message = res.data.message;
          this.setState({
            message,
            isLoading: true,
            showHideClassName: 'modal display-none container',
          }, () => this.getBill(this.props.match.params.id, this.props.match.params.month, this.props.match.params.year, this.props.match.params.bill, this.props.match.params.date));
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
  };

  componentWillMount() {
    this.getBill(this.props.match.params.id, this.props.match.params.month, this.props.match.params.year, this.props.match.params.bill, this.props.match.params.date)
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

  nameChangeHandler = (event) => {
    let id = event.target.id
    let getBill = JSON.parse(JSON.stringify(this.state.getBill))
    getBill[id].comment = event.target.value
    this.setState({
      getBill,
      commentAlert: false,
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
                    <img className="card-full-view-parent-img-r" src={"https://gst-service-uat.herokuapp.com/bills/" + this.state.imgName} />
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
                <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >{this.props.match.params.bill === "purchase" ? "Purchase Bills" : this.props.match.params.bill === "sale" ? "Sale Bills" : "Other"}</span></li>
              </ul>
            </div>
            {
              this.props.match.params.bill === "purchase" ?
                <React.Fragment>
                  <p className="static-title-r">Purchase Bills</p>
                  <div className="text-align-center-r">
                    {this.state.getBill && this.state.getBill.map((val, index) =>
                      <React.Fragment key={index}>
                        <div className="card-base-r">
                          <input className="card-status-button-r" onChange={this.statusBoxHandler} checked={val.completeStatus} id={val._id} type="checkbox" />
                          <form>
                            <div>
                              <img onClick={() => this.fullviewModal(val.img)} className={val.completeStatus ? "card-parent-img-r opacity-r" : "card-parent-img-r"} src={"https://gst-service-uat.herokuapp.com/bills/" + val.img} />
                              {val.completeStatus ? <img onClick={this.fullviewModal} className="card-child-img-r" src={require('../../assets/img/download.png')} /> : null}
                              <div className="dropdown">
                                <button type="button" className="card-drop-down-r"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                </button>
                                <div className="dropdown-content">
                                  <button disabled={val.completeStatus} onClick={() => this.billTransfer(val._id, "sale", index)} className="background-hover-r" >Transfer to sale</button>
                                  <button disabled={val.completeStatus} onClick={() => this.billTransfer(val._id, "other", index)} className="background-hover-r" >Transfer to other</button>
                                  <button disabled={val.completeStatus} onClick={() => this.billTransfer(val._id, "faulty", index)} className="background-hover-r" >Return</button>
                                </div>
                              </div>
                            </div>
                            <p className="card-sub-heading-r">{val.originalName}</p>
                            <p className="card-sub-heading-r">Created At: {moment(val.timestamp).format("DD MMM YYYY")}</p>
                            <textarea
                              className={this.state.billId == val._id && this.state.commentAlert ? "form-control card-alert-comment-box-r card-text-r" : "form-control card-comment-box-r card-text-r"}
                              placeholder={this.state.billId == val._id && this.state.commentAlert ? "Comment required" : "Comment...."}
                              value={val.comment}
                              onChange={this.nameChangeHandler}
                              id={index}
                              rows="2"
                              required>
                            </textarea>
                          </form>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </React.Fragment>
                :
                this.props.match.params.bill === "sale" ?
                  <React.Fragment>
                    <p className="static-title-r">Sale Bills</p>
                    <div className="text-align-center-r">
                      {this.state.getBill && this.state.getBill.map((val, index) =>
                        <React.Fragment key={index}>
                          <div className="card-base-r">
                            <input className="card-status-button-r" onChange={this.statusBoxHandler} checked={val.completeStatus} id={val._id} type="checkbox" />
                            <form>
                              <div>
                                <img onClick={() => this.fullviewModal(val.img)} className={val.completeStatus ? "card-parent-img-r opacity-r" : "card-parent-img-r"} src={"https://gst-service-uat.herokuapp.com/bills/" + val.img} />
                                {val.completeStatus ? <img onClick={this.fullviewModal} className="card-child-img-r" src={require('../../assets/img/download.png')} /> : null}
                                <div className="dropdown">
                                  <button type="button" className="card-drop-down-r"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                  </button>
                                  <div className="dropdown-content">
                                    <button onClick={() => this.billTransfer(val._id, "purchase", index)} className="background-hover-r" >Transfer to Purchase</button>
                                    <button onClick={() => this.billTransfer(val._id, "other", index)} className="background-hover-r" >Transfer to other</button>
                                    <button onClick={() => this.billTransfer(val._id, "faulty", index)} className="background-hover-r" >Return</button>
                                  </div>
                                </div>
                              </div>
                              <p className="card-sub-heading-r">{val.originalName}</p>
                              <p className="card-sub-heading-r">Created At: {moment(val.timestamp).format("DD MMM YYYY")}</p>
                              <textarea
                                className={this.state.billId == val._id && this.state.commentAlert ? "form-control card-alert-comment-box-r card-text-r" : "form-control card-comment-box-r card-text-r"}
                                placeholder={this.state.billId == val._id && this.state.commentAlert ? "Comment required" : "Comment...."}
                                value={val.comment}
                                onChange={this.nameChangeHandler}
                                id={index}
                                rows="2"
                                required>
                              </textarea>
                            </form>
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
                      {this.state.getBill && this.state.getBill.map((val, index) =>
                        <React.Fragment key={index}>
                          <div className="card-base-r">
                            <input className="card-status-button-r" onChange={this.statusBoxHandler} checked={val.completeStatus} id={val._id} type="checkbox" />
                            <form>
                              <div>
                                <img onClick={() => this.fullviewModal(val.img)} className={val.completeStatus ? "card-parent-img-r opacity-r" : "card-parent-img-r"} src={"https://gst-service-uat.herokuapp.com/bills/" + val.img} />
                                {val.completeStatus ? <img onClick={this.fullviewModal} className="card-child-img-r" src={require('../../assets/img/download.png')} /> : null}
                                <div className="dropdown">
                                  <button type="button" className="card-drop-down-r"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                  </button>
                                  <div className="dropdown-content">
                                    <button onClick={() => this.billTransfer(val._id, "purchase", index)} className="background-hover-r" >Transfer to Purchase</button>
                                    <button onClick={() => this.billTransfer(val._id, "sale", index)} className="background-hover-r" >Transfer to Sale</button>
                                    <button onClick={() => this.billTransfer(val._id, "faulty", index)} className="background-hover-r" >Return</button>
                                  </div>
                                </div>
                              </div>
                              <p className="card-sub-heading-r">{val.originalName}</p>
                              <p className="card-sub-heading-r">Created At: {moment(val.timestamp).format("DD MMM YYYY")}</p>
                              <textarea
                                className={this.state.billId == val._id && this.state.commentAlert ? "form-control card-alert-comment-box-r card-text-r" : "form-control card-comment-box-r card-text-r"}
                                placeholder={this.state.billId == val._id && this.state.commentAlert ? "Comment required" : "Comment...."}
                                value={val.comment}
                                onChange={this.nameChangeHandler}
                                id={index}
                                rows="2"
                                required>
                              </textarea>
                            </form>
                          </div>
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
