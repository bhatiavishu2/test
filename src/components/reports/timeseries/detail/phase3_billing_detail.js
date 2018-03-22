import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
class Phase3Billing extends Component{

  render() {
  return(
    <div className="modal-body">
      <div className="form-group">
        <label className="col-sm-4 control-label">Payload Id</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in1" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["id"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">UTC Time</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["utc_date_time_in_ist"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Cumulative Active Energy (KWH)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["commulative_active_energy_in_kwh"]} readOnly="readonly"/>
        </div>
      </div>

    </div>
  );
}
}
export default Phase3Billing;
