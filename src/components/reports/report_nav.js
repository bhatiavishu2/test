import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
class ReportNav extends Component {

  render() {
    return (
      <ul className="nav nav-tabs mainTabList">
        <li className={(this.props.nav == 'dashboard' ? "active" : "")}><Link to="/dashboard"><i className="fa fa-home" /> Dashboard</Link></li>
        <li className={(this.props.nav == 'timeseries' ? "active" : "")}><Link to="/timeseries"><i className="fa fa-thermometer-full" /> Meter Info</Link></li>
        <li className={(this.props.nav == 'devices' ? "active" : "")}><Link to="/manage/devices"><i className="fa fa-microchip" /> Devices</Link></li>
        <li className={(this.props.nav == 'report' ? "active" : "")}><Link to="/reports/consumption"><i className="fa fa-newspaper-o" /> Reports</Link></li>
        <li className={(this.props.nav == 'analytics' ? "active" : "")}><a href="#analytics" aria-controls="analytics" data-toggle="tab" title="Analytics"><i className="fa fa-line-chart" /> Analytics</a></li>
        <li className="currentDate pull-right">{new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false, weekday: "short", year: "numeric", month: "short", day: "2-digit", second: "2-digit", hour: "2-digit", minute: "2-digit" })}</li>
      </ul>
    );
  }
}
export default ReportNav;
