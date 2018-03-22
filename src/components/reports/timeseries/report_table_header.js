import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
class ReportTableHeader extends Component{
  render() {
  return(
    <th className="selectDrop viewCheckAll" width="120" onClick={this.props.click}>{this.props.heading}
				<a className=" dropMore" href="#"><i className={this.props.addClassNames} aria-hidden="true"></i></a>
		</th>
  );
}
}
export default ReportTableHeader;
