import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators} from 'redux';

class FooterView extends Component {
render() {
  if(!this.props.authentications.userAuthenticated) {
    return (<div/>);
  }
  return (
    <footer className="footer">
     Copyrights &copy; Tata Communications. All rights Reserved.
    </footer>
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
export default connect(mapStateToProps, mapDispatchToProps)(FooterView);
