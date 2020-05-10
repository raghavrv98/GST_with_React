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
import ConfirmModal from '../../components/ConfirmModal/Loadable'
/* eslint-disable react/prefer-stateless-function */
export class User extends React.Component {

  state = {
    tabActive: true,
    isActiveTab: "purchaseBills",
    isResetModal: false,
    payload: {
      oldPassword: "",
      newPassword: ""
    },
    // data : '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',
    // purchaseBillsImage: "",
    // saleBillsImage: "",
    // otherImage: "",
    purchaseBillImages: [],
    saleBillImages: [],
    otherBillImages: [],
    deleteId: "",
    deleteName: "",
    showHideClassName: 'modal display-none container',
    browseBillImages: []
  }

  loadFile = (event) => {
    let id = event.target.id

    if (id === "purchase") {
      let purchaseBillImages = JSON.parse(JSON.stringify(this.state.purchaseBillImages))
      for (let i = 0; i < event.target.files.length; i++) {
        purchaseBillImages.push(URL.createObjectURL(event.target.files[i]))
      }
      this.setState({
        purchaseBillImages,
        browseBillImages: purchaseBillImages
      })
    }

    if (id === "sale") {
      let saleBillImages = JSON.parse(JSON.stringify(this.state.saleBillImages))
      for (let i = 0; i < event.target.files.length; i++) {
        saleBillImages.push(URL.createObjectURL(event.target.files[i]))
      }
      this.setState({
        saleBillImages,
        browseBillImages: saleBillImages
      })
    }

    if (id === "other") {
      let otherBillImages = JSON.parse(JSON.stringify(this.state.otherBillImages))
      for (let i = 0; i < event.target.files.length; i++) {
        otherBillImages.push(URL.createObjectURL(event.target.files[i]))
      }
      this.setState({
        otherBillImages,
        browseBillImages: otherBillImages
      })
    }

    // output.src = URL.createObjectURL(event.target.files[0]);
    // let imgData = this.getBase64Image(output);
    // console.log('output.src: ', output.src);
    // this.setState({
    //   outputImage: output.src
    // })
  };

  getBase64Image = (img) => {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }


