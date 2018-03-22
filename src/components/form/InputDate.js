import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

Moment.locale('en');
momentLocalizer();

const InputDate = ({input, placeholder, defaultValue,className,label, meta: {touched, error} }) => {
  const className2 = `form-group ${touched && error ? 'has-danger' : ''}`;
  return (
  <div className={className2}>
    <label className="col-sm-4 control-label">{label}</label>
    <div className="col-sm-8">
    <DateTimePicker className={className}
      onChange={input.onChange}
      format="DD-MM-YYYY"
      time={false}
      value={!input.value ? null : new Date(input.value)}
    />
      {touched && error && <span className="error text-help">{error}</span>}
    </div>
  </div>
);
}

export default InputDate;
