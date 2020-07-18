/**
 *
 * UserDetails
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
import makeSelectUserDetails from './selectors';
import reducer from './reducer';
import saga from './saga';
import moment from 'moment';
import messages from './messages';
import axios from 'axios';

import MessageModal from '../../components/MessageModal/Loadable'
import { errorHandler } from '../../utils/commonUtils';

/* eslint-disable react/prefer-stateless-function */
export class UserDetails extends React.Component {

  state = {
    payload: {
      oldPassword: "",
      newPassword: ""
    },
    isOpenClassName: 'modal display-none container',
    isFetching: true,
    showHideClassName: 'modal display-none container',
    comment: "",
    browseReport: [],
    report: [],
    month: this.props.match.params.month,
    year: this.props.match.params.year,
    userBillSummary: {},
    reactTableData: [],
    isLoading: true
  }


  getUserBillSummary = (userId, month, year) => {
    let url = window.API_URL + `/userBillSummary/${userId}/${month}/${year}`
    axios.get(url)
      .then((res) => {
        const userBillSummary = res.data.data;
        let reactTableData = Object.entries(userBillSummary.summary[0]).map(val => {
          if (val) {
            val[0] = this.replaceAll(val[0], '/', '-')
            return {
              "date": val[0],
              "purchaseBills": val[1].purchaseBills,
              "saleBills": val[1].saleBills,
              "otherBills": val[1].otherBills,
            }
          }
        })
        reactTableData = reactTableData[0] == undefined ? [] : reactTableData
        this.setState({ userBillSummary, reactTableData, isFetching: false, isLoading: false });
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure",
          isFetching: false,
          isLoading: false,
        })
      });
  };

  postReport = (id, formData) => {
    if (this.state.reportType === "daily") {
      let url = window.API_URL + `/dailyReport/${id}/${this.state.month}/${this.state.year}/${this.state.date}`
      axios.post(url, formData)
        .then((res) => {
          const data = res.data.data;
          this.setState({
            message: res.data.message,
            type: "success",
            isOpenClassName: 'modal display-block container',
            reportType: "",
            comment: ""
          }, () => setTimeout(this.modalTime, 1500))
        })
        .catch((error) => {
          let message = errorHandler(error);
          this.setState({
            message,
            isOpenClassName: 'modal display-block container',
            type: "failure",
            isFetching: false,
            isLoading: false,
          }, () => setTimeout(this.modalTime, 1500))
        });
    }
    else {
      let url = window.API_URL + `/gstReport/${id}/${this.state.month}/${this.state.year}`
      axios.post(url, formData)
        .then((res) => {
          const data = res.data.data;
          this.setState({
            message: res.data.message,
            isFetching: false,
            type: "success",
            isOpenClassName: 'modal display-block container',
            reportType: "",
            comment: ""
          }, () => setTimeout(this.modalTime, 1500))
        })
        .catch((error) => {
          let message = errorHandler(error);
          this.setState({
            message,
            isOpenClassName: 'modal display-block container',
            type: "failure",
            isFetching: false,
            isLoading: false,
          }, () => setTimeout(this.modalTime, 1500))
        });
    }
  };

  componentWillMount() {
    let id = this.props.match.params.id
    this.getUserBillSummary(id, this.props.match.params.month, this.props.match.params.year)
  }

  replaceAll(string, search, replace) {
    return string.split(search).join(replace);
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
      comment: ""
    })
  }

  loadFile = (event, date) => {
    let browseReport = []
    let report = []
    let reportType = event.target.id
    for (let i = 0; i < event.target.files.length; i++) {
      report.push(event.target.files[i])
      browseReport.push(URL.createObjectURL(event.target.files[i]))
    }
    this.setState({
      browseReport,
      report,
      showHideClassName: 'modal display-block container',
      reportType,
      date
    })
  };

  reportUploadHandler = (event) => {
    event.preventDefault()
    var formData = new FormData();
    formData.append('comment', this.state.comment);
    formData.append('report', this.state.report[0]);
    this.setState({
      browseReport: [],
      report: [],
      showHideClassName: 'modal display-none container',
    }, () => this.postReport(this.props.match.params.id, formData))
  }

  nameChangeHandler = (event) => {
    let id = event.target.id
    let year = this.props.match.params.year
    let month = this.props.match.params.month
    let userId = this.props.match.params.id
    if (id === "year") {
      year = event.target.value
    }
    else if (id === "month") {
      month = event.target.value
    }
    this.setState({
      year, month, isFetching: true
    }, () => this.getUserBillSummary(userId, this.state.month, this.state.year))
  }

  commentChangeHandler = (event) => {
    let comment = this.state.comment
    comment = event.target.value
    this.setState({
      comment
    })
  }


  render() {
    const columns = [
      {
        Header: 'Created At',
        accessor: 'date',
        sortable: false,
      },
      {
        Header: 'Purchase Bills',
        accessor: 'purchaseBills',
        sortable: false,
        // filterable: true,
        Cell: row =>
          <span className="view-reports-r" onClick={() => this.props.history.push(`/userDetails/${this.props.match.params.id}/userBillDetails/purchase/${this.state.month}/${this.state.year}/${row.original.date}`)}>{(row.original.purchaseBills.complete) + "/" + (row.original.purchaseBills.total)}</span>
      },
      {
        Header: 'Sale Bills',
        accessor: 'saleBills',
        sortable: false,
        // filterable: true,
        Cell: row =>
          <span className="view-reports-r" onClick={() => this.props.history.push(`/userDetails/${this.props.match.params.id}/userBillDetails/sale/${this.state.month}/${this.state.year}/${row.original.date}`)}>{(row.original.saleBills.complete) + "/" + (row.original.saleBills.total)}</span>
      },
      {
        Header: 'Other',
        accessor: 'other',
        sortable: false,
        // filterable: true,
        Cell: row =>
          <span className="view-reports-r" onClick={() => this.props.history.push(`/userDetails/${this.props.match.params.id}/userBillDetails/other/${this.state.month}/${this.state.year}/${row.original.date}`)}>{(row.original.otherBills.complete) + "/" + (row.original.otherBills.total)}</span>
      },
      {
        Header: 'Daily Reports',
        sortable: false,
        // accessor: 'dailyReports',
        // filterable: true,
        Cell: row =>
          (
            <div>
              <p className="view-reports-r" onClick={() => { this.props.history.push(`/userDetails/${this.props.match.params.id}/manageAccountantReports/daily/${this.state.month}/${this.state.year}/${row.original.date}`) }}>View</p>
            </div>
          )
      },
      {
        Header: 'Upload Summary',
        sortable: false,
        // accessor: 'legalName',
        // filterable: true,
        Cell: row =>
          (
            <div>
              <input
                onChange={() => this.loadFile(event, row.original.date)}
                id="daily"
                type="file"
                className="button-base-r width-80-r"
                required />

              {/* <div><button type="button" className="button-base-r width-80-r">
          <label className="cursor-pointer-r margin-0-r" htmlFor="daily">{row.original.date}</label>
              </button></div> */}
            </div>
          )
      },
    ]
    return (
      <div>
        <Helmet>
          <title>UserDetails</title>
          <meta name="description" content="Description of UserDetails" />
        </Helmet>

        <MessageModal
          showHideClassName={this.state.isOpenClassName}
          modalType={this.state.type}
          message={this.state.message}
          onClose={this.modalCloseHandler}
        />

        <div className={this.state.showHideClassName} >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header background-color-r">
                <span className="text-color-white-r">Upload Report</span>
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
                <div className="margin-20-r">
                  <form onSubmit={this.reportUploadHandler}>
                    <div>
                      <img src={this.state.browseReport.length > 0 ? this.state.browseReport[0] : ""} className="upload-modal-r" />
                      <textarea rows="2" id="comment" placeholder="comments if any .." onChange={this.commentChangeHandler} value={this.state.comment} className="form-control reset-input-box-r"
                        placeholder="comments.." required />
                    </div>
                    <div className="text-align-center-r">
                      <button className="button-base-r width-40-r">Upload</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isLoading ?
          <div className="lds-facebook"><div></div><div></div><div></div><span className="loading-text-r">Loading... </span></div>
          :
          <div className="container outer-box-r">
            <div>
              <ul className="breadCrumb-bg-r">
                <li onClick={() => this.props.history.push('/manageUser')} className="breadCrumb-li-child-1-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
                <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >User Details</span></li>
              </ul>
            </div>
            <div className="container margin-10-r">
              <div className="row">
                <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                    <p className="text-align-center-r"><span className="main-title-r">{this.state.userBillSummary && this.state.userBillSummary.legalName + " Details"}</span><span className="sub-title-r"> ({this.state.userBillSummary && this.state.userBillSummary.mobileNumber})</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container filter-year-month-r">
              <div className="row">
                <div className="col-xs-12 col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <select id="year" value={this.state.year} onChange={this.nameChangeHandler} className="year-month-border-r" name="lectureId">
                      <option disabled={true} value="0">Select Year</option>
                      <option value="2020">2020-2021</option>
                      <option value="2019">2019-2020</option>
                      <option value="2018">2018-2019</option>
                      <option value="2017">2017-2018</option>
                    </select>
                  </div>
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <select id="month" value={this.state.month} onChange={this.nameChangeHandler} className="year-month-border-r" name="lectureId">
                      <option disabled={true} value="">Select Month</option>
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
                </div>
                <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 button-margin-top">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <button type="button" onClick={() => { this.props.history.push(`/userDetails/${this.props.match.params.id}/manageAccountantReports/gst/${this.state.month}/${this.state.year}`) }} className="button-base-r">view GST Reports</button>
                  </div>
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input style={{ display: "none" }} onChange={this.loadFile} id="gst"
                      type="file" required />
                    <div><button type="button" className="button-base-r">
                      <label className="cursor-pointer-r margin-0-r font-11-r" htmlFor="gst">Upload GST Report</label>
                    </button></div>
                  </div>
                </div>

              </div>
            </div>

            <div className="container">
              {/* <div className="customReactTableBox">
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
              </div> */}
              <ul>
                {this.state.isFetching ? <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
                  this.state.reactTableData.length > 0 ?
                    this.state.reactTableData.map((val, index) => <li key={index} className="li-outer">
                      <span className="li-image-icon">
                        <img className="li-image" src={require('../../assets/img/download.png')} />
                      </span>
                      <div className="li-content-p">
                        <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <span className="li-content-title">
                              Created At :
                  </span>
                            <span className="li-content">
                              {val.date}
                            </span>
                          </div>
                          <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <span className="li-content-title">
                              Purchase Bills :
                  </span>
                            <span className="li-content">
                              <span className="view-reports-r" onClick={() => this.props.history.push(`/userDetails/${this.props.match.params.id}/userBillDetails/purchase/${this.state.month}/${this.state.year}/${val.date}`)}>{(val.purchaseBills.complete) + "/" + (val.purchaseBills.total)}</span>
                            </span>
                          </div>
                          <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <span className="li-content-title">
                              Sale :
                  </span>
                            <span className="li-content">
                              <span className="view-reports-r" onClick={() => this.props.history.push(`/userDetails/${this.props.match.params.id}/userBillDetails/sale/${this.state.month}/${this.state.year}/${val.date}`)}>{(val.saleBills.complete) + "/" + (val.saleBills.total)}</span>
                            </span>
                          </div>
                          <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <span className="li-content-title">
                              Other :
                  </span>
                            <span className="li-content">
                              <span className="view-reports-r" onClick={() => this.props.history.push(`/userDetails/${this.props.match.params.id}/userBillDetails/other/${this.state.month}/${this.state.year}/${val.date}`)}>{(val.otherBills.complete) + "/" + (val.otherBills.total)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="download-view-btn-grp">
                        <span className="margin-10-lr-r">
                          <p className="view-reports-r" onClick={() => { this.props.history.push(`/userDetails/${this.props.match.params.id}/manageAccountantReports/daily/${this.state.month}/${this.state.year}/${val.date}`) }}>View</p>
                        </span>
                        <input
                          onChange={() => this.loadFile(event, val.date)}
                          id="daily"
                          type="file"
                          className="button-base-r width-80-r"
                          required />
                      </span>
                    </li>
                    )
                    :
                    <div className="li-outer"><span className="no-data-text">No Data Found</span></div>
                }
              </ul>
            </div>
          </div>
        }
      </div>
    );
  }
}

UserDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userDetails: makeSelectUserDetails(),
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

const withReducer = injectReducer({ key: 'userDetails', reducer });
const withSaga = injectSaga({ key: 'userDetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserDetails);
