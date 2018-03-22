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
import InputMultiSelect  from '../../form/InputMultiSelect';
import InputColor from '../../form/InputColor';
import InputFile from '../../form/InputFile';
import { addSubmit,updateLogo } from '../../../actions/master/site';
import {getDeviceType} from '../../../actions/master/device';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';
import FileBase64 from 'react-file-base64';


class SiteTabPaneAdd extends Component {
  constructor(props) {
    super(props);
    this.addSubmit = this.addSubmit.bind(this);
  }
  componentWillMount() {
    if(this.props.deviceTypeOptions);
    else {
      this.props.getDeviceType();
    }
  }

  addSubmit(values){
    const {addSubmit} = this.props;
    const {resetForm} = this;
    const {initializer} = this.props;
    if(values.device_type_ids.constructor==Array || (values.device_type_ids.prop && values.device_type_ids.prop.constructor === Array));
    else {
      values.device_type_ids=values.device_type_ids.split(",");
    }

    if (!values.is_default) {
      values.is_default=false;
    }
    if (!values.is_active) {
      values.is_active=false;
    }
    if(this.props.selectedLogo && this.props.selectedLogo!='') {
      values.logo=this.props.selectedLogo;
    }
    values.customer_id = this.props.authentications.selectedCustomer.id;
    return addSubmit(values).then(() => {
      resetForm();
      initializer();
      // do other success stuff
    });
  }
  resetForm() {
    //alert("successfully saved");//show message in div from here
    //this.props.initializer();
  }
  getFiles(files){
    this.props.updateLogo(files.base64);
  }

  render(){
    const { handleSubmit,submitting } = this.props;

      return (
  				<div className={this.props.className} id="siteList1">
            {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="Site"/>}
            {this.props.showErrorCommand && <ErrorMessage errorMsg={this.props.errorMsg} entityName="Site"/>}
            <form name="masterAdd" className="formHorizontal" onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))} className="authnflds" id="addUser" acceptCharset="utf-8">
            <div className="row">
            <div className="col-xs-12">
              <div className="custAddForm siteAddCust">
                  <div className="formContainer">
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper formWraper1">
                        <Field name="name" autoComplete="off" className="form-control" placeholder="Name" label="Name" maxLength="500" component={InputText}/>
                        <Field name="description" autoComplete="off" className="form-control" placeholder="Description" label="Description" maxLength="500" component={InputText}/>
                        <Field name="address" autoComplete="off" className="form-control" placeholder="Address" label="Address" maxLength="500" component={InputText}/>
                        <Field name="state" autoComplete="off" className="form-control" placeholder="State" label="State" maxLength="500" component={InputText}/>
                        <Field name="city" autoComplete="off" className="form-control" placeholder="City" label="City" maxLength="500" component={InputText}/>
                        <Field name="country" autoComplete="off" className="form-control" placeholder="Country" label="Country" maxLength="500" component={InputText}/>
                        <Field name="pin_code" autoComplete="off" className="form-control" placeholder="Pin Code" label="Pin Code" maxLength="500" component={InputText}/>
                        <Field name="phone" autoComplete="off" className="form-control" placeholder="Phone" label="Phone" maxLength="500" component={InputText}/>
                        <Field name="emailid" autoComplete="off" className="form-control" placeholder="Email Id" label="Email Id" maxLength="500" component={InputText}/>
                        {/*<Field name="device_type_ids" autoComplete="off" className="form-control" placeholder="Device Type IDS" label="Device Type IDS" maxLength="500" component={InputText}/>
                        <Field name="normal_color" autoComplete="off" className="form-control" placeholder="Normal Color" label="Normal Color" maxLength="500" component={InputText}/>
                        <Field name="threshold_color" autoComplete="off" className="form-control" placeholder="Threshold Color" label="Threshold Color" maxLength="500" component={InputText}/>
                        <Field name="logo" autoComplete="off" className="form-control" placeholder="Logo" label="Logo" maxLength="500" component={InputText}/>
                        <Field name="sms_notification_enabled" autoComplete="off" className="form-control" placeholder="SMS Notification" label="SMS Notification" maxLength="500" component={InputText}/>
                        <Field name="category" autoComplete="off" className="form-control" placeholder="Category" label="Category" maxLength="500" component={InputText}/>
                        <Field name="email_notification_enabled" autoComplete="off" className="form-control" placeholder="Email Notification" label="Email Notification" maxLength="500" component={InputText}/>
                        <Field name="alert_color" autoComplete="off" className="form-control" placeholder="Alert Color" label="Alert Color" maxLength="500" component={InputText}/>*/}
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper formWraper1">
                        <Field name="device_type_ids" id="device_profile_id" className="form-control" label="Device Types" options={this.props.deviceTypeOptions} type="select" component={InputMultiSelect} multiSelect={true}/>
                        {/*<FileBase64 multiple={ false } onDone={ this.getFiles.bind(this) } />
                        <img src={this.props.selectedLogo} width="50" height="50"/>*/}
                        <Field name="is_active" autoComplete="off" label="IsActive" maxLength="500" component={InputCheckBox}/>
                        <Field name="is_default" autoComplete="off" placeholder="Default" label="IS Default" maxLength="500" component={InputCheckBox}/>
                  			<div className="form-group">
                  			    <label htmlFor="cust24" className="col-sm-4 control-label"></label>
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
      addResponse: state.site.addResponse,
      deviceTypeOptions:state.device.deviceTypeOptions,
      deviceTypeOptions:state.device.deviceTypeOptions,
      selectedLogo: state.site.selectedLogo,
      showErrorCommand:state.site.showErrorCommand,
      errorMsg:state.site.errorMsg
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSubmit:addSubmit,
      getDeviceType:getDeviceType,
      updateLogo:updateLogo
    },dispatch);
}
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

				  if (!values.device_type_ids) {
				    errors.device_type_ids = 'Select Device Type';
				  }
				  if (!values.country) {
				    errors.country = 'Enter Country';
				  }
				  if (!values.address) {
				    errors.address = 'Enter Address';
				  }
				  if (!values.city) {
				    errors.city = 'Enter City';
				  }
				  if (!values.pin_code) {
				    errors.pin_code = 'Enter Pin Code';
				  }
				  if (!values.description) {
				    errors.description = 'Enter Description';
				  }
				  if (!values.emailid) {
				    errors.emailid = 'Enter Email Id';
				  }
				  if (!values.phone) {
				    errors.phone = 'Enter Phone';
				  }
				  if (!values.name) {
				    errors.name = 'Enter Name';
				  }
				  if (!values.state) {
				    errors.state = 'Enter State';
				  }
				  if (!values.category) {
				    errors.category = 'Enter Category';
				  }

  return errors;
}
export default reduxForm({
  validate,
  form: 'SiteTabPaneAdd'
})(
  connect(mapStateToProps, mapDispatchToProps)(SiteTabPaneAdd)
);
