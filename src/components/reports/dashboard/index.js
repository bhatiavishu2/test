import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import { ReportItemsNav } from '../report_items_nav'
import { DeviceDetail } from '../device_detail'
import ReportNav from '../report_nav';
import { search } from '../../../actions/reports/dashboard';
var PieChart = require("react-chartjs").Pie;
var LineChart = require("react-chartjs").Line;

class DashBoard extends Component {
  componentDidMount() {
    //   const request = { device_profile_search_request: { "pageNumber": 0, "pageSize": 10, "sortBy": "deviceProfileName", "sortDirection": "asc" } };


    //   this.props.search(request).then(() => {
    //     this.draw(this.props.searchData.consumptionResponse.entities[0].total_consumption);
    //   });
    //   //this.redraw();
    // }
    // chartOptions = {
    //   responsive: true, legend: { display: true }, segmentShowStroke: true,
    //   elements: { line: { fill: false, borderWidth: 3, borderColor: "rgba(35, 87, 137,1)" } }
    // };

    // redraw = function () {
    //   this.draw(document.getElementById("myList").value);
    // }

    // draw = function (speed) {
    //   var canvas = document.getElementById("myCanvas");
    //   var context = canvas.getContext("2d");
    //   context.clearRect(0, 0, canvas.width, canvas.height);
    //   var centerX = canvas.width / 2 + 0;
    //   var centerY = canvas.height / 2 + 65;
    //   var radius = canvas.height / 2 + 50;

    //   context.beginPath();
    //   context.arc(centerX, centerY, radius, Math.PI * 0.10, Math.PI * -1.1, true);

    //   var gradience = context.createRadialGradient(centerX, centerY, radius - radius / 2, centerX, centerY, radius - radius / 8);
    //   gradience.addColorStop(0, '#ff9000');
    //   gradience.addColorStop(1, '#000000');

    //   context.fillStyle = gradience;
    //   context.fill();
    //   context.closePath();
    //   context.restore();
    //   context.beginPath();
    //   context.strokeStyle = '#ffff00';
    //   context.translate(centerX, centerY);
    //   var increment = Math.round(speed / 15);
    //   context.font = "15px Helvetica";
    //   for (var i = -18; i <= 18; i++) {
    //     var angle = Math.PI / 30 * i;
    //     var sineAngle = Math.sin(angle);
    //     var cosAngle = -Math.cos(angle);

    //     if (i % 5 == 0) {
    //       context.lineWidth = 8;
    //       var iPointX = sineAngle * (radius - radius / 4);
    //       var iPointY = cosAngle * (radius - radius / 4);
    //       var oPointX = sineAngle * (radius - radius / 7);
    //       var oPointY = cosAngle * (radius - radius / 7);

    //       var wPointX = sineAngle * (radius - radius / 2.5);
    //       var wPointY = cosAngle * (radius - radius / 2.5);
    //       context.fillText((i + 18) * increment, wPointX - 2, wPointY + 4);
    //     }
    //     else {
    //       context.lineWidth = 2;
    //       var iPointX = sineAngle * (radius - radius / 5.5);
    //       var iPointY = cosAngle * (radius - radius / 5.5);
    //       var oPointX = sineAngle * (radius - radius / 7);
    //       var oPointY = cosAngle * (radius - radius / 7);
    //     }
    //     context.beginPath();
    //     context.moveTo(iPointX, iPointY);
    //     context.lineTo(oPointX, oPointY);
    //     context.stroke();
    //     context.closePath();
    //   }
    //   var numOfSegments = speed / increment;
    //   numOfSegments = numOfSegments - 18;
    //   angle = Math.PI / 30 * numOfSegments;
    //   sineAngle = Math.sin(angle);
    //   cosAngle = -Math.cos(angle);
    //   var pointX = sineAngle * (3 / 4 * radius);
    //   var pointY = cosAngle * (3 / 4 * radius);

    //   context.beginPath();
    //   context.strokeStyle = '#000000';
    //   context.arc(0, 0, 19, 0, 2 * Math.PI, true);
    //   context.fill();
    //   context.closePath();

    //   context.beginPath();
    //   context.lineWidth = 6;
    //   context.moveTo(0, 0);
    //   context.lineTo(pointX, pointY);
    //   context.stroke();
    //   context.closePath();
    //   context.restore();
    //   context.translate(-centerX, -centerY);
  }
  render() {
    return (
      <div id="page-wrapper" style={{ minHeight: "586px" }}>
        <div className="container-fluid">

          <div className="tabContainer">
            <ReportItemsNav />
            <ReportNav nav="dashboard" />
            <div className="tab-content">
              <div className="tab-pane active" id="dashboard">
                <div className="row">
                  <DeviceDetail
                    deviceType="Installed Devices"
                    deviceIconType="archive"
                    backgroundColorType="info"
                    deviceCount={1000}
                  />
                  <DeviceDetail
                    deviceType="Inactive Devices"
                    deviceIconType="inbox"
                    backgroundColorType="warning"
                    deviceCount={20}
                  />
                  <DeviceDetail
                    deviceType="Tampered Devices"
                    deviceIconType="desktop"
                    backgroundColorType="danger"
                    deviceCount={17}
                  />
                </div>
                <div className="row">
                  <div className="col-md-8 col-sm-12 col-xs-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title m-b-0">
                          <i className="fa fa-codiepie" /> Load Profile
                        <select className="form-control SselDevice">
                            <option>Monthly</option>
                            <option>Single Device</option>
                            <option>All Device</option>
                          </select>
                          <select className="form-control SselDevice">
                            <option>Single Day</option>
                            <option>Single Device</option>
                            <option>All Device</option>
                          </select>
                        </h4>
                      </div>
                      <div className="card-body">
                        <div id="line-chart" style={{ height: 200, padding: 0, position: 'relative' }}><canvas className="flot-base" width={500} height={200} style={{ direction: 'ltr', position: 'absolute', left: 0, top: 0, width: 500, height: 200 }} /><div className="flot-text" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, fontSize: 'smaller', color: 'rgb(84, 84, 84)' }}><div className="flot-x-axis flot-x1-axis xAxis x1Axis" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'block' }}><div style={{ position: 'absolute', maxWidth: 76, top: 187, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 24, textAlign: 'center' }}>0</div><div style={{ position: 'absolute', maxWidth: 76, top: 187, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 93, textAlign: 'center' }}>2</div><div style={{ position: 'absolute', maxWidth: 76, top: 187, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 162, textAlign: 'center' }}>4</div><div style={{ position: 'absolute', maxWidth: 76, top: 187, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 231, textAlign: 'center' }}>6</div><div style={{ position: 'absolute', maxWidth: 76, top: 187, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 300, textAlign: 'center' }}>8</div><div style={{ position: 'absolute', maxWidth: 76, top: 187, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 366, textAlign: 'center' }}>10</div><div style={{ position: 'absolute', maxWidth: 76, top: 187, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 435, textAlign: 'center' }}>12</div></div><div className="flot-y-axis flot-y1-axis yAxis y1Axis" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'block' }}><div style={{ position: 'absolute', top: 176, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 4, textAlign: 'right' }}>-1.5</div><div style={{ position: 'absolute', top: 147, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 3, textAlign: 'right' }}>-1.0</div><div style={{ position: 'absolute', top: 118, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 1, textAlign: 'right' }}>-0.5</div><div style={{ position: 'absolute', top: 89, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 5, textAlign: 'right' }}>0.0</div><div style={{ position: 'absolute', top: 60, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 6, textAlign: 'right' }}>0.5</div><div style={{ position: 'absolute', top: 31, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 8, textAlign: 'right' }}>1.0</div><div style={{ position: 'absolute', top: 2, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, fontStretch: 'normal', fontSize: 10, lineHeight: 12, fontFamily: 'MontserratRegular, RobotoRegular, sans-serif', color: 'rgb(104, 123, 158)', left: 9, textAlign: 'right' }}>1.5</div></div></div><canvas className="flot-overlay" width={500} height={200} style={{ direction: 'ltr', position: 'absolute', left: 0, top: 0, width: 500, height: 200 }} /></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12 col-xs-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title m-b-0"><i className="fa fa-bell-o" /> Notifications</h4>
                      </div>
                      <div className="card-body dashNotifiWrap">
                        <ul className="task dashNotifi">
                          <li>
                            <a href="#">
                              <div className="task-overview">
                                <div className="alpha-box alpha-a">
                                  <span>A</span>
                                </div>
                                <div className="task-detail">
                                  <p>Hello, I am Tata.</p>
                                  <span className="task-time">2 Min Ago</span>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <div className="task-overview">
                                <div className="alpha-box alpha-d">
                                  <span>D</span>
                                </div>
                                <div className="task-detail">
                                  <p>Hello, I am Tata.</p>
                                  <span className="task-time">2 Min Ago</span>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <div className="task-overview">
                                <div className="alpha-box alpha-g">
                                  <span>G</span>
                                </div>
                                <div className="task-detail">
                                  <p>Hello, I am Tata.</p>
                                  <span className="task-time">2 Min Ago</span>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <div className="task-overview">
                                <div className="alpha-box alpha-h">
                                  <span>H</span>
                                </div>
                                <div className="task-detail">
                                  <p>Hello, I am Tata.</p>
                                  <span className="task-time">2 Min Ago</span>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a className="text-center" href="#">
                              <div className="taskViewAll">
                                <strong>See All Notifications</strong>
                                <i className="fa fa-angle-right" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /row */}
                {/* row */}
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title m-b-0"><i className="fa fa-pie-chart" /> Installed Devices Split by Status</h4>
                      </div>
                      <div className="card-body"><iframe className="chartjs-hidden-iframe" tabIndex={-1} style={{ display: 'block', overflow: 'hidden', border: 0, margin: 0, top: 0, left: 0, bottom: 0, right: 0, height: '100%', width: '100%', position: 'absolute', pointerEvents: 'none', zIndex: -1 }} />
                        <canvas id="bar-chart-horizontal" width={362} height={241} style={{ display: 'block', width: 362, height: 241 }} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title m-b-0"><i className="fa fa-dashboard" /> Consumption Status</h4>
                      </div>
                      <div className="card-body text-center">
                        <div className="text-center powerTileKwh">Power: <strong>120 KWH</strong></div>
                        <div className="gauge gauge--liveupdate" id="gauge">
                          <div className="gauge__container">
                            <div className="gauge__marker" />
                            <div className="gauge__background" />
                            <div className="gauge__center" />
                            <div className="gauge__data" style={{ transform: 'rotate(-0.1turn)' }} />
                            <div className="gauge__needle" style={{ transform: 'rotate(-0.1turn)' }} />
                          </div>
                          <div className="gauge__labels mdl-typography__headline">
                            <span className="gauge__label--low">0</span>
                            <span className="gauge__label--spacer" />
                            <span className="gauge__label--high">180</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /row */}
              </div>
              {/* Time Series */}
              <div className="tab-pane" id="timeseries">
                <div className="row page-titles selectDrop">
                  <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-6 col-xs-6">
                      <select className="form-control">
                        <option>Energy 1 Phase </option>
                        <option>Energy 3 Phase </option>
                      </select>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6 col-xs-6">
                      <select className="form-control">
                        <option>All Packets</option>
                        <option>Instantaneous Data</option>
                        <option>Load Profile Data</option>
                        <option>Tamper Read Data</option>
                        <option>Billing </option>
                      </select>
                    </div>
                    <div className="col-lg-8 col-md-6 col-xs-12 align-self-center">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Today</a></li>
                        <li className="breadcrumb-item"><a href="#">Last 1 Week</a></li>
                        <li className="breadcrumb-item"><a href="#">Last 2 Weeks</a></li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="gapZeros withoutbg simpleTitleExport clearfix">
                  <div className="col-xs-4 col-sm-7 col-md-9 gapBZero">
                    <a className="btn btnExport" href="#"> Export <i className="fa fa-file-excel-o" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="col-xs-8 col-sm-5 col-md-3 align-self-center addSearch gapBZero">
                    <div className="header-search-form input-group">
                      <input type="text" className="form-control" placeholder="Search" />
                      <span className="input-group-addon" id="searcAll">
                        <span className="ti-search" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="OuterTables">
                      <div className="table-responsive">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th className="selectDrop" width={120}>DateTime
                              <a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                <div className="sortingDiv" style={{ display: 'none' }}>
                                  <ul className="list-unstyled">
                                    <li>
                                      <a href="#"><i className="fa fa-sort-numeric-asc" aria-hidden="true" /> Sort 1 to 9</a>
                                    </li>
                                    <li>
                                      <a href="#"><i className="fa fa-sort-numeric-desc" aria-hidden="true" /> Sort 9 to 1</a>
                                    </li>
                                    <li>
                                      <form>
                                        <input type="search" name placeholder="Property Id" />
                                        <i className="fa fa-search" aria-hidden="true" />
                                      </form>
                                    </li>
                                  </ul>
                                </div>
                              </th>
                              <th className="selectDrop" width={120}>Consumer #
                              <a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                <div className="sortingDiv" style={{ display: 'none' }}>
                                  <ul className="list-unstyled">
                                    <li>
                                      <a href="#"><i className="fa fa-sort-numeric-asc" aria-hidden="true" /> Sort 1 to 9</a>
                                    </li>
                                    <li>
                                      <a href="#"><i className="fa fa-sort-numeric-desc" aria-hidden="true" /> Sort 9 to 1</a>
                                    </li>
                                    <li>
                                      <form>
                                        <input type="search" name placeholder="Property Id" />
                                        <i className="fa fa-search" aria-hidden="true" />
                                      </form>
                                    </li>
                                  </ul>
                                </div>
                              </th>
                              <th className="selectDrop" width={100}>Device Id
                              <a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                <div className="sortingDiv" style={{ display: 'none' }}>
                                  <ul className="list-unstyled">
                                    <li>
                                      <a href="#"><i className="fa fa-sort-numeric-asc" aria-hidden="true" /> Sort 1 to 9</a>
                                    </li>
                                    <li>
                                      <a href="#"><i className="fa fa-sort-numeric-desc" aria-hidden="true" /> Sort 9 to 1</a>
                                    </li>
                                    <li>
                                      <form>
                                        <input type="search" name placeholder="Property Id" />
                                        <i className="fa fa-search" aria-hidden="true" />
                                      </form>
                                    </li>
                                  </ul>
                                </div>
                              </th>
                              <th className="selectDrop" width={100}>Device Status
                              <a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                <div className="sortingDiv" style={{ display: 'none' }}>
                                  <ul className="list-unstyled">
                                    <li>
                                      <a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                    </li>
                                    <li>
                                      <a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                    </li>
                                    <li>
                                      <form>
                                        <input type="search" name placeholder="Device Status" />
                                        <i className="fa fa-search" aria-hidden="true" />
                                      </form>
                                    </li>
                                  </ul>
                                </div>
                              </th>
                              <th className="selectDrop" width={80}>Packet Type<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                <div className="sortingDiv" style={{ display: 'none' }}>
                                  <ul className="list-unstyled">
                                    <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                    </li>
                                    <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                    </li>
                                    <li>
                                      <form>
                                        <input type="search" name placeholder="Property Type" />
                                        <i className="fa fa-search" aria-hidden="true" />
                                      </form>
                                    </li>
                                  </ul>
                                </div>
                              </th>
                              <th className="selectDrop" width={80}>Consumption
                              <a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                <div className="sortingDiv" style={{ display: 'none' }}>
                                  <ul className="list-unstyled">
                                    <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                    </li>
                                    <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                    </li>
                                    <li>
                                      <form>
                                        <input type="search" name placeholder="Property Type" />
                                        <i className="fa fa-search" aria-hidden="true" />
                                      </form>
                                    </li>
                                  </ul>
                                </div>
                              </th>
                              <th className="selectDrop" width={80}>Actions
                            </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>01-02-2018 13:09:49</td>
                              <td>E-30868743</td>
                              <td>0004a30b001bca3d</td>
                              <td><i className="fa fa-circle colorGreen" /></td>
                              <td>Instantaneous Data</td>
                              <td />
                              <td><a className="viewList btn btn-info" href="#v" data-toggle="modal" data-target="#instantModel" title="View"><i className="fa fa-eye" /></a></td>
                            </tr>
                            <tr>
                              <td>01-02-2018 10:59:19</td>
                              <td>E-30868743</td>
                              <td>0004a30b001bca3d</td>
                              <td><i className="fa fa-circle colorGreen" /></td>
                              <td>Instantaneous Data</td>
                              <td>0 KWH</td>
                              <td><a className="viewList btn btn-info" href="#v" data-toggle="modal" data-target="#instantModel" title="View"><i className="fa fa-eye" /></a></td>
                            </tr>
                            <tr>
                              <td>01-02-2018 09:59:21</td>
                              <td>E-30868743</td>
                              <td>0004a30b001bca3d</td>
                              <td><i className="fa fa-circle colorGrey" /></td>
                              <td>Load Profile Data</td>
                              <td>0.2 KWH</td>
                              <td><a className="viewList btn btn-info" href="#v" data-toggle="modal" data-target="#instantModel" title="View"><i className="fa fa-eye" /></a></td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={12} className="paginationWrap">
                                <div className="numberPages col-xs-6 col-sm-4 text-left">
                                  <span>Number of Entries:</span>
                                  <select name="page_size" className="pager">
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                  </select>
                                </div>
                                <div className="pagesCount col-xs-6 col-sm-8 text-right">
                                  <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                      <li>
                                        <a href="#" aria-label="Previous">
                                          <i aria-hidden="true" className="fa fa-caret-left" />
                                        </a>
                                      </li>
                                      <li><a href="#">1</a></li>
                                      <li className="totalPages">of 4</li>
                                      <li>
                                        <a href="#" aria-label="Next">
                                          <i aria-hidden="true" className="fa fa-caret-right" />
                                        </a>
                                      </li>
                                    </ul>
                                  </nav>
                                  <span className="numPage">Number of Pages:</span>
                                </div>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Devices */}
              <div className="tab-pane" id="devices">
                {/* Sub Tab */}
                <ul className="nav nav-tabs deviceTabs" id="myTab">
                  <li className="nav-item active">
                    <a className="nav-link active" id="listTab" data-toggle="tab" href="#listDevice" aria-controls="listDevice" aria-selected="true">List</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="addTab" data-toggle="tab" href="#addDevice" aria-controls="addDevice" aria-selected="false">Add</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="mapTab" data-toggle="tab" href="#mapDevice" aria-controls="mapDevice" aria-selected="false">Allocation</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="queryTab" data-toggle="tab" href="#queryDevice" aria-controls="queryDevice" aria-selected="false">Query</a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  {/* list */}
                  <div className="tab-pane active" id="listDevice" aria-labelledby="listTab">
                    <div className="row page-titles gapZeros withoutbg">
                      <div className="col-xs-5 col-sm-7 col-md-9 gapBZero">
                        <a className="btn btnExport" href="#"> Export <i className="fa fa-file-excel-o" aria-hidden="true" />
                        </a>
                      </div>
                      <div className="col-xs-7 col-sm-5 col-md-3 align-self-center addSearch gapBZero">
                        <div className="header-search-form input-group">
                          <input type="text" className="form-control" placeholder="Search" />
                          <span className="input-group-addon" id="searcAll">
                            <span className="ti-search" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="OuterTables">
                          <div className="table-responsive">
                            <table className="table table-bordered text-center">
                              <thead>
                                <tr>
                                  <th className="selectDrop" width={100}>Device Id<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li>
                                          <a href="#"><i className="fa fa-sort-numeric-asc" aria-hidden="true" /> Sort 1 to 9</a>
                                        </li>
                                        <li>
                                          <a href="#"><i className="fa fa-sort-numeric-desc" aria-hidden="true" /> Sort 9 to 1</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Id" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={100}>Model No.<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li>
                                          <a href="#"><i className="fa fa-sort-numeric-asc" aria-hidden="true" /> Sort 1 to 9</a>
                                        </li>
                                        <li>
                                          <a href="#"><i className="fa fa-sort-numeric-desc" aria-hidden="true" /> Sort 9 to 1</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Id" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={100}>OEM Name<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={120}>Manufacturer<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={150}>Firmware Version<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li>
                                          <a href="#"><i className="fa fa-sort-numeric-asc" aria-hidden="true" /> Sort 1 to 9</a>
                                        </li>
                                        <li>
                                          <a href="#"><i className="fa fa-sort-numeric-desc" aria-hidden="true" /> Sort 9 to 1</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Id" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={70}>Status<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={100}>Consumer#<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li>
                                          <a href="#"><i className="fa fa-sort-numeric-asc" aria-hidden="true" /> Sort 1 to 9</a>
                                        </li>
                                        <li>
                                          <a href="#"><i className="fa fa-sort-numeric-desc" aria-hidden="true" /> Sort 9 to 1</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Id" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th width={120}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>0004a30b001bca3d</td>
                                  <td>12</td>
                                  <td>ABC</td>
                                  <td>XYZ</td>
                                  <td>3</td>
                                  <td><i className="fa fa-circle colorGreen" /></td>
                                  <td>12</td>
                                  <td>
                                    <a className="editList btn btn-primary" href="#" title="Edit"><i className="fa fa-pencil" /></a>
                                    <a className="viewList btn btn-info" href="#" title="View"><i className="fa fa-eye" /></a>
                                    <a className="deactivateList btn btn-warning" href="#v" data-toggle="modal" data-target="#changeStatus" title="Change Status"><i className="fa fa-exchange" /></a>
                                    <a className="editList btn btn-danger" href="#" title="Command"><i className="fa fa-slack" /></a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>5143086500000011</td>
                                  <td>22</td>
                                  <td>CBA</td>
                                  <td>ZXY</td>
                                  <td>5</td>
                                  <td><i className="fa fa-circle colorGrey" /></td>
                                  <td>34</td>
                                  <td>
                                    <a className="editList btn btn-primary" href="#" title="Edit"><i className="fa fa-pencil" /></a>
                                    <a className="viewList btn btn-info" href="#" title="View"><i className="fa fa-eye" /></a>
                                    <a className="deactivateList btn btn-warning" href="#v" data-toggle="modal" data-target="#changeStatus" title="Change Status"><i className="fa fa-exchange" /></a>
                                    <a className="editList btn btn-danger" href="#" title="Command"><i className="fa fa-slack" /></a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>0004a30b001bca3d</td>
                                  <td>12</td>
                                  <td>ABC</td>
                                  <td>XYZ</td>
                                  <td>3</td>
                                  <td><i className="fa fa-circle colorGreen" /></td>
                                  <td>12</td>
                                  <td>
                                    <a className="editList btn btn-primary" href="#" title="Edit"><i className="fa fa-pencil" /></a>
                                    <a className="viewList btn btn-info" href="#" title="View"><i className="fa fa-eye" /></a>
                                    <a className="deactivateList btn btn-warning" href="#v" data-toggle="modal" data-target="#changeStatus" title="Change Status"><i className="fa fa-exchange" /></a>
                                    <a className="editList btn btn-danger" href="#" title="Command"><i className="fa fa-slack" /></a>
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colSpan={12} className="paginationWrap">
                                    <div className="numberPages col-xs-6 col-sm-4 text-left">
                                      <span>Number of Entries:</span>
                                      <select name="page_size" className="pager">
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                      </select>
                                    </div>
                                    <div className="pagesCount col-xs-6 col-sm-8 text-right">
                                      <nav aria-label="Page navigation">
                                        <ul className="pagination">
                                          <li>
                                            <a href="#" aria-label="Previous">
                                              <i aria-hidden="true" className="fa fa-caret-left" />
                                            </a>
                                          </li>
                                          <li><a href="#">1</a></li>
                                          <li className="totalPages">of 4</li>
                                          <li>
                                            <a href="#" aria-label="Next">
                                              <i aria-hidden="true" className="fa fa-caret-right" />
                                            </a>
                                          </li>
                                        </ul>
                                      </nav>
                                      <span className="numPage">Number of Pages:</span>
                                    </div>
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Add */}
                  <div className="tab-pane" id="addDevice" aria-labelledby="addTab">
                    <div className="custAddForm siteAddCust propAddCity">
                      <form className="formHorizontal">
                        <div className="formContainer">
                          <div className="uploadDownDoc uploadDownDocAdd row">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-4">
                              <label htmlFor="prop9" className="col-sm-12 col-md-8 control-label">Sample File Download:</label>
                              <div className="col-sm-12 col-md-4">
                                <label className="downloadIcon" id="prop9">
                                  <a className="btn btn-warning" target="_blank" href="#"><i className="fa fa-cloud-download" /></a>
                                </label>
                              </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-8">
                              <label htmlFor="prop10" className="col-sm-12 col-md-2 control-label">Upload:</label>
                              <div className="col-sm-12 col-md-10">
                                <label className="uploadIcon">
                                  <input type="file" id="prop10" />
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* Left Side */}
                          <div className="col-xs-12 col-sm-12 col-md-6">
                            <div className="formWraper formWraper3">
                              <div className="form-group">
                                <label htmlFor="dev1" className="col-sm-4 control-label">Device Type:</label>
                                <div className="col-md-5 col-sm-8 col-xs-12">
                                  <select className="form-control" id="dev1">
                                    <option>Select</option>
                                    <option>Apartment</option>
                                    <option>Villa</option>
                                    <option>4</option>
                                    <option>5</option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="dev2" className="col-sm-4 control-label">Device Profile:</label>
                                <div className="col-md-5 col-sm-8 col-xs-12">
                                  <select className="form-control" id="dev1">
                                    <option>Select</option>
                                    <option>Apartment</option>
                                    <option>Villa</option>
                                    <option>4</option>
                                    <option>5</option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="dev3" className="col-sm-4 control-label">Device ID:</label>
                                <div className="col-sm-8">
                                  <input type="text" className="form-control" id="dev2" placeholder="Device ID" />
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="dev4" className="col-sm-4 control-label">Serial Number:</label>
                                <div className="col-sm-8">
                                  <input type="text" className="form-control" id="dev3" placeholder="Serial Number" />
                                </div>
                              </div>
                              {/* <div class="form-group">
                                      <label for="dev5" class="col-sm-4 control-label">Device Name:</label>
                                      <div class="col-sm-8">
                                        <input type="text" class="form-control" id="dev4" placeholder="Device Name">
                                      </div>
                                  </div> */}
                              <div className="form-group">
                                <label htmlFor="dev6" className="col-sm-4 control-label">Model Number:</label>
                                <div className="col-sm-8">
                                  <input type="text" className="form-control" id="dev5" placeholder="Model Number" />
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="dev7" className="col-sm-4 control-label">OEM Name:</label>
                                <div className="col-sm-8">
                                  <input type="text" className="form-control" id="dev6" placeholder="OEM Name" />
                                </div>
                              </div>
                              {/* <div class="form-group">
                                      <label for="dev8" class="col-sm-4 control-label">Device Properties:</label>
                                      <div class="col-sm-8">
                                        <input type="text" class="form-control" id="dev8" placeholder="Device Properties">
                                      </div>
                                  </div> */}
                              <div className="form-group">
                                <label htmlFor="dev9" className="col-sm-4 control-label">Manufacturer Name:</label>
                                <div className="col-sm-8">
                                  <input type="text" className="form-control" id="dev9" placeholder="Manufacturer Name" />
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="dev10" className="col-sm-4 control-label">Firmware Version:</label>
                                <div className="col-sm-8">
                                  <input type="text" className="form-control" id="dev9" placeholder="Firmware Version" />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Right Side */}
                          <div className="col-xs-12 col-sm-12 col-md-6">
                            <div className="formWraper formWraper3">
                              <div className="form-group">
                                <label htmlFor="dev11" className="col-sm-4 control-label">Device Latitude:</label>
                                <div className="col-sm-8">
                                  <input type="text" className="form-control" id="dev10" placeholder="Owner Name" />
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="dev12" className="col-sm-4 control-label">Device Longitude:</label>
                                <div className="col-sm-8">
                                  <input type="email" className="form-control" id="dev12" placeholder="Owner Email Id" />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="col-sm-12 savecustoBtnRow">
                                <div className="saveButtons text-center savecustoBtn">
                                  <input className="btn btn-primary" defaultValue="Save" type="botton" />
                                  <input className="btn btn-info" defaultValue="Save & Add" type="botton" />
                                  <input className="btn btn-warning" defaultValue="Reset" type="botton" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* Map */}
                  <div className="tab-pane" id="mapDevice" aria-labelledby="mapTab">
                    {/* Search */}
                    <div className="row page-titles gapZeros withoutbg">
                      <div className="uploadDownDoc uploadDownDocAdd row">
                        <div className="col-sm-4 col-md-1">
                          <div className="exportIcon text-left">
                            <a className="btn btnExport" href="#"> Export <i className="fa fa-file-excel-o" aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                        <div className="col-xs-6 col-sm-8 col-md-4 gapZeroM">
                          <label htmlFor="prop9" className="col-sm-8 control-label text-right mmrgt">Sample File Download:</label>
                          <div className="col-sm-4">
                            <label className="downloadIcon" id="prop9">
                              <a className="btn btn-warning" target="_blank" href="#"><i className="fa fa-cloud-download" /></a></label>
                          </div>
                        </div>
                        <div className="col-xs-6 col-sm-7 col-md-4 gapZeroM">
                          <label htmlFor="prop10" className="col-sm-3 control-label text-right">Upload:</label>
                          <div className="col-sm-9">
                            <label className="uploadIcon">
                              <input type="file" id="prop10" />
                            </label>
                          </div>
                        </div>
                        <div className="col-xs-6 col-sm-5 col-md-3 align-self-center addSearch mobileLeft">
                          <div className="header-search-form input-group">
                            <input className="form-control" placeholder="Search" type="text" />
                            <span className="input-group-addon" id="searcAll"><span className="ti-search" /></span>
                          </div>
                        </div>
                      </div>
                      {/* <div class="col-xs-12 col-sm-9">
                            <div class="exportIcon text-left">
                              <a class="btn" href="#"> Export <i class="fa fa-file-excel-o" aria-hidden="true"></i> 
                                </a>
                            </div>
                          </div>
                          <div class="col-xs-12 col-sm-3 align-self-center addSearch">
                              <div class="header-search-form input-group">
                              <input class="form-control" placeholder="Search" type="text">
                              <span class="input-group-addon" id="searcAll"><span class="ti-search"></span></span>
                            </div>
                          </div> */}
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="OuterTables">
                          <div className="table-responsive">
                            <table className="table table-bordered text-center">
                              <thead>
                                <tr>
                                  <th className="selectDrop" width={120}>
                                    Property Type <a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={100}>Property Address
                                  <a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div></th>
                                  <th className="selectDrop" width={120}>Property Owner Name
                                  <a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div></th>
                                  <th className="selectDrop" width={80}>Consumer#
                                  <a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th width={120}>Attach Available Device</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Hospital</td>
                                  <td>Sector 12</td>
                                  <td>ABC</td>
                                  <td>1</td>
                                  <td className="SelectAttachDevice">
                                    <select className="form-control">
                                      <option>Select</option>
                                      <option>1</option>
                                      <option>2</option>
                                    </select>
                                    <a className="attachDevice" target="_blank" title="Attach" href="#v" data-toggle="modal" data-target="#attachModal"><i className="fa fa-paperclip" /> Attach</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Individual House</td>
                                  <td>Sector 25</td>
                                  <td>XYZ</td>
                                  <td>2</td>
                                  <td className="SelectAttachDevice">
                                    <select className="form-control">
                                      <option>Select</option>
                                      <option>1</option>
                                      <option>2</option>
                                    </select>
                                    <a className="attachDevice" target="_blank" title="Attach" href="#v" data-toggle="modal" data-target="#attachModal"><i className="fa fa-paperclip" /> Attach</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Flat</td>
                                  <td>Sector 32</td>
                                  <td>PQR</td>
                                  <td>3</td>
                                  <td className="SelectAttachDevice">
                                    <select className="form-control">
                                      <option>Select</option>
                                      <option>1</option>
                                      <option>2</option>
                                    </select>
                                    <a className="attachDevice" target="_blank" title="Attach" href="#v" data-toggle="modal" data-target="#attachModal"><i className="fa fa-paperclip" /> Attach</a>
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colSpan={12} className="paginationWrap">
                                    <div className="numberPages col-xs-6 col-sm-4 text-left">
                                      <span>Number of Entries:</span>
                                      <select name="page_size" className="pager">
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                      </select>
                                    </div>
                                    <div className="pagesCount col-xs-6 col-sm-8 text-right">
                                      <nav aria-label="Page navigation">
                                        <ul className="pagination">
                                          <li>
                                            <a href="#" aria-label="Previous">
                                              <i aria-hidden="true" className="fa fa-caret-left" />
                                            </a>
                                          </li>
                                          <li><a href="#">1</a></li>
                                          <li className="totalPages">of 4</li>
                                          <li>
                                            <a href="#" aria-label="Next">
                                              <i aria-hidden="true" className="fa fa-caret-right" />
                                            </a>
                                          </li>
                                        </ul>
                                      </nav>
                                      <span className="numPage">Number of Pages:</span>
                                    </div>
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Query */}
                  <div className="tab-pane" id="queryDevice" aria-labelledby="queryTab">
                    <div className="row page-titles gapZeros withoutbg">
                      <div className="col-xs-5 col-sm-7 col-md-9 gapBZero">
                        <a className="btn btnExport" href="#"> Export <i className="fa fa-file-excel-o" aria-hidden="true" />
                        </a>
                      </div>
                      <div className="col-xs-7 col-sm-5 col-md-3 align-self-center addSearch gapBZero">
                        <div className="header-search-form input-group">
                          <input type="text" className="form-control" placeholder="Search" />
                          <span className="input-group-addon" id="searcAll">
                            <span className="ti-search" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="OuterTables">
                          <div className="table-responsive">
                            <table className="table table-bordered text-center">
                              <thead>
                                <tr>
                                  <th className="selectDrop" width={170}>Property Type<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={120}>Consumer#<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={180}>Property Address<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={180}>Command Sentby<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={250}>Command Sent DateTime<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                  </th>
                                  <th className="selectDrop" width={200}>Command Status<a className="dropMore" href="#v"><i className="fa fa-sort" aria-hidden="true" /></a>
                                    <div className="sortingDiv" style={{ display: 'none' }}>
                                      <ul className="list-unstyled">
                                        <li><a href="#"><i className="fa fa-sort-alpha-asc" aria-hidden="true" /> Sort A to Z</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-sort-alpha-desc" aria-hidden="true" /> Sort Z to A</a>
                                        </li>
                                        <li>
                                          <form>
                                            <input type="search" name placeholder="Property Type" />
                                            <i className="fa fa-search" aria-hidden="true" />
                                          </form>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* </th>
                                      <th width="100">Response</th>
                                    </tr> */}
                                  </th></tr></thead>
                              <tbody>
                                <tr>
                                  <td>Commercial</td>
                                  <td>123</td>
                                  <td>B-201</td>
                                  <td>Mr.A</td>
                                  <td>B-201</td>
                                  <td>Awaited</td>
                                  {/* <td></td> */}
                                </tr>
                                <tr>
                                  <td>ClubHouse</td>
                                  <td>456</td>
                                  <td>A23</td>
                                  <td>C-209</td>
                                  <td>B-201</td>
                                  <td>Received</td>
                                  {/* <td><a class="viewList btn btn-info" href="#v" data-toggle="modal" data-target="#instantModel" title="View"><i class="fa fa-eye"></i></a></td> */}
                                </tr>
                                <tr>
                                  <td>Common Area</td>
                                  <td>123</td>
                                  <td>B-201</td>
                                  <td>Mr.A</td>
                                  <td>B-201</td>
                                  <td>Awaited</td>
                                  {/* <td></td> */}
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colSpan={11} className="paginationWrap">
                                    <div className="numberPages col-xs-6 col-sm-4 text-left">
                                      <span>Number of Entries:</span>
                                      <select name="page_size" className="pager">
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                      </select>
                                    </div>
                                    <div className="pagesCount col-xs-6 col-sm-8 text-right">
                                      <nav aria-label="Page navigation">
                                        <ul className="pagination">
                                          <li>
                                            <a href="#" aria-label="Previous">
                                              <i aria-hidden="true" className="fa fa-caret-left" />
                                            </a>
                                          </li>
                                          <li><a href="#">1</a></li>
                                          <li className="totalPages">of 4</li>
                                          <li>
                                            <a href="#" aria-label="Next">
                                              <i aria-hidden="true" className="fa fa-caret-right" />
                                            </a>
                                          </li>
                                        </ul>
                                      </nav>
                                      <span className="numPage">Number of Pages:</span>
                                    </div>
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Reports */}
              <div className="tab-pane" id="reports">
                <div className="row reportFilter">
                  <div className="col-xs-6 col-sm-6 col-md-3">
                    <select className="form-control">
                      <option>Monthly Consumption Report</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-3">
                    <select className="form-control">
                      <option>Site</option>
                      <option>ABC</option>
                      <option>XYZ</option>
                      <option>MNO</option>
                      <option>PQR</option>
                    </select>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-3">
                    <ul className="timeFrame list-unstyled">
                      <li><a id="mainTimeFame" href="#v">Time Frame <i className="fa fa-clock-o" /></a>
                        <ul id="dropTim1" className="list-unstyled" style={{ display: 'none' }}>
                          <li><a id="rangeid" href="#v">Range <i className="fa fa-wifi" /></a>
                            <div id="dropDateRange" className="angecontainer" style={{ display: 'none' }}>
                              <div className="datepickwrap clearfix">
                                <input type="text" id="txtFromDate" placeholder="Start Date" className="hasDatepicker" />
                                <i className="fa fa-calendar" />
                              </div>
                              <div className="datepickwrap clearfix">
                                <input type="text" id="txtToDate" placeholder="End Date" className="hasDatepicker" />
                                <i className="fa fa-calendar" />
                              </div>
                            </div>
                          </li>
                          {/* <li><a id="monthId" href="#a">Monthly</a>
                                  <div id="dropMonth" class="angecontainer" style="display: none;">
                                    <select class="form-control">
                                      <option>January, 2018</option>
                                      <option>December, 2017</option>
                                      <option>November, 2017</option>
                                      <option>October, 2017</option>
                                      <option>Sepetember, 2017</option>
                                      <option>August, 2017</option>
                                      <option>July, 2017</option>
                                      <option>June, 2017</option>
                                      <option>May, 2017</option>
                                      <option>April, 2017</option>
                                      <option>March, 2017</option>
                                      <option>Febuary, 2017</option>
                                    </select>
                                  </div>
                                </li> */}
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-3">
                    <select className="form-control">
                      <option>Orderby</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>
                <div className="gapZeros withoutbg simpleTitleExport clearfix">
                  <div className="col-xs-8 col-sm-8 gapBZero">
                    {/* <label class="monthDate"><i class="fa fa-calendar-check-o"></i> January</label> */}
                  </div>
                  <div className="col-xs-4 col-sm-4 gapBZero">
                    <div className="exportIcon text-right">
                      <a className="btn btnExport" href="#"> Export <i className="fa fa-file-excel-o" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="OuterTables">
                      <div className="table-responsive">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th width={80}>Property Type</th>
                              <th width={80}>Consumer#</th>
                              <th width={280}>Owner Name</th>
                              <th width={80}>Address</th>
                              <th width={80}>Pincode</th>
                              <th width={150}>Meter Id</th>
                              <th width={220}>Meter Type</th>
                              <th width={250}>From Date</th>
                              <th width={250}>To Date</th>
                              <th width={140}>Opening Reading</th>
                              <th width={140}>Closing Reading </th>
                              <th width={100}>Initial Adjustment</th>
                              <th width={150}>Total Consumption</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Apartment</td>
                              <td>123</td>
                              <td>Mr.ABC</td>
                              <td>B-201</td>
                              <td>110011</td>
                              <td>2234</td>
                              <td>Phase 1</td>
                              <td>12-12-2017</td>
                              <td>18-12-2017</td>
                              <td>123</td>
                              <td>345</td>
                              <td>ABC</td>
                              <td>32 KWH</td>
                            </tr>
                            <tr>
                              <td>Apartment</td>
                              <td>234</td>
                              <td>Mr.CVB</td>
                              <td>B-278</td>
                              <td>110091</td>
                              <td>2334</td>
                              <td>Phase 3</td>
                              <td>12-12-2017</td>
                              <td>18-12-2017</td>
                              <td>123</td>
                              <td>785</td>
                              <td>XYZ</td>
                              <td>22 KWH</td>
                            </tr>
                            <tr>
                              <td>Apartment</td>
                              <td>167</td>
                              <td>Mr.ABC</td>
                              <td>B-201</td>
                              <td>110011</td>
                              <td>2284</td>
                              <td>Phase 3</td>
                              <td>12-12-2017</td>
                              <td>18-12-2017</td>
                              <td>123</td>
                              <td>985</td>
                              <td>ABC</td>
                              <td>11 KWH</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={13} className="paginationWrap">
                                <div className="numberPages col-xs-6 col-sm-4 text-left">
                                  <span>Number of Entries:</span>
                                  <select name="page_size" className="pager">
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                  </select>
                                </div>
                                <div className="pagesCount col-xs-6 col-sm-8 text-right">
                                  <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                      <li>
                                        <a href="#" aria-label="Previous">
                                          <i aria-hidden="true" className="fa fa-caret-left" />
                                        </a>
                                      </li>
                                      <li><a href="#">1</a></li>
                                      <li className="totalPages">of 4</li>
                                      <li>
                                        <a href="#" aria-label="Next">
                                          <i aria-hidden="true" className="fa fa-caret-right" />
                                        </a>
                                      </li>
                                    </ul>
                                  </nav>
                                  <span className="numPage">Number of Pages:</span>
                                </div>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Analytics */}
              <div className="tab-pane" id="analytics">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    authentications: state.authentications,
    searchData: state.dashboard.searchData,
    deviceChartData: state.dashboard.deviceChartData,
    labelValue: state.dashboard.labelValue,
    loadProfileChartData: state.dashboard.loadProfileChartData
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      search: search
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
