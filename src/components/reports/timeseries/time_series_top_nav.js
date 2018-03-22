import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { search, downlink } from '../../../actions/reports/timeseries';
import { bindActionCreators} from 'redux';
import {changeDeviceTypeSelectionInHeader} from '../../../actions/authentications';


class TimeSeriesTopNav extends Component{

  constructor() {
    super();
}
componentDidMount() {
  this.searchAgain(this.createSearchRequest('na','na'));
}
componentDidUpdate(prevProps, prevState) {
  if(this.props.deviceType != prevProps.deviceType) {
    this.searchAgain(this.createSearchRequest('na','na'));
  }
}

  changeDateTo0(event) {
    this.searchAgain(this.createSearchRequest('daysSince','0'));
  }
  changeDateTo7(event) {
    this.searchAgain(this.createSearchRequest('daysSince','7'));
  }
  changeDateTo14(event) {
    this.searchAgain(this.createSearchRequest('daysSince','14'));
  }
  handlePacketTypeChange(event) {
    this.searchAgain(this.createSearchRequest('packetType',event.target.value));
  }

  handleDeviceTypeChange(event) {
    this.props.changeDeviceTypeSelectionInHeader(event.target.value);
  }
  createSearchRequest(key, value) {
    if(this.props.data && this.props.data.data && this.props.data.data.request) {
      const request = this.props.data.data.request;
      if(key!='na') {
        request[key] = value;
        request["pageNumber"] = 0;
        request["sortBy"] = "createdDate";
        request["sortDirection"] = "desc";
        return request;
      }

    }
    const request = {
      deviceType:this.props.deviceType,
      packetType:"",
      q:"",
      daysSince:7,
      pageNumber:0,
      pageSize:10,
      sortBy:"createdDate",
      sortDirection:"desc"
    };
    return request;

  }

