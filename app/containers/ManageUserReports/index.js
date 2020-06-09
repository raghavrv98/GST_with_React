/**
 *
 * ManageUserReports
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
import makeSelectManageUserReports from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ConfirmModal from '../../components/ConfirmModal/Loadable'
import moment from 'moment';
import axios from 'axios';
import MessageModal from '../../components/MessageModal/Loadable'
import { errorHandler } from '../../utils/commonUtils';
/* eslint-disable react/prefer-stateless-function */
export class ManageUserReports extends React.Component {
  state = {
    showHideClassName: 'modal display-none container',
    getReports: {},
    isLoading: true,
    isOpenClassName: 'modal display-none container'
  }

  getReports = (id, month, year) => {
    axios.get(`http://3.128.59.35:3000/report/${id}/${month}/${year}`)
      .then((res) => {
        const getReports = res.data.data;
        this.setState({ getReports, isLoading: false });
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          isLoading: false
        })
      }, () => setTimeout(this.modalTime, 1500));
  };

  deleteReports = (id, deleteId, deleteType) => {
    if (deleteType === "faulty") {
      axios.delete(`http://3.128.59.35:3000/bill/${id}/${deleteId}/${deleteType}`)
        .then((res) => {
          const data = res.res.data.message;
          this.setState({
            message: res.data.message,
            isLoading: false,
            type: "success",
            isOpenClassName: 'modal display-block container'
          }, () => this.getReports(localStorage.getItem('userId'), this.props.match.params.month, this.props.match.params.year), setTimeout(this.modalTime, 1500))
        })
        .catch((error) => {
          let message = errorHandler(error);
          this.setState({
            message,
            isOpenClassName: 'modal display-block container',
            isLoading: false
          })
        }, () => setTimeout(this.modalTime, 1500));
    }
    else {
      axios.delete(`http://3.128.59.35:3000/report/${id}/${deleteId}/${deleteType}`)
        .then((res) => {
          const data = res.data.data;
          this.setState({
            message: res.data.message,
            isLoading: false,
            type: "success",
            isOpenClassName: 'modal display-block container'
          }, () => this.getReports(localStorage.getItem('userId'), this.props.match.params.month, this.props.match.params.year), setTimeout(this.modalTime, 1500))
        })
        .catch((error) => {
          let message = errorHandler(error);
          this.setState({
            message,
            isOpenClassName: 'modal display-block container',
            isLoading: false
          })
        }, () => setTimeout(this.modalTime, 1500));
    }
  };

  componentWillMount() {
    this.getReports(localStorage.getItem('userId'), this.props.match.params.month, this.props.match.params.year)
  }

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container'
    })
  }

  confirmModalHandler = (event) => {
    let id = event.target.id
    let name = event.target.name
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
      deleteName: "",
      isOpenClassName: 'modal display-none container',
    })
  }

  confirmDeleteData = (id, name) => {
    event.preventDefault()
    this.deleteReports(localStorage.getItem('userId'), id, name)
    this.setState({
      showHideClassName: 'modal display-none container',
      isLoading: true
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>ManageUserReports</title>
          <meta name="description" content="Description of ManageUserReports" />
        </Helmet>


        <ConfirmModal
          showHideClassName={this.state.showHideClassName}
          onClose={this.modalCloseHandler}
          onConfirm={() => this.confirmDeleteData(this.state.deleteId, this.state.deleteName)}
        />

        <MessageModal
          showHideClassName={this.state.isOpenClassName}
          modalType={this.state.type}
          message={this.state.deletedMessage}
          onClose={this.modalCloseHandler}
        />

        {this.state.isLoading ?
          <div className="lds-facebook"><div></div><div></div><div></div><span className="loading-text-r">Loading... </span></div>
          :
          <div className="container outer-box-r">

            <div>
              <ul className="breadCrumb-bg-r">
                <li onClick={() => this.props.history.push('/user')} className="breadCrumb-li-child-1-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
                <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >Reports</span></li>
              </ul>
            </div>

            <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <p className="static-title-r">Daily Reports</p>
              <div className="report-card-scroll">
                <div className="text-align-center-r">
                  {this.state.getReports.dailyReports && this.state.getReports.dailyReports.map((val, index) =>
                    <React.Fragment key={index}>
                      <div className="card-report-r">
                        <span className="delete-report-icon-r">
                          <button name="daily" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                        </span>
                        <span className="download-report-icon-r">
                          <a target="_blank" download href={"http://3.128.59.35:3000/daily-reports/" + val.img} className="fa fa-download"></a>
                        </span>
                        <img className="selected-report-image-r" src={"http://3.128.59.35:3000/daily-reports/" + val.img} />
                        <p className="card-selected-heading-r">{val.originalName}</p>
                        <p className="card-selected-sub-heading-r">Created At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
                        <p className="card-text-r">{val.comment}</p>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <p className="static-title-r">GST Reports</p>
              <div className="report-card-scroll">
                <div className="text-align-center-r">
                  {this.state.getReports.gstReports && this.state.getReports.gstReports.map((val, index) =>
                    <React.Fragment key={index}>
                      <div className="card-report-r">
                        <span className="delete-report-icon-r">
                          <button name="gst" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                        </span>
                        <span className="download-report-icon-r">
                          <a target="_blank" download href={"http://3.128.59.35:3000/gst-reports/" + val.img} className="fa fa-download"></a>
                        </span>
                        <img className="selected-report-image-r" src={"http://3.128.59.35:3000/gst-reports/" + val.img} />
                        <p className="card-selected-heading-r">{val.originalName}</p>
                        <p className="card-selected-sub-heading-r">Created At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
                        <p className="card-text-r">{val.comment}</p>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <p className="static-title-r">Faulty Bills</p>
              <div className="report-card-scroll">
                <div className="text-align-center-r">
                  {this.state.getReports.faultyBills && this.state.getReports.faultyBills.map((val, index) =>
                    <React.Fragment key={index}>
                      <div className="card-report-r">
                        <span className="delete-report-icon-r">
                          <button name="faulty" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                        </span>
                        <span className="download-report-icon-r">
                          <a target="_blank" download href={"http://3.128.59.35:3000/bills/" + val.img} className="fa fa-download"></a>
                        </span>
                        <img className="selected-report-image-r" src={"http://3.128.59.35:3000/bills/" + val.img} />
                        <p className="card-selected-heading-r">{val.originalName}</p>
                        <p className="card-selected-sub-heading-r">Created At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
                        <p className="card-text-r">{val.comment}</p>
                      </div>
                    </React.Fragment>
                  )}
                </div>


              </div>
            </div>

          </div>
        }

      </div>
    );
  }
}

ManageUserReports.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageUserReports: makeSelectManageUserReports(),
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

const withReducer = injectReducer({ key: 'manageUserReports', reducer });
const withSaga = injectSaga({ key: 'manageUserReports', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageUserReports);
