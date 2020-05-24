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

  getUserReports = (userId, month, year, report) => {
    if (report === "daily") {
      axios.get(`http://localhost:3000/dailyReports/${userId}/${month}/${year}`)
        .then((res) => {
          const userReports = res.data.data;
          this.setState({ userReports, isFetching: false });
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
    else {
      axios.get(`http://localhost:3000/gstReports/${userId}/${month}/${year}`)
        .then((res) => {
          const userReports = res.data.data;
          this.setState({ userReports, isFetching: false });
        })
        .catch((error) => {
          console.log('error: ', error);
          this.errorCheck(error);
        });
    }
  }

  componentWillMount() {
    let id = this.props.match.params.id
    let report = this.props.match.params.report
    this.getUserReports(id, this.props.match.params.month, this.props.match.params.year, report)
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

  resendReport = (event) => {
    let id = event.target.id
    let userId = this.props.match.params.id
    let report = this.props.match.params.report
    axios.put(`http://localhost:3000/bill/${userId}/${id}/${report}`)
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
                        <img className="card-img-r" src={"http://localhost:3000/gst-reports/" + val.img} />
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
                <p className="static-title-r">Daily Reports</p>
                <div className="text-align-center-r">
                  {this.state.userReports.map((val, index) =>
                    <React.Fragment key={index}>
                      <div className="card-base-r">
                        <span className="resend-report-icon-r">
                          <button id={val._id} onClick={this.resendReport} className="fa fa-share"></button>
                        </span>
                        <img className="card-img-r" src={"http://localhost:3000/daily-reports/" + val.img} />
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
          }
        </div>
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
