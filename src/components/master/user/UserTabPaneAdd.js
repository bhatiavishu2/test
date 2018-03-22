import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import InputText  from '../../form/InputText';
import InputHidden  from '../../form/InputHidden';
import InputPwd  from '../../form/InputPwd';
import InputCheckBox from '../../form/InputCheckBox';
import InputSelect  from '../../form/InputSelect';
import InputMultiSelect  from '../../form/InputMultiSelect';
import { addSubmit, changeUserTypeInDropDown, getCustomers } from '../../../actions/master/user';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';

class UserTabPaneAdd extends Component {

  userTypeOptions = [];
  changeUserTypeInDropDown = null;
  constructor(props) {
    super(props);
    this.addSubmit = this.addSubmit.bind(this);
    const { changeUserTypeInDropDown } = this.props;
  }
  componentWillMount() {
    //this.props.getCustomers(()=>{});
  }
  componentDidMount() {
    switch(this.props.authentications.userAuth.user_summary.userType) {
      case 1:
        this.userTypeOptions = [{label:"TCL User",value:1},{label:"Customer User",value:2}]
        break;
      case 2:
        this.userTypeOptions = [{label:"Customer User",value:2},{label:"Site User",value:3}];
        break;
      case 3:
        this.userTypeOptions = [{label:"Site User",value:3}];
        break;
    }
  }
  addSubmit(values){
    const {addSubmit} = this.props;
    const {resetForm} = this;
    const {initializer} = this.props;
    if (!values.is_active) {
      values.is_active=false;
    }
    values.user_name=values.emailid;
    //console.log(values);
    return addSubmit(values).then(() => {
      resetForm();
      initializer();
      // do other success stuff
    });
  }
  resetForm() {
    alert("successfully saved");//show message in div from here
    //this.props.initializer();
  }


  render(){
    const { handleSubmit,submitting } = this.props;

      return (
  				<div className={this.props.className} id="siteList1">
            {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="User"/>}
            {this.props.showErrorCommand && <ErrorMessage errorMsg={this.props.errorMsg} entityName="User"/>}
            <form name="masterAdd" className="formHorizontal" onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))} className="authnflds" id="addUser" acceptCharset="utf-8">
            <div className="row">
            <div className="col-xs-12">
              <div className="custAddForm siteAddCust">
                  <div className="formContainer">
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper formWraper1">
                        <Field name="user_type" options={this.userTypeOptions} searchable={false} className="form-control" placeholder="User Type" label="User Type" maxLength="500" component={InputSelect} onChange2={(value)=>this.props.changeUserTypeInDropDown({userTypeId:value},()=>{})}/>
                        <Field name="role_id" options={this.props.roleOptions} searchable={false} className="form-control" placeholder="Role" label="Role" component={InputSelect} />
                        {this.props.userTypeSelected==2 && <Field name="customer_id" options={this.props.customerOptions} searchable={false} className="form-control" placeholder="Customer" label="Customer" component={InputSelect} />}
                        {this.props.userTypeSelected==3 && <Field name="site_id" options={this.props.siteOptions} searchable={false} className="form-control" placeholder="Site" label="Site" component={InputMultiSelect}  multiSelect={true}/>}
                        <Field name="first_name" autoComplete="off" className="form-control" placeholder="First Name" label="First Name" maxLength="500" component={InputText}/>
                        <Field name="middle_name" autoComplete="off" className="form-control" placeholder="Middle Name" label="Middle Name" maxLength="500" component={InputText}/>
                        <Field name="last_name" autoComplete="off" className="form-control" placeholder="Last Name" label="Last Name" maxLength="500" component={InputText}/>
                        <Field name="emailid" autoComplete="off" className="form-control" placeholder="Email Id" label="Email Id" maxLength="500" component={InputText}/>
                        <Field name="phone" autoComplete="off" className="form-control" placeholder="Phone" label="Phone" maxLength="500" component={InputText}/>
                        {this.props.showDetailsModal===false && <Field name="pwd" autoComplete="off" className="form-control" placeholder="Password" label="Password" maxLength="500" component={InputPwd}/>}
                        <Field name="is_active" autoComplete="off" label="IsActive" maxLength="500" component={InputCheckBox}/>

                        <div className="form-group BtnGroups">
                          <label htmlFor="cust24" className="col-sm-4 control-label"></label>
                          <div className="col-sm-8">
                            <div className="saveButtons">
                              <input className="btn btn-primary" defaultValue="Save" type="submit" disabled={submitting}/>
                              <input className="btn btn-warning" defaultValue="Reset" type="reset"/>
                            </div>
                          </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </form>
  				</div>
      );
  }
}
function mapStateToProps(state) {
  //console.log(state);
  return {
      authentications: state.authentications,
      user_profiles: state.user.user_profiles,
      addResponse: state.user.addResponse,
      showErrorCommand:state.user.showErrorCommand,
      errorMsg:state.user.errorMsg,
      userTypeSelected:state.user.userTypeSelected,
      roleOptions:state.user.roleOptions,
      customerOptions:state.user.customerOptions,
      showDetailsModal:state.user.showDetailsModal,
      siteOptions:state.user.siteOptions
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSubmit:addSubmit,
      changeUserTypeInDropDown:changeUserTypeInDropDown,
      getCustomers:getCustomers
    },dispatch);
}
function validate(values) {
  const errors = {};
  if (!values.user_name) {
    errors.user_name = 'Enter User Name';
  }
  if (!values.user_type) {
    errors.user_type = 'Select User Type';
  }
  if (!values.last_name) {
    errors.last_name = 'Enter Last Name';
  }
  if (!values.emailid) {
    errors.emailid = 'Enter Email Id';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailid)) {
    errors.emailid = 'Invalid email address';
  }
  if (!values.middle_name) {
    errors.middle_name = 'Enter Middle Name';
  }
  if (!values.phone) {
    errors.phone = 'Enter Phone';
  }
  if (!values.role_id) {
    errors.role_id = 'Select Role ';
  }
  if ((!values.id || values.id=='') && !values.pwd) {
    errors.pwd = 'Enter Passowrd';
  } else if((!values.id || values.id=='') && values.pwd.length<8) {
    errors.pwd='Length Of Password should be between 8 and 19';
  }
  if (!values.first_name) {
    errors.first_name = 'Enter First Name';
  }
  if(values.user_type=="2" && !values.customer_id) {
    errors.customer_id='Select Customer'
  }
  return errors;
}
export default reduxForm({
  validate,
  form: 'UserTabPaneAdd',
  enableReinitialize: true,

})(
  connect(mapStateToProps, mapDispatchToProps)(UserTabPaneAdd)
);
