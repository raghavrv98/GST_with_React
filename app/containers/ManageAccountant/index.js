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
/* eslint-disable react/prefer-stateless-function */
export class ManageAccountant extends React.Component {

  state = {
    accountantList: [{
      "userId": 1,
      "accountantDetails": {
        "year": "2017",
        "month": "january",
        "status": "pending",
        "state": "inActive",
        "timestamp": "09-04-2020",
        "accountantId": "1001",
        "name": "John",
        "mobileNumber": "0000000000"
      }
    },
    {
      "userId": 2,
      "accountantDetails": {
        "year": "2018",
        "month": "february",
        "status": "completed",
        "state": "active",
        "timestamp": "09-04-2020",
        "accountantId": "1002",
        "name": "Jacob",
        "mobileNumber": "1111111111"
      }
    },
    {
      "userId": 3,
      "accountantDetails": {
        "year": "2019",
        "month": "march",
        "status": "completed",
        "state": "active",
        "timestamp": "09-04-2020",
        "accountantId": "1003",
        "name": "Michel",
        "mobileNumber": "2222222222"
      }
    },
    {
      "userId": 3,
      "accountantDetails": {
        "year": "2019",
        "month": "march",
        "status": "completed",
        "state": "active",
        "timestamp": "09-04-2020",
        "accountantId": "1003",
        "name": "Michel",
        "mobileNumber": "2222222222"
      }
    },
    {
      "userId": 3,
      "accountantDetails": {
        "year": "2019",
        "month": "march",
        "status": "completed",
        "state": "active",
        "timestamp": "09-04-2020",
        "accountantId": "1003",
        "name": "Michel",
        "mobileNumber": "2222222222"
      }
    },
    {
      "userId": 3,
      "accountantDetails": {
        "year": "2019",
        "month": "march",
        "status": "completed",
        "state": "active",
        "timestamp": "09-04-2020",
        "accountantId": "1003",
        "name": "Michel",
        "mobileNumber": "2222222222"
      }
    },
    {
      "userId": 3,
      "accountantDetails": {
        "year": "2019",
        "month": "march",
        "status": "completed",
        "state": "active",
        "timestamp": "09-04-2020",
        "accountantId": "1003",
        "name": "Michel",
        "mobileNumber": "2222222222"
      }
    }
    ],
    reports: [{
      userId: 1,
      userBills: [{
        year: "2017",
        month: "january",
        type: "purchase",
        docs: [{
          doc_Url: "image_url",
          timestamp: "09-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "09-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "09-04-2020"
        },
        {
          doc_Url: "pdf_url",
          timestamp: "09-04-2020"
        }
        ]
      },
      {
        year: "2017",
        month: "january",
        type: "sales",
        docs: [{
          doc_Url: "image_url",
          timestamp: "09-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "09-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "09-04-2020"
        },
        {
          doc_Url: "pdf_url",
          timestamp: "09-04-2020"
        }
        ]
      },
      {
        year: "2017",
        month: "january",
        type: "other",
        docs: [{
          doc_Url: "image_url",
          timestamp: "09-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "09-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "09-04-2020"
        },
        {
          doc_Url: "pdf_url",
          timestamp: "09-04-2020"
        }
        ]
      }
      ]
    },
    {
      userId: 2,
      userBills: [{
        year: "2018",
        month: "february",
        type: "purchase",
        docs: [{
          doc_Url: "image_url",
          timestamp: "10-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "10-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "10-04-2020"
        },
        {
          doc_Url: "pdf_url",
          timestamp: "10-04-2020"
        }
        ]
      },
      {
        year: "2018",
        month: "february",
        type: "sales",
        docs: [{
          doc_Url: "image_url",
          timestamp: "10-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "10-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "10-04-2020"
        },
        {
          doc_Url: "pdf_url",
          timestamp: "10-04-2020"
        }
        ]
      },
      {
        year: "2018",
        month: "february",
        type: "other",
        docs: [{
          doc_Url: "image_url",
          timestamp: "10-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "10-04-2020"
        },
        {
          doc_Url: "image_url",
          timestamp: "10-04-2020"
        },
        {
          doc_Url: "pdf_url",
          timestamp: "10-04-2020"
        }
        ]
      }
      ]
    },
    {
      userId: 3,
      userBills: []
    }],
    payload: {
      year: "2020",
      month: "january",
      userType: "all",
    },
    filteredData: [],
    reactTableData: [],
    isFetching: false,
    showHideClassName: 'modal display-none container',
  }

