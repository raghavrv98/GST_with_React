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


/* eslint-disable react/prefer-stateless-function */
export class ManageAccountantReports extends React.Component {

  state = {
    isOpenClassName: 'modal display-none container',
    userReports: [],
    isLoading:true,
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
    this.setState({ errorMes, isOpenClassName: 'modal display-block container', isLoading:false, type: "failure" }, () => setTimeout(this.modalTime, 1500)
    );
  }

  getUserReports = (userId, month, year, report, date) => {
    if (report === "daily") {
      axios.get(`https://gst-service-uat.herokuapp.com/dailyReports/${userId}/${month}/${year}/${date}`)
        .then((res) => {
          const userReports = res.data.data;
          this.setState({ userReports, isFetching: false, isLoading:false });
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
    else {
      axios.get(`https://gst-service-uat.herokuapp.com/gstReports/${userId}/${month}/${year}`)
        .then((res) => {
          const userReports = res.data.data;
          this.setState({ userReports, isFetching: false, isLoading:false });
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
  }

  getReports = (id, month, year) => {
    // let url = window.location.origin + '/';
    axios
      // .get(url + `api/faas/gateway/api/v3/smrc/alarm/table?id=${id}`, this.getHeaders())
      .get(`https://gst-service-uat.herokuapp.com/report/${id}/${month}/${year}`)
      .then((res) => {
        const getReports = res.data.data;
        this.setState({ getReports, isLoading: false });
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  };

  resendReport = (event) => {
    let id = event.target.id
    let userId = this.props.match.params.id
    let report = this.props.match.params.report
    axios.put(`https://gst-service-uat.herokuapp.com/resendReport/${userId}/${id}/${report}`)
      .then((res) => {
        const message = res.data.message;
        this.setState({
          message,
          isLoading: false,
          type: "success",
          isOpenClassName: 'modal display-block container',
        }, () => setTimeout(this.modalTime, 1500));
      })
      .catch((error) => {
        console.log('error: ', error);
        this.errorCheck(error);
      });
  }

  componentWillMount() {
    let id = this.props.match.params.id
    let report = this.props.match.params.report
    this.getReports(localStorage.getItem('userId'), this.props.match.params.month, this.props.match.params.year)
    if (report === "gst") {
      this.getUserReports(id, this.props.match.params.month, this.props.match.params.year, report)
    }
    else {
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
                <p className="static-title-r">GST Reports</p>
                <div className="text-align-center-r">
                  {this.state.userReports.map((val, index) =>
                    <React.Fragment key={index}>
                      <div className="card-base-r">
                        <span className="resend-report-icon-r">
                          <button id={val._id} onClick={this.resendReport} className="fa fa-share"></button>
                        </span>
                        <img className="card-img-r" src={"https://gst-service-uat.herokuapp.com/gst-reports/" + val.img} />
                        <p className="card-sub-heading-r">Created At: {moment(val.timestamp).format("DD MMM YYYY")}</p>
                        <p className="card-text-r">{val.comment}</p>
                      </div>
                      {/* <span className="delete-report-icon-r">
          <button name="purchaseBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
        </span> */}
                    </React.Fragment>
                  )}
                </div>
              </React.Fragment>
              :
              <React.Fragment>
                <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <p className="static-title-r">Daily Reports</p>
              <div className="report-card-scroll">
                  {this.state.userReports.map((val, index) =>
                    <React.Fragment key={index}>
                      <div className="card-base-r">
                        <span className="resend-report-icon-r">
                          <button id={val._id} onClick={this.resendReport} className="fa fa-share"></button>
                        </span>
                        <img className="card-img-r" src={"https://gst-service-uat.herokuapp.com/daily-reports/" + val.img} />
                        <p className="card-sub-heading-r">Created At: {moment(val.timestamp).format("DD MMM YYYY")}</p>
                        <p className="card-text-r">{val.comment}</p>
                      </div>
                      {/* <span className="delete-report-icon-r">
        <button name="purchaseBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
      </span> */}
                    </React.Fragment>
                  )}
                </div>
                </div>
                <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <p className="static-title-r">Faulty Bills</p>
              <div className="report-card-scroll">
                {/* {this.state.getReports.faultyBills != null && this.state.getReports.faultyBills.map((val, index) =>
                  <React.Fragment key={index}>
                    <div className="card-report-r">
                      <span className="delete-report-icon-r">
                        <button name="faulty" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                      </span>
                      <span className="download-report-icon-r">
                        <a href={"https://gst-service-uat.herokuapp.com/daily-reports/" + val.img} className="fa fa-download"></a>
                      </span>
                      <img className="selected-report-image-r" src={"https://gst-service-uat.herokuapp.com/bills/" + val.img} />
                      <p className="card-selected-sub-heading-r">{val.originalName}</p>
                      <p className="card-selected-sub-heading-r">Created At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
                      <p className="card-text-r">{val.comment}</p>
                    </div>
                  </React.Fragment>
                )} */}
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
