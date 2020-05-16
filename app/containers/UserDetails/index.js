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

/* eslint-disable react/prefer-stateless-function */
export class UserDetails extends React.Component {

  state = {
    tabActive: true,
    isActiveTab: "purchaseBills",
    payload: {
      oldPassword: "",
      newPassword: ""
    },
    userDetails: [{
      userId: 1,
      timestamp: 1586706724000,
      legalName: "Ram",
      mobileNumber: "999-999-999",
      purchaseBills: [{ timestamp: 100000, url: "qqqqq" }, { timestamp: 100000, url: "qqqqq" }],
      saleBills: [{ timestamp: 100000, url: "qqqqq" }, { timestamp: 100000, url: "qqqqq" }],
      other: [{ timestamp: 100000, url: "qqqqq" }, { timestamp: 100000, url: "qqqqq" }],
      dailyReports: [{ timestamp: 100000, url: "qqqqq" }, { timestamp: 100000, url: "qqqqq" }]
    },
    {
      userId: 2,
      timestamp: 1586706724000,
      legalName: "shyam",
      mobileNumber: "999-999-999",
      purchaseBills: [{ timestamp: 100000, url: "qqqqq" }, { timestamp: 100000, url: "qqqqq" }],
      saleBills: [{ timestamp: 100000, url: "qqqqq" }, { timestamp: 100000, url: "qqqqq" }],
      other: [{ timestamp: 100000, url: "qqqqq" }, { timestamp: 100000, url: "qqqqq" }],
      dailyReports: [{ timestamp: 100000, url: "qqqqq" }, { timestamp: 100000, url: "qqqqq" }]
    },
    {
      userId: 3,
      timestamp: null,
      legalName: "Rohan",
      mobileNumber: "999-999-999",
      purchaseBills: [],
      saleBills: [],
      other: [],
      dailyReports: []
    }
    ],
    filteredData: [],
    reactTableData: [],
    isFetching: false,
    uploadGstReports : [],
    uploadDailyReports : [],
    showHideClassName: 'modal display-none container',
    outputImage :"",
    id:""
  }

  componentWillMount() {
    let id = this.props.match.params.id
    let userDetails = JSON.parse(JSON.stringify(this.state.userDetails))
    let filteredData
    if (id) {
      filteredData = [userDetails.find(val => val.userId == id)]
    }


    this.setState({
      filteredData
    })
    setTimeout(this.loadingTime, 500);
  }

  loadingTime = () => {
    this.setState({
      isFetching: false
    })
  }

  loadFile = (event) => {
    let id = event.target.id;
    console.log('id: ', id);
      var output = document.getElementById('output');
      output.src = URL.createObjectURL(event.target.files[0]);
      this.setState({
        outputImage: output.src,
        showHideClassName: 'modal display-block container',
        id
      })
  };

uploadFileHandler = () =>{
  event.preventDefault()
  let id = this.state.id
  if(id==="gst"){
    let uploadGstReports = JSON.parse(JSON.stringify(this.state.uploadGstReports))
    uploadGstReports.push(this.state.outputImage)
    var output = document.getElementById('output');
    output.src = "";
    console.log('uploadGstReports: ', uploadGstReports);
    this.setState({
      uploadGstReports,
      showHideClassName: 'modal display-none container',
    })
  }
  else if(id==="daily"){
    let uploadDailyReports = JSON.parse(JSON.stringify(this.state.uploadDailyReports))
    uploadDailyReports.push(this.state.outputImage)
    var output = document.getElementById('output');
    output.src = "";
    console.log('uploadDailyReports: ', uploadDailyReports);
    this.setState({
      uploadDailyReports,
      showHideClassName: 'modal display-none container',
    })
  }
  }

  modalCloseHandler = () => {
    var output = document.getElementById('output');
    output.src = "";
    this.setState({
      isResetModal: false,
      showHideClassName: 'modal display-none container',
    })
  }

  render() {
    const columns = [
      //   {
      //   Header: 'Serial No.',
      //   accessor: 'userId',
      //   // filterable: true,
      // },
      {
        Header: 'Date',
        // accessor: 'timestamp',
        // filterable: true,
        sortable: false,
        Cell: row => (this.state.filteredData[0].timestamp ? moment(row.original.timestamp).format("DD MMM YYYY HH:mm") : '-')
      },
      {
        Header: 'Purchase Bills',
        accessor: 'purchaseBills',
        sortable: false,
        // filterable: true,
        Cell: row =>
        <span className="view-reports-r" onClick={()=>{this.props.history.push('/userBillDetails/purchaseBills')}}>{(row.original.purchaseBills.length) + "/" + (row.original.purchaseBills.length)}</span>
      },
      {
        Header: 'Sale Bills',
        accessor: 'saleBills',
        sortable: false,
        // filterable: true,
        Cell: row =>
        <span className="view-reports-r" onClick={()=>{this.props.history.push('/userBillDetails/saleBills')}}>{(row.original.saleBills.length) + "/" + (row.original.saleBills.length)}</span>
      },
      {
        Header: 'Other',
        accessor: 'other',
        sortable: false,
        // filterable: true,
        Cell: row =>
        <span className="view-reports-r" onClick={()=>{this.props.history.push('/userBillDetails/other')}}>{(row.original.other.length) + "/" + (row.original.other.length)}</span>
      },
      {
        Header: 'Daily Reports',
        sortable: false,
        // accessor: 'dailyReports',
        // filterable: true,
        Cell: row =>
          (
            <div>
              <p className="view-reports-r" onClick={()=>{this.props.history.push('/manageAccountantReports/daily')}}>View</p>
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
                    <form onSubmit={this.uploadFileHandler}>
                      <div>
                        <img id="output" className="upload-modal-r" />
                        <textarea rows="2" defaultValue="comments if any .." className="form-control reset-input-box-r"
                          placeholder="Comments.." required />
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
            
            <div className="container margin-10-r">
              <div className="row">
                <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                    <p className="main-title-r">{this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData[0].legalName + "'s Details" : null}</p>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                    <p className="sub-title-r">{this.state.filteredData && this.state.filteredData.length > 0 ? '(' + this.state.filteredData[0].mobileNumber + ')' : null}</p>
                  </div>
                </div>
              </div>
            </div>

          <div className="container filter-year-month-r">
              <div className="row">
                <div className="col-xs-12 col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <select className="year-month-border-r" name="lectureId">
                      <option defaultValue="">Select Year</option>
                      <option defaultValue="2017">2017-2018</option>
                      <option defaultValue="2018">2018-2019</option>
                      <option defaultValue="2019">2019-2020</option>
                      <option defaultValue="2020">2020-2021</option>
                    </select>
                  </div>
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <select className="year-month-border-r" name="lectureId">
                      <option defaultValue="">Select Month</option>
                      <option defaultValue="january">January</option>
                      <option defaultValue="february">February</option>
                      <option defaultValue="march">March</option>
                      <option defaultValue="april">April</option>
                      <option defaultValue="may">May</option>
                      <option defaultValue="june">June</option>
                      <option defaultValue="july">July</option>
                      <option defaultValue="august">August</option>
                      <option defaultValue="september">September</option>
                      <option defaultValue="october">October</option>
                      <option defaultValue="november">November</option>
                      <option defaultValue="december">December</option>
                    </select>
                  </div>
                </div>
                <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 button-margin-top">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <button type="button" onClick={()=>{this.props.history.push('/manageAccountantReports/gst')}} className="button-base-r">view GST Reports</button>
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
                data={this.state.filteredData}
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
