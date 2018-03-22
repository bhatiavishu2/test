import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReportTimeSeries from './time_series';
const ReportTimeSeriesGas = () =>{
  return(
    <ReportTimeSeries deviceType="GAS"/>
  );
};
export default ReportTimeSeriesGas;
