import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import {doClosesDeviceDetachModel, detach} from '../../../actions/master/device';
import InputRadio from '../../form/InputRadio';
import InputText  from '../../form/InputText';
import InputSelect  from '../../form/InputSelect';
import InputDate  from '../../form/InputDate';
import InputHidden  from '../../form/InputHidden';


class DevicePropertyDetachModel extends Component {

  componentWillMount() {

  }

  addSubmit(values) {
    const {detach} = this.props;
    const {resetForm} = this;
    const {initializer} = this.props;

    values.device_id=this.props.selectedDeviceData.device_id;
    return detach(values).then(() => {
      initializer();
      // do other success stuff
    });
  }

  deviceStatus = [{label:"UNASSIGNED",value:"UNASSIGNED"},{label:"DISMANTLE",value:"DISMANTLE"},{label:"TAMPERED",value:"InActive Tampered"}]

  renderDetail() {
    const { handleSubmit,submitting } = this.props;
    return (
            <form onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))}>
              <Field name="device_last_closing_reading" autoComplete="off" className="form-control" placeholder="Last Closing Reading" label="Last Closing Reading" maxLength="500" component={InputText}/>
              <Field name="status" id="status"  className="form-control" label="STATUS" options={this.deviceStatus} type="select" component={InputSelect}/>
              <Field name="remarks" autoComplete="off" className="form-control" placeholder="Comments" label="Comments" maxLength="500" component={InputText}/>
              <div className="modal-footer">
			        	<input className="btn btn-primary" type="submit" disabled={submitting} defaultValue="Save" />
                <input className="btn btn-warning" defaultValue="Reset" type="reset"/>
			      	</div>

      	</form>

    );
  }
  render() {


  //var Modal = require('react-bootstrap').Modal;
    return(

      <Modal show={this.props.showDeviceDetachModel} onHide={()=>this.props.doClosesDeviceDetachModel()} keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>
                Device Detach
                {
                  /*<small className="fullDetail pull-right"><a href="#"><i className="fa fa-arrows-alt"></i> View Packet Detail</a></small>*/
                }
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {this.props.selectedDeviceData?this.renderDetail():""}

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>this.props.doClosesDeviceDetachModel()}>Close</Button>
            </Modal.Footer>
          </Modal>
    );
  }

}
function mapStateToProps(state) {
  //console.log(state);
  return {
      showDeviceDetachModel: state.device.showDeviceDetachModel,
      selectedDeviceData: state.device.selectedDeviceData,
      popover: 'popover',
      tooltip: 'tooltip',
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doClosesDeviceDetachModel: doClosesDeviceDetachModel,
      detach:detach
    },dispatch);
}
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};
  if (!values.device_last_closing_reading) {
    errors.device_last_closing_reading = "Enter Last Closing Reading";
  }

  if (!values.remarks) {
    errors.remarks = "Enter Remarks";
  }
  if (!values.status) {
    errors.remarks = "Select Status To Mark";
  }
  return errors;
}
export default reduxForm({
  validate,
  form: 'DevicePropertyDetach'
})(
  connect(mapStateToProps, mapDispatchToProps)(DevicePropertyDetachModel)
);
