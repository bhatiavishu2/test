import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import LeftCustomerView from '../../components/layout/left_customer';
import RightDropDownCustomer from '../../components/layout/right_dropdown_customer';
import { bindActionCreators } from 'redux';
import { changeDeviceTypeSelectionInHeader } from '../../actions/authentications';

class HeaderCustomerView extends Component {
  renderTopDeviceTypeTabClass(tabName) {
    if (tabName == 'Energy' && (this.props.authentications.selectedDeviceTypeInHeader == 'ENERGY-PHASE1' || this.props.authentications.selectedDeviceTypeInHeader == 'ENERGY-PHASE3')) {
      return "activeMain";
    }
    if (tabName == 'Gas' && this.props.authentications.selectedDeviceTypeInHeader == 'GAS') {
      return "activeMain";
    }
    if (tabName == 'Water' && this.props.authentications.selectedDeviceTypeInHeader == 'WATER') {
      return "activeMain";
    }
    return "";
  }

  hasDeviceTypeAccess(deviceTypeId) {
    if (!this.props.authentications || !this.props.authentications.selectedCustomer || !this.props.authentications.selectedCustomer.device_type_ids) {
      return false;
    }
    const deviceTypes = this.props.authentications.selectedCustomer.device_type_ids;
    for (var count = 0; count < deviceTypes.length; count++) {
      if (deviceTypes[count] == deviceTypeId) {
        return true;
      }
    }
    return false;
  }
  changeDeviceTypeSelectionInHeader(values) {
    const { changeDeviceTypeSelectionInHeader } = this.props;
    changeDeviceTypeSelectionInHeader(values);
    setTimeout(this.reloadMe, 100);
  }
  reloadMe() {
    window.location.reload();
  }

