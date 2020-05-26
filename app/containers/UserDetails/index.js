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
    reactTableData: []
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

  getUserBillSummary = (userId, month, year) => {
    axios.get(`http://localhost:3000/userBillSummary/${userId}/${month}/${year}`)
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
        this.setState({ userBillSummary, reactTableData, isFetching: false });
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  };

  postReport = (id, formData) => {
    if (this.state.reportType === "daily") {
      axios.post(`http://localhost:3000/dailyReport/${id}/${this.state.month}/${this.state.year}`, formData)
        .then((res) => {
          const message = res.data.message;
          this.setState({
            message,
            isFetching: false,
            type: "success",
            isOpenClassName: 'modal display-block container',
            reportType: ""
          }, () => setTimeout(this.modalTime, 1500))
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
    else {
      axios.post(`http://localhost:3000/gstReport/${id}/${this.state.month}/${this.state.year}`, formData)
        .then((res) => {
          const message = res.data.message;
          this.setState({
            message,
            isFetching: false,
            type: "success",
            isOpenClassName: 'modal display-block container',
            reportType: ""
          }, () => setTimeout(this.modalTime, 1500))
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
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
    var output = document.getElementById('output');
    output.src = "";
    this.setState({
      isResetModal: false,
      showHideClassName: 'modal display-none container',
    })
  }

  loadFile = (event) => {
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
      reportType
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
      isFetching: true
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
              <input style={{ display: "none" }}
                accept="image/*"
                onChange={this.loadFile}
                id="daily"
                type="file"
                required />

              <div><button type="button" className="button-base-r width-50-r">
                <label className="cursor-pointer-r margin-0-r" htmlFor="daily">Browse</label>
              </button></div>
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
                <div className="reset-form-padding-r">
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
                  <p className="main-title-r">{this.state.userBillSummary && this.state.userBillSummary.legalName + " Details"}</p>
                </div>
                <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                  <p className="sub-title-r">({this.state.userBillSummary && this.state.userBillSummary.mobileNumber})</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container filter-year-month-r">
            <div className="row">
              <div className="col-xs-12 col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <select id="year" value={this.state.year} onChange={this.nameChangeHandler} className="year-month-border-r" name="lectureId">
                    <option value="">Select Year</option>
                    <option value="2020">2020-2021</option>
                    <option value="2019">2019-2020</option>
                    <option value="2018">2018-2019</option>
                    <option value="2017">2017-2018</option>
                  </select>
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <select id="month" value={this.state.month} onChange={this.nameChangeHandler} className="year-month-border-r" name="lectureId">
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
              </div>
              <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 button-margin-top">
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <button type="button" onClick={() => { this.props.history.push(`/userDetails/${this.props.match.params.id}/manageAccountantReports/gst/${this.state.month}/${this.state.year}`) }} className="button-base-r">view GST Reports</button>
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <input style={{ display: "none" }} accept="image/*" onChange={this.loadFile} id="gst"
                    type="file" required />
                  <div><button type="button" className="button-base-r">
                    <label className="cursor-pointer-r margin-0-r font-11-r" htmlFor="gst">Upload GST Report</label>
                  </button></div>
                </div>
              </div>

            </div>
          </div>

          <div className="container">
            <div className="customReactTableBox">
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
