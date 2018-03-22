import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { doOpenDetailsModal } from '../../../actions/reports/timeseries';
import { bindActionCreators} from 'redux';

class ShowData extends Component{


render(){
    return (

      <tr key={this.props.data.id} id={this.props.data.id}>
				<td>{this.props.data.res_crdt}</td>
				<td>{this.props.data.consumer_number}</td>
				<td>{this.props.data.device_id}</td>
				<td className="success_msg">Active</td>
				<td>{this.props.data.display_packet_type}</td>
				<td>{this.props.data.consumption}</td>
				<td><a className="viewList" href="#" onClick={()=>this.props.doOpenDetailsModal(this.props.data)}>View</a></td>
			</tr>
    );
};
}
function mapStateToProps(state) {
  return {
    userAuthenticated: state.authentications.userAuthenticated,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doOpenDetailsModal: doOpenDetailsModal},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowData);
