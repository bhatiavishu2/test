import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import {doCloseDetailsModal} from '../../../actions/master/property_location_type';
import PropertyLocationTypeTabPaneAdd from './PropertyLocationTypeTabPaneAdd';

class DetailModal extends Component {


  renderDetail() {
        return (<PropertyLocationTypeTabPaneAdd initialValues={this.props.selectedData} action="edit"  initializer={() => this.props.initializer()}/>);
  }
  render() {


  //var Modal = require('react-bootstrap').Modal;
    return(

      <Modal show={this.props.showDetailsModal} onHide={()=>this.props.doCloseDetailsModal()} keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.props.selectedData?this.props.selectedData.property_location_type_type:""}
                {
                  /*<small className="fullDetail pull-right"><a href="#"><i className="fa fa-arrows-alt"></i> View Packet Detail</a></small>*/
                }
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
      showDetailsModal: state.property_location_type.showDetailsModal,
      selectedData: state.property_location_type.selectedData,
      popover: 'popover',
      tooltip: 'tooltip'
      //showModal:this.state.showModal,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doCloseDetailsModal: doCloseDetailsModal},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailModal);
