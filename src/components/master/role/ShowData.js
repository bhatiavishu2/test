import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { doOpenDetailsModal } from '../../../actions/master/role';
import { bindActionCreators} from 'redux';

class ShowData extends Component{


  render(){
      return (
        <tr key={this.props.data.id} id={this.props.data.id}>
				  				<td>{this.props.data.counter_id}</td>
				  				<td>{this.props.data.name}</td>
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
