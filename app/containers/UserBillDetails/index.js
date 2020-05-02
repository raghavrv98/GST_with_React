/**
 *
 * UserBillDetails
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
import makeSelectUserBillDetails from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ConfirmModal from '../../components/ConfirmModal/Loadable'

/* eslint-disable react/prefer-stateless-function */
export class UserBillDetails extends React.Component {

  state = {
    card: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    card.splice(id, 1)
    this.setState({
      card,
      showHideClassName: 'modal display-none container',
    })

  }


  render() {
    return (
      <div>
        <Helmet>
          <title>UserBillDetails</title>
          <meta name="description" content="Description of UserBillDetails" />
        </Helmet>
        {
          this.props.match.params.id === "purchaseBills" ?
            <div className="container outer-box-r">
              <p className="static-title-r">Purchase Bills</p>
              <div className="text-align-center-r">
                {this.state.card.map((val, index) =>
                  <React.Fragment key={index}>
                    <div className="card-base-r">
                    <input className="card-status-button-r" type="checkbox" />
                      <div>
                        <input type="password" className="form-control status-input-button-r" id="pwd"
                          placeholder="Enter password" name="pwd" />
                        <button type="submit" className="btn btn-default status-submit-button-r"><i
                          className="fa fa-check submit-icon-r" aria-hidden="true"></i></button>
                      </div>
                    <div>
                      <img className="card-parent-img-r" src={require('../../assets/img/aboutUs1.jpg')} />
                      <img className="card-child-img-r" src={require('../../assets/img/download.png')} />
                      <div className="dropdown">
                        <button className="card-drop-down-r"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div className="dropdown-content">
                          <a href="#">Transfer to Sales</a>
                          <a href="#">Transfer to Other</a>
                          <a data-toggle="modal" data-dismiss="modal" href="#returnModal">Return</a>
                        </div>
                      </div>
                    </div>
                      <textarea 
                  className="form-control inputBox-r card-text-r"
                  placeholder="Comment...." 
                  // value={this.state.payload.returnComment}
                  onChange={this.nameChangeHandler}
                  id="returnComment" 
                  rows="3"
                  required>
                </textarea>
                    </div>
                    <span className="delete-report-icon-r">
                      <button name="purchaseBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                    </span>
                  </React.Fragment>
                )}
              </div>
            </div>
            :
            this.props.match.params.id === "saleBills" ?
              <div className="container outer-box-r">
                <p className="static-title-r">Sale Bills</p>
                <div className="text-align-center-r">
                  {this.state.card.map((val, index) =>
                    <React.Fragment key={index}>
                      <div className="card-base-r">
                        <img className="card-img-r" src={require('../../assets/img/aboutUs1.jpg')} />
                        <p className="card-heading-r">Sale Bills</p>
                        <p className="card-sub-heading-r">Created At : 21-04-2020</p>
                        <p className="card-text-r">ipisicing elit. Fugiat reprehenderit unde obcaecati non modi vel, consectetur vero</p>
                      </div>
                      <span className="delete-report-icon-r">
                        <button name="purchaseBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                      </span>
                    </React.Fragment>
                  )}
                </div>
              </div>
              :
              <div className="container outer-box-r">
                <p className="static-title-r">Other Bills</p>
                <div className="text-align-center-r">
                  {this.state.card.map((val, index) =>
                    <React.Fragment key={index}>
                      <div className="card-base-r">
                        <img className="card-img-r" src={require('../../assets/img/aboutUs1.jpg')} />
                        <p className="card-heading-r">Other Bills</p>
                        <p className="card-sub-heading-r">Created At : 21-04-2020</p>
                        <p className="card-text-r">ipisicing elit. Fugiat reprehenderit unde obcaecati non modi vel, consectetur vero</p>
                      </div>
                      <span className="delete-report-icon-r">
                        <button name="purchaseBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                      </span>
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

UserBillDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userBillDetails: makeSelectUserBillDetails(),
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

const withReducer = injectReducer({ key: 'userBillDetails', reducer });
const withSaga = injectSaga({ key: 'userBillDetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserBillDetails);