  componentWillMount() {
    setTimeout(this.loadingTime, 500);
    let filteredData = JSON.parse(JSON.stringify(this.state.accountantList))
    var reactTableData = filteredData.map(val => {
      return {
        userId: val.userId,
        accountantId: val.accountantDetails.accountantId,
        name: val.accountantDetails.name,
        mobileNumber: val.accountantDetails.mobileNumber,
        status: val.accountantDetails.status
      }
    })
    this.setState({
      reactTableData
    })
  }

  loadingTime = () => {
    this.setState({
      isFetching: false
    })
  }

  nameChangeHandler = (event) => {
    var filteredData = []
    let payload = JSON.parse(JSON.stringify(this.state.payload))
    payload[event.target.id] = event.target.value
    if (event.target.id == "year") {
      filteredData = this.state.accountantList.filter(val => val.accountantDetails.year == event.target.value);
      payload.month = ""
      payload.userType = ""
    }
    else if (event.target.id == "month") {
      filteredData = this.state.accountantList.filter(val => val.accountantDetails.month == event.target.value);
      payload.year = ""
      payload.userType = ""
    }
    else if (event.target.id == "userType") {
      if (event.target.value == "completed" || event.target.value == "pending") {
        filteredData = this.state.accountantList.filter(val => val.accountantDetails.status == event.target.value);
      }

      else if (event.target.value == "active" || event.target.value == "inActive") {
        filteredData = this.state.accountantList.filter(val => val.accountantDetails.state == event.target.value);
      }

      else if (event.target.value == "withData" || event.target.value == "withoutData") {

        if (event.target.value == "withData") {
          filteredData = this.state.reports.map(val => { if (val.userBills.length > 0) return val.userId });
          filteredData = filteredData.filter(val => { if (val != undefined) return val });
          filteredData = this.state.accountantList.filter(val => filteredData.includes(val.userId))
        }
        else {
          filteredData = this.state.reports.map(val => { if (val.userBills.length == 0) return val.userId });
          filteredData = filteredData.filter(val => { if (val != undefined) return val });
          filteredData = this.state.accountantList.filter(val => filteredData.includes(val.userId))
        }

      }
      else if (event.target.value == "all")
        filteredData = this.state.accountantList;

      else
        filteredData = []
      payload.year = ""
      payload.month = ""
    }
    var reactTableData = filteredData.map(val => {
      return {
        userId: val.userId,
        accountantId: val.accountantDetails.accountantId,
        name: val.accountantDetails.name,
        mobileNumber: val.accountantDetails.mobileNumber,
        status: val.accountantDetails.status
      }
    })

    this.setState({
      payload,
      reactTableData
    })
  }

  confirmModalHandler = (event) => {
    let id = event.target.id
    this.setState({
      showHideClassName: 'modal display-block container',
      deleteId: id,
      deleteName: name
    })
  }

  modalCloseHandler = () => {
    this.setState({
      isResetModal: false,
      showHideClassName: 'modal display-none container',
      deleteId: "",
      deleteName: ""
    })
  }


  confirmDeleteData = (id) => {
    event.preventDefault()
    this.setState({
      showHideClassName: 'modal display-none container',
    })
  }

  statusHandler = (event) => {
    let id = event.target.id
    this.setState({
      showHideClassName: 'modal display-block container',
      statusId: id,
    })
  }

