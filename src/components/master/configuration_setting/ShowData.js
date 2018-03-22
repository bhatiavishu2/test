import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { doOpenDetailsModal } from '../../../actions/master/configuration_setting';
import { bindActionCreators} from 'redux';

class ShowData extends Component{


  render(){
      return (
        <tr key={this.props.data.id} id={this.props.data.id}>
				  				<td>{this.props.data.smtp_pwd}</td>

				  				<td>{this.props.data.smtp_host}</td>

				  				<td>{this.props.data.sms_secondary_user_name}</td>

				  				<td>{this.props.data.sms_primary_provider}</td>

				  				<td>{this.props.data.smtp_ssl_enabled}</td>

				  				<td>{this.props.data.sms_primary_port}</td>

				  				<td>{this.props.data.sms_primary_pwd}</td>

				  				<td>{this.props.data.smtp_username}</td>

				  				<td>{this.props.data.sms_primary_user_name}</td>

				  				<td>{this.props.data.sms_secondary_pwd}</td>

				  				<td>{this.props.data.smtp_port}</td>

				  				<td>{this.props.data.sms_secondary_port}</td>

				  				<td>{this.props.data.smtp_mail_from}</td>

				  				<td>{this.props.data.sms_secondary_provider}</td>

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
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doOpenDetailsModal: doOpenDetailsModal},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowData);
