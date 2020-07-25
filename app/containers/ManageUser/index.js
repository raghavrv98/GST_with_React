/**
 *
 * ManageUser
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
import makeSelectManageUser from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import moment from 'moment';
import ConfirmModal from '../../components/ConfirmModal/Loadable'
import MessageModal from '../../components/MessageModal/Loadable'
import { errorHandler } from '../../utils/commonUtils';

/* eslint-disable react/prefer-stateless-function */
export class ManageUser extends React.Component {

  state = {
    showHideClassName: 'modal display-none container',
    month: 4,
    year: 2020,
    userType: "withData",
    isFetching: true,
    isOpenClassName: 'modal display-none container',
    showHideClassNameDelete: 'modal display-none container',
    users: []
  }

  getUser = (accountantId, month, year, userType) => {
    let url = window.API_URL + `/users/${accountantId}/${month}/${year}/${userType}`;
    axios.get(url)
      .then((res) => {
        const users = res.data.data;
        this.setState({ users, isFetching: false });
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure"
        }, () => setTimeout(this.modalTime, 1500))
      });
  };

  statusUpdate = (id, status) => {
    this.setState({
      showHideClassName: 'modal display-none container',
      isFetching: true
    })
    let url = window.API_URL + `/changeStatus/${id}`;
    axios.put(url, { 'status': status, 'year': this.state.year, 'month': this.state.month })
      .then((res) => {
        const data = res.data.data;
        this.setState({
          message: res.data.message,
          isFetching: true,
        }, () => this.getUser(this.state.accountantId, this.state.month, this.state.year, this.state.userType));
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure"
        }, () => setTimeout(this.modalTime, 1500))
      });
  };


  componentWillMount() {
    let accountantId = localStorage.getItem('userId')
    this.getUser(accountantId, this.state.month, this.state.year, this.state.userType)
    this.setState({
      accountantId
    })
  }

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container',
      isFetching: false
    })
  }

  nameChangeHandler = (event) => {
    let year = this.state.year
    let month = this.state.month
    let userType = this.state.userType
    let id = event.target.id

    if (id === "year") {
      year = event.target.value
    }
    else if (id === "month") {
      month = event.target.value
    }
    else if (id === "userType") {
      userType = event.target.value
    }

    this.setState({
      year, month, userType, isFetching: true,
    }, () => this.getUser(this.state.accountantId, this.state.month, this.state.year, this.state.userType))
  }

  statusBoxHandler = (event, billId) => {
    let id = event.target.id
    let status = event.target.checked
    this.setState({
      statusBoxIndex: id,
      status,
      billId,
      showHideClassName: 'modal display-block container',
    })
  }

  confirmDeleteData = (id) => {
    event.preventDefault()
    this.deleteUsers(id)
    this.setState({
      showHideClassNameDelete: 'modal display-none container',
      isFetching: true
    })
  }

  confirmModalHandler = (id) => {
    this.setState({
      showHideClassNameDelete: 'modal display-block container',
      deleteId: id
    })
  }

  deleteUsers = (id) => {
    let url = window.API_URL + `/user/${id}`;
    axios.delete(url)
      .then((res) => {
        const data = res.data.data;
        this.setState({
          message: res.data.message,
          isFetching: false,
          type: "success",
          isOpenClassName: 'modal display-block container'
        }, () => this.getUser(this.state.accountantId, this.state.month, this.state.year, this.state.userType, setTimeout(this.modalTime, 1500)))
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

  modalCloseHandler = () => {
    this.setState({
      isResetModal: false,
      showHideClassName: 'modal display-none container',
      fullViewModalClassName: 'modal display-none container',
      showHideClassNameDelete: 'modal display-none container',
      deleteId: "",
      deleteName: "",
      isOpenClassName: 'modal display-none container',
      cardLoader: false
    })
  }

  render() {
    const columns = [
      {
        Header: 'Created At',
        accessor: 'timestamp',
        width: 200,
        Cell: row => (
          <div className="onClick-cell-r" onClick={() => { this.props.history.push(`/userDetails/${row.original._id}/${this.state.month}/${this.state.year}`) }}>{moment(row.original.timestamp).format("DD MMM YYYY HH:mm")}</div>
        )
      },
      {
        Header: 'Client Id',
        accessor: 'clientId',
        width: 150,
        filterable: true,
        Cell: row => (
          <div className="onClick-cell-r" onClick={() => { this.props.history.push(`/userDetails/${row.original._id}/${this.state.month}/${this.state.year}`) }}>{row.original.clientId}</div>
        )
      },
      {
        Header: 'Legal Name',
        accessor: 'legalName',
        filterable: true,
        Cell: row => (
          <div className="onClick-cell-r" onClick={() => { this.props.history.push(`/userDetails/${row.original._id}/${this.state.month}/${this.state.year}`) }}>{row.original.legalName}</div>
        )
      },
      {
        Header: 'Trade Name',
        accessor: 'tradeName',
        filterable: true,
        Cell: row => (
          <div className="onClick-cell-r" onClick={() => { this.props.history.push(`/userDetails/${row.original._id}/${this.state.month}/${this.state.year}`) }}>{row.original.tradeName}</div>
        )
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: 100,
        Cell: row =>
          (
            <div>
              <input id={row.original._id} onChange={() => this.statusBoxHandler(event, row.original._id)} disabled={this.state.userType === "all" || this.state.userType === "active" || this.state.userType === "inActive"} checked={row.original.status} className="status-button-r" type="checkbox" />
            </div>
          )
      },
      {
        Header: 'Actions',
        sortable: false,
        width: 150,
        Cell: row =>
          (<div>
            <span className="editButton-r" data-tip data-for="edit" onClick={() => this.props.history.push('/addOrEditUser/' + row.original._id)}><i className="far fa-edit"></i><ReactTooltip id="edit" type="dark" ><div className="tooltipText"><p>Edit</p></div></ReactTooltip></span>
            <span className="deleteButton-r" data-tip data-for="delete" onClick={() => this.confirmModalHandler(row.original._id)}><i className="far fa-trash-alt"></i><ReactTooltip id="delete" type="dark" ><div className="tooltipText"><p>Delete</p></div></ReactTooltip></span>
          </div>
          )
      },
    ]
    return (
      <div>
        <Helmet>
          <title>ManageUser</title>
          <meta name="description" content="Description of ManageUser" />
        </Helmet>

        <MessageModal
          showHideClassName={this.state.isOpenClassName}
          modalType={this.state.type}
          message={this.state.message}
          onClose={this.modalCloseHandler}
        />

        <div className="container outer-box-r">
        <p className="static-title-r">Manage Users</p>
          <div>
            <ul className="breadCrumb-bg-r">
              <li className="breadCrumb-li-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
            </ul>
          </div>
          <div className="container filter-year-month-r">
            <div className="row">
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="year" disabled={this.state.userType === "all" || this.state.userType === "active" || this.state.userType === "inActive"} onChange={this.nameChangeHandler} value={this.state.year} className="year-month-border-r"
                  name="lectureId">
                  <option disabled={true} value="0">Select Year</option>
                  <option value="2020">2020-2021</option>
                  <option value="2019">2019-2020</option>
                  <option value="2018">2018-2019</option>
                  <option value="2017">2017-2018</option>
                </select>
              </div>
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="month" disabled={this.state.userType === "all" || this.state.userType === "active" || this.state.userType === "inActive"} onChange={this.nameChangeHandler} value={this.state.month} className="year-month-border-r"
                  name="lectureId">
                  <option disabled={true} value="0">Select Month</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                </select>
              </div>
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="userType" onChange={this.nameChangeHandler} value={this.state.userType} className="year-month-border-r"
                  name="lectureId">
                  <option disabled={true} value="0">Select User</option>
                  <option value="all">All Users</option>
                  <option value="withData">User with Data</option>
                  <option value="withoutData">User without Data</option>
                  <option value="complete">Status Completed</option>
                  <option value="pending">Status Pending</option>
                  <option value="active">Active</option>
                  <option value="inActive">InActive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="container">
            <button type="button" onClick={() => { this.props.history.push('/addOrEditUser') }} className="button-base-r newEntry-r">New User</button>
          </div>
          <div className="container">
            {/* <div className="customReactTableBox">
              <ReactTable
                className="customReactTable"
                data={this.state.users}
                columns={columns}
                defaultPageSize={5}
                noDataText={
                  this.state.isFetching ? "" : "There is no data to display."
                }
                loading={this.state.isFetching}
                loadingText={"Loading ..."}
                PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
              />
            </div> */}
            <ul>
            {this.state.isFetching ? <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
              this.state.users.length > 0 ?
              this.state.users.map((val, index) => <li key={index} className="li-outer">
                <span onClick={() => this.props.history.push(`/userDetails/${val._id}/${this.state.month}/${this.state.year}`)}>
                  <span className="li-image-icon">
                    <img className="li-image" src={require('../../assets/img/download.png')} />
                  </span>
                  <div className="li-content-user-p">
                    <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <span className="li-content-title">
                          Created At :
                  </span>
                        <span className="li-content">
                          {moment(val.timestamp).format("DD MMM YYYY HH:mm")}
                        </span>
                      </div>
                      <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <span className="li-content-title">
                          Client Id :
                  </span>
                        <span className="li-content">
                          {val.clientId}
                        </span>
                      </div>
                      <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <span className="li-content-title">
                          Legal Name :
                  </span>
                        <span className="li-content">
                          {val.legalName}
                        </span>
                      </div>
                      <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <span className="li-content-title">
                          Trade Name :
                  </span>
                        <span className="li-content">
                          {val.tradeName}
                        </span>
                      </div>
                    </div>
                  </div>
                </span>
                <span className="download-view-btn-grp-user">
                  <label className="switch">
                    <input id={val._id} onChange={() => this.statusBoxHandler(event, val._id)} disabled={this.state.userType === "all" || this.state.userType === "active" || this.state.userType === "inActive"} checked={val.status} className="status-button-r" type="checkbox" />
                    <span className="slider round" data-tip data-for="status"></span>
                    <ReactTooltip id="status" type="dark" ><div className="tooltipText"><p>Status</p></div></ReactTooltip>
                  </label>
                  <span className="editButton-r" data-tip data-for="edit" onClick={() => this.props.history.push('/addOrEditUser/' + val._id)}><i className="far fa-edit"></i><ReactTooltip id="edit" type="dark" ><div className="tooltipText"><p>Edit</p></div></ReactTooltip></span>
                  <span className="deleteButton-r" data-tip data-for="delete" onClick={() => this.confirmModalHandler(val._id)}><i className="far fa-trash-alt"></i><ReactTooltip id="delete" type="dark" ><div className="tooltipText"><p>Delete</p></div></ReactTooltip></span>
                </span>
              </li>
              )
              :
              <div className="li-outer"><span className="no-data-text">No Data Found</span></div>
            }
            </ul>
          </div>
        </div>
        <ConfirmModal
          showHideClassName={this.state.showHideClassName}
          onClose={this.modalCloseHandler}
          onConfirm={() => this.statusUpdate(this.state.statusBoxIndex, this.state.status)}
          confirmMessage="Are you sure want to update ?"
        />

        <ConfirmModal
          showHideClassName={this.state.showHideClassNameDelete}
          onClose={this.modalCloseHandler}
          onConfirm={() => this.confirmDeleteData(this.state.deleteId)}
        />
      </div >
    );
  }
}

ManageUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageUser: makeSelectManageUser(),
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

const withReducer = injectReducer({ key: 'manageUser', reducer });
const withSaga = injectSaga({ key: 'manageUser', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageUser);
