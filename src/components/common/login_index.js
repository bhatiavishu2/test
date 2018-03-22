import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { signIn,searchSites,searchCustomer,getRole } from '../../actions/authentications';
import { Redirect } from 'react-router'
import InputEmail from '../form/InputEmail';
import InputPwdWithoutLabel from '../form/InputPwdWithoutLabel';

class LoginIndex extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.signinSubmit = this.signinSubmit.bind(this);
  }



  signinSubmit(values) {
    this.props.signIn(values).then(() => {
      if(this.props.authentications.userAuth.user_summary.userType!=1) {
        const request = {
          q:"",
          pageNumber:0,
          pageSize:100000,
          sortBy:"createdDate",
          sortDirection:"desc"
        };
        this.props.searchCustomer(request).then(() => {;
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
  render(){
    const { handleSubmit } = this.props;

    if(this.props.userAuthenticated === true){
        if(this.props.authentications.userAuth.user_summary.userType==1) {
          return <Redirect to='/manage/customer'/>;
        } else {
          return <Redirect to='/dashboard'/>;
        }
    }
      return (
        <div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-sm-offset-2">
            <div className="loginLogoBar">
             <img src="/images/tata-communication.png" className="img-responsive" alt="Tata Communication" width="633" height="44"/>
            </div>
            <div className="page-titles OuterPageTitle outerLoginTitle clearfix">
      				<div className="col-md-9 align-self-center addCust">
      					<h3 className="text-themecolor">Login</h3>
      				</div>
            </div>
          </div>
  			</div>
        <div className="row">
        <form className="formHorizontal" onSubmit={handleSubmit(this.signinSubmit.bind(this))} className="authnflds" id="signinuser" acceptCharset="utf-8">
        <div className="col-xs-12">
          <div className="custAddForm">
              <div className="formContainer">
                <div className="col-xs-12 col-sm-6 col-sm-offset-2">
                  <div className="formWraper formWraperLogin">
                    <Field name="username" autoComplete="off" className="form-control" placeholder="Your Email ID" maxLength="500" component={InputEmail}/>
                    <Field name="password"   autoComplete="off" className="form-control" placeholder="Your Password" maxLength="50" component={InputPwdWithoutLabel}/>
                    <div className="form-group">
										    <div className="saveButtons text-right">
                          <div className="clearfix"></div>
                              { this.props.showLoginFailedMessage &&
                              <div className="col-md-12 error">
                                Invalid username or password.
                              </div>
                              }
										      	<input type="submit" className="btn btn-primary" defaultValue="Login"/>
										      	<input type="reset" className="btn btn-warning" defaultValue="Reset"/>
										    </div>
									    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        </form>
      </div>
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
      searchSites:searchSites,
      searchCustomer:searchCustomer,
      getRole:getRole
  },dispatch);
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
