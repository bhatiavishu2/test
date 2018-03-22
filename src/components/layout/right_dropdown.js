import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

class RightDropDown extends Component {
  constructor (props) {
    super(props);

    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleLinkClick () {
    this.refs.dropdown.hide();
  }
  render() {
    return (
      <Dropdown className="nav navbar-top-links navbar-right" ref="dropdown">
          <DropdownTrigger className="dropdown dropdown-toggle">
          {
            /*<img src="/images/user.jpg" className="img-responsive img-circle" alt="user"/>*/
          }
          </DropdownTrigger>
          <DropdownContent>
          <div><Link to={`/signout`}><i className="fa fa-sign-out fa-fw"></i> Logout</Link>
          </div>
          </DropdownContent>
      </Dropdown>

    );
  }

}
export default RightDropDown;
