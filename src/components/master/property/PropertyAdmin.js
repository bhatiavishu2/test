import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import AdminHeader from '../common/AdminHeader';
import TabPaneList from './TabPaneList';
import PropertyTabPaneAdd from './PropertyTabPaneAdd';
import DetailModal from './DetailModal';
import { initiateState } from '../../../actions/master/property';
import { changeTab,search } from '../../../actions/master/property';
import { hierarchy as propertyLocationTypeSearch } from '../../../actions/master/property_location_type';
import {search as propertyTypeSearch} from '../../../actions/master/property_type';

class PropertyAdmin extends Component {
  constructor(props) {
    super(props);
    let timer = null;
  }
  componentDidMount() {
    const siteId = this.props.authentications.userAuth.user_summary.siteId;
    const request ={"activeTab": "1"};
    this.props.initiateState(request, () => {});
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
    request['sortBy']='propertyTypeId';
    this.props.propertyLocationTypeSearch(request).then(() => {

    });
    request['sortBy']='name';
    request['sortDirection']='asc';
    this.props.propertyTypeSearch(request).then(() => {

    });
  }

  initDataTable =function() {
    $('#propertyList').DataTable({ destroy: true,"order": []});
  }

  changeTab(val) {
    const request ={activeTabId:val};
    this.props.changeTab(request, () => {
      //this.props.history.push('/');
    });
    if(val==1) {
      this.initialiseList();
    }
  }
  render(){
      return (
        <div>
        		<AdminHeader title="Property"/>

        		<div className="siteListContainer">
              <ul className="nav nav-tabs" role="tablist">
                <li className={this.props.activeTabId==1?"active":''}><a href="#" onClick={() => this.changeTab(1)} aria-controls="siteList1" data-toggle="tab">List</a></li>
                <li className={this.props.activeTabId==2?"active":''}><a href="#" onClick={() => this.changeTab(2)} aria-controls="siteAdd1" data-toggle="tab">Add</a></li>
              </ul>
        			<div className="tab-content">
                <TabPaneList className={this.props.activeTabId==1?"active tab-pane":"tab-pane"} initializer={() => this.initialiseList()}/>
                <PropertyTabPaneAdd  className={this.props.activeTabId==2?"active tab-pane":"tab-pane"} action="add" initializer={() => this.initialiseList()}/>
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
      data: state.property.data,
      activeTabId:state.property.activeTabId
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      initiateState:initiateState,
      changeTab:changeTab, search:search,
      propertyLocationTypeSearch:propertyLocationTypeSearch,
      propertyTypeSearch:propertyTypeSearch
    },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(PropertyAdmin);
