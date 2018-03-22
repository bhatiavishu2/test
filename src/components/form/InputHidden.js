import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const InputHidden = (props) =>{
    const { meta: { touched, error } } = props;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label></label>
         <input type="hidden" {...props.input} value={props.defaultValue}/>
        <div className="text-help">

        </div>
      </div>
    );
};
export default InputHidden;
