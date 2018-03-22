import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
class ReportNavTitle extends Component{
  showPacket() {
    //console.log("PP"+this.props.title2+"PP");
    if(this.props.title2=="Uplink Frame1") {
      return "Consumption Data";
    }
    if(this.props.title2=="Uplink Frame2") {
      return "Tamper Data";
    }
    return this.props.title2;
  }
  render() {
  return(
    <div className="gapZeros withoutbg simpleTitleExport clearfix">
      <div className="col-xs-12 col-sm-9">
        <h2 className="SimpleTitle">{this.props.title} {this.showPacket()} Since {this.props.title3}</h2>
      </div>
      <div className="col-xs-12 col-sm-3">
        {/*}<div className="exportIcon text-right">
          <a href="#" title="Export">Export <i className="fa fa-download" aria-hidden="true"></i></a>
        </div>*/}
      </div>
    </div>
  );
}
}
export default ReportNavTitle;
