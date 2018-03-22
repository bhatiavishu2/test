import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import LeftCustomerView from '../../components/layout/left_customer';
import RightDropDownCustomer from '../../components/layout/right_dropdown_customer';
import { bindActionCreators} from 'redux';
import {changeDeviceTypeSelectionInHeader} from '../../actions/authentications';

class HeaderCustomerView extends Component {
  renderTopDeviceTypeTabClass(tabName) {
      if(tabName=='Energy' && (this.props.authentications.selectedDeviceTypeInHeader=='ENERGY-PHASE1' || this.props.authentications.selectedDeviceTypeInHeader=='ENERGY-PHASE3')) {
        return "activeMain";
      }
      if(tabName=='Gas' && this.props.authentications.selectedDeviceTypeInHeader=='GAS') {
        return "activeMain";
      }
      if(tabName=='Water' && this.props.authentications.selectedDeviceTypeInHeader=='WATER') {
        return "activeMain";
      }
    return "";
  }

  hasDeviceTypeAccess(deviceTypeId) {
    if(!this.props.authentications || !this.props.authentications.selectedCustomer ||!this.props.authentications.selectedCustomer.device_type_ids) {
      return false;
    }
    const deviceTypes = this.props.authentications.selectedCustomer.device_type_ids;
    for(var count=0;count<deviceTypes.length;count++) {
      if(deviceTypes[count]==deviceTypeId) {
        return true;
      }
    }
    return false;
  }
  changeDeviceTypeSelectionInHeader(values){
    const {changeDeviceTypeSelectionInHeader} = this.props;
    changeDeviceTypeSelectionInHeader(values);
    setTimeout(this.reloadMe,100);
  }
  reloadMe() {
    window.location.reload();
  }

  render(){
    const currentPageName = window.location.pathname;
    if(!this.props.authentications.userAuthenticated) {
      return (<div/>);
    }
    return(
      <nav className="navbar navbar-default navbar-static-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/"><img src="/images/tata-communication.png" className="img-responsive" alt="Tata Communication" width="633" height="44"/></a>
        </div>
        {/*
        <ul className="navbar-left hidden-xs">
          <li><a className="menu-brand" id="menu-toggle"><span className="ti-view-grid"></span></a></li>
        </ul>
        */}
        <ul className="navbar-left mainLinks">

            {(currentPageName!='/manage/customer') && (this.hasDeviceTypeAccess('5a6a2f6f5c8266016e355dd7') || this.hasDeviceTypeAccess('5a6a2f755c8266016e355dd8')) &&
              <li className={this.renderTopDeviceTypeTabClass('Energy')}><a href="#" onClick={()=>this.changeDeviceTypeSelectionInHeader("ENERGY-PHASE1")}><span></span> Energy</a></li>
            }
            {(currentPageName!='/manage/customer') && (this.hasDeviceTypeAccess('5a6a2f7e5c8266016e355dd9')) &&
              <li className={this.renderTopDeviceTypeTabClass('Gas')}><a href="#" onClick={()=>this.changeDeviceTypeSelectionInHeader("GAS")}><span></span> Gas</a></li>
            }
            {(currentPageName!='/manage/customer') && (this.hasDeviceTypeAccess('5a6a2f845c8266016e355dda')) &&
              <li className={this.renderTopDeviceTypeTabClass('Water')}><a href="#" onClick={()=>this.changeDeviceTypeSelectionInHeader("WATER")}><span></span> Water</a></li>
            }
        </ul>
        <RightDropDownCustomer/>

        <LeftCustomerView />
      </nav>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
      authentications: state.authentications,
      time_series_device_type:(state.timeseries && state.timeseries.data && state.timeseries.data.data)?state.timeseries.data.data.deviceTypeLabel:""
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeDeviceTypeSelectionInHeader:changeDeviceTypeSelectionInHeader},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderCustomerView);
