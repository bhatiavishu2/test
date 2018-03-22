import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const InputPwd = (props) =>{
    const { meta: { touched, error } } = props;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label className="col-sm-4 control-label">{props.label}</label>
        <div className="col-sm-8">
         <input type="password" placeholder={props.placeholder} id={props.id} className={props.className} maxLength="16" {...props.input}/>
          {touched && error && <span className="error text-help">{error}</span>}
        </div>
      </div>
    );
};
export default InputPwd;
