/**
 *
 * Trader
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
import makeSelectTrader from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ConfirmModal from '../../components/ConfirmModal/Loadable'


/* eslint-disable react/prefer-stateless-function */
export class Trader extends React.Component {
state = {
  traderList : [{
    "userId": 1,
    "userDetails": {
      "year": "2017",
      "month": "january",
      "status": "pending",
      "state": "inActive",
      "timestamp": "09-04-2020",
      "clientId": "1001",
      "tradeName": "Ram Provision Store",
      "legalName": "Ram"
    }
  },
  {
    "userId": 2,
    "userDetails": {
      "year": "2018",
      "month": "february",
      "status": "completed",
      "state": "active",
      "timestamp": "09-04-2020",
      "clientId": "1002",
      "tradeName": "shyam Provision Store",
      "legalName": "shyam"
    }
  },
  {
    "userId": 3,
    "userDetails": {
      "year": "2019",
      "month": "march",
      "status": "completed",
      "state": "active",
      "timestamp": "09-04-2020",
      "clientId": "1003",
      "tradeName": "rohan Provision Store",
      "legalName": "rohan"
    }
  }
],
reports : [{
  userId: 1,
  userBills: [{
    year: "2017",
    month: "january",
    type: "purchase",
    docs: [{
      doc_Url: "image_url",
      timestamp: "09-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "09-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "09-04-2020"
    },
    {
      doc_Url: "pdf_url",
      timestamp: "09-04-2020"
    }
    ]
  },
  {
    year: "2017",
    month: "january",
    type: "sales",
    docs: [{
      doc_Url: "image_url",
      timestamp: "09-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "09-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "09-04-2020"
    },
    {
      doc_Url: "pdf_url",
      timestamp: "09-04-2020"
    }
    ]
  },
  {
    year: "2017",
    month: "january",
    type: "other",
    docs: [{
      doc_Url: "image_url",
      timestamp: "09-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "09-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "09-04-2020"
    },
    {
      doc_Url: "pdf_url",
      timestamp: "09-04-2020"
    }
    ]
  }
  ]
},
{
  userId: 2,
  userBills: [{
    year: "2018",
    month: "february",
    type: "purchase",
    docs: [{
      doc_Url: "image_url",
      timestamp: "10-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "10-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "10-04-2020"
    },
    {
      doc_Url: "pdf_url",
      timestamp: "10-04-2020"
    }
    ]
  },
  {
    year: "2018",
    month: "february",
    type: "sales",
    docs: [{
      doc_Url: "image_url",
      timestamp: "10-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "10-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "10-04-2020"
    },
    {
      doc_Url: "pdf_url",
      timestamp: "10-04-2020"
    }
    ]
  },
  {
    year: "2018",
    month: "february",
    type: "other",
    docs: [{
      doc_Url: "image_url",
      timestamp: "10-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "10-04-2020"
    },
    {
      doc_Url: "image_url",
      timestamp: "10-04-2020"
    },
    {
      doc_Url: "pdf_url",
      timestamp: "10-04-2020"
    }
    ]
  }
  ]
},
{
  userId: 3,
  userBills: []
}],
payload : {
  year : "",
  month:"",
  userType:"",
},
filteredData: [],
reactTableData:[],
isFetching: false

}

componentWillMount(){
  setTimeout( this.loadingTime , 500);
}

loadingTime =()=>{
this.setState({
  isFetching :false
})
}

