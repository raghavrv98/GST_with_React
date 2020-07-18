/**
 *
 * ManageAccountant
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
import makeSelectManageAccountant from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ConfirmModal from '../../components/ConfirmModal/Loadable'
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import moment from 'moment';
import MessageModal from '../../components/MessageModal/Loadable'
import { errorHandler } from '../../utils/commonUtils';

/* eslint-disable react/prefer-stateless-function */
export class ManageAccountant extends React.Component {

  state = {
    showHideClassName: 'modal display-none container',
    month: 4,
    year: 2020,
    accountantType: "all",
    isFetching: true,
    isOpenClassName: 'modal display-none container',
    accountants: []
  }

  getAccountant = (month, year) => {
    let url = window.API_URL + `/accountants/${month}/${year}`;
    axios.get(url)
      .then((res) => {
        const accountants = res.data.data;
        this.setState({ accountants, isFetching: false });
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

  statusUpdate = (id, status) => {
    let url = window.API_URL + `/changeStatus/${id}`;
    axios.put(url, { 'status': status })
      .then((res) => {
        const data = res.data.data;
        this.setState({
          message: res.data.message,
          isFetching: true,
        }, () => this.getAccountant(this.state.month, this.state.year));
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

  deleteAccountant = (id) => {
    let url = window.API_URL + `/accountant/${id}`;
    axios.delete(url)
      .then((res) => {
        const data = res.data.data;
        this.setState({
          message: res.data.message,
          isFetching: false,
          type: "success",
          isOpenClassName: 'modal display-block container'
        }, () => this.getAccountant(this.state.month, this.state.year), setTimeout(this.modalTime, 1500))
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
    this.getAccountant(this.state.month, this.state.year)
  }

  modalTime = () => {
    this.setState({
      isOpenClassName: 'modal display-none container',
      isFetching: false
    })
  }

  confirmModalHandler = (id) => {
    this.setState({
      showHideClassName: 'modal display-block container',
      deleteId: id
    })
  }

  modalCloseHandler = () => {
    this.setState({
      isResetModal: false,
      showHideClassName: 'modal display-none container',
      deleteId: ""
    })
  }

  confirmDeleteData = (id) => {
    event.preventDefault()
    this.deleteAccountant(id)
    this.setState({
      showHideClassName: 'modal display-none container',
      isFetching: true
    })
  }

  nameChangeHandler = (event) => {
    let year = this.state.year
    let month = this.state.month
    let accountantType = this.state.accountantType
    let id = event.target.id

    if (id === "year") {
      year = event.target.value
    }
    else if (id === "month") {
      month = event.target.value
    }
    else if (id === "accountantType") {
      accountantType = event.target.value
    }

    this.setState({
      year, month, accountantType, isFetching: true,
    }, () => this.getAccountant(this.state.month, this.state.year, this.state.accountantType))
  }

  statusChangeHandler = (event) => {
    let id = event.target.id
    let status = event.target.checked
    this.setState({
      isFetching: true,
    }, () => this.statusUpdate(id, status));
  };

  render() {
    const columns = [
      {
        Header: 'Created At',
        accessor: 'timestamp',
        width: 200,
        Cell: row => (
          <div className="onClick-cell-r">{moment(row.original.timestamp).format("DD MMM YYYY HH:mm")}</div>
        )
      },
      {
        Header: 'Accountant Id',
        accessor: 'accountantId',
        width: 150,
        filterable: true,
        Cell: row => (
          <div className="onClick-cell-r">{row.original.accountantId}</div>
        )
      },
      {
        Header: 'Name',
        accessor: 'name',
        filterable: true,
        Cell: row => (
          <div className="onClick-cell-r">{row.original.firstName + " " + row.original.middleName + " " + row.original.lastName}</div>
        )
      },
      {
        Header: 'Mobile Number',
        accessor: 'mobileNumber',
        Cell: row => (
          <div className="onClick-cell-r">{row.original.mobileNumber}</div>
        )
      },
      {
        Header: 'Actions',
        sortable: false,
        width: 150,
        Cell: row =>
          (<div>
            <span className="editButton-r" data-tip data-for="edit" onClick={() => { this.props.history.push('/addOrEditaccountant/' + row.original._id) }}><i className="far fa-edit" /><ReactTooltip id="edit" type="dark" ><div className="tooltipText"><p>Edit</p></div></ReactTooltip></span>
            <span className="deleteButton-r" data-tip data-for="delete" onClick={() => this.confirmModalHandler(row.original._id)}><i className="far fa-trash-alt" /><ReactTooltip id="delete" type="dark" ><div className="tooltipText"><p>Delete</p></div></ReactTooltip></span>
          </div>
          )
      },
    ]
    return (
      <div>
        <Helmet>
          <title>ManageAccountant</title>
          <meta name="description" content="Description of ManageAccountant" />
        </Helmet>

        <ConfirmModal
          showHideClassName={this.state.showHideClassName}
          onClose={this.modalCloseHandler}
          onConfirm={() => this.confirmDeleteData(this.state.deleteId)}
        />

        <MessageModal
          showHideClassName={this.state.isOpenClassName}
          modalType={this.state.type}
          message={this.state.message}
          onClose={this.modalCloseHandler}
        />

        <div className="container outer-box-r">
          <div>
            <ul className="breadCrumb-bg-r">
              <li className="breadCrumb-li-r"><i className="fa fa-home" aria-hidden="true"></i><span className="breadcrumb-text-r">Home</span></li>
            </ul>
          </div>
          <div className="container filter-year-month-r">
            <div className="row">
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="year" onChange={this.nameChangeHandler} value={this.state.year} className="year-month-border-r"
                  name="lectureId">
                  <option disabled={true} value="0">Select Year</option>
                  <option value="2020">2020-2021</option>
                  <option value="2019">2019-2020</option>
                  <option value="2018">2018-2019</option>
                  <option value="2017">2017-2018</option>
                </select>
              </div>
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select id="month" onChange={this.nameChangeHandler} value={this.state.month} className="year-month-border-r"
                  name="lectureId">
                  <option disabled={true} value="0">Select Month</option>
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
              <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <select disabled={true} id="accountantType" onChange={this.nameChangeHandler} value={this.state.accountantType} className="year-month-border-r not-allowed"
                  name="lectureId">
                  <option disabled={true} value="0">Select accountant</option>
                  <option value="all">All accountants</option>
                  <option value="withData">accountant with Data</option>
                  <option value="withoutData">accountant without Data</option>
                  <option value="completed">Status Completed</option>
                  <option value="pending">Status Pending</option>
                  <option value="inActive">InActive</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>
          </div>
          <div className="container">
            <button type="button" onClick={() => { this.props.history.push('/addOrEditAccountant') }} className="button-base-r newEntry-r">New Accountant</button>
          </div>
          <div className="container">
            {/* <div className="customReactTableBox">
              <ReactTable
                className="customReactTable"
                data={this.state.accountants}
                columns={columns}
                defaultPageSize={5}
                noDataText={
                  this.state.isFetching ? "" : "There is no data to display."
                }
                loading={this.state.isFetching}
                loadingText={"Loading ..."}
                PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
              />
            </div> */}

<ul>
            {this.state.isFetching ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
              this.state.accountants.length > 0 ?
              this.state.accountants.map((val, index) => <li key={index} className="li-outer">
                <span 
                // onClick={() => this.props.history.push(`/userDetails/${val._id}/${this.state.month}/${this.state.year}`)}
                >
                  <span className="li-image-icon">
                    <img className="li-image" src={require('../../assets/img/download.png')} />
                  </span>
                  <div className="li-content-user-p">
                    <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                        Accountant Id :
                  </span>
                        <span className="li-content">
                          {val.accountantId}
                        </span>
                      </div>
                      <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 ellipses">
                        <span className="li-content-title">
                        Name :
                  </span>
                        <span className="li-content">
                        {val.firstName + " " + val.middleName + " " + val.lastName}
                        </span>
                      </div>
                      <div className="col-xs-12 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <span className="li-content-title">
                          Mobile Number :
                  </span>
                        <span className="li-content">
                          {val.mobileNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </span>
                <span className="download-view-btn-grp-user">
                  <span className="editButton-r" data-tip data-for="edit" onClick={() => this.props.history.push('/addOrEditaccountant/' + val._id)}><i className="far fa-edit"></i><ReactTooltip id="edit" type="dark" ><div className="tooltipText"><p>Edit</p></div></ReactTooltip></span>
                  <span className="deleteButton-r" data-tip data-for="delete" onClick={() => this.confirmModalHandler(val._id)}><i className="far fa-trash-alt"></i><ReactTooltip id="delete" type="dark" ><div className="tooltipText"><p>Delete</p></div></ReactTooltip></span>
                </span>
              </li>
              )
              :
              <div className="li-outer"><span className="no-data-text">No Data Found</span></div>
            }
            </ul>

          </div>
        </div>
      </div>
    );
  }

}

ManageAccountant.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageAccountant: makeSelectManageAccountant(),
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

const withReducer = injectReducer({ key: 'manageAccountant', reducer });
const withSaga = injectSaga({ key: 'manageAccountant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageAccountant);
