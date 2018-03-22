import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const ErrorMessage = (props) =>{
  return(
    <div className="row success">
      <div className="col-xs-12">
          <span className="label-error">
            {props.entityName} Has Not Been Saved!<br/>
            {props.errorMsg}
          </span>
      </div>
    </div>
  );
};
export default ErrorMessage;
