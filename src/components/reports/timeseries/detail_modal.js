import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { doCloseDetailsModal } from '../../../actions/reports/timeseries';
import GasFrame1 from './detail/gas_frame1';
import GasFrame2 from './detail/gas_frame2';
import WaterFrame1 from './detail/water_frame1';
import Phase1Billing from './detail/phase1_billing_detail';
import Phase3Billing from './detail/phase3_billing_detail';
import Phase1Tamper from './detail/phase1_tamper_detail';
import Phase3Tamper from './detail/phase3_tamper_detail';
import Phase1Instantanious from './detail/phase1_inst_detail';
import Phase3Instantanious from './detail/phase3_inst_detail';
import Phase1LoadProfile from './detail/phase1_load_pro_detail';
import Phase3LoadProfile from './detail/phase3_load_pro_detail';

class DetailModal extends Component {


  renderDetail() {
    switch(this.props.selectedData["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]["payloads_ul"]["dataFrame"]["response_type"]) {
      case 'GAS_UPLINK_FRAME1':
        return (<GasFrame1 data={this.props.selectedData}/>);
      case 'GAS_UPLINK_FRAME2':
        return (<GasFrame2 data={this.props.selectedData}/>);
      case 'WATER_UPLINK_FRAME1':
        return (<WaterFrame1 data={this.props.selectedData}/>);
      case 'ENERGY_PHASE1_BIILING':
        return (<Phase1Billing data={this.props.selectedData}/>);
      case 'ENERGY_PHASE3_BIILING':
        return (<Phase3Billing data={this.props.selectedData}/>);
      case 'ENERGY_PHASE1_TEMPER_READ':
        return (<Phase1Tamper data={this.props.selectedData}/>);
      case 'ENERGY_PHASE3_TEMPER_READ':
        return (<Phase3Tamper data={this.props.selectedData}/>);
      case 'ENERGY_PHASE1_INSTANTANIOUS_DATA':
        return (<Phase1Instantanious data={this.props.selectedData}/>);
      case 'ENERGY_PHASE3_INSTANTANIOUS_DATA':
        return (<Phase3Instantanious data={this.props.selectedData}/>);
      case 'ENERGY_PHASE1_LOAD_PROFILE':
        return (<Phase1LoadProfile data={this.props.selectedData}/>);
      case 'ENERGY_PHASE3_LOAD_PROFILE':
        return (<Phase3LoadProfile data={this.props.selectedData}/>);
    }
  }
  render() {


  //var Modal = require('react-bootstrap').Modal;
    return(

      <Modal show={this.props.showDetailsModal} onHide={()=>this.props.doCloseDetailsModal()} keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>

              <div>
              <h4 className="modal-title" id="instantLabel">{this.props.selectedData?this.props.selectedData.device_type:""}</h4>
              {
                /*<small className="fullDetail pull-right"><a href="#"><i className="fa fa-arrows-alt"></i> View Packet Detail</a></small>*/
            }
              </div>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {this.props.selectedData?this.renderDetail():""}

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>this.props.doCloseDetailsModal()}>Close</Button>
            </Modal.Footer>
          </Modal>
    );
  }

}
function mapStateToProps(state) {
  //console.log(state);
  return {
      showDetailsModal: state.timeseries.showDetailsModal,
      selectedData: state.timeseries.selectedData,
      popover: 'popover',
      tooltip: 'tooltip'
      //showModal:this.state.showModal,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doCloseDetailsModal: doCloseDetailsModal},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailModal);
