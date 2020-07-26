/**
 *
 * ManageAccountantReports
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
import makeSelectManageAccountantReports from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ConfirmModal from '../../components/ConfirmModal/Loadable'
import moment from 'moment';

import axios from 'axios';

import MessageModal from '../../components/MessageModal/Loadable'
import { errorHandler, dateFormatHandler } from '../../utils/commonUtils';


/* eslint-disable react/prefer-stateless-function */
export class ManageAccountantReports extends React.Component {

  state = {
    isOpenClassName: 'modal display-none container',
    userReports: [],
    isLoading: true,
    faultyBills: []
  }

  getUserReports = (userId, month, year, report, date) => {
    if (report === "daily") {
      let url = window.API_URL + `/dailyReports/${userId}/${month}/${year}/${date}`;
      axios.get(url)
        .then((res) => {
          const userReports = res.data.data;
          this.setState({ userReports, isFetching: false, isLoading: false });
        })
        .catch((error) => {
          let message = errorHandler(error);
          this.setState({
            message,
            isOpenClassName: 'modal display-block container',
            type: "failure",
            isLoading: false,
          }, () => setTimeout(this.modalTime, 1500))
        });
    }

    else {
      let url = window.API_URL + `/gstReports/${userId}/${month}/${year}`;
      axios.get(url)
        .then((res) => {
          const userReports = res.data.data;
          this.setState({ userReports, isFetching: false, isLoading: false });
        })
        .catch((error) => {
          let message = errorHandler(error);
          this.setState({
            message,
            isOpenClassName: 'modal display-block container',
            type: "failure",
            isLoading: false,
          }, () => setTimeout(this.modalTime, 1500))
        });
    }
  }

