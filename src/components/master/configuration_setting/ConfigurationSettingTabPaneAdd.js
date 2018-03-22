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
import { addSubmit } from '../../../actions/master/configuration_setting';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';

class ConfigurationSettingTabPaneAdd extends Component {
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
      initializer();
      // do other success stuff
    });
  }
  resetForm() {
    alert("successfully saved");//show message in div from here
    //this.props.initializer();
  }

  render(){
    const { handleSubmit,submitting } = this.props;

      return (
  				<div className={this.props.className} id="siteList1">
            {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="ConfigurationSetting"/>}
            {this.props.showErrorCommand && <ErrorMessage errorMsg={this.props.errorMsg} entityName="ConfigurationSetting"/>}
            <form name="masterAdd" className="formHorizontal" onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))} className="authnflds" id="addUser" acceptCharset="utf-8">
            <div className="row">
            <div className="col-xs-12">
              <div className="custAddForm siteAddCust">
                  <div className="formContainer">
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper formWraper1">
                        <Field name="smtp_pwd" autoComplete="off" className="form-control" placeholder="SMTP PWD" label="SMTP PWD" maxLength="500" component={InputText}/>
                        <Field name="smtp_host" autoComplete="off" className="form-control" placeholder="SMTP HOST" label="SMTP HOST" maxLength="500" component={InputText}/>
                        <Field name="sms_secondary_user_name" autoComplete="off" className="form-control" placeholder="SMS SECONDARY USER NAME" label="SMS SECONDARY USER NAME" maxLength="500" component={InputText}/>
                        <Field name="sms_primary_provider" autoComplete="off" className="form-control" placeholder="SMS PRIMARY PROVIDER" label="SMS PRIMARY PROVIDER" maxLength="500" component={InputText}/>
                        <Field name="smtp_ssl_enabled" autoComplete="off" className="form-control" placeholder="SMTP SSL ENABLED" label="SMTP SSL ENABLED" maxLength="500" component={InputText}/>
                        <Field name="sms_primary_port" autoComplete="off" className="form-control" placeholder="SMS PRIMARY PORT" label="SMS PRIMARY PORT" maxLength="500" component={InputText}/>
                        <Field name="sms_primary_pwd" autoComplete="off" className="form-control" placeholder="SMS PRIMARY PWD" label="SMS PRIMARY PWD" maxLength="500" component={InputText}/>
                        <Field name="smtp_username" autoComplete="off" className="form-control" placeholder="SMTP USERNAME" label="SMTP USERNAME" maxLength="500" component={InputText}/>
                        <Field name="sms_primary_user_name" autoComplete="off" className="form-control" placeholder="SMS PRIMARY USER NAME" label="SMS PRIMARY USER NAME" maxLength="500" component={InputText}/>
                        <Field name="sms_secondary_pwd" autoComplete="off" className="form-control" placeholder="SMS SECONDARY PWD" label="SMS SECONDARY PWD" maxLength="500" component={InputText}/>
                        <Field name="smtp_port" autoComplete="off" className="form-control" placeholder="SMTP PORT" label="SMTP PORT" maxLength="500" component={InputText}/>
                        <Field name="sms_secondary_port" autoComplete="off" className="form-control" placeholder="SMS SECONDARY PORT" label="SMS SECONDARY PORT" maxLength="500" component={InputText}/>
                        <Field name="smtp_mail_from" autoComplete="off" className="form-control" placeholder="SMTP MAIL FROM" label="SMTP MAIL FROM" maxLength="500" component={InputText}/>
                        <Field name="sms_secondary_provider" autoComplete="off" className="form-control" placeholder="SMS SECONDARY PROVIDER" label="SMS SECONDARY PROVIDER" maxLength="500" component={InputText}/>
                        <Field name="is_active" autoComplete="off" className="form-control" label="IsActive" maxLength="500" component={InputCheckBox}/>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                			<div className="form-group row BtnGroups">
                			    <label htmlFor="cust24" className="col-sm-2 control-label"></label>
                			    <div className="col-sm-10">
                				    <div className="saveButtons">
                              <input className="btn btn-primary" defaultValue="Save" type="submit" disabled={submitting}/>
                				    </div>
                			    </div>
                			</div>
                			<div className="form-group row BtnGroups">
                			    <label htmlFor="cust24" className="col-sm-2 control-label"></label>
                			    <div className="col-sm-10">
                				    <div className="saveButtons">
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
      configuration_setting_profiles: state.configuration_setting.configuration_setting_profiles,
      addResponse: state.configuration_setting.addResponse,
      configuration_settingProfileOptions:state.configuration_setting.configuration_settingProfileOptions,
      showErrorCommand:state.configuration_setting.showErrorCommand,
      errorMsg:state.configuration_setting.errorMsg
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({addSubmit:addSubmit},dispatch);
}
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

				  if (!values.smtp_pwd) {
				    errors.smtp_pwd = 'Enter SMTP PWD';
				  }
				  if (!values.smtp_host) {
				    errors.smtp_host = 'Enter SMTP HOST';
				  }
				  if (!values.sms_secondary_user_name) {
				    errors.sms_secondary_user_name = 'Enter SMS SECONDARY USER NAME';
				  }
				  if (!values.sms_primary_provider) {
				    errors.sms_primary_provider = 'Enter SMS PRIMARY PROVIDER';
				  }
				  if (!values.smtp_ssl_enabled) {
				    errors.smtp_ssl_enabled = 'Enter SMTP SSL ENABLED';
				  }
				  if (!values.sms_primary_port) {
				    errors.sms_primary_port = 'Enter SMS PRIMARY PORT';
				  }
				  if (!values.sms_primary_pwd) {
				    errors.sms_primary_pwd = 'Enter SMS PRIMARY PWD';
				  }
				  if (!values.smtp_username) {
				    errors.smtp_username = 'Enter SMTP USERNAME';
				  }
				  if (!values.sms_primary_user_name) {
				    errors.sms_primary_user_name = 'Enter SMS PRIMARY USER NAME';
				  }
				  if (!values.sms_secondary_pwd) {
				    errors.sms_secondary_pwd = 'Enter SMS SECONDARY PWD';
				  }
				  if (!values.smtp_port) {
				    errors.smtp_port = 'Enter SMTP PORT';
				  }
				  if (!values.sms_secondary_port) {
				    errors.sms_secondary_port = 'Enter SMS SECONDARY PORT';
				  }
				  if (!values.smtp_mail_from) {
				    errors.smtp_mail_from = 'Enter SMTP MAIL FROM';
				  }
				  if (!values.sms_secondary_provider) {
				    errors.sms_secondary_provider = 'Enter SMS SECONDARY PROVIDER';
				  }

  return errors;
}
export default reduxForm({
  validate,
  form: 'ConfigurationSettingTabPaneAdd'
})(
  connect(mapStateToProps, mapDispatchToProps)(ConfigurationSettingTabPaneAdd)
);
