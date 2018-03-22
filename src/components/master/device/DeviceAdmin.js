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
import TabPaneQuery from './TabPaneQuery';
import DeviceTabPaneAdd from './DeviceTabPaneAdd';
import DetailModal from './DetailModal';
import DevicePropertyMapModel from './DevicePropertyMapModel';
import DevicePropertyDetachModel from './DevicePropertyDetachModel';

import TabPanePropertyMapList from './TabPanePropertyMapList';
import { initiateState, getDeviceType } from '../../../actions/master/device';
import { search as searchUnMappedProperties } from '../../../actions/master/property';
import { search as searchPropertyType } from '../../../actions/master/property_type';
import { changeTab,search,searchDownlinkQuery } from '../../../actions/master/device';
import ReportNav  from '../../reports/report_nav';

class DeviceAdmin extends Component {
  constructor(props) {
    super(props);
    let timer = null;
  }
  componentDidMount() {
    const siteId = this.props.authentications.userAuth.user_summary.siteId;
    const request ={device_profile_search_request:{"pageNumber": 0,"pageSize": 10,"q": siteId,"sortBy": "deviceProfileName","sortDirection": "asc"}};
    this.props.initiateState(request, () => {});
    this.props.getDeviceType();
    const req = {
      q:"",
      pageNumber:0,
      pageSize:100000,
      sortBy:"createdDate",
      sortDirection:"desc"
    };
    this.props.searchPropertyType(req);
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
  initializeQueryTab() {
    const request = {};
    this.props.searchDownlinkQuery(request).then(()=>{setTimeout(this.initQueryDataTable,100);})
  }
  initDataTable =function() {
    $('#deviceList').DataTable({destroy: true, "order": []});
  }
  initQueryDataTable =function() {
    $('#deviceQueryList').DataTable();
  }
  initializeUnMappedProperties() {
    const request = {
      q:"",
      pageNumber:0,
      pageSize:100000,
      sortBy:"createdDate",
      sortDirection:"desc"
    };
    this.props.searchUnMappedProperties(request).then(()=>{setTimeout(this.initPropertyDataTable,100);})
  }
  initPropertyDataTable = function() {
    $('#propertyList').DataTable({destroy: true, "order": []});
  }
  changeTab(val) {
    const request ={activeTabId:val};
    this.props.changeTab(request, () => {
      //this.props.history.push('/');
    });
    if(val==1) {
      this.initialiseList();
    } else if(val==4) {
      this.initializeQueryTab();
    } else if(val==3) {
      this.initializeUnMappedProperties();
    }

  }

  render(){
      return (
        <div className="tabContainer">
          <ReportNav nav="devices"/>
          <div className="tab-pane" id="timeseries">
        		<div className="siteListContainer">
              <ul className="nav nav-tabs" role="tablist">
                <li className={this.props.activeTabId==1?"active":''}><a href="#" onClick={() => this.changeTab(1)} aria-controls="siteList1" data-toggle="tab">List</a></li>
                <li className={this.props.activeTabId==2?"active":''}><a href="#" onClick={() => this.changeTab(2)} aria-controls="siteAdd1" data-toggle="tab">Add</a></li>
                <li className={this.props.activeTabId==3?"active":''}><a href="#" onClick={() => this.changeTab(3)} aria-controls="siteAdd1" data-toggle="tab">Map</a></li>
                <li className={this.props.activeTabId==4?"active":''}><a href="#" onClick={() => this.changeTab(4)} aria-controls="siteAdd1" data-toggle="tab">Query</a></li>
              </ul>
        			<div className="tab-content">
                <TabPaneList className={this.props.activeTabId==1?"active tab-pane":"tab-pane"} initializer={() => this.initialiseList()}/>
                <DeviceTabPaneAdd  className={this.props.activeTabId==2?"active tab-pane":"tab-pane"} action="add" initializer={() => this.initialiseList()}/>
                <TabPanePropertyMapList  className={this.props.activeTabId==3?"active tab-pane":"tab-pane"} action="add" initializer={() => this.initialiseList()}/>
                <TabPaneQuery  className={this.props.activeTabId==4?"active tab-pane":"tab-pane"} action="add" initializer={() => this.initializeQueryTab()}/>
        			</div>
        		</div>
            <DevicePropertyMapModel initializer={() => this.initializeUnMappedProperties()}/>
        	  <DetailModal initializer={() => this.initialiseList()}/>
            <DevicePropertyDetachModel initializer={() => this.initialiseList()}/>
        </div>
      </div>
      );
  }
}
function mapStateToProps(state) {
  return {
      authentications: state.authentications,
      activeTabId:state.device.activeTabId
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      initiateState:initiateState,
      changeTab:changeTab, getDeviceType:getDeviceType,
      search:search,
      searchDownlinkQuery:searchDownlinkQuery,
      searchUnMappedProperties:searchUnMappedProperties,
      searchPropertyType:searchPropertyType
    },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DeviceAdmin);
