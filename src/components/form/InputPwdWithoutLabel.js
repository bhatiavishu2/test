import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const InputPwdWithoutLabel = (props) =>{
    const { meta: { touched, error } } = props;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{props.label}</label>
         <input type="password" placeholder={props.placeholder} id={props.id} className={props.className} maxLength="16" {...props.input}/>
         {touched && error && <span className="error text-help">{error}</span>}
      </div>
    );
};
export default InputPwdWithoutLabel;
