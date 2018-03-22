import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { doOpenDetailsModal } from '../../../actions/master/role';
import { bindActionCreators} from 'redux';
import InputActionCheckBox from '../../form/InputActionCheckBox';
import { Field, reduxForm } from 'redux-form';

class ShowActions extends Component{

  showActionsOfSection() {
    if(this.props.section) {
      return _.map(this.props.section.actions, data => {
        return (
          <Field classdata="col-sm-6" key={this.props.section.id+data.action} name={this.props.section.id+"-"+data.action+"-actioncheckbox"} label={data.action} itemValue={data.value} component={InputActionCheckBox}/>
        )
      });
    }
  }
  render(){
      return (
        <div className="form-group">
          <label className="col-sm-4"><strong>{this.props.section.name}</strong></label>
          <div className="col-sm-8">
            <div className="row">
              {this.showActionsOfSection()}
            </div>
          </div>
        </div>
      );

  };
}
function mapStateToProps(state) {
  return {
    userAuthenticated: state.authentications.userAuthenticated,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowActions);
