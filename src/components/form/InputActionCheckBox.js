import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const InputActionCheckBox = (props) =>{
	let wrapeerClass = '';
	if(typeof props.classdata!='undefined'){
		wrapeerClass = props.classdata;
	}
    return (
      <div className={wrapeerClass}>
        <label className="col-sm-8 control-label">{props.label}</label>
        <div className="col-sm-4">
         <input type="checkbox" className={props.className} {...props.input} checked={props.input.value}/>
        </div>
      </div>
    );
};
export default InputActionCheckBox;