  tabActive = (event) => {
    let id = event.target.id

    this.setState({
      isActiveTab: id,
      browseBillImages: []
    })
  }

  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload[event.target.id] = event.target.value;
    this.setState({
      payload
    });
  };

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
      deleteName: ""
    })
  }

  confirmDeleteData = (id, name) => {
    event.preventDefault()
    if (name === "purchaseBillImages") {
      let purchaseBillImages = JSON.parse(JSON.stringify(this.state.purchaseBillImages))
      purchaseBillImages.splice(id, 1)
      this.setState({
        showHideClassName: 'modal display-none container',
        purchaseBillImages,
        browseBillImages: purchaseBillImages
      })
    }
    else if (name === "saleBillImages") {
      let saleBillImages = JSON.parse(JSON.stringify(this.state.saleBillImages))
      saleBillImages.splice(id, 1)
      this.setState({
        showHideClassName: 'modal display-none container',
        saleBillImages,
        browseBillImages: saleBillImages
      })
    }
    // else if (name === "saleBillImages") {
    //   let saleBillImages = JSON.parse(JSON.stringify(this.state.saleBillImages))
    //   saleBillImages.splice(id, 1)
    //   this.setState({
    //     showHideClassName: 'modal display-none container',
    //     saleBillImages
    //   })
    // }
    else if (name === "otherBillImages") {
      let otherBillImages = JSON.parse(JSON.stringify(this.state.otherBillImages))
      otherBillImages.splice(id, 1)
      this.setState({
        showHideClassName: 'modal display-none container',
        otherBillImages,
        browseBillImages: otherBillImages
      })
    }
    // else if (name === "otherBillImages") {
    //   let otherBillImages = JSON.parse(JSON.stringify(this.state.otherBillImages))
    //   otherBillImages.splice(id, 1)
    //   this.setState({
    //     showHideClassName: 'modal display-none container',
    //     otherBillImages
    //   })
    // }
  }

  billUploadHandler = (event) => {
    event.preventDefault()
    let id = event.target.id
    let browseBillImages = this.state.browseBillImages
    if (id === "purchaseBillImages") {
      browseBillImages = [];
      this.setState({
        browseBillImages
      })
    }
    else if (id === "saleBillImages") {
      browseBillImages = [];
      this.setState({
        browseBillImages
      })
    }
    else if (id === "otherBillImages") {
      browseBillImages = [];
      this.setState({
        browseBillImages
      })
    }
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
          onConfirm={() => this.confirmDeleteData(this.state.deleteId, this.state.deleteName)}
        />

        <div className="container outer-box-r">
          <div className="container filter-year-month-r">
            <div className="row">
              <div className="col-xs-6 col-6 col-sm-6 col-md-5 col-lg-5 col-xl-5">
                <select className="year-month-border-r" name="year">
                  <option value="">Select Year</option>
                  <option value="2017">2017-2018</option>
                  <option value="2018">2018-2019</option>
                  <option value="2019">2019-2020</option>
                  <option value="2020">2020-2021</option>
                </select>
              </div>
              <div className="col-xs-6 col-6 col-sm-6 col-md-5 col-lg-5 col-xl-5">
                <select className="year-month-border-r" name="month">
                  <option value="">Select Month</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </select>
              </div>
              <div className="col-xs-12 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="text-align-center-r"><p className="view-reports-r" onClick={() => { this.props.history.push('/manageUserReports') }}>view Reports</p></div>
              </div>
            </div>
          </div>

          <div className="container tab-space-r">
            <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div className={this.state.isActiveTab == "purchaseBills" ? "tab-active-base-r" : "tab-inactive-base-r"}>
                <p className="margin-0-r" id="purchaseBills" onClick={this.tabActive}>
                  Purchase Bills<br />({this.state.purchaseBillImages.length} entries)</p>
              </div>
            </div>

            <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div className={this.state.isActiveTab == "saleBills" ? "tab-active-base-r" : "tab-inactive-base-r"}>
                <p className="margin-0-r" id="saleBills" onClick={this.tabActive} className ="">
                  Sale Bills<br />({this.state.saleBillImages.length} entries)</p>
              </div>
            </div>

            <div className="col-xs-12 col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div className={this.state.isActiveTab == "otherBills" ? "tab-active-base-r" : "tab-inactive-base-r"}>
                <p className="margin-0-r" id="otherBills" onClick={this.tabActive} className ="">
                  Other<br />({this.state.otherBillImages.length} entries)</p>
              </div>
            </div>
          </div>
          
          {
            this.state.isActiveTab == "purchaseBills" ?
              <div className="container">
                <form id="purchaseBillImages" onSubmit={this.billUploadHandler}>
                  <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2 text-align-center-r">
                    <div className="card-base-r card-scroll-r">
                      {
                        this.state.browseBillImages.length == 1 ?
                          <div className="text-align-center-r">
                            <img className="browse-image-r" src={this.state.browseBillImages[0]} id="output" alt="" />
                          </div>
                          :
                          this.state.browseBillImages.map((val, index) => {
                            return <div key={index} className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-align-center-r padding-5-r">
                              <img className="browse-multiple-image-r" src={val} id="output" alt="" />
                            </div>
                          }
                          )
                      }
                    </div>
                    <input className="display-none-r" accept="image/*" onChange={this.loadFile} id="purchase"
                      type="file" multiple required />
                    <div>
                      <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div><button type="button" className="button-base-r">
                          <label className="cursor-pointer-r margin-0-r" htmlFor="purchase">Browse</label>
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

                    {this.state.purchaseBillImages.map((val, index) =>
                      <React.Fragment key={index}>
                        <div className="card-base-r">
                          <img className="selected-image-r" src={val} />
                          <p className="card-sub-heading-r">Purchase Bill.png</p>
                          <p className="card-sub-heading-r">Created At : 21-04-2020</p>
                        </div>
                        <span className="delete-report-icon-r">
                          <button name="purchaseBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                        </span>
                      </React.Fragment>
                    )}

                  </div>
                </div>
              </div>
              :
              this.state.isActiveTab == "saleBills" ?
                <div className="container">
                  <form id="saleBillImages" onSubmit={this.billUploadHandler}>
                    <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2 text-align-center-r">
                      <div className="card-base-r card-scroll-r">
                        {
                          this.state.browseBillImages.length == 1 ?
                            <div className="text-align-center-r">
                              <img className="browse-image-r" src={this.state.browseBillImages[0]} id="output" alt="" />
                            </div>
                            :
                            this.state.browseBillImages.map((val, index) => {
                              return <div key={index} className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-align-center-r padding-5-r">
                                <img className="browse-multiple-image-r" src={val} id="output" alt="" />
                              </div>
                            }
                            )
                        }
                      </div>
                      <input className="display-none-r" accept="image/*" onChange={this.loadFile} id="sale"
                        type="file" multiple required />
                      <div>
                        <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div><button type="button" className="button-base-r">
                            <label className="cursor-pointer-r margin-0-r" htmlFor="sale">Browse</label>
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

                      {this.state.saleBillImages.map((val, index) =>
                        <React.Fragment key={index}>
                          <div className="card-base-r">
                            <img className="selected-image-r" src={val} />
                            <p className="card-sub-heading-r">Sale Bill.png</p>
                            <p className="card-sub-heading-r">Created At : 21-04-2020</p>
                          </div>
                          <span className="delete-report-icon-r">
                            <button name="saleBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                          </span>
                        </React.Fragment>
                      )}

                    </div>
                  </div>
                </div>
                :

                <div className="container">
                  <form id="otherBillImages" onSubmit={this.billUploadHandler}>
                    <div className="col-xs-12 col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2 text-align-center-r">
                      <div className="card-base-r card-scroll-r">
                        {
                          this.state.browseBillImages.length == 1 ?
                            <div className="text-align-center-r">
                              <img className="browse-image-r" src={this.state.browseBillImages[0]} id="output" alt="" />
                            </div>
                            :
                            this.state.browseBillImages.map((val, index) => {
                              return <div key={index} className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-align-center-r padding-5-r">
                                <img className="browse-multiple-image-r" src={val} id="output" alt="" />
                              </div>
                            }
                            )
                        }
                      </div>
                      <input className="display-none-r" accept="image/*" onChange={this.loadFile} id="other"
                        type="file" multiple required />
                      <div>
                        <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div><button type="button" className="button-base-r">
                            <label className="cursor-pointer-r margin-0-r" htmlFor="other">Browse</label>
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

                      {this.state.otherBillImages.map((val, index) =>
                        <React.Fragment key={index}>
                          <div className="card-base-r">
                            <img className="selected-image-r" src={val} />
                            <p className="card-sub-heading-r">Other Bill.png</p>
                            <p className="card-sub-heading-r">Created At : 21-04-2020</p>
                          </div>
                          <span className="delete-report-icon-r">
                            <button name="otherBillImages" id={index} onClick={this.confirmModalHandler} className="fa fa-times-circle"></button>
                          </span>
                        </React.Fragment>
                      )}

                    </div>


                  </div>
                </div>
          }

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
