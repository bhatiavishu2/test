import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReportTimeSeries from './time_series';
const ReportTimeSeriesWater = () =>{
  return(
    <ReportTimeSeries deviceType="WATER"/>
  );
};
export default ReportTimeSeriesWater;