  statusChangeHandler = event => {
    let statusPayload = JSON.parse(JSON.stringify(this.state.statusPayload));
    statusPayload[event.target.id] = event.target.value;
    this.setState({
      statusPayload,
    });
  };

  submitStatusChangeHandler = (statusPayload) => {
    event.preventDefault()
    this.setState({
    })
  }



  render() {
    const columns = [{
      Header: 'Serial No.',
      accessor: 'userId',
      // filterable : true,
      width: 100,
      Cell: row =>(
        <div className="onClick-cell-r" onClick={() => { this.props.history.push('/manageUser/' + row.original.userId) }}>{row.original.userId}</div>
        )
    },
    {
      Header: 'Accountant Id',
      accessor: 'accountantId',
      width: 150,
      filterable: true,
      Cell: row =>(
        <div className="onClick-cell-r" onClick={() => { this.props.history.push('/manageUser/' + row.original.userId) }}>{row.original.accountantId}</div>
        )
    },
    {
      Header: 'Name',
      accessor: 'name',
      filterable: true,
      Cell: row =>(
        <div className="onClick-cell-r" onClick={() => { this.props.history.push('/manageUser/' + row.original.userId) }}>{row.original.name}</div>
        )
    },
    {
      Header: 'Mobile Number',
      accessor: 'mobileNumber',
      // filterable: true,
      Cell: row =>(
        <div className="onClick-cell-r" onClick={() => { this.props.history.push('/manageUser/' + row.original.userId) }}>{row.original.mobileNumber}</div>
        )
    },
    {
      Header: 'Status',
      accessor: 'status',
      width: 80,
      Cell: row =>
        (
          <div>
            {/* <input checked={row.original.status == "completed"} data-toggle="modal" data-target="#statusPassword" className="status-button-r" type="checkbox" /> */}
            <input id={row.original.userId} onChange={this.statusHandler} checked={row.original.status == "completed"} className="status-button-r" type="checkbox" />
          
          </div>
        )
    },
    {
      Header: 'Actions',
      sortable: false,
      width: 150,
      Cell: row =>
        (<div>
          {/* <a className="infoButton-r" onClick={() => { this.props.history.push('/manageUser/' + row.original.userId) }}><i className="fa fa-info" aria-hidden="true"></i></a> */}
          <span className="editButton-r" data-tip data-for="edit" onClick={() => { this.props.history.push('/addOrEditaccountant/' + row.original.userId) }}><i className="far fa-edit" /><ReactTooltip id="edit" type="dark" ><div className="tooltipText"><p>Edit</p></div></ReactTooltip></span>
          <a className="deleteButton-r" data-tip data-for="delete" onClick={this.confirmModalHandler} ><i className="far fa-trash-alt" /><ReactTooltip id="delete" type="dark" ><div className="tooltipText"><p>Delete</p></div></ReactTooltip></a>
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
          onConfirm={() => this.confirmDeleteData(this.state.deleteId, this.state.deleteName)}
        />

<div className={this.state.showHideClassName} >
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
          </div>
        <div className="container outer-box-r">
          <div className="container filter-year-month-r">
            <div className="row">
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="year" onChange={this.nameChangeHandler} value={this.state.payload.year} className="year-month-border-r"
                  name="lectureId">
                  <option value="">Select Year</option>
                  <option value="2017">2017-2018</option>
                  <option value="2018">2018-2019</option>
                  <option value="2019">2019-2020</option>
                  <option value="2020">2020-2021</option>
                </select>
              </div>
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="month" onChange={this.nameChangeHandler} value={this.state.payload.month} className="year-month-border-r"
                  name="lectureId">
                  <option value="">Select Month</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </select>
              </div>
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="userType" onChange={this.nameChangeHandler} value={this.state.payload.userType} className="year-month-border-r"
                  name="lectureId">
                  <option value="">Select accountant</option>
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
              {console.log('{this.state.reactTableData}: ', this.state.reactTableData)}
              <ReactTable
                className="customReactTable"
                data={this.state.reactTableData}
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
