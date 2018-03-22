import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
class Phase3Instantanious extends Component{

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
        <label className="col-sm-4 control-label">Meter UTC Time</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["meter_date_time_in_ist"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Cumulative Active Energy (KWH)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["commulative_active_energy_in_kwh"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Cumulative Apparent Energy (KVAH)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["commulative_apparent_energy_in_kwh"]} readOnly="readonly"/>
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-4 control-label">Inst. Load</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["inst_load"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Inst. Power Factor Sign</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["inst_power_factor_sign"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Inst. Power Factor</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["inst_power_factor"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Inst. Frequency (Hz)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["inst_frequency_in_hz"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Inst. Voltage R (V)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["inst_voltage_r_in_v"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Inst. Voltage Y (V)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["inst_voltage_y_in_v"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Inst. Voltage B (V)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["inst_voltage_b_in_v"]} readOnly="readonly"/>
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-4 control-label">Inst. Current R (A)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["inst_current_r_in_a"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Inst. Current Y (A)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["inst_current_y_in_a"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Inst. Current B (A)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["inst_current_b_in_a"]} readOnly="readonly"/>
        </div>
      </div>

    </div>
  );
}
}
export default Phase3Instantanious;
