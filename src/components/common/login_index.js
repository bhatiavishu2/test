import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { signIn, searchSites, searchCustomer, getRole } from '../../actions/authentications';
import { Redirect } from 'react-router'
import InputEmail from '../form/InputEmail';
import InputPwd from '../form/InputPwd';

class LoginIndex extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.signinSubmit = this.signinSubmit.bind(this);
  }



  signinSubmit(values) {
    this.props.signIn(values).then(() => {
      if (this.props.authentications.userAuth.user_summary.userType != 1) {
        const request = {
          q: "",
          pageNumber: 0,
          pageSize: 100000,
          sortBy: "createdDate",
          sortDirection: "desc"
        };
        this.props.searchCustomer(request).then(() => {
          ;
          this.props.searchSites(request);
          this.props.getRole(this.props.authentications.userAuth.user_summary.roleId);
        });
      }

    });
  }
  renderEmailField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input type="email" autoComplete="off" className="form-control" placeholder="Your Email ID" maxLength="500"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  renderPwdField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input autoComplete="off" className="form-control" placeholder="Your Password" maxLength="50" type="password"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  render() {
    const { handleSubmit } = this.props;

    if (this.props.userAuthenticated === true) {
      if (this.props.authentications.userAuth.user_summary.userType == 1) {
        return <Redirect to='/manage/customer' />;
      } else {
        return <Redirect to='/dashboard' />;
      }
    }
    return (
      <div className="loginWrap">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-md-9 col-sm-8 col-xs-12 p-l-0 mobileWelcome">
              <div className="l-detail">
                {/* <h5>Welcome</h5> */}
                <img src="/images/tata-login-logo.png" className="img-responsive" alt="Tata Communication" width={550} height={41} />
                <h3>Smart Metering Application</h3>
              </div>
            </div>
            <div className="col-md-3 col-sm-4 col-xs-12 p-r-0">
              <div className="card position">
                <div className="cardWrapInner">
                  <h4 className="l-login">Login</h4>
                  <form className="loginForm" onSubmit={handleSubmit(this.signinSubmit.bind(this))} >
                    <Field name="username" autoComplete="off" className="form-control" label="Username" maxLength="500" component={InputEmail} />
                    <Field name="password" autoComplete="off" className="form-control" maxLength="50" label="Password" component={InputPwd} />
                    <div className="form-label">
                      <label htmlFor="rememberme" className="rememberPass">
                        <input type="checkbox" name="rememberme" id="rememberme" />
                        Remember Me
                      </label>
                    </div>
                    {this.props.showLoginFailedMessage &&
                      <div className="col-md-12 error">
                        Invalid username or password.
                              </div>
                    }
                    <input className="btn btn-primary" value="Login" type="submit"/>
                    <div className="forgotPassword text-left"><a href="#">Forgot Password?</a></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="instance1"><canvas width={1322} height={600} /></div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  //console.log(state);
  return {
    authentications: state.authentications,
    userAuthenticated: state.authentications.userAuthenticated,
    showLoginFailedMessage: state.authentications.showLoginFailedMessage,
    popover: 'popover',
    tooltip: 'tooltip'
    //showModal:this.state.showModal,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signIn: signIn,
      searchSites: searchSites,
      searchCustomer: searchCustomer,
      getRole: getRole
    }, dispatch);
}
//export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.username) {
    errors.username = "Enter email id";
  }
  if (!values.password) {
    errors.password = 'Enter Password';
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}
export default reduxForm({
  validate,
  form: 'LoginIndex'
})(
  connect(mapStateToProps, mapDispatchToProps)(LoginIndex)
  );
