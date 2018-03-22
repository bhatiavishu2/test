import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import LeftView from '../../components/layout/left';
import RightDropDown from '../../components/layout/right_dropdown';
import { bindActionCreators} from 'redux';

class HeaderView extends Component {

  render(){
    if(!this.props.authentications.userAuthenticated) {
      return (<div/>);
    }
    return(
      <nav className="navbar navbar-default navbar-static-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="index.html"><img src="/images/tata-communication.png" className="img-responsive" alt="Tata Communication" width="633" height="44"/></a>
        </div>
        <ul className="navbar-left hidden-xs">
          <li><a className="menu-brand" id="menu-toggle"><span className="ti-view-grid"></span></a></li>
        </ul>
        <ul className="navbar-left mainLinks frontDashTitle">
          <li>JUSCO UTILITY</li>
        </ul>
        <RightDropDown/>

        <div className="secondMenus pull-right frontDashDate">
          <label>{new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata',hour12:false, weekday:"short", year:"numeric",month:"short",day:"2-digit",second:"2-digit",hour:"2-digit",minute:"2-digit" })}</label>
        </div>

        <LeftView />
      </nav>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
      authentications: state.authentications,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderView);
