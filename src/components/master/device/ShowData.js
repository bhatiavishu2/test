import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { doOpenDetailsModal, downlink, doOpenDeviceDetachModal } from '../../../actions/master/device';
import { bindActionCreators} from 'redux';

class ShowData extends Component{


  render(){
      if(this.props.deviceTypeMap && this.props.deviceProfilesMap) {
      return (
        <tr key={this.props.data.id} id={this.props.data.id}>
          <td>{this.props.deviceProfilesMap[this.props.data.device_profile_id].device_profile_name}</td>
  				<td>{this.props.deviceTypeMap[this.props.deviceProfilesMap[this.props.data.device_profile_id].device_type_id].name}</td>
  				<td>{this.props.data.device_id}</td>
  				<td>{this.props.data.serial_number}</td>
          <td>{this.props.data.is_active?"Active":"Inactive"}</td>
  				<td>{this.props.data.status}</td>
  				<td>
          <a className="viewList" href="#" onClick={()=>this.props.doOpenDetailsModal(this.props.data)}>Edit</a>
          {
            (this.props.deviceTypeMap[this.props.deviceProfilesMap[this.props.data.device_profile_id].device_type_id].name=='Energy Phase-1' || this.props.deviceTypeMap[this.props.deviceProfilesMap[this.props.data.device_profile_id].device_type_id].name=='Energy Phase-3') &&
            (<span> | <a className="viewList" href="#" onClick={this.props.downink}>Downlink</a></span>)
          }
          {
            (this.props.data.status=='ASSIGNED' || this.props.data.status=='Active Tampered') &&
            (<span> | <a className="viewList" href="#" onClick={()=>this.props.doOpenDeviceDetachModal(this.props.data)}>Detach</a></span>)
          }
          </td>
  			</tr>
      );
    } else {
      return (<tr><th>loading...</th></tr>);
    }

  };
}
function mapStateToProps(state) {
  return {
    userAuthenticated: state.authentications.userAuthenticated,
    deviceProfilesMap:state.device.deviceProfilesMap,
    deviceTypeMap:state.device.deviceTypeMap
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doOpenDetailsModal: doOpenDetailsModal,doOpenDeviceDetachModal:doOpenDeviceDetachModal},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowData);
