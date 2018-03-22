import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const InputColor = (props) =>{
    const { meta: { touched, error } } = props;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label className="col-sm-4 control-label">{props.label}</label>
        <div className="col-sm-8">
         <input type="text" placeholder={props.placeholder} className={props.className} maxLength={props.maxLength} {...props.input}/>
         <input className="colorShow" id={props.colorShowId} readOnly="true" disabled/>
          {touched && error && <span className="error text-help">{error}</span>}
        </div>
      </div>
    );
};
export default InputColor;
