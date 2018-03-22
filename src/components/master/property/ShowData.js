import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { doOpenDetailsModal } from '../../../actions/master/property';
import { bindActionCreators} from 'redux';

class ShowData extends Component{


  render(){
      return (
        <tr key={this.props.data.id} id={this.props.data.id}>
				  				<td>{this.props.data.counter_id}</td>
                  <td>{this.props.propTypeIdNameMap && this.props.propTypeIdNameMap[this.props.data.property_type_id].name}</td>
                  <td>{this.props.data.location_values.locationvalues_0}</td>
				  				<td>{this.props.data.owner_name}</td>
				  				<td>{this.props.data.occupant_name}</td>

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
    propTypeIdNameMap: state.property_type.propTypeIdNameMap,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doOpenDetailsModal: doOpenDetailsModal},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowData);
