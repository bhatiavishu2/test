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
import PropertyLocationTypeTabPaneAdd from './PropertyLocationTypeTabPaneAdd';
import DetailModal from './DetailModal';
import { initiateState } from '../../../actions/master/property_location_type';
import { changeTab,search,hierarchy } from '../../../actions/master/property_location_type';

class PropertyLocationTypeAdmin extends Component {
  constructor(props) {
    super(props);
    let timer = null;
  }
  componentDidMount() {
    const request ={"activeTab": "1"};
    this.props.initiateState(request, () => {});
    this.props.hierarchy({q:"",pageSize:1000,pageNumber:0,sortBy:"propertyTypeId",sortDirection:"asc"}, () => {});
  }

  initialiseList() {
    const request = {
      q:"",
      pageNumber:0,
      pageSize:1000,
      sortBy:"createdDate",
      sortDirection:"desc"
    };
    this.props.search(request).then(() => {
      setTimeout(this.initDataTable,100);
    });
  }

  initDataTable =function() {
    $('#property_location_typeList').DataTable({destroy: true, "order": []});
  }

  changeTab(val) {
    const request ={activeTabId:val};
    this.props.changeTab(request, () => {
      //this.props.history.push('/');
    });
  }
  render(){
      return (
        <div>
        		<AdminHeader title="PropertyLocationTypes"/>

        		<div className="siteListContainer">
              <ul className="nav nav-tabs" role="tablist">
                <li className={this.props.activeTabId==1?"active":''}><a href="#" onClick={() => this.changeTab(1)} aria-controls="siteList1" data-toggle="tab">List</a></li>
                <li className={this.props.activeTabId==2?"active":''}><a href="#" onClick={() => this.changeTab(2)} aria-controls="siteAdd1" data-toggle="tab">Add</a></li>
              </ul>
        			<div className="tab-content">
                <TabPaneList className={this.props.activeTabId==1?"active tab-pane":"tab-pane"} initializer={() => this.initialiseList()}/>
                <PropertyLocationTypeTabPaneAdd  className={this.props.activeTabId==2?"active tab-pane":"tab-pane"} action="add" initializer={() => this.initialiseList()}/>
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
      data: state.property_location_type.data,
      activeTabId:state.property_location_type.activeTabId
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      initiateState:initiateState,
      changeTab:changeTab,
      search:search,
      hierarchy:hierarchy
    },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(PropertyLocationTypeAdmin);
