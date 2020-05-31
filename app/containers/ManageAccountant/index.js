/**
 *
 * ManageAccountant
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
import makeSelectManageAccountant from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ConfirmModal from '../../components/ConfirmModal/Loadable'
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import moment from 'moment';
import MessageModal from '../../components/MessageModal/Loadable'

/* eslint-disable react/prefer-stateless-function */
export class ManageAccountant extends React.Component {

  state = {
    showHideClassName: 'modal display-none container',
    month: 1,
    year: 2020,
    accountantType: "all",
    isFetching: true,
    isOpenClassName: 'modal display-none container',
    accountants: []
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
    this.setState({ errorMes, isFetching: false, isOpenClassName: 'modal display-block container', type: "failure" }, () => setTimeout(this.modalTime, 1500)
    );
  }

  getAccountant = (month, year, accountantType) => {
    // axios.get(`https://gst-service-uat.herokuapp.com/accountants/${month}/${year}/${accountantType}`)
    axios.get(`https://gst-service-uat.herokuapp.com/accountants/${month}/${year}`)
      .then((res) => {
        const accountants = res.data.data;
        this.setState({ accountants, isFetching: false });
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  };

  statusUpdate = (id, status) => {
    axios.put(`https://gst-service-uat.herokuapp.com/changeStatus/${id}`, { 'status': status })
      .then((res) => {
        const message = res.data.message;
        this.setState({
          message,
          isFetching: true,
        }, () => this.getAccountant(this.state.month, this.state.year));
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  };

  deleteAccountant = (id) => {
    axios.delete(`https://gst-service-uat.herokuapp.com/accountant/${id}`)
      .then((res) => {
        const deletedMessage = res.data.message;
        this.setState({
          deletedMessage,
          isLoading: false,
          type: "success",
          isOpenClassName: 'modal display-block container'
        }, () => this.getAccountant(this.state.month, this.state.year), setTimeout(this.modalTime, 1500))
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  };


  componentWillMount() {
    // this.getAccountant(this.state.month, this.state.year, this.state.accountantType)
    this.getAccountant(this.state.month, this.state.year)
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
      isLoading: true
    })
  }

  nameChangeHandler = (event) => {
    let year = this.state.year
    let month = this.state.month
    let accountantType = this.state.accountantType
    let id = event.target.id

    if (id === "year") {
      year = event.target.value
    }
    else if (id === "month") {
      month = event.target.value
    }
    else if (id === "accountantType") {
      accountantType = event.target.value
    }

    this.setState({
      year, month, accountantType, isFetching: true,
    }, () => this.getAccountant(this.state.month, this.state.year, this.state.accountantType))
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
      //   accessor: 'userId',
      //   // filterable : true,
      //   width: 100,
      //   Cell: row => (
      //     <div className="onClick-cell-r" onClick={() => { this.props.history.push('/manageUser/' + row.original._id) }}>{row.original._id}</div>
      //   )
      // },
      {
        Header: 'Created At',
        accessor: 'timestamp',
        width: 200,
        Cell: row => (
          <div className="onClick-cell-r">{moment(row.original.timestamp).format("DD MMM YYYY HH:mm")}</div>
          // <div className="onClick-cell-r" onClick={() => { this.props.history.push(`/manageUser/${row.original._id}`) }}>{moment(row.original.timestamp).format("DD MMM YYYY HH:mm")}</div>
        )
      },
      {
        Header: 'Accountant Id',
        accessor: 'accountantId',
        width: 150,
        filterable: true,
        Cell: row => (
          <div className="onClick-cell-r">{row.original.accountantId}</div>
        )
      },
      {
        Header: 'Name',
        accessor: 'name',
        filterable: true,
        Cell: row => (
          <div className="onClick-cell-r">{row.original.firstName + " " + row.original.middleName + " " + row.original.lastName}</div>
        )
      },
      {
        Header: 'Mobile Number',
        accessor: 'mobileNumber',
        // filterable: true,
        Cell: row => (
          <div className="onClick-cell-r">{row.original.mobileNumber}</div>
        )
      },
      // {
      //   Header: 'Status',
      //   accessor: 'status',
      //   width: 80,
      //   Cell: row =>
      //     (
      //       <div>
      //         {/* <input checked={row.original.status == "completed"} data-toggle="modal" data-target="#statusPassword" className="status-button-r" type="checkbox" /> */}
      //         <input id={row.original._id} onChange={this.statusChangeHandler} checked={row.original.status} className="status-button-r" type="checkbox" />

      //       </div>
      //     )
      // },
      {
        Header: 'Actions',
        sortable: false,
        width: 150,
        Cell: row =>
          (<div>
            {/* <a className="infoButton-r" onClick={() => { this.props.history.push('/manageUser/' + row.original.userId) }}><i className="fa fa-info" aria-hidden="true"></i></a> */}
            <span className="editButton-r" data-tip data-for="edit" onClick={() => { this.props.history.push('/addOrEditaccountant/' + row.original._id) }}><i className="far fa-edit" /><ReactTooltip id="edit" type="dark" ><div className="tooltipText"><p>Edit</p></div></ReactTooltip></span>
            <span className="deleteButton-r" data-tip data-for="delete" onClick={() => this.confirmModalHandler(row.original._id)}><i className="far fa-trash-alt" /><ReactTooltip id="delete" type="dark" ><div className="tooltipText"><p>Delete</p></div></ReactTooltip></span>
          </div>
          )
      },
    ]
    return (
      <div>
        <Helmet>
          <title>ManageAccountant</title>
          <meta name="description" content="Description of ManageAccountant" />
        </Helmet>

        <ConfirmModal
          showHideClassName={this.state.showHideClassName}
          onClose={this.modalCloseHandler}
          onConfirm={() => this.confirmDeleteData(this.state.deleteId)}
        />

        <MessageModal
          showHideClassName={this.state.isOpenClassName}
          modalType={this.state.type}
          message={this.state.deletedMessage}
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
                  <option disabled={true} value="0">Select Year</option>
                  <option value="2020">2020-2021</option>
                  <option value="2019">2019-2020</option>
                  <option value="2018">2018-2019</option>
                  <option value="2017">2017-2018</option>
                </select>
              </div>
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="month" onChange={this.nameChangeHandler} value={this.state.month} className="year-month-border-r"
                  name="lectureId">
                  <option disabled={true} value="0">Select Month</option>
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
                <select disabled={true} id="accountantType" onChange={this.nameChangeHandler} value={this.state.accountantType} className="year-month-border-r"
                  name="lectureId">
                  <option disabled={true} value="0">Select accountant</option>
                  <option value="all">All accountants</option>
                  <option value="withData">accountant with Data</option>
                  <option value="withoutData">accountant without Data</option>
                  <option value="completed">Status Completed</option>
                  <option value="pending">Status Pending</option>
                  <option value="inActive">InActive</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>
          </div>
          <div className="container">
            <button type="button" onClick={() => { this.props.history.push('/addOrEditAccountant') }} className="button-base-r newEntry-r">New Accountant</button>
          </div>
          <div className="container">
            <div className="customReactTableBox">
              <ReactTable
                className="customReactTable"
                data={this.state.accountants}
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

ManageAccountant.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageAccountant: makeSelectManageAccountant(),
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

const withReducer = injectReducer({ key: 'manageAccountant', reducer });
const withSaga = injectSaga({ key: 'manageAccountant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageAccountant);
