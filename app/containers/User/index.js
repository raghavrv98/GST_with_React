/**
 *
 * User
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
import makeSelectUser from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import HeaderLink from '../../components/Header/HeaderLink';

/* eslint-disable react/prefer-stateless-function */
export class User extends React.Component {

  state = {
    tabActive: true,
    isActiveTab: "purchaseBills",
    payload : {
      oldPassword :"",
      newPassword:""
    }
  }

  loadFile = () => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
  };

  tabActive = (event) => {
    let id = event.target.id

    this.setState({
      isActiveTab: id
    })
  }

  nameChangeHandler = event => {
    let payload =  JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload
    });
  };

  resetPassword = () =>{
    event.preventDefault()
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>User</title>
          <meta name="description" content="Description of User" />
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
                             value={this.state.payload.oldPassword}
                             onChange={this.nameChangeHandler} 
                             id="oldPassword" 
                             className="form-control reset-input-box-r"
                             placeholder="Old Password" 
                             autoFocus 
                             required />
                      <input type="password" 
                             value={this.state.payload.newPassword}
                             onChange={this.nameChangeHandler} 
                             id="newPassword" 
                             className="form-control reset-input-box-r"
                             placeholder="New Password" 
                             autoFocus 
                             required />
                      <div className="text-align-center-r">
                      <input type="submit" className="btn btn-primary btn-text-r" name="" value="Reset" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* <!-- reset password modal end --> */}


        {/* <!--warning message start--> */}
        <div>
          <div className="modal fade" id="warningmsg" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="delete-modal-padding-r">
                  <form method="post" action="/login">
                    <p className="warning-msg-r">Are you sure want to delete ?</p>
                    <div className="icon-margin-r">
                      <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <span>
                          <p className="margin-0-r cross-r" data-dismiss="modal"><i className="fa fa-times"></i></p>
                        </span>
                      </div>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <span>
                          <p className="margin-0-r check-r" data-dismiss="modal"><i className="fa fa-check"></i></p>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--warning message end--> */}

        {/* <!--view Reports for user modal start--> */}

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
                    <a data-toggle="modal" data-dismiss="modal" data-target="#warningmsg">
                      <i className="fa fa-times-circle icon-customization-download-r" aria-hidden="true"></i>
                    </a>
                    <img className="card-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                    <textarea disabled defaultValue="comments if any .." className="form-control" name="address" required
                      rows="4" />
                    <div className="browse-upload-margin-r">
                      <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <input type="submit" className="btn btn-primary btn-text-r full-width-r" name="" value="Download" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-3 col-xl-3 card-margin-r">
                    <div className="card card-price-r">
                      <h4 className="card-heading-r"> GST Report</h4>
                      <h5 className="card-sub-heading-r"> Created at: 21-03-2020</h5>
                    </div>
                    <a data-toggle="modal" data-dismiss="modal" data-target="#warningmsg">
                      <i className="fa fa-times-circle icon-customization-download-r" aria-hidden="true"></i>
                    </a>
                    <img className="card-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                    <textarea disabled defaultValue="comments if any .." className="form-control" name="address" required
                      rows="4" />
                    <div className="browse-upload-margin-r">
                      <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <input type="submit" className="btn btn-primary btn-text-r full-width-r" name="" value="Download" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!--view Reports for user download modal end--> */}

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
      <a style={{marginLeft: "44px"}} onClick={() => { this.props.history.push('/')}} className="navbar-brand">Brand</a>
    </div>

    {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul className="nav navbar-nav navbar-right">
      <li><a style={{ marginTop: "-10px", color: "#255b7a"}} data-toggle="modal" data-target="#resetPassword" className="navbar-brand">Reset Password</a></li>
      <li><a style={{ marginTop: "-10px", color: "#255b7a"}} onClick={() => { this.props.history.push('/')}} className="navbar-brand">Logout</a></li>
                {/* <HeaderLink to="/userDetails">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span className="caret"></span></a>
            <ul className="dropdown-menu" role="menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li className="divider"></li>
              <li className="dropdown-header">Nav header</li>
              <li><a href="#">Separated link</a></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
                </HeaderLink> */}
            </ul>
    </div>
  </div>
</nav>


        <div className="container outer-box-r">
          <div className="container filter-year-month-r">
            <div className="row">
              <div className="col-xs-6 col-6 col-sm-6 col-md-5 col-lg-5 col-xl-5">
                <select className="custom-select year-month-border-r" name="lectureId">
                  <option defaultValue="">Select Year</option>
                  <option defaultValue="2017">2017-2018</option>
                  <option defaultValue="2018">2018-2019</option>
                  <option defaultValue="2019">2019-2020</option>
                  <option defaultValue="2020">2020-2021</option>
                </select>
              </div>
              <div className="col-xs-6 col-6 col-sm-6 col-md-5 col-lg-5 col-xl-5">
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
              <div className="col-xs-12 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
              <div className="text-align-center-r"><p data-toggle="modal" className="view-reports-r" data-target="#openmodal">view Reports</p></div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div className="card-body-margin-r">
                <p id="purchaseBills" onClick={this.tabActive} className={this.state.isActiveTab == "purchaseBills" ? "btn btn-primary btn-lg btn-block tab-active-r" : "btn btn-primary btn-lg btn-block tab-inactive-r"}>
                  Purchase Bills<br />(0 entries)</p>
              </div>
            </div>

            <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div className="card-body-margin-r">
                <p id="saleBills" onClick={this.tabActive} className={this.state.isActiveTab == "saleBills" ? "btn btn-primary btn-lg btn-block tab-active-r" : "btn btn-primary btn-lg btn-block tab-inactive-r"}>
                  Sale Bills<br />(0 entries)</p>
              </div>
            </div>

            <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div className="card-body-margin-r">
                <p id="other" onClick={this.tabActive} className={this.state.isActiveTab == "other" ? "btn btn-primary btn-lg btn-block tab-active-r" : "btn btn-primary btn-lg btn-block tab-inactive-r"}>
                  Other<br />(0 entries)</p>
              </div>
            </div>
          </div>

          <div className="container card-button-r">

            <form action="/user">
              <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2">
                <div className="upload-box-border-r">
                  <img className="browse-image-r" id="output" />
                </div>

                <input className="display-none-r" accept="image/*" onChange={this.loadFile} id="file-input"
                  type="file" required />

                <div className="browse-upload-margin-r">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div><button type="button" className="btn btn-primary btn-text-r full-width-r">
                    <label className="cursor-pointer-r margin-0-r" htmlFor="file-input">Browse</label>
                  </button></div>
                  </div>
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input type="submit" className="btn btn-primary btn-text-r full-width-r" name="" value="Upload" />
                  </div>
                </div>
              </div>
            </form>

            <div className="col-xs-12 col-12 col-sm-8 col-md-9 col-lg-10 col-xl-10">
              {
                this.state.isActiveTab == "purchaseBills" ?
                  <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                    <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                    <a className="delete-icon-r" data-toggle="modal" data-target="#warningmsg">
                      <i className="fa fa-times-circle" aria-hidden="true"></i>
                    </a>
                  </div> :
                  this.state.isActiveTab == "saleBills" ?
                    <React.Fragment>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                        <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                        <a className="delete-icon-r" data-toggle="modal" data-target="#warningmsg">
                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </a>
                      </div>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                        <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                        <a className="delete-icon-r" data-toggle="modal" data-target="#warningmsg">
                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </a>
                      </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                        <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                        <a className="delete-icon-r" data-toggle="modal" data-target="#warningmsg">
                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </a>
                      </div>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                        <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                        <a className="delete-icon-r" data-toggle="modal" data-target="#warningmsg">
                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </a>
                      </div>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                        <img className="selected-image-r" src={require('../../assets/img/antornys-1.jpg')} />
                        <a className="delete-icon-r" data-toggle="modal" data-target="#warningmsg">
                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </a>
                      </div>
                    </React.Fragment>


              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
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

const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(User);
