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
import { addSubmit } from '../../../actions/master/device_profile';
import {getDeviceType} from '../../../actions/master/device';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';

class DeviceProfileTabPaneAdd extends Component {
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
            {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="DeviceProfile"/>}
            {this.props.showErrorCommand && <ErrorMessage errorMsg={this.props.errorMsg} entityName="DeviceProfile"/>}
            <form name="masterAdd" className="formHorizontal" onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))} className="authnflds" id="addUser" acceptCharset="utf-8">
            <div className="row">
            <div className="col-xs-12">
              <div className="custAddForm siteAddCust">
                  <div className="formContainer">
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper formWraper1">
                        <Field name="device_type_id" id="device_type_id" className="form-control" label="Device Type" options={this.props.deviceTypeOptions} type="select" component={InputSelect}/>
                        <Field name="device_profile_name" autoComplete="off" className="form-control" placeholder="Device Profile Name" label="Device Profile Name" maxLength="500" component={InputText}/>
                        <Field name="max_consumption_threshold" autoComplete="off" className="form-control" placeholder="MAX Consumption Threshold" label="MAX Consumption Threshold" maxLength="500" component={InputText}/>
                        <Field name="device_profile_id" autoComplete="off" className="form-control" placeholder="Device Profile Id" label="Device Profile Id" maxLength="500" component={InputText}/>
                        <Field name="reporting_frequency_in_minutes" autoComplete="off" className="form-control" placeholder="Reporting Frequency in Minutes" label="Reporting Frequency in Minutes" maxLength="500" component={InputText}/>
                        <Field name="battery_threshold" autoComplete="off" className="form-control" placeholder="Battery Threshold" label="Battery Threshold" maxLength="500" component={InputText}/>
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
      deviceTypeMap: state.device.deviceTypeMap,
      addResponse: state.device_profile.addResponse,
      deviceTypeOptions:state.device.deviceTypeOptions,
      showErrorCommand:state.device_profile.showErrorCommand,
      errorMsg:state.device_profile.errorMsg
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({addSubmit:addSubmit,getDeviceType:getDeviceType},dispatch);
}
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

				  if (!values.device_profile_name) {
				    errors.device_profile_name = 'Enter DEVICE PROFILE NAME';
				  }
				  if (!values.max_consumption_threshold) {
				    errors.max_consumption_threshold = 'Enter MAX CONSUMPTION THRESHOLD';
				  }
				  if (!values.device_profile_id) {
				    errors.device_profile_id = 'Enter DEVICE PROFILE ID';
				  }
				  if (!values.device_type_id) {
				    errors.device_type_id = 'Enter DEVICE TYPE ID';
				  }
				  if (!values.reporting_frequency_in_minutes) {
				    errors.reporting_frequency_in_minutes = 'Enter REPORTING FREQUENCY IN MINUTES';
				  }
				  if (!values.battery_threshold) {
				    errors.battery_threshold = 'Enter BATTERY THRESHOLD';
				  }

  return errors;
}
export default reduxForm({
  validate,
  form: 'DeviceProfileTabPaneAdd'
})(
  connect(mapStateToProps, mapDispatchToProps)(DeviceProfileTabPaneAdd)
);
