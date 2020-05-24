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

import MessageModal from '../../components/MessageModal/Loadable'

/* eslint-disable react/prefer-stateless-function */
export class ManageUser extends React.Component {

  state = {
    month: 1,
    year: 2020,
    userType: "all",
    isFetching: false,
    isOpenClassName: 'modal display-none container'
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
    this.setState({ errorMes, isOpenClassName: 'modal display-block container', type: "failure" }, () => setTimeout(this.modalTime, 1500)
    );
  }

  getUser = (accountantId, month, year, userType) => {
    axios.get(`http://localhost:3000/users/${accountantId}/${month}/${year}/${userType}`)
      .then((res) => {
        const users = res.data.data;
        this.setState({ users, isFetching: false });
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  };

  statusUpdate = (id, status) => {
    let accountantId = localStorage.getItem('accountantId')

    axios.put(`http://localhost:3000/changeStatus/${id}`, { 'status': status })
      .then((res) => {
        const message = res.data.message;
        this.setState({
          message,
          isFetching: true,
        }, () => this.getUser(accountantId, this.state.month, this.state.year, this.state.userType));
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  };


  componentWillMount() {
    let accountantId = localStorage.getItem('userId')
    this.getUser(accountantId, this.state.month, this.state.year, this.state.userType)
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
    let accountantId = localStorage.getItem('userId')

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
    }, () => this.getUser(accountantId, this.state.month, this.state.year, this.state.userType))
  }

  statusChangeHandler = (event) => {
    let id = event.target.id
    let status = event.target.checked
    this.setState({
      isFetching: true,
    }, () => this.statusUpdate(id, status));
  };

  render() {
    const columns = [
      //   {
      //   Header: 'Serial No.',
      //   accessor: '_id',
      //   Cell: row => (
      //     <div className="onClick-cell-r" onClick={() => { this.props.history.push('/userDetails/' + row.original._id) }}>{row.original._id}</div>
      //   ),
      //   width: 100,
      // },
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
            // <div className="table-status-pending-r">
            // Pending
            // </div>
            <div>
              <input id={row.original._id} onChange={this.statusChangeHandler} checked={row.original.status} className="status-button-r" type="checkbox" />
            </div>
          )
      },
      {
        Header: 'Actions',
        sortable: false,
        width: 150,
        Cell: row =>
          (<div>
            {/* <a className="infoButton-r" onClick={() => { this.props.history.push('/userDetails/' + row.original._id) }}><i className="fa fa-info" aria-hidden="true"></i></a> */}
            <span className="editButton-r" data-tip data-for="edit" onClick={() => { this.props.history.push('/addOrEditUser/' + row.original._id) }}><i className="far fa-edit"></i><ReactTooltip id="edit" type="dark" ><div className="tooltipText"><p>Edit</p></div></ReactTooltip></span>
            {/* <button id={row.original._id} onClick={this.confirmModalHandler} className="deleteButton-r far fa-trash-alt"></button> */}
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

        {/* <div className={this.state.showHideClassName} >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header background-color-r">
                <span className="text-color-white-r" >Status Password</span>
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
                <div className="reset-form-padding-r">
                  <form onSubmit={this.submitStatusChangeHandler}>
                    <input type="text"
                      value={this.state.status}
                      id="status"
                      className="form-control reset-input-box-r"
                      placeholder="Status Password"
                      onChange={this.statusChangeHandler}
                      required />
                    <div className="text-align-center-r">
                      <button className="btn btn-primary btn-text-r">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> */}


        <div className="container outer-box-r">
          <div>
            <ul className="breadCrumb-bg-r">
              <li className="breadCrumb-li-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
            </ul>
          </div>
          <div className="container filter-year-month-r">
            <div className="row">
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="year" onChange={this.nameChangeHandler} value={this.state.year} className="year-month-border-r"
                  name="lectureId">
                  <option value="">Select Year</option>
                  <option value="2020">2020-2021</option>
                  <option value="2019">2019-2020</option>
                  <option value="2018">2018-2019</option>
                  <option value="2017">2017-2018</option>
                </select>
              </div>
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="month" onChange={this.nameChangeHandler} value={this.state.month} className="year-month-border-r"
                  name="lectureId">
                  <option value="">Select Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="userType" onChange={this.nameChangeHandler} value={this.state.userType} className="year-month-border-r"
                  name="lectureId">
                  <option value="">Select User</option>
                  <option value="all">All Users</option>
                  <option value="withData">User with Data</option>
                  <option value="withoutData">User without Data</option>
                  <option value="completed">Status Completed</option>
                  <option value="pending">Status Pending</option>
                  <option value="inActive">InActive</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>
          </div>
          <div className="container">
            <button type="button" onClick={() => { this.props.history.push('/addOrEditUser') }} className="button-base-r newEntry-r">New User</button>
          </div>
          <div className="container">
            <div className="customReactTableBox">
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
            </div>
          </div>
        </div>
      </div>
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
