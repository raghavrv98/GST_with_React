/**
 *
 * UpdateUserAccountant
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
import makeSelectUpdateUserAccountant from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import moment from 'moment';
import MessageModal from '../../components/MessageModal/Loadable'
import { errorHandler } from '../../utils/commonUtils';

/* eslint-disable react/prefer-stateless-function */
export class UpdateUserAccountant extends React.Component {

  state = {
    accountants: [],
    isFetching: true,
    isOpenClassName: 'modal display-none container',
    manageUserList: [1],
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

  getManageUserList = () => {
    let url = window.API_URL + `/unapprovedUsers`;
    axios.get(url)
      .then((res) => {
        let manageUserList = res.data.data;
        manageUserList = [1]
        // manageUserList.map(val => {
        //   val.trader_id = val.createdBy.createdByAdmin ? "" : val.createdBy._id
        //   val.accountantId = ""
        //   return val
        // })
        this.setState({ manageUserList, isFetching: false });
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
        }, () => setTimeout(this.modalTime, 1500), this.getAccountant(), this.getManageUserList());
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
    let manageUserList = JSON.parse(JSON.stringify(this.state.manageUserList))
    manageUserList[event.target.id].trader_id = event.target.value.split(' ')[0]
    manageUserList[event.target.id].accountantId = event.target.value.split(' ')[1]
    manageUserList[event.target.id].accountantIdCheck = undefined
    this.setState({
      manageUserList,

    })
  }

  componentWillMount() {
    this.getAccountant()
    this.getManageUserList()
  }

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container',
      isFetching: false
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
    let manageUserList = JSON.parse(JSON.stringify(this.state.manageUserList))
    event.preventDefault()
    val[index] = {
      user_id: val._id,
      emailId: val.emailId,
      trader_id: val.trader_id,
      accountantId: val.accountantId,
      approve: check === "approve",
    }

    if (val[index].accountantId === " ") {
      manageUserList[index].accountantIdCheck = true
    }
    else {
      this.approveUser(val[index])
    }
    this.setState({
      manageUserList,
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
          <p className="static-title-r">Manage User</p>
          <div>
            <ul className="breadCrumb-bg-r">
              <li onClick={() => this.props.history.push('/admin')} className="breadCrumb-li-child-1-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
              <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >Manage User</span></li>
            </ul>
          </div>
          <ul>
            {this.state.isFetching ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
              this.state.manageUserList.length > 0 ?

                this.state.manageUserList.map((val, index) => <form key={index}>
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
                                {/* {moment(val.timestamp).format("DD MMM YYYY HH:mm")} */}qq
                              </span>
                            </div>
                            <div className="overflow-control col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span className="li-content-title">
                                Created By :
                          </span>
                              <span className="li-content">
                                {/* {`${val.createdBy.name} (${val.createdBy.createdByAdmin ? "Admin" : "Accountant"})`} */}qq
                              </span>
                            </div>
                          </div>

                          <div className="col-xs-12 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                            <div>
                              <span className="li-content-title">
                                Mobile no. :
                          </span>
                              <span className="li-content">
                                {/* {val.mobileNumber} */}qq
                              </span>
                            </div>
                          </div>

                          <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className="overflow-control col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span className="li-content-title">
                                Email-id :
                            </span>
                              <span className="li-content">
                                {/* {val.emailId.toLowerCase()} */}qq
                              </span>
                            </div>
                            <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <span className="li-content-title">
                                GSTIN :
                            </span>
                              <span className="li-content">
                                {/* {val.gstinNumber} */}qq
                              </span>
                            </div>
                          </div>

                          <div className="col-xs-12 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                            <select onChange={this.nameChangeHandler} id={index} value={val.trader_id + " " + val.accountantId} className="year-month-border-r" required>
                              <option disabled={true} value=" ">Select Accountant</option>
                              {this.state.accountants.map((value, index) => <option name={value.accountantId} value={value._id + " " + value.accountantId} key={index}>{value.username}</option>)
                              }
                            </select>
                            {val.accountantIdCheck ? <p className="accountant-error-msg-r">Please Select Accountant</p> : null}
                          </div>
                        </div>
                      </div>
                    </span>
                    <span className="download-view-btn-grp-user">
                      <button className="approvedButton-r" data-tip data-for="approve" onClick={() => this.approvedUserHandler(val, "approve", index)}><i className="fa fa-thumbs-up"></i><ReactTooltip id="approve" type="dark" ><div className="tooltipText"><p>Approve</p></div></ReactTooltip></button>
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

UpdateUserAccountant.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  updateUserAccountant: makeSelectUpdateUserAccountant(),
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

const withReducer = injectReducer({ key: 'updateUserAccountant', reducer });
const withSaga = injectSaga({ key: 'updateUserAccountant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UpdateUserAccountant);
