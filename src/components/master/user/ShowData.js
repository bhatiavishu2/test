import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { doOpenDetailsModal } from '../../../actions/master/user';
import { bindActionCreators} from 'redux';

class ShowData extends Component{


  render(){
      return (
        <tr key={this.props.data.id} id={this.props.data.id}>
          <td>{this.props.data.user_type==1?"TCL User":this.props.data.user_type==2?"Customer User":"Site User"}</td>
  				<td>{this.props.data.first_name} {this.props.data.last_name}</td>
          <td>{(this.props.customerMap && this.props.data.customer_id  && this.props.customerMap[this.props.data.customer_id])?this.props.customerMap[this.props.data.customer_id].name:""}</td>
  				<td>{this.props.data.emailid}</td>
  				<td>{this.props.data.phone}</td>
  				<td>{(this.props.roleMap && this.props.roleMap[this.props.data.role_id])?this.props.roleMap[this.props.data.role_id].name:""}</td>
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
    roleMap:state.user.roleMap,
    customerMap:state.user.customerMap
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doOpenDetailsModal: doOpenDetailsModal},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowData);
