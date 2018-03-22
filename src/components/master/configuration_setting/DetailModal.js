import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import {doCloseDetailsModal} from '../../../actions/master/configuration_setting';
import ConfigurationSettingTabPaneAdd from './ConfigurationSettingTabPaneAdd';

class DetailModal extends Component {


  renderDetail() {
        return (<ConfigurationSettingTabPaneAdd initialValues={this.props.selectedData} action="edit"  initializer={() => this.props.initializer()}/>);
  }
  render() {


  //var Modal = require('react-bootstrap').Modal;
    return(

      <Modal show={this.props.showDetailsModal} onHide={()=>this.props.doCloseDetailsModal()} keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>

              <div>
              <h4 className="modal-title" id="instantLabel">Edit Configuration</h4>
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
      showDetailsModal: state.configuration_setting.showDetailsModal,
      selectedData: state.configuration_setting.selectedData,
      popover: 'popover',
      tooltip: 'tooltip'
      //showModal:this.state.showModal,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doCloseDetailsModal: doCloseDetailsModal},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailModal);
