import _ from 'lodash';
import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const InputMultiSelect = (props) =>{
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
            value={props.input.value}
            onChange={(value) => props.input.onChange(value)}
            onBlur={() => {props.input.onBlur(props.input.value) }}
            multi={true}
            autoFocus
            simpleValue
            searchable={true}
            clearable={false}

            onBlurResetsInput={false}
            onSelectResetsInput={false}
          />
          {touched && error && <span className="error text-help">{error}</span>}
        </div>
      </div>
    );
};
export default InputMultiSelect;
