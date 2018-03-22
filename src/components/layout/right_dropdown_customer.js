import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import InputSelect  from '../form/InputSelect';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';

import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { switchBackToAdmin } from '../../actions/authentications';

class RightDropDownCustomer extends Component {

  menuOptions = [{label:"Manage Customer",value:"/manage/customer"},
                  {label:"Manage Site",value:"/manage/site"}];
  constructor (props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.menuSelected = this.menuSelected.bind(this);
    this.switchBackToAdmin =  this.switchBackToAdmin.bind(this);
  }
  menuSelected(menu) {
    //console.log(this.props);
    this.props.history.push(menu);
  }
  handleLinkClick () {
    this.refs.dropdown.hide();
  }
  switchBackToAdmin() {
    this.props.switchBackToAdmin();
    this.props.history.push("/manage/customer");
  }
  render() {
    return (
      <ul className="nav navbar-top-links navbar-right">
          {this.props.authentications.switchBackToAdmin && <li className="dropdown">
            <a href="#" onClick={()=>this.switchBackToAdmin()}>Switch Back To Admin</a>
          </li>}
          <li className="dropdown mainMenuContainer">
            <form name="mainMenu"  className="formHorizontal authnflds">
              {this.props.authentications && this.props.authentications.userRole && this.props.authentications.userRole.manage_actions &&
                <Field name="manage_menu" options={this.props.authentications.userRole.manage_actions} searchable={false} className="form-control" placeholder="Manage" label="" maxLength="500" component={InputSelect} onChange2={(value)=>this.menuSelected(value)}/>}
            </form>
          </li>
					<li className="dropdown">
						<a className="dropdown-toggle notification-show" data-toggle="dropdown" href="#">
							<i className="ti-bell"></i>
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
									<strong>See All Tasks</strong>
									<i className="fa fa-angle-right"></i>
								</a>
							</li>
						</ul>
					</li>
          <li>
            {/*<Link to="/manage/devices">Manage Device</Link>*/}
          </li>
					<li className="dropdown">
						<Link to={`/signout`}><i className="fa fa-sign-out fa-fw"></i> Logout</Link>
					</li>

      </ul>
    );
  }

}
function mapStateToProps(state) {
  //console.log(state);
  return {
      authentications: state.authentications

  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      switchBackToAdmin:switchBackToAdmin
    },dispatch);
}
export default reduxForm({
  form: 'mainMenu',
  enableReinitialize: true,

})(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(RightDropDownCustomer))
);
