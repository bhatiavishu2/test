import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { doInitiateAuth } from '../../actions/authentications';
import { bindActionCreators} from 'redux';


class InitiateStore extends Component {
  constructor(props) {
      super(props);
      // This binding is necessary to make `this` work in the callback
      this.initiateAuth = this.initiateAuth.bind(this);
  }
  render() {
    return <span/>
  }
  componentWillMount () {
      this.initiateAuth();
  }
  initiateAuth() {
    this.props.doInitiateAuth();
  }
}
//export default InitiateStore;
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doInitiateAuth: doInitiateAuth},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(InitiateStore);
