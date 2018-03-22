import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import {doCloseDetailsModal} from '../../../actions/master/customer';
import CustomerTabPaneAdd from './CustomerTabPaneAdd';

class DetailModal extends Component {


  renderDetail() {
        return (<CustomerTabPaneAdd initialValues={this.props.selectedData} action="edit"  initializer={() => this.props.initializer()}/>);
  }
  render() {


  //var Modal = require('react-bootstrap').Modal;
    return(

      <Modal show={this.props.showDetailsModal} onHide={()=>this.props.doCloseDetailsModal()} keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>
                Edit Customer
                {
                  /*<small className="fullDetail pull-right"><a href="#"><i className="fa fa-arrows-alt"></i> View Packet Detail</a></small>*/
                }
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {this.props.selectedData?this.renderDetail():""}

            </Modal.Body>
            {/*<Modal.Footer>
              <Button onClick={()=>this.props.doCloseDetailsModal()}>Close</Button>
            </Modal.Footer>*/}
          </Modal>
    );
  }

}
function mapStateToProps(state) {
  //console.log(state);
  return {
      showDetailsModal: state.customer.showDetailsModal,
      selectedData: state.customer.selectedData,
      popover: 'popover',
      tooltip: 'tooltip'
      //showModal:this.state.showModal,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doCloseDetailsModal: doCloseDetailsModal},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailModal);
