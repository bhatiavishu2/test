import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const EntitySearchBox = () =>{
  return(
    <div className="row page-titles gapZeros withoutbg">
    	<div className="col-xs-12 col-sm-9">
    	</div>
    	<div className="col-xs-12 col-sm-3 align-self-center addSearch">
    		<div className="header-search-form input-group">
    			<input className="form-control" placeholder="Search" type="text"/>
    			<span className="input-group-addon" id="searcAll"><span className="ti-search"></span></span>
    		</div>
    	</div>
    </div>
  );
};
export default EntitySearchBox;
