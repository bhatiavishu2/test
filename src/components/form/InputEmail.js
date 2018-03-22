import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const InputEmail = (props) =>{
    const { meta: { touched, error } } = props;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{props.label}</label>
         <input type="email" placeholder={props.placeholder} className={props.className} maxLength={props.maxLength} {...props.input}/>
         {touched && error && <span className="error text-help">{error}</span>}
      </div>
    );
};
export default InputEmail;