  nameChangeHandler = (event) => {
    var filteredData = []
    let payload = JSON.parse(JSON.stringify(this.state.payload)) 
    payload[event.target.id] = event.target.value
    if(event.target.id == "year"){
      filteredData = this.state.traderList.filter(val => val.userDetails.year == event.target.value);
      payload.month = ""
      payload.userType = ""
    }
    else if (event.target.id == "month"){
      filteredData = this.state.traderList.filter(val => val.userDetails.month == event.target.value);
      payload.year =""      
      payload.userType = ""
    }
    else if (event.target.id == "userType"){
      if (event.target.value == "completed" || event.target.value == "pending"){
        filteredData = this.state.traderList.filter(val => val.userDetails.status == event.target.value);
      }
      
      else if (event.target.value == "active" || event.target.value == "inActive"){
        filteredData = this.state.traderList.filter(val => val.userDetails.state == event.target.value);
    }

    else if (event.target.value == "withData" || event.target.value == "withoutData"){

    if (event.target.value == "withData"){
        filteredData = this.state.reports.map(val => {if(val.userBills.length > 0) return val.userId});
        filteredData = filteredData.filter(val => {if(val != undefined) return val });
        filteredData = this.state.traderList.filter( val => filteredData.includes(val.userId))
      }
      else{
      filteredData = this.state.reports.map(val => {if(val.userBills.length == 0) return val.userId});
      filteredData = filteredData.filter(val => {if(val != undefined) return val });
      filteredData = this.state.traderList.filter( val => filteredData.includes(val.userId))
      }

    }
    else if ( event.target.value == "all")
    filteredData = this.state.traderList;
  
    else
      filteredData = []
      payload.year = ""
      payload.month = ""
  }

    var reactTableData = filteredData.map(val=>{
      return {
        userId : val.userId,
        clientId : val.userDetails.clientId,
        tradeName : val.userDetails.tradeName,
        legalName : val.userDetails.tradeName,
        status : val.userDetails.status
      }
    })

    this.setState({
      payload,
      reactTableData
    })
  }
  
  confirmModalHandler = () => {
    this.setState({
      isConfirmModal: true
    })
  }

  modalCloseHandler = () => {
    this.setState({
      isConfirmModal: false,
      isResetModal : false
    })
  }

  confirmDeleteData = (id) => {
    event.preventDefault()
    this.setState({
      isConfirmModal: false
    })
  }


