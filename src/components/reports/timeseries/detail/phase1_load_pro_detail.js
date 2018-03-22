import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
class Phase1LoadProfile extends Component{

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
        <label className="col-sm-4 control-label">Load Profile Start Time</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["load_profile_start_time_in_ist"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Load Profile Stop Time</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["load_profile_stop_time_in_ist"]} readOnly="readonly"/>
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-4 control-label">Data Record(1) (KWH)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["load_profile_data_record_1"]["load_profile_data_record_in_kwh"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Data Record(1) (KVAH)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["load_profile_data_record_1"]["load_profile_data_record_in_kvah"]} readOnly="readonly" />
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-4 control-label">Data Record(2) (KWH)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["load_profile_data_record_2"]["load_profile_data_record_in_kwh"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Data Record(2) (KVAH)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["load_profile_data_record_2"]["load_profile_data_record_in_kvah"]} readOnly="readonly"/>
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-4 control-label">Data Record(3) (KWH)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["load_profile_data_record_3"]["load_profile_data_record_in_kwh"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Data Record(3) (KVAH)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["load_profile_data_record_3"]["load_profile_data_record_in_kvah"]} readOnly="readonly"/>
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-4 control-label">Data Record(4) (KWH)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in2" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["load_profile_data_record_4"]["load_profile_data_record_in_kwh"]} readOnly="readonly"/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-4 control-label">Data Record(4) (KVAH)</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="in3" value={this.props.data["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["load_profile_data_record_4"]["load_profile_data_record_in_kvah"]} readOnly="readonly"/>
        </div>
      </div>

    </div>
  );
}
}
export default Phase1LoadProfile;
