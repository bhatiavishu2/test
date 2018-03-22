import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
class ReportNav extends Component{

  render() {
  return(
          <ul className="nav nav-tabs mainTabList">
              <li className={(this.props.nav=='dashboard'?"active":"")}><Link to="/dashboard">Dashboard</Link></li>
              <li className={(this.props.nav=='timeseries'?"active":"")}><Link to="/timeseries">Meter Info</Link></li>
              <li className={(this.props.nav=='devices'?"active":"")}>{<Link to="/manage/devices">Devices</Link>}</li>
              <li className={(this.props.nav=='report'?"active":"")}>{<Link to="/reports/consumption">Reports</Link>}</li>
              <li className={(this.props.nav=='analytics'?"active":"")}><a href="#analytics" aria-controls="analytics" data-toggle="tab">Analytics</a></li>
              <li className="currentDate pull-right">{new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata',hour12:false, weekday:"short", year:"numeric",month:"short",day:"2-digit",second:"2-digit",hour:"2-digit",minute:"2-digit" })}</li>
            </ul>
  );
}
}
export default ReportNav;
