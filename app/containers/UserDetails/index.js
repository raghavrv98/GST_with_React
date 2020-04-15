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
import HeaderLink from '../../components/Header/HeaderLink';


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
    isFetching: false
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

  loadFile = () => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
  };


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
        Cell: row => (this.state.filteredData[0].timestamp ? moment(row.original.timestamp).format("DD MMM YYYY HH:mm") : '-')
      },
      {
        Header: 'Purchase Bills',
        accessor: 'purchaseBills',
        sortable: false,
        // filterable: true,
        Cell: row =>
          <div className="counter-box-r"><a data-toggle="modal"
            data-target="#openBills">{(row.original.purchaseBills.length) + "/" + (row.original.purchaseBills.length)}</a></div>
      },
      {
        Header: 'Sale Bills',
        accessor: 'saleBills',
        sortable: false,
        // filterable: true,
        Cell: row =>
          <div className="counter-box-r"><a data-toggle="modal"
            data-target="#openBills">{(row.original.saleBills.length) + "/" + (row.original.saleBills.length)}</a></div>
      },
      {
        Header: 'Other',
        accessor: 'other',
        sortable: false,
        // filterable: true,
        Cell: row =>
          <div className="counter-box-r"><a data-toggle="modal"
            data-target="#openBills">{(row.original.other.length) + "/" + (row.original.other.length)}</a></div>
      },
      {
        Header: 'Daily Reports',
        sortable: false,
        // accessor: 'dailyReports',
        // filterable: true,
        Cell: row =>
          (
            <div>
              <a data-toggle="modal" data-target="#openmodal"><u>view</u></a>
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
                     disabled =  {(this.state.filteredData) && (this.state.filteredData[0].purchaseBills.length == 0  || this.state.filteredData[0].saleBills.length == 0 || this.state.filteredData[0].other.length == 0)}
                     required />

              <button type="button" 
                     disabled =  {(this.state.filteredData) && (this.state.filteredData[0].purchaseBills.length == 0  || this.state.filteredData[0].saleBills.length == 0 || this.state.filteredData[0].other.length == 0)}
                      data-toggle="modal" 
                      data-target="#browseModal"
                      className="btn btn-primary btn-lg browse-button-css-r">
                <label htmlFor="daily">Browse </label>
              </button>
              {/* <input checked={row.original.status == "completed"} data-toggle="modal" data-target="#statusPassword" className="status-button-r" type="checkbox"/> */}
            </div>
          )
      },
      // { 
      //   Header: 'Status',
      //   accessor: 'status',
      //   width :80,
      //   Cell: row => 
      //       (
      //         <div>
      //           <input checked={row.original.status == "completed"} data-toggle="modal" data-target="#statusPassword" className="status-button-r" type="checkbox"/>
      //         </div>
      //       )
      // },
      // {
      //   Header: 'Actions',
      //   sortable : false,
      //   width:100,
      //   Cell: row => 
      //   (<div style={{textAlign: "center"}}>
      //     <span className = "editButton"><i className="fas fa-pen" /></span>
      //     <a data-toggle="modal" data-dismiss="modal" data-target="#warningmsg" className="deleteButton"><i className="far fa-trash-alt" /></a>
      //   </div>
      //   )
      // },  
    ]
    return (
      <div>
        <Helmet>
          <title>UserDetails</title>
          <meta name="description" content="Description of UserDetails" />
        </Helmet>

        {/* <!-- reset password modal start --> */}
        <div className="container">
          <div className="modal fade" id="resetPassword" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#f06d46" }}>
                  <span style={{ color: "white" }}>Reset Password</span>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i
                    className="fa fa-times" aria-hidden="true"></i></button>
                </div>

                <div className="modal-body,input-group input-group-lg">
                  <div className="reset-form-padding-r">
                    <form onSubmit={this.resetPassword}>
                      <input type="text"
                        defaultValue={this.state.payload.oldPassword}
                        onChange={this.nameChangeHandler}
                        id="oldPassword"
                        className="form-control reset-input-box-r"
                        placeholder="Old Password"
                        autoFocus
                        required />
                      <input type="password"
                        defaultValue={this.state.payload.newPassword}
                        onChange={this.nameChangeHandler}
                        id="newPassword"
                        className="form-control reset-input-box-r"
                        placeholder="New Password"
                        autoFocus
                        required />
                      <span>
                        <input type="submit" className="btn btn-primary btn-lg btn-block reset-button-r" name=""
                          defaultValue="Reset" />
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* <!-- reset password modal end --> */}

        {/* <!-- status password modal start --> */}
        <div className="container">
          <div className="modal fade" id="statusPassword" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#f06d46" }}>
                  <span style={{ color: "white" }}>Delete Report</span>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i
                    className="fa fa-times" aria-hidden="true"></i></button>
                </div>

                <div className="modal-body,input-group input-group-lg">
                  <div className="reset-form-padding-r">
                    <form method="post" action="user.html">
                      <input type="text" name="Password" className="form-control reset-input-box-r"
                        placeholder="Password" required />
                      <span>
                        <input type="submit" className="btn btn-primary btn-lg btn-block reset-button-r" name=""
                          defaultValue="Delete" />
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- status password modal end --> */}


        <div className="container">
          <div className="modal fade" id="browseModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#f06d46" }}>
                  <span style={{ color: "white" }}>Upload Report</span>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i
                    className="fa fa-times" aria-hidden="true"></i></button>
                </div>

                <div className="modal-body,input-group input-group-lg">
                  <div className="reset-form-padding-r">
                    <form method="post" action="user.html">
                      <div>
                        <img id="output" className="browse-upload-report-r" />
                        <textarea rows="5" defaultValue="comments if any .." name="Password" className="form-control reset-input-box-r"
                          placeholder="Comments.." required />
                      </div>
                      <span>
                        <input type="submit" className="btn btn-primary btn-lg btn-block reset-button-r" name=""
                          defaultValue="Upload" />
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="modal fade" id="returnModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#f06d46" }}>
                  <span style={{ color: "white" }}>Return Report</span>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i
                    className="fa fa-times" aria-hidden="true"></i></button>
                </div>

                <div className="modal-body,input-group input-group-lg">
                  <div className="reset-form-padding-r">
                    <form method="post" action="user.html">
                      <div>
                        <textarea rows="5" defaultValue="comments if any .." name="Password" className="form-control reset-input-box-r"
                          placeholder="Comments.." required />
                      </div>
                      <span>
                        <input type="submit" className="btn btn-primary btn-lg btn-block reset-button-r" name=""
                          defaultValue="Return" />
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="modal fade" id="openmodal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog modal-dialog-centered modal-width-r" role="document">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#f06d46" }}>
                  <span style={{ color: "white" }}>Download Reports</span>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i
                    className="fa fa-times" aria-hidden="true"></i></button>
                </div>

                <div className="container">

                  <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-3 col-xl-3 card-margin-r">
                    <div className="card card-price-r">
                      <h4 className="card-heading-r"> Summary Report</h4>
                      <h5 className="card-sub-heading-r"> Created at: 21-03-2020</h5>
                    </div>
                    <a data-toggle="modal" data-dismiss="modal" data-target="#statusPassword">
                      <i className="fa fa-times-circle icon-customization-download-r" aria-hidden="true"></i>
                    </a>
                    <img className="card-image-r" src={require('../../assets/img/all/antornys-1.jpg')} />
                    <textarea disabled defaultValue="comments if any .." className="form-control" name="address" required
                      rows="4" />
                    <div className="browse-upload-margin-r">
                      <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <input className="btn btn-primary btn-lg download-button-r" type="submit"
                          defaultValue="Resend" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="openBills" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#f06d46" }}>
                <span style={{ color: "white" }}>Purchase Bills</span>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i
                  className="fa fa-times" aria-hidden="true"></i></button>
              </div>

              <div className="container">

                <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 card-margin-r">
                  <div>
                    <div>
                      <input type="password" className="form-control status-input-button-r" id="pwd"
                        placeholder="Enter password" name="pwd" />
                      <button type="submit" className="btn btn-default status-submit-button-r"><i
                        className="fa fa-check submit-icon-r" aria-hidden="true"></i></button>
                    </div>
                    <div>
                      <input className="upload-status-button-r" type="checkbox" />
                      <p className="bill-heading-r"> Purchase Bills</p>
                      <div className="dropdown">
                        <button style={{ fontSize: "13px" }} className="dropbtn"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div className="dropdown-content">
                          <a href="#">Transfer to Sales</a>
                          <a href="#">Transfer to Other</a>
                          <a data-toggle="modal" data-dismiss="modal" href="#returnModal">Return</a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <a target="_blank" href=".//img/all/gst-bill.jpg">
                        <img className="img-bills-preview-selected-parent-r" src={require('../../assets/img/all/gst-bill.jpg')} />
                        <img className="img-bills-preview-child-r" src={require('../../assets/img/all/download.png')} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 card-margin-r">
                  <div>
                    <div>
                      {/* <input type="password" className="form-control status-input-button-r" id="pwd" placeholder="Enter password" name="pwd">
										<button type="submit" className="btn btn-default status-submit-button-r"><i className="fa fa-check submit-icon-r" aria-hidden="true"></i></button>
									</div> */}
                      <div>
                        <input className="upload-status-button-r" type="checkbox" />
                        <p className="bill-heading-r"> Purchase Bills</p>
                        <div style={{ fontSize: "13px" }} className="dropdown">
                          <button className="dropbtn"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                          </button>
                          <div className="dropdown-content">
                            <a href="#">Transfer to Sales</a>
                            <a href="#">Transfer to Other</a>
                            <a data-toggle="modal" data-dismiss="modal" href="#returnModal">Return</a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <a target="_blank" href=".//img/all/gst-bill.jpg">
                          <img className="img-bills-preview-parent-r" src={require('../../assets/img/all/gst-bill.jpg')} />
                          {/* <img className="img-bills-preview-child-r" src={require('../../assets/img/all/download.png')} /> */}
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-default nav-bar-r">
          <div className="container-fluid">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a style={{ marginLeft: "44px" }} onClick={() => { this.props.history.push('/') }} className="navbar-brand">Brand</a>
            </div>

            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a style={{ marginTop: "-10px", color: "#255b7a" }} data-toggle="modal" data-target="#resetPassword" className="navbar-brand">Reset Password</a></li>
                <li><a style={{ marginTop: "-10px", color: "#255b7a" }} onClick={() => { this.props.history.push('/') }} className="navbar-brand">Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="container outer-box-r">
            <div className="container name-mobile-reports-r">
              <div className="row">
                <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <p className="details-heading-r">{this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData[0].legalName + "'s Details" : null}</p>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <p className="details-heading-mobile-r">{this.state.filteredData && this.state.filteredData.length > 0 ? '(' + this.state.filteredData[0].mobileNumber + ')' : null}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container margin-bottom-r">
              <div className="row">
                <div className="col-xs-12 col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <select className="custom-select year-month-border-r" name="lectureId">
                      <option defaultValue="">Select Year</option>
                      <option defaultValue="2017">2017-2018</option>
                      <option defaultValue="2018">2018-2019</option>
                      <option defaultValue="2019">2019-2020</option>
                      <option defaultValue="2020">2020-2021</option>
                    </select>
                  </div>
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <select className="custom-select year-month-border-r" name="lectureId">
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
                <div className="col-xs-12 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 view-reports-r">
                    <a data-toggle="modal" style={{ color: "#255b7a" }} data-target="#openmodal">view Reports</a>
                  </div>
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 view-reports-r">
                    <input style={{ display: "none" }} accept="image/*" onChange={this.loadFile} id="gst"
                      type="file" required />
                    <button type="button" data-toggle="modal" data-target="#browseModal"
                      className="btn btn-primary btn-lg browse-GST-button-css-r">
                      <label style={{ cursor: "pointer", color: "white", margin:"0px"}} htmlFor="gst">Upload GST Report</label>
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
              />
            </div>

            {/* <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-lg-12">
                  <div style={{color: "#255b7a"}} className="table-responsive table-margin-r">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th style={{textAlign: "center"}} scope="col">Sno.</th>
                          <th style={{textAlign: "center"}} scope="col">Date</th>
                          <th style={{textAlign: "center"}} scope="col">Purchase Bills</th>
                          <th style={{textAlign: "center"}} scope="col">Sale Bills</th>
                          <th style={{textAlign: "center"}} scope="col">Other</th>
                          <th style={{textAlign: "center"}} scope="col">Daily Reports</th>
                          <th style={{textAlign: "center"}} scope="col">upload Summary</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th style={{textAlign: "center"}} scope="row">1</th>
                          <td>8 march, 2020</td>
                          <td>
                            <div className="counter-box-r"><a data-toggle="modal"
                              data-target="#openBills">0/4</a></div>
                          </td>
                          <td>
                            <div className="counter-box-r"><a data-toggle="modal"
                              data-target="#openBills">0/4</a></div>
                          </td>
                          <td>
                            <div className="counter-box-r"><a data-toggle="modal"
                              data-target="#openBills">0/4</a></div>
                          </td>
                          <td>
                            <a data-toggle="modal" data-target="#openmodal"><u>view</u></a>
                          </td>
                          <td>
                            <input style={{display: "none"}} accept="image/*" onChange={this.loadFile}
                              id="daily" type="file" required />
                            <button type="button" data-toggle="modal" data-target="#browseModal"
                              className="btn btn-primary btn-lg browse-button-css-r">
                              <label style={{cursor: "pointer", color: "white"}} htmlFor="daily">Browse </label>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}

          </div>
          <a style={{ backgroundColor: "#255b7a", borderRadius: "50%" }} id="scroll-top" className=""><i className="fa fa-angle-double-up"
            aria-hidden="true"></i></a>
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
