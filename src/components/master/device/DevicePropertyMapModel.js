import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import {doClosesDevicePropertyMapModel, unMappedDevicesearch, mapProperty} from '../../../actions/master/device';
import InputRadio from '../../form/InputRadio';
import InputText  from '../../form/InputText';
import InputSelect  from '../../form/InputSelect';
import InputDate  from '../../form/InputDate';
import InputHidden  from '../../form/InputHidden';


class DevicePropertyMapModel extends Component {

  componentWillMount() {
    const request = {
      q:"",
      pageNumber:0,
      pageSize:100000,
      sortBy:"createdDate",
      sortDirection:"desc"
    };
    this.props.unMappedDevicesearch(request);
  }

  addSubmit(values) {
    const {mapProperty} = this.props;
    const {resetForm} = this;
    const {initializer} = this.props;

    values.property_id=this.props.selectedPropertyData.id;
    return mapProperty(values).then(() => {
      initializer();
      // do other success stuff
    });
  }

  renderDetail() {
    const { handleSubmit,submitting } = this.props;
    return (
            <form onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))}>
            	<div className="form-group row deviceRadio">
                <Field name="association_type" label="Fresh - Fit" value2="FRESH" component={InputRadio}/>
                <Field name="association_type" label="Retro - Fit" value2="RETRO" component={InputRadio}/>
                <Field name="association_type" label="Replcement" value2="REPLACEMENT" component={InputRadio}/>
                {(!this.props.currentFormValues || !this.props.currentFormValues.association_type) &&
                  (<div className="has-danger mapListS text-center">
                    <span className="text-help error">Select Mapping Type</span>
                  </div>)
              }

            	</div>
              <Field name="device_id" id="device_id" searchable={true} className="form-control" label="Device ID" options={this.props.unMappedDevices} type="select" component={InputSelect}/>
              <Field name="consumer_number" autoComplete="off" className="form-control" placeholder="Consumer No." label="Consumer No." maxLength="500" component={InputText}/>
              <Field name="meter_start_date" autoComplete="off" placeholder="New Meter Start Date" label="New Meter Start Date" maxLength="500" component={InputDate} />
              <Field name="new_meter_opening_reading" autoComplete="off" className="form-control" placeholder="New Meter Opening Reading" label="New Meter Opening Reading" maxLength="500" component={InputText}/>
              {this.props.currentFormValues && this.props.currentFormValues.association_type && this.props.currentFormValues.association_type=='RETRO' && <Field name="previous_meter_closing_reading" autoComplete="off" className="form-control" placeholder="Prev. Meter Closing Reading" label="Prev. Meter Closing Reading" maxLength="500" component={InputText}/>}
              {this.props.currentFormValues && this.props.currentFormValues.association_type && this.props.currentFormValues.association_type=='RETRO' && <Field name="previosu_meter_consumer_number" autoComplete="off" className="form-control" placeholder="Prev. Meter Consumer No." label="Prev. Meter Consumer No." maxLength="500" component={InputText}/>}
              {this.props.currentFormValues && this.props.currentFormValues.association_type && this.props.currentFormValues.association_type=='RETRO' && <Field name="adjustment" autoComplete="off" className="form-control" placeholder="Adjustments (if any)" label="Adjustments (if any)" maxLength="500" component={InputText}/>}
              <Field name="remarks" autoComplete="off" className="form-control" placeholder="Comments" label="Comments" maxLength="500" component={InputText}/>
              <div className="saveButtonsD clearfix">
                <label className="col-sm-4 control-label"></label>
                <div className="col-sm-8">
                  <div className="saveButtons clearfix">
                    <input className="btn btn-primary" type="submit" disabled={submitting} defaultValue="Save" />
                    <input className="btn btn-warning" defaultValue="Reset" type="reset"/>
                  </div>
                </div>
              </div>
      	</form>

    );
  }
  render() {


  //var Modal = require('react-bootstrap').Modal;
    return(

      <Modal show={this.props.showDevicePropertyMapModel} onHide={()=>this.props.doClosesDevicePropertyMapModel()} keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>
                Device Attach
                {
                  /*<small className="fullDetail pull-right"><a href="#"><i className="fa fa-arrows-alt"></i> View Packet Detail</a></small>*/
                }
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {this.props.selectedPropertyData?this.renderDetail():""}

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>this.props.doClosesDevicePropertyMapModel()}>Close</Button>
            </Modal.Footer>
          </Modal>
    );
  }

}
function mapStateToProps(state) {
  //console.log(state);
  return {
      showDevicePropertyMapModel: state.device.showDevicePropertyMapModel,
      selectedPropertyData: state.device.selectedPropertyData,
      popover: 'popover',
      tooltip: 'tooltip',
      currentFormValues:state.form.DevicePropertyMap.values,
      unMappedDevices:state.device.unMappedDevices
      //showModal:this.state.showModal,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doClosesDevicePropertyMapModel: doClosesDevicePropertyMapModel,
      unMappedDevicesearch:unMappedDevicesearch,
      mapProperty:mapProperty
    },dispatch);
}
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.association_type) {
    errors.association_type = "Select Mapping Type";
  }
  if (!values.consumer_number) {
    errors.consumer_number = "Enter Comsumer No.";
  }
  if (!values.meter_start_date) {
    errors.meter_start_date = "Enter Start Date";
  }
  if (!values.new_meter_opening_reading) {
    errors.new_meter_opening_reading = "Enter Opening Reading";
  }
  if(values.association_type && values.association_type=='RETRO') {
    if (!values.previous_meter_closing_reading) {
      errors.previous_meter_closing_reading = "Enter Previous Meter Closing Reading";
    }
    if (!values.previosu_meter_consumer_number) {
      errors.previosu_meter_consumer_number = "Enter Previous Meter Consumer Number";
    }
    if (!values.adjustment) {
      errors.adjustment = "Enter Adjustment";
    }
  }
  if (!values.remarks) {
    errors.remarks = "Enter Remarks";
  }

  return errors;
}
export default reduxForm({
  validate,
  form: 'DevicePropertyMap'
})(
  connect(mapStateToProps, mapDispatchToProps)(DevicePropertyMapModel)
);
