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
import { addSubmit } from '../../../actions/master/device';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';

class DeviceTabPaneAdd extends Component {
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
            {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="Device"/>}
            {this.props.showErrorCommand && <ErrorMessage errorMsg={this.props.errorMsg} entityName="Device"/>}
            <form name="masterAdd" className="formHorizontal" onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))} className="authnflds" id="addUser" acceptCharset="utf-8">
            <div className="row">
            <div className="col-xs-12">
              <div className="custAddForm siteAddCust">
                  <div className="formContainer">
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper formWraper1">
                        <Field name="id" id="id" className="form-control" label="" type="hidden" component={InputHidden}/>
                        <Field name="device_profile_id" id="device_profile_id" className="form-control" label="Device Profile" options={this.props.deviceProfileOptions} type="select" component={InputSelect}/>
                        <Field name="device_id" autoComplete="off" className="form-control" placeholder="Device ID" label="Device ID" maxLength="500" component={InputText}/>
                        <Field name="serial_number" autoComplete="off" className="form-control" placeholder="Serial Number" label="Serial Number" maxLength="500" component={InputText}/>
                        <Field name="device_name" autoComplete="off" className="form-control" placeholder="Device Name" label="Device Name" maxLength="500" component={InputText}/>
                        <Field name="model_number" autoComplete="off" className="form-control" placeholder="Model Number" label="Model Number" maxLength="500" component={InputText}/>
                        <Field name="oem_name" autoComplete="off" className="form-control" placeholder="OEM Name" label="OEM Name" maxLength="500" component={InputText}/>
                        <Field name="device_properties" autoComplete="off" className="form-control" placeholder="Device Properties" label="Device Properties" maxLength="500" component={InputText}/>
                        <Field name="manufacturer_name" autoComplete="off" className="form-control" placeholder="Manufacturer Name" label="Manufacturer Name" maxLength="500" component={InputText}/>
                        <Field name="firmware_version" autoComplete="off" className="form-control" placeholder="Firm Ware Version" label="Firm Ware Version" maxLength="500" component={InputText}/>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper formWraper1">
                        <Field name="device_latitude" autoComplete="off" className="form-control" placeholder="Device Latitude" label="Device Latitude" maxLength="500" component={InputText}/>
                        <Field name="device_longitude" autoComplete="off" className="form-control" placeholder="Device Longitude" label="Device Longitude" maxLength="500" component={InputText}/>
                        <Field name="is_active" autoComplete="off" label="IsActive" maxLength="500" component={InputCheckBox}/>
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
      device_profiles: state.device.device_profiles,
      addResponse: state.device.addResponse,
      deviceProfileOptions:state.device.deviceProfileOptions,
      showErrorCommand:state.device.showErrorCommand,
      errorMsg:state.device.errorMsg
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({addSubmit:addSubmit},dispatch);
}
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.device_profile_id) {
    errors.device_profile_id = "Enter Device Profile id";
  }
  if (!values.manufacturer_name) {
    errors.manufacturer_name = 'Enter Manufacturer Name';
  }
  if (!values.model_number) {
    errors.model_number = 'Enter Model Number';
  }
  if (!values.serial_number) {
    errors.serial_number = 'Enter Serial Number';
  }
  if (!values.device_id) {
    errors.device_id = 'Enter Device ID';
  }
  if (!values.oem_name) {
    errors.oem_name = 'Enter OEM Name';
  }
  if (!values.firmware_version) {
    errors.firmware_version = 'Enter Firmware Version';
  }
  if (!values.max_threshold_kwh) {
    errors.max_threshold_kwh = 'Enter Consumption Threshold';
  }
  if (!values.max_threshold_kvah) {
    errors.max_threshold_kvah = 'Enter Battery Threshold';
  }
  return errors;
}
export default reduxForm({
  validate,
  form: 'DeviceTabPaneAdd'
})(
  connect(mapStateToProps, mapDispatchToProps)(DeviceTabPaneAdd)
);
