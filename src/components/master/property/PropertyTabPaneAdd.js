import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm, getFormMeta } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import InputText  from '../../form/InputText';
import InputHidden  from '../../form/InputHidden';
import InputCheckBox from '../../form/InputCheckBox';
import InputSelect  from '../../form/InputSelect';
import { addSubmit, propertyTypeChanged,registerLocationHierarchyValues,selfOccupiedChanged } from '../../../actions/master/property';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';

class PropertyTabPaneAdd extends Component {
  constructor(props) {
    super(props);
    this.addSubmit = this.addSubmit.bind(this);
  }

  addSubmit(values){
    const {addSubmit} = this.props;
    const {resetForm} = this;
    const {initializer} = this.props;
    if (!values.is_active) {
      values.is_active=false;
    }
    if (!values.is_self_occupied) {
      values.is_self_occupied=false;
    }
    if(values.is_self_occupied) {
      values.occupant_emailid = values.owner_emailid;
      values.occupant_name = values.owner_name;
      values.occupant_phone = values.owner_phone;
    }

    var locationValues = {};
    for(var cnt in this.props.hierarchy) {
      //console.log(cnt);
      locationValues["locationvalues_"+this.props.hierarchy[cnt].nodeKey] = values["locationvalues_"+this.props.hierarchy[cnt].nodeKey];
    }
    values['location_values']=locationValues;
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
  showHierarchy() {
    const maxLength = max => value =>
      value && value.length > max && `Shouldnot be longer than ${ max }` || undefined;
    const required = value => value ? undefined : 'Required'

    if(this.props.hierarchy) {
    return _.map(this.props.hierarchy, data => {
      return (
        <Field key={data.nodeKey} name={"locationvalues_"+data.nodeKey} validate={[required]} autoComplete="off" className="form-control" placeholder={data.name} label={data.name} maxLength="500" component={InputText}/>
      );
    });
    }
  }
  propertyTypeChanged(propertyTypeId) {
    this.props.propertyTypeChanged(propertyTypeId);
    setTimeout(()=>{
      var nodeKeys = [];
      for(var cnt in this.props.hierarchy) {
        nodeKeys.push("locationvalues_"+this.props.hierarchy[cnt].nodeKey);
      }
      this.props.registerLocationHierarchyValues(nodeKeys);

    },50);
  }
  initHierarchyValues(){

  }
  selfOccupiedChange(event) {
    console.log(event.target.checked);
    this.props.selfOccupiedChanged(event.target.checked);
  }
  render(){
    const { handleSubmit,submitting, pristine, reset } = this.props;

      return (
  				<div className={this.props.className} id="siteList1">
            {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="Property"/>}
            {this.props.showErrorCommand && <ErrorMessage errorMsg={this.props.errorMsg} entityName="Property"/>}
            <form name="masterAdd" className="formHorizontal" onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))} className="authnflds" id="addUser" acceptCharset="utf-8">
            <div className="row">
            <div className="col-xs-12">
              <div className="custAddForm siteAddCust">
                  <div className="formContainer">
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper formWraper1">
                        <Field name="property_type_id" onChange2={(value)=>this.propertyTypeChanged(value)} options={this.props.propTypeOptions} className="form-control" placeholder="Property Type Id" label="Property Type" maxLength="500" component={InputSelect}/>
                        <Field name="is_active" autoComplete="off" label="IsActive" maxLength="500" component={InputCheckBox}/>
                        {this.showHierarchy()}
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <div className="formWraper formWraper1">
                        <Field name="owner_name" autoComplete="off" className="form-control" placeholder="Owner Name" label="Owner Name" maxLength="500" component={InputText}/>
                        <Field name="owner_emailid" autoComplete="off" className="form-control" placeholder="Owner Email Id" label="Owner Email Id" maxLength="500" component={InputText}/>
                        <Field name="owner_phone" autoComplete="off" className="form-control" placeholder="Owner Phone" label="Owner Phone" maxLength="500" component={InputText}/>

                        <Field name="is_self_occupied" autoComplete="off" label="Self-Occupied" maxLength="500" component={InputCheckBox} onChange={(val)=>this.selfOccupiedChange(val)}/>

                        <Field name="occupant_name" disabled={this.props.isSelfOccupied} autoComplete="off" className="form-control" placeholder="Occupant Name" label="Occupant Name" maxLength="500" component={InputText}/>
                        <Field name="occupant_emailid" disabled={this.props.isSelfOccupied} autoComplete="off" className="form-control" placeholder="Occupant Email Id" label="Occupant Email Id" maxLength="500" component={InputText}/>
                        <Field name="occupant_phone" disabled={this.props.isSelfOccupied} autoComplete="off" className="form-control" placeholder="Occupant Phone" label="Occupant Phone" maxLength="500" component={InputText}/>
                  			<div className="form-group">
                  			    <label htmlFor="cust24" className="col-sm-4 control-label"></label>
                  			    <div className="col-sm-8">
                  				    <div className="saveButtons">
                                <input className="btn btn-primary" defaultValue="Save" type="submit" disabled={submitting}/>
                                <input className="btn btn-warning"  disabled={pristine || submitting} onClick={reset} defaultValue="Reset" type="reset"/>
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
      propTypeOptions: state.property_type.propTypeOptions,
      addResponse: state.property.addResponse,
      propertyProfileOptions:state.property.propertyProfileOptions,
      showErrorCommand:state.property.showErrorCommand,
      errorMsg:state.property.errorMsg,
      hierarchy:state.property.hierarchy,
      isSelfOccupied:state.property.isSelfOccupied
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSubmit:addSubmit,
      propertyTypeChanged:propertyTypeChanged,
      registerLocationHierarchyValues:registerLocationHierarchyValues,
      selfOccupiedChanged:selfOccupiedChanged
    },dispatch);
}
function validate(values) {

  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

				  if (!values.owner_emailid) {
				    errors.owner_emailid = 'Enter Owner Email Id';
				  }

				  if (!values.owner_name) {
				    errors.owner_name = 'Enter Owner Name';
				  }
				  if (!values.owner_phone) {
				    errors.owner_phone = 'Enter Owner Phone';
				  }
				  if (!values.property_type_id) {
				    errors.property_type_id = 'Enter Property Type Id';
				  }
          if(!values.is_self_occupied) {
  				  if (!values.occupant_emailid) {
  				    errors.occupant_emailid = 'Enter Occupant Email Id';
  				  }
  				  if (!values.occupant_name) {
  				    errors.occupant_name = 'Enter Occupant Name';
  				  }
  				  if (!values.occupant_phone) {
  				    errors.occupant_phone = 'Enter Occupant Phone';
  				  }
          }

  return errors;
}
export default reduxForm({
  validate,
  form: 'PropertyTabPaneAdd'
})(
  connect(mapStateToProps, mapDispatchToProps)(PropertyTabPaneAdd)
);
