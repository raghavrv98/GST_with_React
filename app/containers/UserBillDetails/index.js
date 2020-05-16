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
    statusBoxArray:[],
    fullViewModalClassName : 'modal display-none container' 
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
      fullViewModalClassName : 'modal display-none container',
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

  statusBoxHandler =(event) =>{
    let id = event.target.id

    this.setState({
      statusBoxIndex : id,
      showHideClassName: 'modal display-block container',
    })
  }

 
  confirmStatusUpdate = (id) => {
    event.preventDefault()
    let statusBoxArray = this.state.statusBoxArray
    
    if(statusBoxArray.includes(id))
    statusBoxArray.splice(statusBoxArray.indexOf(id),1)
    else
    statusBoxArray.push(id)

    this.setState({
      statusBoxArray,
      showHideClassName: 'modal display-none container',
    })
  }

  fullviewModal =()=>{
    this.setState({
      fullViewModalClassName: 'modal display-block container',
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>UserBillDetails</title>
          <meta name="description" content="Description of UserBillDetails" />
        </Helmet>
        
        <div className={this.state.fullViewModalClassName} >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header background-color-r">
                  <span className="text-color-white-r">Bill Full View</span>
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
                  <div className="full-view-form-padding-r">
                  <img className="card-full-view-parent-img-r" src={require('../../assets/img/aboutUs1.jpg')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        
        {
          this.props.match.params.id === "purchaseBills" ?
            <div className="container outer-box-r">
              <p className="static-title-r">Purchase Bills</p>
              <div className="text-align-center-r">
                {this.state.card.map((val, index) =>
                  <React.Fragment key={index}>
                    <div className="card-base-r">
                    <input className="card-status-button-r" onChange={this.statusBoxHandler} checked={this.state.statusBoxArray.includes("s"+index) } id={"s"+index} type="checkbox" />
                    
                      {/* <div>
                        <input type="password" className="form-control status-input-button-r" id="pwd"
                          placeholder="Enter password" name="pwd" />
                        <button type="submit" className="btn btn-default status-submit-button-r"><i
                          className="fa fa-check submit-icon-r" aria-hidden="true"></i></button>
                      </div> */}
                    <div>
                      <img onClick={this.fullviewModal} className={ this.state.statusBoxArray.includes("s"+index)? "card-parent-img-r opacity-r" : "card-parent-img-r"} src={require('../../assets/img/aboutUs1.jpg')} />
                    { this.state.statusBoxArray.includes("s"+index) ? <img onClick={this.fullviewModal} className="card-child-img-r" src={require('../../assets/img/download.png')} /> : null }
                      <div className="dropdown">
                        <button className="card-drop-down-r"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div className="dropdown-content">
                          <a className="background-hover-r" href="#">Transfer to sale</a>
                          <a className="background-hover-r" href="#">Transfer to other</a>
                          <a className="background-hover-r" href="#">Return</a>
                        </div>
                      </div>
                    </div>
                    <p className="card-sub-heading-r">purchaseBills.png</p>
                      <textarea 
                  className="form-control card-comment-box-r card-text-r"
                  placeholder="Comment...." 
                  // value={this.state.payload.returnComment}
                  onChange={this.nameChangeHandler}
                  id="returnComment" 
                  rows="2"
                  required>
                </textarea>
                    </div>
                    {/* <span className="delete-report-icon-r">
                      <button name="purchaseBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                    </span> */}
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
                    <input className="card-status-button-r" onChange={this.statusBoxHandler} checked={this.state.statusBoxArray.includes("s"+index) } id={"s"+index} type="checkbox" />
                    
                      {/* <div>
                        <input type="password" className="form-control status-input-button-r" id="pwd"
                          placeholder="Enter password" name="pwd" />
                        <button type="submit" className="btn btn-default status-submit-button-r"><i
                          className="fa fa-check submit-icon-r" aria-hidden="true"></i></button>
                      </div> */}
                    <div>
                      <img className={ this.state.statusBoxArray.includes("s"+index)? "card-parent-img-r opacity-r" : "card-parent-img-r"} src={require('../../assets/img/aboutUs1.jpg')} />
                    { this.state.statusBoxArray.includes("s"+index) ? <img className="card-child-img-r" src={require('../../assets/img/download.png')} /> : null }
                      <div className="dropdown">
                        <button className="card-drop-down-r"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div className="dropdown-content">
                          <a className="background-hover-r" href="#">Transfer to purchase</a>
                          <a className="background-hover-r" href="#">Transfer to other</a>
                          <a  className="background-hover-r" href="#">Return</a>
                        </div>
                      </div>
                    </div>
                    <p className="card-sub-heading-r">SaleBills.png</p>
                      <textarea 
                  className="form-control card-comment-box-r card-text-r"
                  placeholder="Comment...." 
                  // value={this.state.payload.returnComment}
                  onChange={this.nameChangeHandler}
                  id="returnComment" 
                  rows="2"
                  required>
                </textarea>
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
                <p className="static-title-r">Other Bills</p>
                <div className="text-align-center-r">
                {this.state.card.map((val, index) =>
                  <React.Fragment key={index}>
                    <div className="card-base-r">
                    <input className="card-status-button-r" onChange={this.statusBoxHandler} checked={this.state.statusBoxArray.includes("s"+index) } id={"s"+index} type="checkbox" />
                    
                      {/* <div>
                        <input type="password" className="form-control status-input-button-r" id="pwd"
                          placeholder="Enter password" name="pwd" />
                        <button type="submit" className="btn btn-default status-submit-button-r"><i
                          className="fa fa-check submit-icon-r" aria-hidden="true"></i></button>
                      </div> */}
                    <div>
                      <img className={ this.state.statusBoxArray.includes("s"+index)? "card-parent-img-r opacity-r" : "card-parent-img-r"} src={require('../../assets/img/aboutUs1.jpg')} />
                    { this.state.statusBoxArray.includes("s"+index) ? <img className="card-child-img-r" src={require('../../assets/img/download.png')} /> : null }
                      <div className="dropdown">
                        <button className="card-drop-down-r"><i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div className="dropdown-content">
                          <a className="background-hover-r" href="#">Transfer to purchase</a>
                          <a className="background-hover-r" href="#">Transfer to sale</a>
                          <a  className="background-hover-r" href="#">Return</a>
                        </div>
                      </div>
                    </div>
                    <p className="card-sub-heading-r">OtherBills.png</p>
                      <textarea 
                  className="form-control card-comment-box-r card-text-r"
                  placeholder="Comment...." 
                  // value={this.state.payload.returnComment}
                  onChange={this.nameChangeHandler}
                  id="returnComment" 
                  rows="2"
                  required>
                </textarea>
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
          onConfirm={() => this.confirmStatusUpdate(this.state.statusBoxIndex)}
          confirmMessage = "Are you sure want to update ?"
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
