import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const SuccessMessage = (props) =>{
  return(
    <div className="row success">
      <div className="col-xs-12">
        {(props.addResponse && props.addResponse.status && props.addResponse.status=="SUCCESS") &&
          <span className="label-success">
            {props.entityName} Has  Been Successfully Saved.
          </span>
        }
        {(props.addResponse && props.addResponse.status && props.addResponse.status!="SUCCESS") &&
          <span className="label-error">
            {props.entityName} Has Not Been Saved!<br/>
            {props.addResponse.field_error_messages.ERROR}
          </span>
        }
      </div>
    </div>
  );
};
export default SuccessMessage;
