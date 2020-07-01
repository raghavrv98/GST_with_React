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
import { errorHandler, dateFormatHandler } from '../../utils/commonUtils';
/* eslint-disable react/prefer-stateless-function */
export class ManageUserReports extends React.Component {
  state = {
    showHideClassName: 'modal display-none container',
    getReports: {},
    isLoading: true,
    isOpenClassName: 'modal display-none container'
  }

  getReports = (id, month, year) => {
    let url = window.API_URL + `/report/${id}/${month}/${year}`
    axios.get(url)
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
      let url = window.API_URL + `/bill/${id}/${deleteId}/${deleteType}`
      axios.delete(url)
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
    else {
      let url = window.API_URL + `/report/${id}/${deleteId}/${deleteType}`
      axios.delete(url)
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
          message={this.state.message}
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
                  {this.state.getReports.dailyReports && this.state.getReports.dailyReports.length > 0 ?
                    this.state.getReports.dailyReports && this.state.getReports.dailyReports.map((val, index) =>
                      <React.Fragment key={index}>
                        <div className="card-report-r">
                          <span className="delete-report-icon-r">
                            <button name="daily" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                          </span>
                          <span className="download-report-icon-r">
                            {val.type && val.type.includes('image') ? <a download={val.originalName} target="_blank" href={window.API_URL_IMAGE + "/daily-reports/" + val.img} className="fa fa-download"></a> : <a download={val.originalName} target="_blank" href={require('../../assets/img/file.png')} className="fa fa-download"></a>}
                          </span>
                          {val.type && val.type.includes('image') ? <img className="selected-report-image-r" src={window.API_URL_IMAGE + "/daily-reports/" + val.img} /> : <img className="selected-image-r" src={require('../../assets/img/file.png')} />}
                          <p className="card-selected-heading-r">{val.originalName}</p>
                          <p className="card-selected-sub-heading-r">Report Date : {dateFormatHandler(val.reportDate)}</p>
                          <p className="card-selected-sub-heading-r">Created At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
                          <p className="card-text-r">{val.comment}</p>
                        </div>
                      </React.Fragment>
                    ) :
                    <img
                      className="nodata-box-daily-img1-r"
                      src={require('../../assets/img/noresultqa.png')}
                    />}
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <p className="static-title-r">GST Reports</p>
              <div className="report-card-scroll">
                <div className="text-align-center-r">
                  {this.state.getReports.gstReports && this.state.getReports.gstReports.length > 0 ?
                    this.state.getReports.gstReports && this.state.getReports.gstReports.map((val, index) =>
                      <React.Fragment key={index}>
                        <div className="card-report-r">
                          <span className="delete-report-icon-r">
                            <button name="gst" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                          </span>
                          <span className="download-report-icon-r">
                            {val.type && val.type.includes('image') ? <a download={val.originalName} target="_blank" href={window.API_URL_IMAGE + "/gst-reports/" + val.img} className="fa fa-download"></a> : <a download={val.originalName} target="_blank" href={require('../../assets/img/file.png')} className="fa fa-download"></a>}
                          </span>
                          {val.type && val.type.includes('image') ? <img className="selected-report-image-r" src={window.API_URL_IMAGE + "/gst-reports/" + val.img} /> : <img className="selected-image-r" src={require('../../assets/img/file.png')} />}
                          <p className="card-selected-heading-r">{val.originalName}</p>
                          <p className="card-selected-sub-heading-r">Created At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
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
                  {this.state.getReports.faultyBills && this.state.getReports.faultyBills.length > 0 ?
                    this.state.getReports.faultyBills && this.state.getReports.faultyBills.map((val, index) =>
                      <React.Fragment key={index}>
                        <div className="card-report-r">
                          <span className="delete-report-icon-r">
                            <button name="faulty" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                          </span>
                          <span className="download-report-icon-r">
                            {val.type && val.type.includes('image') ? <a download={val.originalName} target="_blank" href={window.API_URL_IMAGE + "/bills/" + val.img} className="fa fa-download"></a> : <a download={val.originalName} target="_blank" href={require('../../assets/img/file.png')} className="fa fa-download"></a>}
                          </span>
                          {val.type && val.type.includes('image') ? <img className="selected-report-image-r" src={window.API_URL_IMAGE + "/bills/" + val.img} /> : <img className="selected-image-r" src={require('../../assets/img/file.png')} />}
                          <p className="card-selected-heading-r">{val.originalName}</p>
                          <p className="card-selected-sub-heading-r">Created At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
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
