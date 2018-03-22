import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { doOpenDetailsModal } from '../../../actions/master/site';
import {getDeviceType} from '../../../actions/master/device';
import { bindActionCreators} from 'redux';

class ShowData extends Component{
  componentWillMount() {
    if(this.props.deviceTypeOptions);
    else {
      this.props.getDeviceType();
    }
  }

  renderDeviceTypes(ids) {
    if(this.props.deviceTypeMap) {
    return _.map(ids, id => {
      return (
        <span key={id}>{this.props.deviceTypeMap[id].name}, </span>
      );
    });
    }
  }

  render(){
      return (
        <tr key={this.props.data.id} id={this.props.data.id}>
				  				<td>{this.props.data.counter_id}</td>
                  <td>{this.props.data.name}</td>
				  				<td>{this.props.data.emailid}</td>
				  				<td>{this.props.data.phone}</td>
                  <td>{this.renderDeviceTypes(this.props.data.device_type_ids)}</td>
                  <td>
                  {this.props.data.is_active===true && <i className="fa fa-check" aria-hidden="true"></i>}
                  {this.props.data.is_active===false && <i className="fa fa-close" aria-hidden="true"></i>}
                  </td>
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
    deviceTypeMap:state.device.deviceTypeMap
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doOpenDetailsModal: doOpenDetailsModal, getDeviceType:getDeviceType},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowData);
