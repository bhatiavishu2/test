import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import TableHeader from '../common/TableHeader';
import EntitySearchBox from '../common/EntitySearchBox';
import { search } from '../../../actions/master/customer';
import ShowData from './ShowData';
import {switchToCustomer as  signIn,searchSites,searchCustomer,getRole } from '../../../actions/authentications';

class TabPaneList extends Component {
  constructor(props) {
    super(props);
    let timer = null;
    // This binding is necessary to make `this` work in the callback
    this.signinSubmit = this.signinSubmit.bind(this);
  }
  componentDidMount() {
    this.props.initializer();
  }

  signinSubmit(customerId) {
    var values = {"customer_id":customerId};
    this.props.signIn(values).then(() => {
      if(this.props.authentications.userAuth.user_summary.userType!=1) {
        const request = {
          q:"",
          pageNumber:0,
          pageSize:100000,
          sortBy:"createdDate",
          sortDirection:"desc"
        };
        this.props.searchCustomer(request);
        this.props.searchSites(request);
      }
      this.props.getRole("5a783e4990b30c320d1d58ff");
      this.props.history.push("/dashboard");
    });
  }


renderPosts() {
  if(this.props.searchData) {
  return _.map(this.props.searchData.entities, data => {
    return (
      <ShowData key={data.id} data={data} switch={()=>this.signinSubmit(data.id)}/>
    );
  });
  }
}

  render(){
      return (
				<div className={this.props.className}>
        <div className="row page-titles gapZeros withoutbg">
          <div className="col-xs-12 col-sm-12">
          </div>
        </div>
					{/*<EntitySearchBox/>*/}
          {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="Customer"/>}
					<div className="row">
						<div className="col-xs-12">
							<div className="OuterTables">
								<div className="table-responsive">
									<table className="table table-striped table-bordered text-center" id="customerList">
										<thead>
											<tr>
						{/*<th>ID</th>*/}
                        <th>Customer ID</th>
                        <th>Customer NAME</th>
                        <th>Customer Category</th>
                        <th>Phone#</th>
                        <th>Email Id</th>
                        <th>Address</th>
                        <th>Action</th>
                      </tr>
										</thead>
										<tbody>
											{this.renderPosts()}
										</tbody>

									</table>
								</div>
							</div>
						</div>
					</div>
				</div>

      );
  }
}
function mapStateToProps(state) {
  //console.log(state);
  return {
      authentications: state.authentications,
      searchData: state.customer.searchData,
      showDownloadSuccessCommand:state.customer.showDownloadSuccessCommand
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      search:search,
      signIn: signIn,
      searchSites:searchSites,
      searchCustomer:searchCustomer,
      getRole:getRole

    },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TabPaneList))
