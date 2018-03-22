import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import InputText  from '../../form/InputText';
import InputHidden  from '../../form/InputHidden';
import InputCheckBox from '../../form/InputCheckBox';
import InputSelect  from '../../form/InputSelect';
import { addSubmit } from '../../../actions/master/role';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';
import ShowActions from './ShowActions';

class RoleTabPaneAdd extends Component {
  constructor(props) {
    super(props);
    this.addSubmit = this.addSubmit.bind(this);
  }

  addSubmit(values){
    const {addSubmit} = this.props;
    const {resetForm} = this;
    const {initializer} = this.props;
    const actions=[];
    let key = "";
    if (!values.is_active) {
      values.is_active=false;
    }
    for(key in values) {
      if(key == "name" || key=="is_active") {
        continue;
      }
      if(key.indexOf("actioncheckbox")==-1) {
        continue;
      }
      if(values[key] && values[key]===true) {
        actions.push(key);
      }
    }
    values['actions'] = actions;
    return addSubmit(values).then(() => {
      resetForm();
      initializer();
      // do other success stuff
    });
  }
  resetForm() {
    alert("successfully saved");//show message in div from here
  }



  showActions() {
    if(this.props.allActions) {
      //console.log(this.props.allActions);
    return _.map(this.props.allActions.entities, data => {
      return (
        <ShowActions key={data.id} section={data}/>

      );
    });
    }
  }

  render(){
    const { handleSubmit,submitting } = this.props;

      return (
  				<div className={this.props.className} id="siteList1">
            {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="Role"/>}
            {this.props.showErrorCommand && <ErrorMessage errorMsg={this.props.errorMsg} entityName="Role"/>}
            <form name="masterAdd" className="formHorizontal" onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))} className="authnflds" id="addUser" acceptCharset="utf-8">
            <div className="row">
            <div className="col-xs-12">
              <div className="custAddForm siteAddCust">
                  <div className="formContainer">
                    <div className="col-xs-12 col-sm-8">
                      <div className="formWraper formWraper1 bldRoleLabel">
                        <Field name="name" autoComplete="off" className="form-control" placeholder="Name" label="Name" maxLength="500" component={InputText}/>
                        <Field name="is_active" autoComplete="off" label="IsActive" maxLength="500" component={InputCheckBox}/>
                        {this.showActions()}
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                			<div className="form-group">
                			    <label htmlFor="cust24" className="col-sm-2 control-label"></label>
                			    <div className="col-sm-10">
                				    <div className="saveButtons">
                              <input className="btn btn-primary" defaultValue="Save" type="submit" disabled={submitting}/>
                              <br/><br/>
                              <input className="btn btn-warning" defaultValue="Reset" type="reset"/>
                				    </div>
                			    </div>
                			</div>
                		</div>
                  </div>
                </div>
              </div>
            </div>
            </form>
  				</div>
      );
  }
}
function mapStateToProps(state) {
  //console.log(state);
  return {
      authentications: state.authentications,
      allActions:state.role.allActions,
      addResponse: state.role.addResponse,
      roleProfileOptions:state.role.roleProfileOptions,
      showErrorCommand:state.role.showErrorCommand,
      errorMsg:state.role.errorMsg
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({addSubmit:addSubmit},dispatch);
}
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

				  if (!values.name) {
				    errors.name = 'Enter Name';
				  }
  return errors;
}
export default reduxForm({
  validate,
  form: 'RoleTabPaneAdd'
})(
  connect(mapStateToProps, mapDispatchToProps)(RoleTabPaneAdd)
);
