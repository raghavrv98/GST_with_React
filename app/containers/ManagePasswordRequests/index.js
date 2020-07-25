/**
 *
 * ManagePasswordRequests
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
import makeSelectManagePasswordRequests from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ConfirmModal from '../../components/ConfirmModal/Loadable'
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import moment from 'moment';
import MessageModal from '../../components/MessageModal/Loadable'
import { errorHandler } from '../../utils/commonUtils';

/* eslint-disable react/prefer-stateless-function */
export class ManagePasswordRequests extends React.Component {

  state = {
    accountants: [],
    showHideClassName: 'modal display-none container',
    isFetching: true,
    isOpenClassName: 'modal display-none container',
    managePasswordList: [],
    accountantIdCheck: false
  }

  getAccountant = () => {
    let url = window.API_URL + `/accountants-all`;
    axios.get(url)
      .then((res) => {
        const accountants = res.data.data;
        this.setState({ accountants, isFetching: false });
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isFetching: false,
          isOpenClassName: 'modal display-block container',
          type: "failure"
        }, () => setTimeout(this.modalTime, 1500))
      });
  };

  getManagePasswordList = () => {
    let url = window.API_URL + `/unapprovedUsers`;
    axios.get(url)
      .then((res) => {
        let managePasswordList = res.data.data;
        managePasswordList.map(val => val.accountantId = val.createdBy.createdByAdmin ? "" : val.createdBy._id)
        this.setState({ managePasswordList, isFetching: false });
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isFetching: false,
          isOpenClassName: 'modal display-block container',
          type: "failure"
        }, () => setTimeout(this.modalTime, 1500))
      });
  };

  approveUser = (payload) => {
    let url = window.API_URL + `/approveUser`;
    axios.post(url, payload)
      .then((res) => {
        const data = res.data.data;
        this.setState({
          message: res.data.message,
          type: "success",
          isOpenClassName: 'modal display-block container'
        }, () => setTimeout(this.modalTime, 1500), this.getAccountant(), this.getManagePasswordList());
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

  nameChangeHandler = event => {
    let managePasswordList = JSON.parse(JSON.stringify(this.state.managePasswordList))
    managePasswordList[event.target.id].accountantId = event.target.value
    managePasswordList[event.target.id].accountantIdCheck = undefined
    this.setState({
      managePasswordList,

    })
  }

  componentWillMount() {
    this.getAccountant()
    this.getManagePasswordList()
  }

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container',
      isFetching: false
    })
  }

  confirmModalHandler = (id) => {
    this.setState({
      showHideClassName: 'modal display-block container',
      deleteId: id
    })
  }

  modalCloseHandler = () => {
    this.setState({
      isResetModal: false,
      showHideClassName: 'modal display-none container',
      deleteId: ""
    })
  }

  confirmDeleteData = (id) => {
    event.preventDefault()
    this.deleteAccountant(id)
    this.setState({
      showHideClassName: 'modal display-none container',
      isFetching: true
    })
  }

  approvedUserHandler = (val, check, index) => {
    let managePasswordList = JSON.parse(JSON.stringify(this.state.managePasswordList))
    event.preventDefault()
    val[index] = {
      user_id: val._id,
      emailId: val.emailId,
      trader_id: val.traderId,
      accountantId: val.accountantId,
      approve: check === "approve",
    }


    if (val[index].accountantId === "") {
      managePasswordList[index].accountantIdCheck = true
    }
    else {
      this.approveUser(val[index])
    }
    this.setState({
      managePasswordList,
      isFetching: true
    })

  }

  render() {
    return (
      <div>
        <Helmet>
          <title>ManagePasswordRequests</title>
          <meta
            name="description"
            content="Description of ManagePasswordRequests"
          />
        </Helmet>

        <MessageModal
          showHideClassName={this.state.isOpenClassName}
          modalType={this.state.type}
          message={this.state.message}
          onClose={this.modalCloseHandler}
        />

        <div className="container outer-box-r">
          <p className="static-title-r">Manage Password Requests</p>
          <div>
            <ul className="breadCrumb-bg-r">
            <li onClick={() => this.props.history.push('/admin')} className="breadCrumb-li-child-1-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
              <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >Manage Password Requests</span></li>
            </ul>
          </div>
          <ul>
            {this.state.isFetching ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
              this.state.managePasswordList.length > 0 ?

                this.state.managePasswordList.map((val, index) => <form key={index}>
                  <li className="li-outer">
                    <span
                    // onClick={() => this.props.history.push(`/userDetails/${val._id}/${this.state.month}/${this.state.year}`)}
                    >
                      <span className="li-image-icon">
                        <img className="li-image" src={require('../../assets/img/download.png')} />
                      </span>
                      <div className="li-content-request-p">
                        <div>
                          <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span className="li-content-title">
                                Created At :
                          </span>
                              <span className="li-content">
                                {moment(val.timestamp).format("DD MMM YYYY HH:mm")}
                              </span>
                            </div>
                            <div className="overflow-control col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span className="li-content-title">
                                Created By :
                          </span>
                              <span className="li-content">
                                {`${val.createdBy.name} (${val.createdBy.createdByAdmin ? "Admin" : "Accountant"})`}
                              </span>
                            </div>
                          </div>

                          <div className="col-xs-12 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                            <div>
                              <span className="li-content-title">
                                Mobile no. :
                          </span>
                              <span className="li-content">
                                {val.mobileNumber}
                              </span>
                            </div>
                          </div>

                          <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className="overflow-control col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span className="li-content-title">
                                Email-id :
                            </span>
                              <span className="li-content">
                                {val.emailId.toLowerCase()}
                              </span>
                            </div>
                            <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span className="li-content-title">
                                GSTIN :
                            </span>
                              <span className="li-content">
                                {val.gstinNumber}
                              </span>
                            </div>
                          </div>

                          <div className="col-xs-12 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                            <select onChange={this.nameChangeHandler} id={index} value={val.accountantId} className="year-month-border-r" required>
                              <option disabled={true} value="">Select Accountant</option>
                              {this.state.accountants.map((val, index) => <option value={val._id} key={index}>{val.username}</option>)
                              }
                            </select>
                            {val.accountantIdCheck ? <p className="accountant-error-msg-r">Please Select Accountant</p> : null}
                          </div>
                        </div>
                      </div>
                    </span>
                    <span className="download-view-btn-grp-user">
                      {/* <span className="sendButton-r" data-tip data-for="send" onClick={() => this.confirmModalHandler(val._id)}><i className="fa fa-paper-plane"></i><ReactTooltip id="send" type="dark" ><div className="tooltipText"><p>Send</p></div></ReactTooltip></span> */}
                      <button className="approvedButton-r" data-tip data-for="approve" onClick={() => this.approvedUserHandler(val, "approve", index)}><i className="fa fa-thumbs-up"></i><ReactTooltip id="approve" type="dark" ><div className="tooltipText"><p>Approve</p></div></ReactTooltip></button>
                      <button className="declineButton-r" data-tip data-for="decline" onClick={() => this.approvedUserHandler(val, "decline", index)}><i className="fa fa-thumbs-down"></i><ReactTooltip id="decline" type="dark" ><div className="tooltipText"><p>Decline</p></div></ReactTooltip></button>
                    </span>
                  </li>
                </form>
                )
                :
                <div className="li-outer"><span className="no-data-text">No Data Found</span></div>
            }
          </ul>
        </div>
      </div >
    );
  }
}

ManagePasswordRequests.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managePasswordRequests: makeSelectManagePasswordRequests(),
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

const withReducer = injectReducer({ key: 'managePasswordRequests', reducer });
const withSaga = injectSaga({ key: 'managePasswordRequests', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagePasswordRequests);
