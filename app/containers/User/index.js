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
import axios from 'axios';
import moment from 'moment';

import ConfirmModal from '../../components/ConfirmModal/Loadable'
import MessageModal from '../../components/MessageModal/Loadable'

import { errorHandler } from '../../utils/commonUtils';

/* eslint-disable react/prefer-stateless-function */
export class User extends React.Component {

  state = {
    tabActive: true,
    isActiveTab: "purchase",
    deleteId: "",
    deleteName: "",
    showHideClassName: 'modal display-none container',
    getbill: {},
    isLoading: true,
    year: '2020',
    month: '4',
    billType: 'purchase',
    browseBillImages: [],
    isOpenClassName: 'modal display-none container',
    billImages: [],
    isDeleteIcon: false,
    isDeletedBill: []
  }

  getbill = (id, month, year) => {
    axios
      .get(`http://3.128.59.35:3000/bill/${id}/${month}/${year}`)
      .then((res) => {
        const getbill = res.data.data;
        let isDeletedBill = []
        this.setState({ getbill, isLoading: false, isDeletedBill });
        let data = JSON.parse(JSON.stringify(getbill))
        data.purchaseBills && data.purchaseBills.map((val, index) => {
          if (Date.now() - val.timestamp > 3600000) {
            this.deleteIcon("purchase", index)
          }
        })
        data.saleBills && data.saleBills.map((val, index) => {
          if (Date.now() - val.timestamp > 3600000) {
            this.deleteIcon("sale", index)
          }
        })
        data.otherBills && data.otherBills.map((val, index) => {
          if (Date.now() - val.timestamp > 3600000) {
            this.deleteIcon("other", index)
          }
        })
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure",
          isLoading: false
        })
      }, () => setTimeout(this.modalTime, 1500));
  };

  deleteBills = (id, deleteId, deleteType) => {
    axios
      .delete(`http://3.128.59.35:3000/bill/${id}/${deleteId}/${deleteType}`)
      .then((res) => {
        const data = res.data.data;
        this.setState({
          message: res.data.message,
          type: "success",
          isOpenClassName: 'modal display-block container',
          isLoading: false
        }, () => this.getbill(localStorage.getItem('userId'), this.state.month, this.state.year), setTimeout(this.modalTime, 1500));
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure",
          isLoading: false
        })
      }, () => setTimeout(this.modalTime, 1500));
  };

  putbill = (id, formData) => {
    axios
      .put(`http://3.128.59.35:3000/bill/${id}`, formData)
      .then((res) => {
        const data = res.data.data;
        this.setState({
          message: res.data.message,
          isLoading: false,
          type: "success",
          isOpenClassName: 'modal display-block container',
        }, () => this.getbill(localStorage.getItem('userId'), this.state.month, this.state.year), setTimeout(this.modalTime, 1500));
      })
      .catch((error) => {
        let message = errorHandler(error);
        this.setState({
          message,
          isOpenClassName: 'modal display-block container',
          type: "failure",
          isLoading: false
        })
      }, () => setTimeout(this.modalTime, 1500));
  };

  componentWillMount() {
    this.getbill(localStorage.getItem('userId'), this.state.month, this.state.year)
    setInterval(() => this.getbill(localStorage.getItem('userId'), this.state.month, this.state.year), 3600000);
  }

  deleteIcon = (type, index) => {
    let isDeletedBill = this.state.isDeletedBill
    let isDeleteIcon = "true" + index + type
    isDeletedBill.push(isDeleteIcon)
    isDeletedBill = [...new Set(isDeletedBill)]
    this.setState({ isDeletedBill })
  }

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container'
    })
  }

  loadFile = (event) => {
    let browseBillImages = []
    let billImages = []
    for (let i = 0; i < event.target.files.length; i++) {
      billImages.push(event.target.files[i])
      browseBillImages.push(URL.createObjectURL(event.target.files[i]))
    }
    this.setState({
      browseBillImages,
      billImages
    })
  };

  tabActive = (event) => {
    let id = event.target.id

    this.setState({
      isActiveTab: id,
      browseBillImages: []
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
      showHideClassName: 'modal display-none container',
      isOpenClassName: 'modal display-none container',
      deleteId: "",
      deleteName: ""
    })
  }

  confirmDeleteData = () => {
    event.preventDefault()
    let id = event.target.id
    let browseBillImages = JSON.parse(JSON.stringify(this.state.browseBillImages))
    browseBillImages.splice(id, 1)
    let billImages = this.state.billImages
    billImages.splice(id, 1)
    this.setState({
      showHideClassName: 'modal display-none container',
      browseBillImages,
      billImages
    })
  }

  confirmDeleteBill = (id, name) => {
    event.preventDefault()
    this.deleteBills(localStorage.getItem('userId'), id, name)
    this.setState({
      showHideClassName: 'modal display-none container',
      isLoading: true
    })
  }

  billUploadHandler = (event) => {
    event.preventDefault()
    let billImages = this.state.billImages
    var formData = new FormData();
    formData.append('year', this.state.year);
    formData.append('month', this.state.month);
    formData.append('billType', this.state.isActiveTab);
    for (let i = 0; i < billImages.length; i++) {
      formData.append('bill', billImages[i])
    }
    this.putbill(localStorage.getItem('userId'), formData)
    this.setState({
      browseBillImages: [],
      isLoading: true
    })
  }

  nameChangeHandler = (event) => {
    let id = event.target.id
    let year = this.state.year
    let month = this.state.month
    let billType = this.state.billType

    if (id == "year") {
      year = event.target.value
    }
    else if (id == "month") {
      month = event.target.value
    }
    else {
      billType = event.target.value
    }
    this.setState({
      year, month, billType, isLoading: true
    }, () => this.getbill(localStorage.getItem('userId'), this.state.month, this.state.year))
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>User</title>
          <meta name="description" content="Description of User" />
        </Helmet>

        <ConfirmModal
          showHideClassName={this.state.showHideClassName}
          onClose={this.modalCloseHandler}
          onConfirm={() => this.confirmDeleteBill(this.state.deleteId, this.state.deleteName)}
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
                <li className="breadCrumb-li-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
              </ul>
            </div>
            <div className="container filter-year-month-r">
              <div className="row">
                <div className="col-xs-6 col-6 col-sm-6 col-md-5 col-lg-5 col-xl-5">
                  <select value={this.state.year} onChange={this.nameChangeHandler} className="year-month-border-r" id="year">
                    <option value="">Select Year</option>
                    <option value="2020">2020-2021</option>
                    <option value="2019">2019-2020</option>
                    <option value="2018">2018-2019</option>
                    <option value="2017">2017-2018</option>
                  </select>
                </div>
                <div className="col-xs-6 col-6 col-sm-6 col-md-5 col-lg-5 col-xl-5">
                  <select value={this.state.month} onChange={this.nameChangeHandler} className="year-month-border-r" id="month">
                    <option value="">Select Month</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                  </select>
                </div>
                <div className="col-xs-12 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                  <div className="text-align-center-r"><p className="view-reports-r" onClick={() => { this.props.history.push(`/manageUserReports/${this.state.month}/${this.state.year}`) }}>view Reports</p></div>
                </div>
              </div>
            </div>

            <div className="container tab-space-r">
              <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <div className={this.state.isActiveTab == "purchase" ? "tab-active-base-r" : "tab-inactive-base-r"}>
                  <p className="margin-0-r" id="purchase" onClick={this.tabActive}>
                    Purchase Bills<br />({this.state.getbill.purchaseBills && this.state.getbill.purchaseBills.length} entries)</p>
                </div>
              </div>

              <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <div className={this.state.isActiveTab == "sale" ? "tab-active-base-r" : "tab-inactive-base-r"}>
                  <p className="margin-0-r" id="sale" onClick={this.tabActive} className="">
                    Sale Bills<br />({this.state.getbill.saleBills && this.state.getbill.saleBills.length} entries)</p>
                </div>
              </div>

              <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <div className={this.state.isActiveTab == "other" ? "tab-active-base-r" : "tab-inactive-base-r"}>
                  <p className="margin-0-r" id="other" onClick={this.tabActive} className="">
                    Other<br />({this.state.getbill.otherBills && this.state.getbill.otherBills.length} entries)</p>
                </div>
              </div>
            </div>

            {
              this.state.isActiveTab == "purchase" ?
                <div className="container">
                  <form onSubmit={this.billUploadHandler}>
                    <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2 text-align-center-r">
                      <div className="card-scroll-r">
                        {
                          this.state.browseBillImages.length == 1 ?
                            <React.Fragment>
                              <div className="card-browse-one-r">
                                <img className="browse-one-image-r" src={this.state.browseBillImages[0]} />
                              </div>
                              <span className="delete-one-browse-icon">
                                <button id={0} onClick={this.confirmDeleteData} className="fa fa-times-circle"></button>
                              </span>
                            </React.Fragment>
                            :
                            this.state.browseBillImages.length > 1 ?
                              <React.Fragment>
                                {
                                  this.state.browseBillImages.map((val, index) => {
                                    return <div key={index} className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-align-center-r padding-5-r">
                                      <div className="card-browse-r">
                                        <img className="browse-image-r" src={val} />
                                      </div>
                                      <span className="delete-one-browse-icon">
                                        <button id={index} onClick={this.confirmDeleteData} className="fa fa-times-circle"></button>
                                      </span>
                                    </div>
                                  }
                                  )
                                }
                              </React.Fragment>
                              : null
                        }
                      </div>
                      <input className="display-none-r" accept="image/*" onChange={this.loadFile} id="purchaseBill"
                        type="file" multiple required />
                      <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 margin-15-r">
                        <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div><button type="button" className="button-base-r">
                            <label className="cursor-pointer-r margin-0-r" htmlFor="purchaseBill">Browse</label>
                          </button></div>
                        </div>
                        <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <button className="button-base-r"> Upload </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="col-xs-12 col-12 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                    <div className="text-align-center-min-r">

                      {this.state.getbill.purchaseBills && this.state.getbill.purchaseBills.map((val, index) =>
                        <React.Fragment key={index}>
                          <div className="card-selected-image-r">
                            <img className="selected-image-r" src={"http://3.128.59.35:3000/bills/" + val.img} />
                            <p className="card-selected-heading-r">{val.originalName}</p>
                            <p className="card-selected-sub-heading-r">Created At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
                          </div>
                          {this.state.isDeletedBill.includes("true" + index + "purchase") ? null :
                            <span className="delete-bill-icon-r">
                              <button name="purchase" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                            </span>
                          }
                        </React.Fragment>
                      )}

                    </div>
                  </div>
                </div>
                :

                this.state.isActiveTab == "sale" ?
                  <div className="container">
                    <form onSubmit={this.billUploadHandler}>
                      <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2 text-align-center-r">
                        <div className="card-scroll-r">
                          {
                            this.state.browseBillImages.length == 1 ?
                              <React.Fragment>
                                <div className="card-browse-one-r">
                                  <img className="browse-one-image-r" src={this.state.browseBillImages[0]} />
                                </div>
                                <span className="delete-one-browse-icon">
                                  <button id={0} onClick={this.confirmDeleteData} className="fa fa-times-circle"></button>
                                </span>
                              </React.Fragment>
                              :
                              this.state.browseBillImages.length > 1 ?
                                <React.Fragment>
                                  {
                                    this.state.browseBillImages.map((val, index) => {
                                      return <div key={index} className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-align-center-r padding-5-r">
                                        <div className="card-browse-r">
                                          <img className="browse-image-r" src={val} />
                                        </div>
                                        <span className="delete-one-browse-icon">
                                          <button id={index} onClick={this.confirmDeleteData} className="fa fa-times-circle"></button>
                                        </span>
                                      </div>
                                    }
                                    )}
                                </React.Fragment>
                                : null
                          }
                        </div>
                        <input className="display-none-r" accept="image/*" onChange={this.loadFile} id="saleBill"
                          type="file" multiple required />
                        <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 margin-15-r">
                          <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div><button type="button" className="button-base-r">
                              <label className="cursor-pointer-r margin-0-r" htmlFor="saleBill">Browse</label>
                            </button></div>
                          </div>
                          <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <button className="button-base-r"> Upload </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="col-xs-12 col-12 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                      <div className="text-align-center-min-r">

                        {this.state.getbill.saleBills && this.state.getbill.saleBills.map((val, index) =>
                          <React.Fragment key={index}>
                            <div className="card-selected-image-r">
                              <img className="selected-image-r" src={"http://3.128.59.35:3000/bills/" + val.img} />
                              <p className="card-selected-heading-r">{val.originalName}</p>
                              <p className="card-selected-sub-heading-r">Created At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
                            </div>
                            {this.state.isDeletedBill.includes("true" + index + "sale") ? null :
                              <span className="delete-bill-icon-r">
                                <button name="sale" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                              </span>
                            }
                          </React.Fragment>
                        )}

                      </div>
                    </div>
                  </div>

                  :

                  <div className="container">
                    <form onSubmit={this.billUploadHandler}>
                      <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2 text-align-center-r">
                        <div className="card-scroll-r">
                          {
                            this.state.browseBillImages.length == 1 ?
                              <React.Fragment>
                                <div className="card-browse-one-r">
                                  <img className="browse-one-image-r" src={this.state.browseBillImages[0]} />
                                </div>
                                <span className="delete-one-browse-icon">
                                  <button id={0} onClick={this.confirmDeleteData} className="fa fa-times-circle"></button>
                                </span>
                              </React.Fragment>
                              :
                              this.state.browseBillImages.length > 1 ?
                                <React.Fragment>
                                  {
                                    this.state.browseBillImages.map((val, index) => {
                                      return <div key={index} className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-align-center-r padding-5-r">
                                        <div className="card-browse-r">
                                          <img className="browse-image-r" src={val} />
                                        </div>
                                        <span className="delete-one-browse-icon">
                                          <button id={index} onClick={this.confirmDeleteData} className="fa fa-times-circle"></button>
                                        </span>
                                      </div>
                                    }
                                    )
                                  }
                                </React.Fragment>
                                : null
                          }
                        </div>
                        <input className="display-none-r" accept="image/*" onChange={this.loadFile} id="otherBill"
                          type="file" multiple required />
                        <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 margin-15-r">
                          <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div><button type="button" className="button-base-r">
                              <label className="cursor-pointer-r margin-0-r" htmlFor="otherBill">Browse</label>
                            </button></div>
                          </div>
                          <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <button className="button-base-r"> Upload </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="col-xs-12 col-12 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                      <div className="text-align-center-min-r">

                        {this.state.getbill.otherBills && this.state.getbill.otherBills.map((val, index) =>
                          <React.Fragment key={index}>
                            <div className="card-selected-image-r">
                              <img className="selected-image-r" src={"http://3.128.59.35:3000/bills/" + val.img} />
                              <p className="card-selected-heading-r">{val.originalName}</p>
                              <p className="card-selected-sub-heading-r">Created At : {moment(val.timestamp).format("DD MMM YYYY")}</p>
                            </div>
                            {this.state.isDeletedBill.includes("true" + index + "other") ? null :
                              <span className="delete-bill-icon-r">
                                <button name="other" id={val._id} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                              </span>
                            }
                          </React.Fragment>
                        )}

                      </div>
                    </div>
                  </div>

            }

          </div>
        }
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
