import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { signOut } from '../../actions/authentications';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router'


class SignOut extends Component {
  constructor(props) {
      super(props);
      // This binding is necessary to make `this` work in the callback
      this.initiateAuth = this.initiateAuth.bind(this);
  }
  render() {
    return <Redirect to='/'/>;
  }
  componentDidMount () {
      this.initiateAuth();
  }
  initiateAuth() {
    this.props.signOut();
  }
}
//export default InitiateStore;
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({signOut: signOut},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
