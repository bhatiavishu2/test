import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const InputHierarchyText = (props) =>{
    //console.log(props);
    const { meta: { touched, error } } = props;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className="dropTabs">
        <span className="fa fa-angle-down"></span>
        <input key={props.key} placeholder={props.placeholder} maxLength={props.maxLength}
        onChange={(value)=>{props.input.onChange(value);if(props.onChange2) {props.onChange2(value);}}}
         {...props.input}
        />
        <div className="removeAddLine">
          <i title="Add Child" className="fa fa-plus addNewRw" onClick={props.onAddNewClick}></i>
          {(props.showRemoveRow) && <i title="Add Child" className="fa fa-minus addNewRw" onClick={props.onRemoveRowClick}></i>}
        </div>
        <div className={"text-help xpadding-"+props.data_level}>
          <label className="col-sm-4 control-label"></label>
          {touched && error && <span className="error col-sm-8">{error}</span>}
        </div>
      </div>
    );
};
export default InputHierarchyText;
