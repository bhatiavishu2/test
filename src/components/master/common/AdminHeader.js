import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class AdminHeader extends Component {
  render(){
  return(
    <div className="row page-titles OuterPageTitle">
    	<div className="col-md-9 align-self-center addCust">
    		<h3 className="text-themecolor">{this.props.title}</h3>
    	</div>
    	<div className="col-md-3 align-self-center addSearch">
      </div>
    </div>

  );
};
}
export default AdminHeader;
