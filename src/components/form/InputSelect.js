import _ from 'lodash';
import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const InputSelect = (props) =>{
    const { meta: { touched, error } } = props;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label className="col-sm-4 control-label">{props.label}</label>
        <div className="col-sm-8">
          <Select
            {...props.input}
            id={props.id}
            name={props.name}
            options={props.options}
            placeholder={props.placeholder}
            value={props.input.value}
            onChange={(value)=>{props.input.onChange(value);if(props.onChange2) {props.onChange2(value);}}}
            onBlur={() => {props.input.onBlur(props.input.value) }}
            autoFocus
            simpleValue
            searchable={props.searchable!=undefined?props.searchable:false}
            clearable={false}

            onBlurResetsInput={false}
            onSelectResetsInput={false}
          />
          {touched && error && <span className="error text-help">{error}</span>}
        </div>
      </div>
    );
};
export default InputSelect;
