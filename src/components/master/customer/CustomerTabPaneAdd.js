import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import InputText  from '../../form/InputText';
import InputPwd  from '../../form/InputPwd';
import InputHidden  from '../../form/InputHidden';
import InputCheckBox from '../../form/InputCheckBox';
import InputMultiSelect  from '../../form/InputMultiSelect';
import InputColor from '../../form/InputColor';
import InputFile from '../../form/InputFile';
import { addSubmit,updateLogo } from '../../../actions/master/customer';
import {getDeviceType} from '../../../actions/master/device';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';
import FileBase64 from 'react-file-base64';


class CustomerTabPaneAdd extends Component {
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

    if (!values.email_notification_enabled) {
      values.email_notification_enabled=false;
    }
    if (!values.is_active) {
      values.is_active=false;
    }
    if(this.props.selectedLogo && this.props.selectedLogo!='') {
      values.logo=this.props.selectedLogo;
    }
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
            {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="Customer"/>}
            {this.props.showErrorCommand && <ErrorMessage errorMsg={this.props.errorMsg} entityName="Customer"/>}
            <form name="masterAdd" className="formHorizontal" onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))} className="authnflds" id="addUser" acceptCharset="utf-8">
            <div className="row">
            <div className="col-xs-12">
              <div className="custAddForm siteAddCust">
                  <div className="formContainer">
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper formWraper1">
					  
                        <Field name="name" autoComplete="off" className="form-control" placeholder="Put Customer Name" label="Customer Name" maxLength="500" component={InputText}/>
                        <Field name="description" autoComplete="off" className="form-control" placeholder="Put Customer Description" label="Customer Description" maxLength="500" component={InputText}/>
                        <Field name="is_active" autoComplete="off" label="IsActive" maxLength="500" component={InputCheckBox}/>
						<Field name="emailid" autoComplete="off" className="form-control" placeholder="Email Id" label="Email Id" maxLength="500" component={InputText}/>
                        <Field name="group_emailid" autoComplete="off" className="form-control" placeholder="Group Email Id" label="Group Email Id" maxLength="500" component={InputText}/>
                        <Field name="phone" autoComplete="off" className="form-control" placeholder="Phone" label="Phone" maxLength="500" component={InputText}/>
                        <Field name="address" autoComplete="off" className="form-control" placeholder="Address" label="Address" maxLength="500" component={InputText}/>
                        <Field name="state" autoComplete="off" className="form-control" placeholder="State" label="State" maxLength="500" component={InputText}/>
                        <Field name="city" autoComplete="off" className="form-control" placeholder="City" label="City" maxLength="500" component={InputText}/>
                        {/*<Field name="country" autoComplete="off" className="form-control" placeholder="Country" label="Country" maxLength="500" component={InputText}/>*/}
                        <Field name="pin_code" autoComplete="off" className="form-control" placeholder="Zip Code" label="Zip Code" maxLength="500" component={InputText}/>

                        {/*<Field name="logo" autoComplete="off" className="form-control" placeholder="LOGO" label="LOGO" maxLength="500" component={InputText}/>*/}
                        <div className="form-group">
                          <label className="col-sm-4 control-label">Logo:</label>
                          <div className="col-sm-8">
                            <FileBase64 multiple={ false } onDone={ this.getFiles.bind(this) } />
                          </div>
                        </div>

                        {/*<img src={this.props.selectedLogo} width="50" height="50"/>*/}
                        <Field name="category" autoComplete="off" className="form-control" placeholder="Category" label="Category" maxLength="500" component={InputText}/>
                        {/*<Field name="sms_notification_enabled" autoComplete="off" placeholder="SMS Notification" label="SMS Notification" maxLength="500" component={InputCheckBox}/>*/}
                        <Field name="email_notification_enabled" autoComplete="off" placeholder="Email Notification" label="Email Notification" maxLength="500" component={InputCheckBox}/>
                        
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper">
                        <Field name="device_type_ids" id="device_profile_id" className="form-control" label="Device Types" options={this.props.deviceTypeOptions} type="select" component={InputMultiSelect} multiSelect={true}/>

                        {/*<Field name="downlinkAPIUrl" colorShowId="normal-color" autoComplete="off" className="jscolor {styleElement:'normal-color'}" placeholder="Downlink API URL" label="Downlink API URL" maxLength="2000" component={InputText}/>*/}
                        <Field name="downlinkAPIUser" colorShowId="threshold_color" autoComplete="off" className="jscolor {styleElement:'threshold_color'}" placeholder="Downlink API UserName" label="Downlink API UserName" maxLength="500" component={InputText}/>
                        <Field name="downlinkAPIPwd" colorShowId="alert_color" autoComplete="off" className="jscolor {styleElement:'alert_color'}" placeholder="Downlink API Pwd" label="Downlink API Pwd" maxLength="500" component={InputText}/>

                        <Field name="normal_color" colorShowId="normal-color" autoComplete="off" className="jscolor {styleElement:'normal-color'}" placeholder="NORMAL COLOR" label="NORMAL COLOR" maxLength="500" component={InputColor}/>
                        <Field name="threshold_color" colorShowId="threshold_color" autoComplete="off" className="jscolor {styleElement:'threshold_color'}" placeholder="THRESHOLD COLOR" label="THRESHOLD COLOR" maxLength="500" component={InputColor}/>
                        <Field name="alert_color" colorShowId="alert_color" autoComplete="off" className="jscolor {styleElement:'alert_color'}" placeholder="ALERT COLOR" label="ALERT COLOR" maxLength="500" component={InputColor}/>
						
						
						<Field name="pass" autoComplete="off" className="form-control" placeholder="Password" label="Password" maxLength="20" component={InputPwd}/>
						<Field name="confirm_pass" autoComplete="off" className="form-control" placeholder="Confirm Password" label="Confirm Password" maxLength="20" component={InputPwd}/>
						
                  			<div className="form-group BtnGroups">
                  			    <label htmlFor="cust24" className="col-sm-4 control-label"></label>
                  			    <div className="col-sm-8">
                  				    <div className="saveButtons">
                                <input className="btn btn-primary" defaultValue="Save" type="submit" disabled={submitting}/>
                                <input className="btn btn-warning" defaultValue="Reset" type="reset" onClick={this.props.resetForm}/>
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
      deviceTypeOptions:state.device.deviceTypeOptions,
      selectedLogo: state.customer.selectedLogo,
      addResponse: state.customer.addResponse,
      showErrorCommand:state.customer.showErrorCommand,
      errorMsg:state.customer.errorMsg
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
function hasArrayContains(arr,val) {
  for(var c=0;c<arr.length;c++) {
    if(arr[c]==val) {
      return true;
    }
  }
  return false;
}
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};
          //console.log(values.device_type_ids);
				  if (!values.device_type_ids) {
				    errors.device_type_ids = 'Select  DEVICE TYPE';
				  } else if(hasArrayContains(values.device_type_ids,"5a6a2f755c8266016e355dd8") || hasArrayContains(values.device_type_ids,"5a6a2f6f5c8266016e355dd7")) {
            /*if (!values.downlinkAPIUrl) {
  				    errors.downlinkAPIUrl = 'Enter Downlink Url';
  				  }*/
  				  if (!values.downlinkAPIUser) {
  				    errors.downlinkAPIUser = 'Enter Downlink Username';
  				  }
  				  if (!values.downlinkAPIPwd) {
  				    errors.downlinkAPIPwd = 'Enter Downlink pwd';
  				  }

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
				    errors.pin_code = 'Enter Zip Code';
				  }
				  if (!values.normal_color) {
				    errors.normal_color = 'Enter Normal Color';
				  }
				  if (!values.description) {
				    errors.description = 'Enter Customer Description';
				  }
				  if (!values.emailid) {
				    errors.emailid = 'Enter Email Id';
				  }
				  if (!values.pass) {
				    errors.pass = 'Enter Password';
				  }
				  if (!values.confirm_pass) {
				    errors.confirm_pass = 'Enter Confirm Password';
				  }
				  else if(values.pass !== values.confirm_pass){errors.confirm_pass = 'Password and confirm password should be same';}
				  if (!values.threshold_color) {
				    errors.threshold_color = 'Enter Threshold Color';
				  }
				  if (!values.phone) {
				    errors.phone = 'Enter Phone';
				  }
				  if (!values.name) {
				    errors.name = 'Enter Customer Name';
				  }

				  if (!values.state) {
				    errors.state = 'Enter State';
				  }
				  if (!values.group_emailid) {
				    errors.group_emailid = 'Enter Group Email Id';
				  }
				  if (!values.category) {
				    errors.category = 'Enter Category';
				  }

				  if (!values.alert_color) {
				    errors.alert_color = 'Enter Alert Color';
				  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'CustomerTabPaneAdd'
})(
  connect(mapStateToProps, mapDispatchToProps)(CustomerTabPaneAdd)
);
