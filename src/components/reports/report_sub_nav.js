import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
class ReportSubNav extends Component{

  render() {
  return(
    <div className="row">
      <ul className="nav nav-tabs">
        <li className={(this.props.nav=='cr'?"active":"")}>{<Link to="/reports/consumption">Consumption Reports</Link>}</li>
        <li className={(this.props.nav=='cpr'?"active":"")}>{<Link to="/reports/consumption_pattern">Consumption Pattern Reports</Link>}</li>
        <li className={(this.props.nav=='tdr'?"active":"")}>{<Link to="/reports/tamperdata">Tamper Data Reports</Link>}</li>
      </ul>
    </div>

  );
}
}
export default ReportSubNav;