  render() {
    const currentPageName = window.location.pathname;
    if (!this.props.authentications.userAuthenticated) {
      return (<div />);
    }
    return (
      <nav className="navbar navbar-default navbar-static-top" style={{ marginBottom: 0 }}>
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="/"><img src="/images/tata-communication.png" className="img-responsive" alt="Tata Communication" width={633} height={44} /></a>
        </div>
        {/* /.navbar-header */}
        <ul className="navbar-left mainLinks">
          <li className="dropMobileMenu">
            <a id="toggleManage" href="#" className="btn btn-lg toggle">
              <i className="spin ti-settings" /> Manage
            </a>
          </li>
          <ul className="mobileSwip">
            <li><Link to={`/manage/site`}><i className="fa fa-map-marker" /> Site</Link></li>
            <li><Link to={`/manage/hierarchy`}><i className="fa fa-sitemap" /> Hierarchy</Link></li>
            <li><Link to={`/manage/property`}><i className="fa fa-building-o" /> Property</Link></li>
            <li><Link to={`/manage/role`}><i className="fa fa-user" /> Roles</Link></li>
            <li><Link to={`/manage/user`}><i className="fa fa-users" /> Users</Link></li>
            <li><Link to={`/manage/device_profile`}><i className="fa fa-calculator" /> Device Profile</Link></li>
          </ul>
        </ul>
        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle notification-show" data-toggle="dropdown" href="#">
              <i className="ti-bell" />
              <span className="task-notify noti-count">7</span>
            </a>
            <ul className="task dropdown-menu dropdown-tasks right-swip">
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
                  <strong>See All Notifications</strong>
                  <i className="fa fa-angle-right" />
                </a>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a className="dropdown-toggle iconDownUp" data-toggle="dropdown" href="#">
              <strong className="userNameTop">Ashwin<span>{`${this.props.authentications.userAuth.user_summary.firstName} ${this.props.authentications.userAuth.user_summary.lastName}`}</span></strong>
            </a>
            <ul className="dropdown-menu dropdown-user right-swip">
              <li><a href="#"><i className="fa fa-user fa-fw" /> User Profile</a></li>
              <li><Link to={`/signout`}><i className="fa fa-sign-out fa-fw"></i> Logout</Link></li>
            </ul>
          </li>
        </ul>
        {/* Sidebar Navigation */}
        <div className="navbar-default sidebar" role="navigation">
          <div className="sidebar-nav navbar-collapse">
            {/* <ul class="nav leftSearch header-search-form">
							<li class="hidden-sm hidden-xs">
								<div class="header-search-form input-group">
									<input type="text" class="form-control" placeholder="Search & Enter">
									<span class="input-group-addon" id="searcAll"><span class="ti-search"></span></span>
								</div>
							</li>
						</ul> */}
            <div className="customerListName">
              <ul>
                <li><i className="fa fa-map-pin" /> Customer Id: 001</li>
                <li><i className="fa fa-user-o" /> Customer Name: Jusco</li>
              </ul>
            </div>
            <ul className="nav" id="side-menu1">
              <li>
                <div className="dropIconn">
                  <i className="fa fa-map-marker" />
                  <a href="index.html">Site 1</a>
                  <span className="fa fa-plus" />
                </div>
                <ul className="nav nav-second-level" style={{ display: 'none' }}>
                  <li>
                    <div className="dropIconn">
                      <span className="fa fa-plus" />
                      <a href="index.html"><i className="fa fa-building-o" /> Apartment</a>
                    </div>
                    <ul className="nav nav-third-level" style={{ display: 'none' }}>
                      <li><a href="index.html">- Apartment 1</a></li>
                      <li><a href="index.html">- Apartment 2</a></li>
                    </ul>
                  </li>
                  <li>
                    <div className="dropIconn">
                      <span className="fa fa-plus" />
                      <a href="index.html"><i className="fa fa-building" /> Building</a>
                    </div>
                    <ul className="nav nav-third-level" style={{ display: 'none' }}>
                      <li><a href="index.html">- Building 1</a></li>
                      <li><a href="index.html">- Building 2</a></li>
                      <li><a href="index.html">- Building 3</a></li>
                    </ul>
                  </li>
                  <li>
                    <div className="dropIconn">
                      <span className="fa fa-plus" />
                      <a href="index.html"><i className="fa fa-university" /> ClubHouse/Hospital</a>
                    </div>
                    <ul className="nav nav-third-level" style={{ display: 'none' }}>
                      <li><a href="index.html">- ClubHouse 1</a></li>
                      <li><a href="index.html">- Clubhouse 2</a></li>
                      <li><a href="index.html">- Clubhouse 3</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <div className="dropIconn">
                  <i className="fa fa-map-marker" />
                  <a href="index.html">Site 2</a>
                  <span className="fa fa-plus" />
                </div>
                <ul className="nav nav-second-level" style={{ display: 'none' }}>
                  <li>
                    <div className="dropIconn">
                      <span className="fa fa-plus" />
                      <a href="index.html"><i className="fa fa-building-o" /> Apartment</a>
                    </div>
                    <ul className="nav nav-third-level" style={{ display: 'none' }}>
                      <li><a href="index.html">- Apartment 1</a></li>
                      <li><a href="index.html">- Apartment 2</a></li>
                    </ul>
                  </li>
                  <li>
                    <div className="dropIconn">
                      <span className="fa fa-plus" />
                      <a href="index.html"><i className="fa fa-building" /> Building</a>
                    </div>
                    <ul className="nav nav-third-level" style={{ display: 'none' }}>
                      <li><a href="index.html">- Building 1</a></li>
                      <li><a href="index.html">- Building 2</a></li>
                      <li><a href="index.html">- Building 3</a></li>
                    </ul>
                  </li>
                  <li>
                    <div className="dropIconn">
                      <span className="fa fa-plus" />
                      <a href="index.html"><i className="fa fa-university" /> ClubHouse/Hospital</a>
                    </div>
                    <ul className="nav nav-third-level" style={{ display: 'none' }}>
                      <li><a href="index.html">- ClubHouse 1</a></li>
                      <li><a href="index.html">- Clubhouse 2</a></li>
                      <li><a href="index.html">- Clubhouse 3</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <div className="dropIconn">
                  <i className="fa fa-map-marker" />
                  <a href="index.html">Site 3</a>
                  <span className="fa fa-plus" />
                </div>
                <ul className="nav nav-second-level" style={{ display: 'none' }}>
                  <li>
                    <div className="dropIconn">
                      <span className="fa fa-plus" />
                      <a href="index.html"><i className="fa fa-building-o" /> Apartment</a>
                    </div>
                    <ul className="nav nav-third-level" style={{ display: 'none' }}>
                      <li><a href="index.html">- Apartment 1</a></li>
                      <li><a href="index.html">- Apartment 2</a></li>
                    </ul>
                  </li>
                  <li>
                    <div className="dropIconn">
                      <span className="fa fa-plus" />
                      <a href="index.html"><i className="fa fa-building" /> Building</a>
                    </div>
                    <ul className="nav nav-third-level" style={{ display: 'none' }}>
                      <li><a href="index.html">- Building 1</a></li>
                      <li><a href="index.html">- Building 2</a></li>
                      <li><a href="index.html">- Building 3</a></li>
                    </ul>
                  </li>
                  <li>
                    <div className="dropIconn">
                      <span className="fa fa-plus" />
                      <a href="index.html"><i className="fa fa-university" /> ClubHouse/Hospital</a>
                    </div>
                    <ul className="nav nav-third-level" style={{ display: 'none' }}>
                      <li><a href="index.html">- ClubHouse 1</a></li>
                      <li><a href="index.html">- Clubhouse 2</a></li>
                      <li><a href="index.html">- Clubhouse 3</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {/* /.sidebar-collapse */}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    authentications: state.authentications,
    time_series_device_type: (state.timeseries && state.timeseries.data && state.timeseries.data.data) ? state.timeseries.data.data.deviceTypeLabel : ""
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeDeviceTypeSelectionInHeader: changeDeviceTypeSelectionInHeader }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderCustomerView);
