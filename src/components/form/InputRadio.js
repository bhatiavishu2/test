import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const InputRadio = (props) =>{
    const { meta: { touched, error } } = props;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className="form-check form-check-inline col-sm-4 col-xs-4">
        <label className="form-check-label text-right">  	
         	<input type="radio" className="form-check-input" {...props.input} value={props.value2} /> 
        	{props.label}      
        </label>
      </div>
    );
};
export default InputRadio;
