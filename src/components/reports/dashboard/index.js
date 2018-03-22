import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';

import ReportNav  from '../report_nav';
import {search} from '../../../actions/reports/dashboard';
var PieChart = require("react-chartjs").Pie;
var LineChart = require("react-chartjs").Line;

class DashBoard extends Component {
  componentDidMount() {
    const request ={device_profile_search_request:{"pageNumber": 0,"pageSize": 10,"sortBy": "deviceProfileName","sortDirection": "asc"}};
    

    this.props.search(request).then(() => {
      this.draw(this.props.searchData.consumptionResponse.entities[0].total_consumption);
    });
    //this.redraw();
  }
  chartOptions={responsive: true,legend:{display:true},segmentShowStroke : true,
  elements: {line: {fill: false,borderWidth:3,borderColor: "rgba(35, 87, 137,1)"}}};

redraw = function(){
  this.draw(document.getElementById("myList").value);
}

draw = function (speed){
      var  canvas = document.getElementById("myCanvas");
      var  context = canvas.getContext("2d");
      context.clearRect(0,0,canvas.width, canvas.height);
      var centerX = canvas.width / 2 + 0;
      var centerY = canvas.height / 2 + 65;
      var radius = canvas.height / 2 + 50;

      context.beginPath();
      context.arc(centerX, centerY, radius, Math.PI*0.10, Math.PI*-1.1, true);

      var gradience = context.createRadialGradient(centerX, centerY, radius-radius/2, centerX, centerY, radius-radius/8);
       gradience.addColorStop(0, '#ff9000');
       gradience.addColorStop(1, '#000000');

       context.fillStyle = gradience;
       context.fill();
       context.closePath();
       context.restore();
	context.beginPath();
	context.strokeStyle = '#ffff00';
	context.translate(centerX,centerY);
	var increment = Math.round(speed/15);
	context.font="15px Helvetica";
	for (var i=-18; i<=18; i++)	{
		var angle = Math.PI/30*i;
		var sineAngle = Math.sin(angle);
		var cosAngle = -Math.cos(angle);

		if (i % 5 == 0) {
		context.lineWidth = 8;
		var iPointX = sineAngle *(radius -radius/4);
		var iPointY = cosAngle *(radius -radius/4);
		var oPointX = sineAngle *(radius -radius/7);
		var oPointY = cosAngle *(radius -radius/7);

		var wPointX = sineAngle *(radius -radius/2.5);
		var wPointY = cosAngle *(radius -radius/2.5);
		context.fillText((i+18)*increment,wPointX-2,wPointY+4);
		}
		else {
		context.lineWidth = 2;
		var iPointX = sineAngle *(radius -radius/5.5);
		var iPointY = cosAngle *(radius -radius/5.5);
		var oPointX = sineAngle *(radius -radius/7);
		var oPointY = cosAngle *(radius -radius/7);
		}
		context.beginPath();
		context.moveTo(iPointX,iPointY);
		context.lineTo(oPointX,oPointY);
		context.stroke();
		context.closePath();
	}
	var numOfSegments = speed/increment;
	numOfSegments = numOfSegments -18;
	angle = Math.PI/30*numOfSegments;
	sineAngle = Math.sin(angle);
	cosAngle = -Math.cos(angle);
	var pointX = sineAngle *(3/4*radius);
	var pointY = cosAngle *(3/4*radius);

	context.beginPath();
	context.strokeStyle = '#000000';
	context.arc(0, 0, 19, 0, 2*Math.PI, true);
	context.fill();
    context.closePath();

	context.beginPath();
	context.lineWidth=6;
	context.moveTo(0,0);
    context.lineTo(pointX,pointY);
    context.stroke();
    context.closePath();
    context.restore();
    context.translate(-centerX,-centerY);
}
  render(){
      return (
        <div className="tabContainer">
          <ReportNav nav="dashboard"/>
          <div className="tab-pane" id="timeseries">
          <div className="row">
                <div className="col-md-4 col-sm-6">
                  <div className="widget smart-standard-widget">
                    <div className="row">
                      <div className="widget-caption info">
                        <div className="col-xs-4 no-pad">
                          <i className="icon ti ti-ruler-pencil"></i>
                        </div>
                        <div className="col-xs-8 no-pad">
                          <div className="widget-detail">
                            <h3 className="cl-info">{this.props.labelValue && (this.props.labelValue.ASSIGNED?this.props.labelValue.ASSIGNED:0 + this.props.labelValue.Active?this.props.labelValue.Active:0)}</h3>
                            <span>Active Devices</span>
                          </div>
                        </div>
                        <div className="col-xs-12">
                          <div className="widget-line bg-info">
                            <span className="bg-info widget-horigental-line"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6">
                  <div className="widget smart-standard-widget">
                    <div className="row">
                      <div className="widget-caption danger">
                        <div className="col-xs-4 no-pad">
                          <i className="icon ti ti-desktop"></i>
                        </div>
                        <div className="col-xs-8 no-pad">
                          <div className="widget-detail">
                            <h3 className="cl-danger">{this.props.labelValue && (this.props.labelValue['Active Tampered']?this.props.labelValue['Active Tampered']:0 + this.props.labelValue['Active Tampered']?this.props.labelValue['Active Tampered']:0)}</h3>
                            <span>Tampered Devices</span>
                          </div>
                        </div>
                        <div className="col-xs-12">
                          <div className="widget-line bg-danger">
                            <span className="bg-danger widget-horigental-line"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6">
                  <div className="widget smart-standard-widget">
                    <div className="row">
                      <div className="widget-caption warning">
                        <div className="col-xs-4 no-pad">
                          <i className="icon ti ti-ruler-pencil"></i>
                        </div>
                        <div className="col-xs-8 no-pad">
                          <div className="widget-detail">
                            <h3 className="cl-warning">{this.props.labelValue && (this.props.labelValue['DISMANTLE']?this.props.labelValue['DISMANTLE']:0 + this.props.labelValue['InActive']?this.props.labelValue['InActive']:0 + this.props.labelValue['UNASSIGNED']?this.props.labelValue['UNASSIGNED']:0)}</h3>
                            <span>Inactive Devices</span>
                          </div>
                        </div>
                        <div className="col-xs-12">
                          <div className="widget-line bg-warning">
                            <span className="bg-warning widget-horigental-line"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title m-b-0">Devices Split by Status</h4>
                    </div>
                    <div className="card-body">
                      {this.props.deviceChartData && <PieChart data={this.props.deviceChartData} options={this.chartOptions}/>}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title m-b-0">Consumption Status</h4>
                    </div>
                    <div className="card-body text-center">
                      {/*<select id="myList" onChange={()=>this.redraw()}>
                          <option value="40">Speed = 40 KWH</option>
                          <option value="120">Speed = 120 KWH</option>
                          <option value="30">Speed = 30 KWH</option>
                          <option value="50">Speed = 50 KWH</option>
                          <option value="60">Speed = 60 KWH</option>
                          <option value="140">Speed = 140 KWH</option>
                          <option value="160">Speed = 160 KWH</option>
                      </select>*/}
                      <canvas className="canvas" id="myCanvas" width="480" height="270"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
              {this.props.authentications && this.props.authentications.selectedDeviceTypeInHeader && this.props.authentications.selectedDeviceTypeInHeader=='ENERGY-PHASE1' && <div className="col-md-12 col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title m-b-0">Load Profile</h4>
                  </div>
                  <div className="card-body">
                    {this.props.loadProfileChartData && <LineChart data={this.props.loadProfileChartData} options={this.chartOptions}/>}
                  </div>
                </div>
              </div>}

              </div>
        </div>
      </div>
      );
  }
}
function mapStateToProps(state) {
  return {
      authentications:state.authentications,
      searchData: state.dashboard.searchData,
      deviceChartData:state.dashboard.deviceChartData,
      labelValue:state.dashboard.labelValue,
      loadProfileChartData:state.dashboard.loadProfileChartData
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      search:search
    },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
