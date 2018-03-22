import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const DashBoard = () =>{
  return (
    <div>
    <h1>Welcome</h1>
    <Link to="/reports/timeseries">Timeseries</Link>
    </div>
  );
};
export default DashBoard;
