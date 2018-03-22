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
import { addSubmit } from '../../../actions/master/property_type';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';

class PropertyTypeTabPaneAdd extends Component {
  constructor(props) {
    super(props);
    this.addSubmit = this.addSubmit.bind(this);
  }

  addSubmit(values){
    const {addSubmit} = this.props;
    const {resetForm} = this;
    const {initializer} = this.props;
    if (!values.is_active) {
      values.is_active=false;
    }
    return addSubmit(values).then(() => {
      resetForm();
      //initializer();
      // do other success stuff
    });
  }
  resetForm() {
    //alert("successfully saved");//show message in div from here
    //this.props.initializer();
  }

  render(){
    const { handleSubmit,submitting } = this.props;

      return (
  				<div className={this.props.className} id="siteList1">
            {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="PropertyType"/>}
            {this.props.showErrorCommand && <ErrorMessage errorMsg={this.props.errorMsg} entityName="PropertyType"/>}
            <form name="masterAdd" className="formHorizontal" onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))} className="authnflds" id="addUser" acceptCharset="utf-8">
            <div className="row">
            <div className="col-xs-12">
              <div className="custAddForm siteAddCust">
                  <div className="formContainer">
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper formWraper1">
                        <Field name="name" autoComplete="off" className="form-control" placeholder="Property Type" label="Property Type Name" maxLength="500" component={InputText}/>
                        <Field name="is_active" autoComplete="off" label="IsActive" maxLength="500" component={InputCheckBox}/>
                        <div className="form-group">
                          <label className="col-sm-4 control-label"></label>
                          <div className="col-sm-8">
                            <div className="saveButtons">
                              <input className="btn btn-primary" defaultValue="Save" type="submit" disabled={submitting}/>
                              <input className="btn btn-warning" defaultValue="Reset" type="reset"/>
                            </div>
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
      property_type_profiles: state.property_type.property_type_profiles,
      addResponse: state.property_type.addResponse,
      property_typeProfileOptions:state.property_type.property_typeProfileOptions,
      showErrorCommand:state.property_type.showErrorCommand,
      errorMsg:state.property_type.errorMsg
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({addSubmit:addSubmit},dispatch);
}
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

				  if (!values.name) {
				    errors.name = 'Enter NAME';
				  }

  return errors;
}
export default reduxForm({
  validate,
  form: 'PropertyTypeTabPaneAdd'
})(
  connect(mapStateToProps, mapDispatchToProps)(PropertyTypeTabPaneAdd)
);
