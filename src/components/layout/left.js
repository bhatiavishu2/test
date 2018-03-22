import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const LeftView = () =>{
  return(
    <div className="navbar-default sidebar" role="navigation">
      <div className="sidebar-nav navbar-collapse">
        <ul className="nav frontSideMneu" id="side-menu">
          <li><a href="#">Customer ID: 0001</a></li>
          <li><a href="#">Customer Name: JUSCO </a></li>
        </ul>
      </div>
    </div>
  );
};
export default LeftView;