    render() {
      const columns = [{ 
        Header: 'Serial No.',
        accessor: 'userId',
        // filterable : true,
        width:100,
      },
      { 
        Header: 'client Id',
        accessor: 'clientId',
        width:150,
        filterable : true,
      },
      { 
        Header: 'Trade Name',
        accessor: 'tradeName',
        filterable : true,
      },
      { 
        Header: 'Legal Name',
        accessor: 'legalName',
        filterable : true,
      },
      { 
        Header: 'Status',
        accessor: 'status',
        width :80,
        Cell: row => 
            (
              <div>
                <input checked={row.original.status == "completed"} data-toggle="modal" data-target="#statusPassword" className="status-button-r" type="checkbox"/>
              </div>
            )
      },
      {
        Header: 'Actions',
        sortable : false,
        width:150,
        Cell: row => 
        (<div>
          <a className = "infoButton-r" onClick={() => { this.props.history.push('/userDetails/'+row.original.userId)}}><i class="fa fa-info" aria-hidden="true"></i></a>
          <span className = "editButton-r"><i className="fas fa-pen" /></span>
          <a className="deleteButton-r" onClick={this.confirmModalHandler} ><i className="far fa-trash-alt" /></a>
        </div>
        )
      },  
     ]
    
    return (
      <div>
        <Helmet>
          <title>Trader</title>
          <meta name="description" content="Description of Trader" />
        </Helmet>

        {this.state.isConfirmModal ? <ConfirmModal
          onClose={this.modalCloseHandler}
          onConfirm={() => this.confirmDeleteData("1")}
        /> : null}

  <div className="container">
		<div className="modal fade" id="statusPassword" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header" style={{backgroundColor:"#f06d46"}}>
						<span style={{color:"white"}}>Status Password</span>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close"><i
								className="fa fa-times" aria-hidden="true"></i></button>
					</div>

					<div className="modal-body,input-group input-group-lg">
						<div className="reset-form-padding-r">
               <form method="post" action="user.html">
								<input type="text" name="NewPassword" className="form-control reset-input-box-r"
									placeholder="Status Password" required/>
								<span>
									<input type="submit" className="btn btn-primary btn-lg btn-block reset-button-r" name=""
										value="Submit"/>
								</span>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div className="container">
		<div className="modal fade" id="registration" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div id="#registration" className="modal-content">
					<div className="modal-header" style={{backgroundColor:"#f06d46"}}>
						<span style={{color:"white"}}>New Registration</span>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close"><i
								className="fa fa-times" aria-hidden="true"></i></button>
					</div>

					<div className="modal-body,input-group input-group-lg registration-body-padding-r">
						<form method="post" action="trader.html">
							<div className="row registration-row-margin-r">
								<div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
									<input type="text" name="name" className="form-control input-registration-r"
										placeholder="Name" required/>
								</div>

								<div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
									<input type="tel" name="phone" pattern="[1-9]{1}[0-9]{9}"
										title="Enter 10 digit mobile number" name="telephone"
										className="form-control input-registration-r" placeholder="Mobile" required/>
								</div>
							</div>
							<div className="row registration-row-margin-r">
								<div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
									<input type="email" name="email" className="form-control input-registration-r"
										placeholder="Email-Id" required/>
								</div>
								<div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
									<input type="text" name="pan" className="form-control input-registration-r"
										placeholder="PAN Number" required/>
								</div>
							</div>
							<div className="row registration-row-margin-r">
								<div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
									<input type="text" name="gst" className="form-control input-registration-r"
										placeholder="GST Number" required/>
								</div>
								<div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
									<input type="text" name="trade" className="form-control input-registration-r"
										placeholder="Trade Name" required/>
								</div>
							</div>
							<div className="row registration-row-margin-r">
								<div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
									<input type="text" name="principlePlace" className="form-control input-registration-r"
										placeholder="Principle Place Of Business" required/>
								</div>
								<div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
									<input type="text" name="additionalPlace" className="form-control input-registration-r"
										placeholder="Additional Place Of Business" required/>
								</div>
							</div>
							<div className="row registration-row-margin-r">
								<div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
									<select className="custom-select registration-dropdown-r" name="lectureId" required>
										<option value="">Constitution Type</option>
										<option value="2017">2017-2018</option>
										<option value="2018">2018-2019</option>
										<option value="2019">2019-2020</option>
										<option value="2020">2020-2021</option>
									</select>
								</div>
								<div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
									<select className="custom-select registration-dropdown-r" name="lectureId" required>
										<option value="">Registration Type</option>
										<option value="2017">2017-2018</option>
										<option value="2018">2018-2019</option>
										<option value="2019">2019-2020</option>
										<option value="2020">2020-2021</option>
									</select>
								</div>
								<div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
									<select className="custom-select registration-dropdown-r" name="lectureId" required>
										<option value="">Return Type</option>
										<option value="2017">2017-2018</option>
										<option value="2018">2018-2019</option>
										<option value="2019">2019-2020</option>
										<option value="2020">2020-2021</option>
									</select>
								</div>
							</div>
							<div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
								<textarea className="form-control input-registration-r registration-row-margin-r"
									placeholder="Address" name="address" required rows="5">
							</textarea>
							</div>
							<span>
								<input type="submit"
									className="btn btn-primary btn-lg btn-block registration-submit-button-r" name=""
									value="Register"/>
							</span>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
  <div className="container outer-box-r">
<div className="container filter-year-month-r">
  <div style={{marginBottom: "20px"}} className="row">
    <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
      <select id="year" onChange={this.nameChangeHandler} value={this.state.payload.year} className="custom-select year-month-border-r"
        name="lectureId">
        <option value="">Select Year</option>
        <option value="2017">2017-2018</option>
        <option value="2018">2018-2019</option>
        <option value="2019">2019-2020</option>
        <option value="2020">2020-2021</option>
      </select>
    </div>
    <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
      <select id="month" onChange={this.nameChangeHandler} value={this.state.payload.month} className="custom-select year-month-border-r"
        name="lectureId">
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
    <div className="col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
      <select id="userType" onChange={this.nameChangeHandler} value={this.state.payload.userType} className="custom-select year-month-border-r"
        name="lectureId">
        <option value="">Select User</option>
        <option value="all">All Users</option>
        <option value="withData">User with Data</option>
        <option value="withoutData">User without Data</option>
        <option value="completed">Status Completed</option>
        <option value="pending">Status Pending</option>
        <option value="inActive">InActive</option>
        <option value="active">Active</option>
      </select>
    </div>
  </div>
</div>
<div className="container">
<div className="customReactTableBox">
    <ReactTable
    className="customReactTable"
    data={this.state.reactTableData}
    columns={columns}
    defaultPageSize = {5}
    noDataText={
      this.state.isFetching ? "" : "There is no data to display."
    }
    loading={this.state.isFetching}
    loadingText={"Loading ..."}
  />
  </div>
  </div>
    {/* {this.state.filteredData || this.state.filteredUserData ? 

this.state.filteredData && this.state.filteredData.length > 0  || this.state.filteredUserData && this.state.filteredUserData.length > 0 ?

           <div className="table-responsive table-border-r">
        <table style={{textAlign: "center"}} className="table table-hover">
          <thead>
            <tr>
              <th style={{textAlign: "center"}} scope="col">Sno.</th>
              <th style={{textAlign: "center"}} scope="col">ClientId</th>
              <th style={{textAlign: "center"}} scope="col">Trade Name</th>
              <th style={{textAlign: "center"}} scope="col">Legal Name</th>
              <th style={{textAlign: "center"}} scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            { this.state.payload.userType == "" ? 
            this.state.filteredData && this.state.filteredData.map((val,index) => {
              return <tr key={index}>
              <th style={{textAlign: "center"}} scope="row">{val.userId}</th>
              <td><a href="/user/details"></a>{val.userDetails.clientId}</td>
              <td><a href="/user/details">{val.userDetails.tradeName}</a></td>
              <td><a href="./user/details">{val.userDetails.legalName}</a></td>
              <td className="td-width-status-r">
                <input data-toggle="modal" checked={val.userDetails.status == "completed"}data-target="#statusPassword" className="status-button-r" type="checkbox"/>
									</td>
              </tr>
            })
            :
            this.state.filteredUserData && this.state.filteredUserData.map((val,index) => {
              return <tr key={index}>
              <th style={{textAlign: "center"}} scope="row">{val.userId}</th>
              <td><a href="/user/details"></a>{val.userDetails.clientId}</td>
              <td><a href="/user/details">{val.userDetails.tradeName}</a></td>
              <td><a href="./user/details">{val.userDetails.legalName}</a></td>
              <td className="td-width-status-r">
                <input checked={val.userDetails.status == "completed"} data-toggle="modal" data-target="#statusPassword" className="status-button-r" type="checkbox"/>
									</td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>:
<div className="image-center-r">
<img src={require('../../assets/img/nodatafound.png')} alt=""/>	
</div>      
      :
      <div className="image-center-r">
      <img src={require('../../assets/img/nofilters.png')} alt=""/>	
    </div>
    } */}

  {/* <div className="image-center-r">
    <img src="/img/nodatafound.png" alt=""/>
  </div> */}
  {/* // <div className="image-center-r">
  //     <img src="/img/nofilters.png" alt="">	
  //   </div>
  // <div className="image-center-r">
  //     <img style="height: 100px;
  //     margin: 215px -3px 0px;
  //     position: absolute;
  //     z-index: 99;" src="/img/nofilter.png" alt=""/>
  //     <img style="position: relative;" src="/img/box1.png" alt=""/>
  //     <p style="    text-align: center;
  //     margin: 400px 0px;
  //     position: absolute;
  //     font-size: 30px;
  //     color: #4687C7;">No Filters Selected</p>		
  //     <i style="position: absolute;
  //     margin: 273px 25px;
  //     font-size: 37px;
  //     color: #4687C7;" className="fa fa-times" aria-hidden="true"></i>
  //   </div> */}

</div>
      </div>
    );
  }
}

Trader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  trader: makeSelectTrader(),
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

const withReducer = injectReducer({ key: 'trader', reducer });
const withSaga = injectSaga({ key: 'trader', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Trader);
