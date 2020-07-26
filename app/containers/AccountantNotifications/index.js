/**
 *
 * AccountantNotifications
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
import makeSelectAccountantNotifications from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import axios from 'axios';
import moment from 'moment';
import MessageModal from '../../components/MessageModal/Loadable'
import { errorHandler } from '../../utils/commonUtils';


/* eslint-disable react/prefer-stateless-function */
export class AccountantNotifications extends React.Component {

  state = {
    isFetching: true,
    isOpenClassName: 'modal display-none container',
    notificationsList: [],
  }

  getNotifications = () => {
    let url = window.API_URL + `/notifications/${localStorage.getItem('userId')}`;
    axios.get(url)
      .then((res) => {
        const notificationsList = res.data.data;
        this.setState({ notificationsList, isFetching: false });
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isFetching: false,
          isOpenClassName: 'modal display-block container',
          type: "failure"
        }, () => setTimeout(this.modalTime, 1500))
      });
  };

  componentWillMount() {
    this.getNotifications()
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
      isOpenClassName: 'modal display-none container',
      deleteId: ""
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>User Notifications</title>
          <meta
            name="description"
            content="Description of ManagePasswordRequests"
          />
        </Helmet>

        <MessageModal
          showHideClassName={this.state.isOpenClassName}
          modalType={this.state.type}
          message={this.state.message}
          onClose={this.modalCloseHandler}
        />

        <div className="container outer-box-r">
          <p className="static-title-r">Notifications</p>
          <div>
            <ul className="breadCrumb-bg-r">
              <li onClick={() => this.props.history.push('/manageUser')} className="breadCrumb-li-child-1-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
              <li className="breadCrumb-li-child-r"><i className="fa fa-files-o" aria-hidden="true"></i><span className="breadcrumb-text-r" >Notifications</span></li>
            </ul>
          </div>
          <ul>
            {this.state.isFetching ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
              this.state.notificationsList.length > 0 ?
                this.state.notificationsList.map((val, index) =>
                  <li key={index} className="li-outer-notify">
                    <span>
                      <span className="li-image-icon">
                        <img className="li-image" src={require('../../assets/img/download.png')} />
                      </span>
                      <span className="li-content-user-notify-p">
                        <div className="row margin-5-r">
                          {/* <div className="li-content-user-notify-p"> */}
                          <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-align-left">
                            <span className="li-content-title">
                              Description :
                  </span>
                            <span className="li-content-description">
                              {val.type}.
                            </span>
                          </div>
                          {/* </div> */}
                        </div>

                        <div className="row">
                          {/* <div className="li-content-user-notify-p"> */}
                          <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <span className="li-content-title">
                              Created At :
                  </span>
                            <span className="li-content">
                              {moment(val.timestamp).format("DD MMM YYYY HH:mm")}
                            </span>
                          </div>
                          <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <span className="li-content-title">
                              User Name :
                  </span>
                            <span className="li-content">
                              {val.createdBy}
                            </span>
                          </div>
                          <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 ellipses">
                            <span className="li-content-title">
                              Path :
                  </span>
                            <span className="li-content">
                              {"Click Here to Visit ->"} {<p onClick={() => this.props.history.push(`/manageUserReports/${val.month}/${val.year}`)} className="fa fa-eye eye-color cursor-pointer-r"></p>}
                            </span>
                          </div>
                        </div>
                      </span>
                    </span>
                  </li>
                )
                :
                <div className="li-outer"><span className="no-data-text">No Data Found</span></div>
            }
          </ul>
        </div>
      </div >
    );
  }

}

AccountantNotifications.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  accountantNotifications: makeSelectAccountantNotifications(),
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

const withReducer = injectReducer({ key: 'accountantNotifications', reducer });
const withSaga = injectSaga({ key: 'accountantNotifications', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountantNotifications);
