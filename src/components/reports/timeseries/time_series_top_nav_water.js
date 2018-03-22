import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { search, downlink } from '../../../actions/reports/timeseries';
import { bindActionCreators} from 'redux';


class TimeSeriesTopNavWater extends Component{

  constructor() {
    super();
    let deviceType="WATER";
    let packetType="";
    let daysSince=7;
    let pageNumber=0;
    let pageSize=10;
}
componentDidMount() {
  this.deviceType="WATER";
  this.packetType="";
  this.daysSince=7;
  this.pageNumber=0;
  this.pageSize=10;
  this.searchAgain();

}
  changeDateTo0(event) {
    this.daysSince=0;
    this.pageNumber=0;
    this.searchAgain();
  }
  changeDateTo7(event) {
    this.daysSince=7;
    this.pageNumber=0;
    this.searchAgain();
  }
  changeDateTo14(event) {
    this.daysSince=14;
    this.pageNumber=0;
    this.searchAgain();
  }
  handlePacketTypeChange(event) {
    const values = {documentType:event.target.value,pageNumber:0,pageSize:100};

    this.packetType=event.target.value;
    this.daysSince=7;
    this.pageNumber=0;

    this.searchAgain();

  }
  handleDeviceTypeChange(event) {
    //console.log(event.target.value);

    const oldSel = document.getElementById("packetType");
    while (oldSel.options.length > 0) {
      oldSel.remove(oldSel.options.length - 1);
    }
    switch(event.target.value) {
      case "ENERGY-PHASE1":
        this.addEnergyPhase1Options(oldSel);
        break;
      case "ENERGY-PHASE3":
        this.addEnergyPhase3Options(oldSel);
        break;
      case "GAS":
        this.addGasOptions(oldSel);
        break;
      case "WATER":
        this.addWaterOptions(oldSel);
        break;
    }

    this.deviceType=event.target.value;
    this.packetType="";
    this.daysSince=7;
    this.pageNumber=0;

    this.searchAgain();

    //document.getElementById("packetType").options = [new Option("1","1"),new Option("2","2")];
  }
  searchAgain() {
    const values = {
      deviceType:this.deviceType,
      packetType:this.packetType,
      daysSince:this.daysSince,
      pageNumber:this.pageNumber,
      pageSize:this.pageSize};
    this.props.search(values, () => {
      //this.props.history.push('/');
    });
  }
  callDownlinkAPIForPhase1Device() {
    const values= {devid:"3cc1f60500000342",data:{ "m2m:cin" : { "ty":4, "cnf":"text/plain:0", "cs":300, "con": "{\"payload_dl\":{\"deveui\":\"3cc1f60500000342\",\"port\":2,\"confirmed\":true,\"data\":\"gAA=\",\"on_busy\":\"fail\",\"tag\":\"981500001110632\"}}" } }};
    this.props.downlink(values, () => {
      //this.props.history.push('/');
    });
  }
  callDownlinkAPIForPhase3Device() {
    const values={devid:"3cc1f60500000345",data:{ "m2m:cin" : { "ty":4, "cnf":"text/plain:0", "cs":300, "con": "{\"payload_dl\":{\"deveui\":\"3cc1f60500000345\",\"port\":2,\"confirmed\":true,\"data\":\"gAA=\",\"on_busy\":\"fail\",\"tag\":\"981500001110632\"}}" } }};
    this.props.downlink(values, () => {
      //this.props.history.push('/');
    });
  }
  addEnergyPhase1Options(oldSel) {
    const e10 = new Option("All Packets","");
    const e11 = new Option("Instantaneous Data","ENERGY_PHASE1_INSTANTANIOUS_DATA");
    const e12 = new Option("Load Profile Data","ENERGY_PHASE1_LOAD_PROFILE");
    const e13 = new Option("Tamper Read Data","ENERGY_PHASE1_TEMPER_READ");
    const e14 = new Option("Billing","ENERGY_PHASE1_BIILING");
    oldSel.add(e10, null);
    oldSel.add(e11, null);
    oldSel.add(e12, null);
    oldSel.add(e13, null);
    oldSel.add(e14, null);
  }
  addEnergyPhase3Options(oldSel) {
    const e30 = new Option("All Packets","");
    const e31 = new Option("Instantaneous Data","ENERGY_PHASE3_INSTANTANIOUS_DATA");
    const e32 = new Option("Load Profile Data","ENERGY_PHASE3_LOAD_PROFILE");
    const e33 = new Option("Tamper Read Data","ENERGY_PHASE3_TEMPER_READ");
    const e34 = new Option("Billing","ENERGY_PHASE3_BIILING");
    oldSel.add(e30, null);
    oldSel.add(e31, null);
    oldSel.add(e32, null);
    oldSel.add(e33, null);
    oldSel.add(e34, null);
  }
  addGasOptions(oldSel) {
    const g0 = new Option("All Packets","");
    const g1 = new Option("Frame1","GAS_UPLINK_FRAME1");
    const g2 = new Option("Frame2","GAS_UPLINK_FRAME2");
    oldSel.add(g0, null);
    oldSel.add(g1, null);
    oldSel.add(g2, null);
  }
  addWaterOptions(oldSel) {
    const energy1I = new Option("Frame1","WATER_UPLINK_FRAME1");
    oldSel.add(energy1I, null);
  }
showHideCommandMsg() {
  if(this.props.showSuccessCommand==true) {
      return(
    <div className="row">
      <div className="col-md-2"></div>
      <div className="col-md-3"></div>
      <div className="col-md-7 success_msg">Command Sent Successfully.</div>
    </div>);
  }
}
  render() {
  return(
    <div className="row page-titles selectDrop">
      <div className="row">
        <div className="col-md-2" name="deviceType">
            <select className="form-control" onChange={this.handleDeviceTypeChange.bind(this)}>

              <option value="WATER">Water</option>

            </select>
          </div>
          <div className="col-md-3">
            <select className="form-control" name="packet" onChange={this.handlePacketTypeChange.bind(this)} id="packetType">
              <option value="">All Packets</option>
              <option value="WATER_UPLINK_FRAME1">Consumption Data</option>
            </select>
          </div>
          <div className="col-md-7 align-self-center">
          {/*}
            <span>
              <input type="button" value="downlink phase1 device" onClick={this.callDownlinkAPIForPhase1Device.bind(this)}/>&nbsp;
              <input type="button" value="downlink phase3 device" onClick={this.callDownlinkAPIForPhase3Device.bind(this)}/>
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
  return bindActionCreators({search: search, downlink: downlink},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeSeriesTopNavWater);
