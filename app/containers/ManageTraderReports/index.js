/**
 *
 * ManageTraderReports
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
import makeSelectManageTraderReports from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ConfirmModal from '../../components/ConfirmModal/Loadable'

/* eslint-disable react/prefer-stateless-function */
export class ManageTraderReports extends React.Component {

  state={
    card :[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    showHideClassName: 'modal display-none container',
  }

  confirmModalHandler = (event) => {
    let id = event.target.id
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
      deleteName: ""
    })
  }

  confirmDeleteData = (id) => {
    console.log('id: ', id);
    event.preventDefault()
    let card = JSON.parse(JSON.stringify(this.state.card))
    card.splice(id,1)
    this.setState({
      card,
      showHideClassName: 'modal display-none container',
    })

  }

  render() {
    return (
      <div>
        <Helmet>
          <title>ManageTraderReports</title>
          <meta
            name="description"
            content="Description of ManageTraderReports"
          />
        </Helmet>
        {
          this.props.match.params.id === "gst" ?
        <div className="container outer-box-r">
            <p className="static-title-r">GST Reports</p>
          <div className="text-align-center-r">
          { this.state.card.map((val,index)=>
          <React.Fragment key={index}>
          <div className="card-base-r">
            <img className="card-img-r" src={require('../../assets/img/aboutUs1.jpg')} />
          <p className="card-heading-r">GST Report</p>
          <p className="card-sub-heading-r">Created At : 21-04-2020</p>
          <p className="card-text-r">ipisicing elit. Fugiat reprehenderit unde obcaecati non modi vel, consectetur vero</p>
          </div>
          {/* <span className="delete-report-icon-r">
          <button name="purchaseBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
        </span> */}
          </React.Fragment>
          )}
          </div>
          </div>
          :
          <div className="container outer-box-r">
          <p className="static-title-r">Daily Reports</p>
        <div className="text-align-center-r">
        { this.state.card.map((val,index)=>
        <React.Fragment key={index}>
        <div className="card-base-r">
          <img className="card-img-r" src={require('../../assets/img/aboutUs1.jpg')} />
        <p className="card-heading-r">Daily Report</p>
        <p className="card-sub-heading-r">Created At : 21-04-2020</p>
        <p className="card-text-r">ipisicing elit. Fugiat reprehenderit unde obcaecati non modi vel, consectetur vero</p>
        </div>
        {/* <span className="delete-report-icon-r">
        <button name="purchaseBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
      </span> */}
        </React.Fragment>
        )}
        </div>
        </div>
  }

          <ConfirmModal
          showHideClassName={this.state.showHideClassName}
          onClose={this.modalCloseHandler}
          onConfirm={() => this.confirmDeleteData(this.state.deleteId)}
        />
      </div>
    );
  }
}

ManageTraderReports.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageTraderReports: makeSelectManageTraderReports(),
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

const withReducer = injectReducer({ key: 'manageTraderReports', reducer });
const withSaga = injectSaga({ key: 'manageTraderReports', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageTraderReports);