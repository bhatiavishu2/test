import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import InputHidden  from '../../form/InputHidden';
import InputText from '../../form/InputText';
import InputSelect  from '../../form/InputSelect';
import { addSubmit } from '../../../actions/master/property_location_type';
import { search } from '../../../actions/master/property_type';

import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';
import ShowHierarchy from './ShowHierarchy';

class PropertyLocationTypeTabPaneAdd extends Component {
  constructor(props) {
    super(props);
    this.addSubmit = this.addSubmit.bind(this);
  }
  componentWillMount() {
    this.initialiseList();
  }
  initialiseList() {
    const request = {
      q:"",
      pageNumber:0,
      pageSize:100000,
      sortBy:"name",
      sortDirection:"asc"
    };
    this.props.propertyTypeSearch(request).then(() => {

    });
  }

  addSubmit(values){
    const {addSubmit} = this.props;
    const {resetForm} = this;
    const {initializer} = this.props;
    if(!values.id && this.props.propertTypeFlatHierarchyMap && this.props.propertTypeFlatHierarchyMap[values.property_type_id] && this.props.propertTypeFlatHierarchyMap[values.property_type_id].length>0) {
      alert("Hierarchy Already Defined for the selected property type, please select property type to edit existing hierarchy in List Tab.");
      return;
    } else {
      if(this.props.propertTypeFlatHierarchyMap && this.props.propertTypeFlatHierarchyMap[values.property_type_id] && this.props.propertTypeFlatHierarchyMap[values.property_type_id].length>0 && this.props.selectedData["property_type_id"]!=values.property_type_id) {
        alert("Hierarchy Already Defined for the selected property type, please select property type to edit existing hierarchy in List Tab.");
        return;
      }
    }
    if(this.isAllFieldsFilled(this.props.hierarchy)===false) {
      alert("Please fill all levels of hierarchy");
      return;
    }
    values.hierarchy=this.props.hierarchy;
    values.is_active=true;
    return addSubmit(values).then(() => {
      resetForm();
      initializer();
      // do other success stuff
    });
  }

  isAllFieldsFilled(root) {
    if((root.name.trim())=="") {
      return false;
    }
    if(root.children && root.children.length>0) {
      for(var cnt=0;cnt<root.children.length;cnt++) {
        if(this.isAllFieldsFilled(root.children[cnt]) === false) {
          return false;
        }
      }
    }
    return true;
  }

  resetForm() {
    //alert("successfully saved");//show message in div from here
    //this.props.initializer();
  }
  renderHierarchy() {
    if(this.props.hierarchy) {
      return (
        this.renderRootHierarchy(this.props.hierarchy)
      );
    }

  }
  renderRootHierarchy(root) {
    if(!root.children) {
      return (
        <ShowHierarchy data={root} index={root.order_in_own_level} key={"s-"+root.level+"-"+root.order_in_own_level+"-0"}/>
      );
    } else {
      return (
        <li key={"swcli-"+root.level+"-"+root.order_in_own_level+"-"+root.path.length}><ul>
        <ShowHierarchy data={root} index={root.order_in_own_level} key={"swc-"+root.level+"-"+root.order_in_own_level+"-"+root.path.length}/>
        {this.renderChildrenHierarchy(root)}
        </ul>
        </li>
    );
    }
  }
  renderChildrenHierarchy(root) {
    if(root.children) {
    return _.map(root.children, (data,index) => {
      return (
        this.renderRootHierarchy(data)
      );
    });
    }

  }
  checkForExistingHierarchy(valueSelected) {
    if(this.props.propertTypeFlatHierarchyMap && this.props.propertTypeFlatHierarchyMap[valueSelected] && this.props.propertTypeFlatHierarchyMap[valueSelected].length>0) {
      alert("Hierarchy Already Defined for the selected property type, please select property type to edit existing hierarchy in List Tab.");
    }
  }
  componentDidUpdate(prevProps, prevState) {
    //this.forceUpdate();
  }
  render(){
    const { handleSubmit } = this.props;

      return (
  				<div className={this.props.className} id="siteList1">
            {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="PropertyLocationType"/>}
            {this.props.showErrorCommand && <ErrorMessage errorMsg={this.props.errorMsg} entityName="PropertyLocationType"/>}
            <form name="masterAdd" className="formHorizontal" onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))} className="authnflds" id="addUser" acceptCharset="utf-8">
            <div className="row">
            <div className="col-xs-12">
              <div className="custAddForm siteAddCust">
                  <div className="formContainer">
                    <div className="col-xs-12 col-sm-12">
                      <div className="formWraper formWraper1">
                        <div className="clearfix fixPropertyType">
                          <div className="col-sm-10 hireriyPop">
                            <Field name="property_type_id" onChange2={(value)=>this.checkForExistingHierarchy(value)} options={this.props.propTypeOptions} className="form-control" placeholder="Property Type" label="Property Type" maxLength="500" component={InputSelect}/>
                          </div>
                        </div>
                        <div className="expandHiearchy">
                        <ul className="nav heirarchyTabs" id="heirarchyTabs">
                          {this.renderHierarchy()}
                        </ul>
                        <div className="saveHierh">
                          <div className="saveButtons text-right">
                            <input className="btn btn-primary" defaultValue="Save" type="submit"/>
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
      propTypeOptions: state.property_type.propTypeOptions,
      addResponse: state.property_location_type.addResponse,
      property_location_typeProfileOptions:state.property_location_type.property_location_typeProfileOptions,
      showErrorCommand:state.property_location_type.showErrorCommand,
      errorMsg:state.property_location_type.errorMsg,
      hierarchy:state.property_location_type.hierarchy,
      initialValues:state.property_location_type.hierarchy,
      propertTypeFlatHierarchyMap:state.property_location_type.propertTypeFlatHierarchyMap,
      selectedData:state.property_location_type.selectedData
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSubmit:addSubmit,
      propertyTypeSearch:search
    },dispatch);
}
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};
  if (!values.property_type_id) {
    errors.property_type_id = 'Enter PROPERTY TYPE ID';
  }
  return errors;
}
export default reduxForm({
  validate,
  form: 'PropertyLocationTypeTabPaneAdd'
})(
  connect(mapStateToProps, mapDispatchToProps)(PropertyLocationTypeTabPaneAdd)
);
