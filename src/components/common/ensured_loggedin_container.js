import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { signOut } from '../../actions/authentications';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router'


class EnsureLoggedInContainer extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    if(this.props.userAuthenticated === true){
        return <Redirect to='/dashboard'/>;
    } else {
      return <Redirect to='/'/>;
    }
  }
  componentDidMount () {
    if (!this.props.userAuthenticated) {
     // set the current url/path for future redirection (we use a Redux action)
     // then redirect (we use a React Router method)
     dispatch(setRedirectUrl(this.props.currentURL))
     browserHistory.replace("/")
   }
  }
}
//export default InitiateStore;
function mapStateToProps(state) {
  return {
    userAuthenticated: state.authentications.userAuthenticated,
    currentURL: ownProps.location.pathname
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({signOut: signOut},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EnsureLoggedInContainer);
