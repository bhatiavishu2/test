import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm,reset,clearSubmitErrors,initialize,destroy } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import AdminHeader from '../common/AdminHeader';
import TabPaneList from './TabPaneList';
import UserTabPaneAdd from './UserTabPaneAdd';
import DetailModal from './DetailModal';
import { initiateState,getCustomers,getMySites } from '../../../actions/master/user';
import { changeTab,search } from '../../../actions/master/user';

class UserAdmin extends Component {
  constructor(props) {
    super(props);
    let timer = null;
  }
  componentWillMount() {
    //const siteId = this.props.authentications.userAuth.user_summary.siteId;
    const request ={"sortBy": "name","sortDirection":"asc","pageSize":1000,"pageNumber":0};
    this.props.initiateState(request, () => {});
    this.props.getCustomers(()=>{});
    this.props.getMySites(()=>{});
  }

  initialiseList() {
    const request = {
      q:"",
      pageNumber:0,
      pageSize:100000,
      sortBy:"createdDate",
      sortDirection:"desc"
    };
    this.props.search(request).then(() => {
      setTimeout(this.initDataTable,100);
    });
  }

  initDataTable =function() {
    $('#userList').DataTable({destroy: true, "order": []});
  }

  changeTab(val) {
    const request ={activeTabId:val};
    this.props.changeTab(request, () => {
      //this.props.history.push('/');
    });
    if(val==1) {
      this.initialiseList();
    } else {
      //this.props.destroy("UserTabPaneAdd");
      //this.props.initialize("UserTabPaneAdd",undefined);
    }
  }
  render(){
      return (
        <div>
        		<AdminHeader title="Users"/>

        		<div className="siteListContainer">
              <ul className="nav nav-tabs" role="tablist">
                <li className={this.props.activeTabId==1?"active":''}><a href="#" onClick={() => this.changeTab(1)} aria-controls="siteList1" data-toggle="tab">List</a></li>
                <li className={this.props.activeTabId==2?"active":''}><a href="#" onClick={() => this.changeTab(2)} aria-controls="siteAdd1" data-toggle="tab">Add</a></li>
              </ul>
        			<div className="tab-content">
                <TabPaneList className={this.props.activeTabId==1?"active tab-pane":"tab-pane"} initializer={() => this.initialiseList()}/>
                <UserTabPaneAdd  className={this.props.activeTabId==2?"active tab-pane":"tab-pane"} action="add" initializer={() => this.initialiseList()}/>
        			</div>
        		</div>
        	<DetailModal initializer={() => this.initialiseList()}/>
        </div>
      );
  }
}
function mapStateToProps(state) {
  return {
      authentications: state.authentications,
      data: state.user.data,
      activeTabId:state.user.activeTabId
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      initiateState:initiateState,
      changeTab:changeTab,
      search:search,
      getCustomers:getCustomers,
      reset:reset,
      clearSubmitErrors:clearSubmitErrors,
      initialize:initialize,
      destroy:destroy,
      getMySites:getMySites
    },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin);
