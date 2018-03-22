import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
class GasFrame2 extends Component{

  render() {
  return(
    <div className="modal-body">
      <div className="form-group">
        <label className="col-sm-4 control-label">Payload Id</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in1" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["id"]} readOnly="readonly" />
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Identifier</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["identifier"]} readOnly="readonly" />
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-4 control-label">Tamper Code</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in4" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["temper_code"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Battery Voltage</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in5" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["battery_voltage"]} readOnly="readonly"/>
        </div>
      </div>
    </div>
  );
}
}
export default GasFrame2;
