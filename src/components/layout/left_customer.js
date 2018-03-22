import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import { bindActionCreators} from 'redux';
import {changeSelectedSite} from '../../actions/authentications';

class LeftCustomerView extends Component {

  changeSelectedSite(selectedSiteId) {
    this.props.changeSelectedSite(selectedSiteId, () => {});
    setTimeout(this.reloadMe,100);
  }
  reloadMe() {
    window.location.reload();
  }
  renderSites() {

    if(this.props.authentications && this.props.authentications.selectedSites) {
    return _.map(this.props.authentications.selectedSites, data => {
      return (

        <li key={data.id} id={data.id}>
           {data.is_active === true &&
             <div className="dropIconn">
              <span className="fa fa-plus-square-o"></span>
                {this.props.authentications.selectedSiteId==data.id && <strong>{data.name}</strong>}
                {this.props.authentications.selectedSiteId!=data.id && <a href="#" onClick={()=>this.changeSelectedSite(data.id)}>{data.name}</a>}
            </div>}
       </li>

      );
    });
  }
  }
  showCounter(counter) {
    return ("000"+counter).slice(-4);
  }
  render(){
  const currentPageName = window.location.pathname;
    return(
  				<div className="navbar-default sidebar" role="navigation">
  					<div className="sidebar-nav navbar-collapse">
  					<div className="customerListName">
              {this.props.authentications.userAuth.user_summary.userType!=1 && this.props.authentications.selectedCustomer &&
  							<ul>
  								<li>Customer Id: {this.showCounter(this.props.authentications.selectedCustomer.counter_id)}</li>
  								<li>Customer Name: {this.props.authentications.selectedCustomer.name}</li>
  							</ul>
              }
  						</div>
  						<ul className="nav" id="side-menu1">
                {this.renderSites()}

                {this.props.authentications.userAuth.user_summary.userType == 1 &&

                <li key="customer0">
                 <div className="dropIconn">
                   <Link to="/manage/customer">Customers</Link>
                 </div>
                </li>
                }
  						</ul>
  					</div>
  				</div>
    );
  }
}
function mapStateToProps(state) {
  //console.log(state);
  return {
      authentications: state.authentications,
      userAuthenticated: state.authentications.userAuthenticated,
      showLoginFailedMessage: state.authentications.showLoginFailedMessage,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeSelectedSite:changeSelectedSite},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeftCustomerView));
