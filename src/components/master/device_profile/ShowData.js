import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { doOpenDetailsModal } from '../../../actions/master/device_profile';
import {getDeviceType} from '../../../actions/master/device';
import { bindActionCreators} from 'redux';

class ShowData extends Component{

  componentWillMount() {
    if(this.props.deviceTypeOptions);
    else {
      this.props.getDeviceType();
    }
  }

  render(){
      return (
        <tr key={this.props.data.id} id={this.props.data.id}>
            <td>{this.props.deviceTypeMap && this.props.deviceTypeMap[this.props.data.device_type_id]?this.props.deviceTypeMap[this.props.data.device_type_id].name:""}</td>
            <td>{this.props.data.device_profile_id}</td>
	  				<td>{this.props.data.device_profile_name}</td>
	  				<td>{this.props.data.max_consumption_threshold}</td>
	  				<td>{this.props.data.reporting_frequency_in_minutes}</td>
	  				<td>{this.props.data.battery_threshold}</td>

  				<td>
          <a className="viewList" href="#" onClick={()=>this.props.doOpenDetailsModal(this.props.data)}>Edit</a>
          </td>
  			</tr>
      );

  };
}
function mapStateToProps(state) {
  return {
    userAuthenticated: state.authentications.userAuthenticated,
    deviceTypeMap: state.device.deviceTypeMap,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doOpenDetailsModal: doOpenDetailsModal,getDeviceType:getDeviceType},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowData);