  getfaultyBills = (id, month, year, date) => {
    let url = window.API_URL + `/faultyBills/${id}/${month}/${year}/${date}`;
    axios.get(url)
      .then((res) => {
        const faultyBills = res.data.data;
        this.setState({ faultyBills, isLoading: false });
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure",
          isLoading: false,
        }, () => setTimeout(this.modalTime, 1500))
      });
  };

  resendReport = (event) => {
    let id = event.target.id
    let userId = this.props.match.params.id
    let report = this.props.match.params.report
    let name = event.target.name
    let url = name === "faultyBills" ? window.API_URL + `/resendFaultyBill/${userId}/${id}` : window.API_URL + `/resendReport/${userId}/${id}/${report}`;
    axios.put(url)
      .then((res) => {
        const data = res.data.data;
        this.setState({
          message: res.data.message,
          isLoading: false,
          type: "success",
          isOpenClassName: 'modal display-block container',
        }, () => setTimeout(this.modalTime, 1500));
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure",
          isLoading: false,
        }, () => setTimeout(this.modalTime, 1500))
      });
  }

  componentWillMount() {
    let id = this.props.match.params.id
    let report = this.props.match.params.report
    if (report === "gst") {
      this.getUserReports(id, this.props.match.params.month, this.props.match.params.year, report)
    }
    else {
      this.getfaultyBills(this.props.match.params.id, this.props.match.params.month, this.props.match.params.year, this.props.match.params.date)
      this.getUserReports(id, this.props.match.params.month, this.props.match.params.year, report, this.props.match.params.date)
    }
  }

  modalCloseHandler = () => {
    this.setState({
      isResetModal: false,
      isOpenClassName: 'modal display-none container',
      deleteId: "",
      deleteName: ""
    })
  }

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container',
      isFetching: false
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>ManageAccountantReports</title>
          <meta
            name="description"
            content="Description of ManageAccountantReports"
          />
        </Helmet>

        <MessageModal
          showHideClassName={this.state.isOpenClassName}
          modalType={this.state.type}
          message={this.state.message}
          onClose={this.modalCloseHandler}
        />
        {this.state.isLoading ?
          <div className="lds-facebook"><div></div><div></div><div></div><span className="loading-text-r">Loading... </span></div>
          :
          <div className="container outer-box-r">
            {this.props.match.params.report === "gst" && <p className="static-title-r">GST Reports</p>}
            <div>
              <ul className="breadCrumb-bg-r">
                <li className="breadCrumb-li-child-1-r" onClick={() => this.props.history.push('/manageUser')} ><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
                <li className="breadCrumb-li-child-2-r" onClick={() => this.props.history.push(`/userDetails/${this.props.match.params.id}/${this.props.match.params.month}/${this.props.match.params.year}`)} ><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >User Details</span></li>
                <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >{this.props.match.params.report === "gst" ? "GST Reports" : "Daily Reports"}</span></li>
              </ul>
            </div>
            {
              this.props.match.params.report === "gst" ?
                <React.Fragment>
                  <div className="text-align-center-r">
                    {this.state.userReports.length > 0 ?
                      this.state.userReports.map((val, index) =>
                        <React.Fragment key={index}>
                          <div className="card-report-r">
                            {/* <span className="delete-report-icon-r">
                        <button name="daily" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                      </span> */}
                            <span className="resend-report-icon-r">
                              <button id={val._id} onClick={this.resendReport} className="fa fa-share"></button>
                            </span>
                            {val.type && val.type.includes('image') ? <img className="selected-report-image-r" src={window.API_URL_IMAGE + "/gst-reports/" + val.img} /> : <img className="selected-image-r" src={require('../../assets/img/file.png')} />}
                            <p className="card-selected-heading-r">{val.originalName}</p>
                            <p className="card-selected-sub-heading-r">Uploaded At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
                            <p className="card-text-r">{val.comment}</p>
                          </div>
                        </React.Fragment>
                      ) :
                      <img
                        className="nodata-img1-r"
                        src={require('../../assets/img/noresultqa.png')}
                      />}
                  </div>


                </React.Fragment>
                :
                <React.Fragment>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <p className="static-title-r">Daily Reports</p>
                    <div className="report-card-scroll">
                      <div className="text-align-center-r">
                        {this.state.userReports.length > 0 ?
                          this.state.userReports.map((val, index) =>
                            <React.Fragment key={index}>
                              <div className="card-report-r">
                                {/* <span className="delete-report-icon-r">
                        <button name="daily" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                      </span> */}
                                <span className="resend-report-icon-r">
                                  <button id={val._id} onClick={this.resendReport} className="fa fa-share"></button>
                                </span>
                                {val.type && val.type.includes('image') ? <img className="selected-report-image-r" src={window.API_URL_IMAGE + "/daily-reports/" + val.img} /> : <img className="selected-image-r" src={require('../../assets/img/file.png')} />}
                                <p className="card-selected-heading-r">{val.originalName}</p>
                                <p className="card-selected-sub-heading-r">Report Date : {dateFormatHandler(val.reportDate)}</p>
                                <p className="card-selected-sub-heading-r">Uploaded At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
                                <p className="card-text-r">{val.comment}</p>
                              </div>
                            </React.Fragment>
                          ) :
                          <img
                            className="nodata-box-img1-r"
                            src={require('../../assets/img/noresultqa.png')}
                          />}
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <p className="static-title-r">Faulty Bills</p>
                    <div className="report-card-scroll">
                      <div className="text-align-center-r">
                        {this.state.faultyBills.length > 0 ?
                          this.state.faultyBills.map((val, index) =>
                            <React.Fragment key={index}>
                              <div className="card-report-r">
                                {/* <span className="delete-report-icon-r">
                        <button name="daily" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                      </span> */}
                                <span className="resend-report-icon-r">
                                  <button id={val._id} name="faultyBills" onClick={this.resendReport} className="fa fa-share"></button>
                                </span>
                                {val.type && val.type.includes('image') ? <img className="selected-report-image-r" src={window.API_URL_IMAGE + "/bills/" + val.img} /> : <img className="selected-image-r" src={require('../../assets/img/file.png')} />}
                                <p className="card-selected-heading-r">{val.originalName}</p>
                                <p className="card-selected-sub-heading-r">Uploaded At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
                                <p className="card-text-r">{val.comment}</p>
                              </div>
                            </React.Fragment>
                          ) :
                          <img
                            className="nodata-box-img1-r"
                            src={require('../../assets/img/noresultqa.png')}
                          />}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
            }
          </div>
        }
      </div>
    );
  }
}

ManageAccountantReports.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageAccountantReports: makeSelectManageAccountantReports(),
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

const withReducer = injectReducer({ key: 'manageAccountantReports', reducer });
const withSaga = injectSaga({ key: 'manageAccountantReports', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageAccountantReports);