  searchAgain(request) {

    this.props.search(request, () => {
      //this.props.history.push('/');
    });
  }
  callDownlinkAPIForPhase1Device() {
      const values= {devid:"3cc1f60500000342",data:{ "m2m:cin" : { "ty":4, "cnf":"text/plain:0", "cs":300, "con": "{\"payload_dl\":{\"deveui\":\"3cc1f60500000342\",\"port\":2,\"confirmed\":true,\"data\":\"Ag==\",\"on_busy\":\"fail\",\"tag\":\"981500001110632\"}}" } }};
      if(confirm('Are you sure to get instantaneous data for Phase 1 Energy Meter now?')) {
        this.props.downlink(values, () => {
          //this.props.history.push('/');
        });
      }
    }
    callDownlinkAPIForPhase3Device() {
      const values={devid:"3cc1f60500000345",data:{ "m2m:cin" : { "ty":4, "cnf":"text/plain:0", "cs":300, "con": "{\"payload_dl\":{\"deveui\":\"3cc1f60500000345\",\"port\":2,\"confirmed\":true,\"data\":\"Ag==\",\"on_busy\":\"fail\",\"tag\":\"981500001110632\"}}" } }};
      if(confirm('Are you sure to get instantaneous data for Phase 3 Energy Meter now?')) {
          this.props.downlink(values, () => {
            //this.props.history.push('/');
          });
        }
    }

showHideCommandMsg() {
  if(this.props.showSuccessCommand==true) {
      return(
    <div className="row">
      <div className="col-md-2"></div>
      <div className="col-md-3"></div>
      <div className="col-md-7 success_msg">Command Sent Successfully. Refresh the page</div>
    </div>);
  }
}

renderDeviceType() {
    if(this.props.deviceType=='ENERGY-PHASE1' || this.props.deviceType=='ENERGY-PHASE3') {
      return(
        <select className="form-control" onChange={this.handleDeviceTypeChange.bind(this)} name="deviceType">
          <option value="ENERGY-PHASE1">Energy 1 Phase</option>
          <option value="ENERGY-PHASE3">Energy 3 Phase</option>
        </select>
      );
  } else if(this.props.deviceType=='GAS') {
    return (
      <select className="form-control" name="deviceType">
        <option value="GAS">Gas</option>
      </select>
    );
  } else {
    return (
      <select className="form-control" name="deviceType">
        <option value="WATER">Water</option>
      </select>
    );
  }
}
renderPacketType() {
  if(this.props.deviceType=='ENERGY-PHASE1') {
    return(
      <select className="form-control" name="packetE1" onChange={this.handlePacketTypeChange.bind(this)} id="packetTypeE1" defaultValue={(this.props.data && this.props.data.data && this.props.data.data.request)?this.props.data.data.request.packetType:""}>
        <option value="">All Packets</option>
        <option value="ENERGY_PHASE1_INSTANTANIOUS_DATA">Instantaneous Data</option>
        <option value="ENERGY_PHASE1_LOAD_PROFILE">Load Profile Data</option>
        <option value="ENERGY_PHASE1_TEMPER_READ">Tamper Read Data</option>
        <option value="ENERGY_PHASE1_BIILING">Billing </option>
      </select>
    );
  } else if(this.props.deviceType=='ENERGY-PHASE3') {
      return(
        <select className="form-control" name="packetE3" onChange={this.handlePacketTypeChange.bind(this)} id="packetTypeE3" defaultValue={(this.props.data && this.props.data.data && this.props.data.data.request)?this.props.data.data.request.packetType:""}>
          <option value="">All Packets</option>
          <option value="ENERGY_PHASE3_INSTANTANIOUS_DATA">Instantaneous Data</option>
          <option value="ENERGY_PHASE3_LOAD_PROFILE">Load Profile Data</option>
          <option value="ENERGY_PHASE3_TEMPER_READ">Tamper Read Data</option>
          <option value="ENERGY_PHASE3_BIILING">Billing </option>
        </select>
      );
  } else if(this.props.deviceType=='GAS') {
    return (
      <select className="form-control" name="packetG" onChange={this.handlePacketTypeChange.bind(this)} id="packetTypeG" defaultValue={(this.props.data && this.props.data.data && this.props.data.data.request)?this.props.data.data.request.packetType:""}>
        <option value="">All Packets</option>
        <option value="GAS_UPLINK_FRAME1">Consumption Data</option>
        <option value="GAS_UPLINK_FRAME2">Tamper Data</option>
      </select>
    );
  } else {
    return (
      <select className="form-control" name="packetW" onChange={this.handlePacketTypeChange.bind(this)} id="packetTypeW" defaultValue={(this.props.data && this.props.data.data && this.props.data.data.request)?this.props.data.data.request.packetType:""}>
        <option value="">All Packets</option>
        <option value="WATER_UPLINK_FRAME1">Consumption Data</option>
      </select>
    );
  }
}
  render() {
  return(
    <div className="row page-titles selectDrop">
      <div className="row">
        <div className="col-md-2">
            {this.renderDeviceType()}
          </div>
          <div className="col-md-3">
            {this.renderPacketType()}
          </div>
          <div className="col-md-7 align-self-center">
          {/*(this.props.deviceType=='ENERGY-PHASE1' || this.props.deviceType=='ENERGY-PHASE3') &&
              <span>
                <input type="button" value="Downlink Phase1 Device" onClick={this.callDownlinkAPIForPhase1Device.bind(this)}/>&nbsp;
                <input type="button" value="Downlink Phase3 Device" onClick={this.callDownlinkAPIForPhase3Device.bind(this)}/>
              </span>
            */}

            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" onClick={this.changeDateTo0.bind(this)} className={(this.props.data && this.props.data.data && this.props.data.data.request)?(this.props.data.data.request.daysSince==0?"timeSeriesActive":'a'):"a"}>Today</a></li>
              <li className="breadcrumb-item"><a href="#" onClick={this.changeDateTo7.bind(this)} className={(this.props.data && this.props.data.data && this.props.data.data.request)?(this.props.data.data.request.daysSince==7?"timeSeriesActive":'a'):"a"}>Last 1 Week</a></li>
              <li className="breadcrumb-item"><a href="#" onClick={this.changeDateTo14.bind(this)} className={(this.props.data && this.props.data.data && this.props.data.data.request)?(this.props.data.data.request.daysSince==14?"timeSeriesActive":'a'):"a"}>Last 2 Weeks</a></li>
            </ol>
          </div>
      </div>
      {
        this.showHideCommandMsg()
      }

    </div>
  );
}
}
function mapStateToProps(state) {
  return {
    userAuthenticated: state.authentications.userAuthenticated,
    data: state.timeseries.data,
    showSuccessCommand:state.timeseries.showSuccessCommand,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({search: search, downlink: downlink,changeDeviceTypeSelectionInHeader:changeDeviceTypeSelectionInHeader},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeSeriesTopNav);
