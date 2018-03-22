import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { doOpenDetailsModal,addNewRow,changeTextInHierachy,removeRow } from '../../../actions/master/property_location_type';
import { bindActionCreators} from 'redux';
import InputHierarchyText  from '../../form/InputHierarchyText';
import { Field } from 'redux-form';

class ShowHierarchy extends Component{

  handleChangeText = (level,order_in_own_level,path) => (evt)=> {
    this.props.changeTextInHierachy({path:path,name:evt.target.value});
  };

  addNewRow = (level,order_in_own_level,parentPath) => (evt) => {
    this.props.addNewRow({name:'',level:level+1,order_in_own_level:0,parentPath:parentPath});
  };

  removeRow = (level,order_in_own_level,path) => (evt) => {
    this.props.removeRow({path:path});
  };

  renderWithField(){
      return (
        <li key={"li-"+this.props.data.level+"-"+this.props.data.order_in_own_level+"-"+this.props.data.path.length} className={"xpadding-"+this.props.data.level}>
          <Field name={this.props.data.nodeKey} autoComplete="off"
           key={"liinp-"+this.props.data.level+"-"+this.props.data.order_in_own_level+"-"+this.props.data.path.length}
           defaultValue={this.props.data.name} placeholder="Hierarchy Title"
           onAddNewClick={()=>this.addNewRow(this.props.data.level,this.props.data.order_in_own_level,this.props.data.path)}
           showRemoveRow={(this.props.data.level!=0 || this.props.data.order_in_own_level!=0)}
           onRemoveRowClick={()=>this.removeRow(this.props.data.level,this.props.data.order_in_own_level,this.props.data.path)}
           onChange2={this.handleChangeText(this.props.data.level,this.props.data.order_in_own_level,this.props.data.path)}
           maxLength="500" component={InputHierarchyText}
           data_level={this.props.data.level}/>
        </li>
      );

  };

  render(){
      return (
        <li key={"li-"+this.props.data.level+"-"+this.props.data.order_in_own_level+"-"+this.props.data.path.length} className={"xpadding-"+this.props.data.level}>
          <div className="dropTabs">
          <span className="fa fa-angle-down"></span>
          <input key={"liinp-"+this.props.data.level+"-"+this.props.data.order_in_own_level+"-"+this.props.data.path.length} defaultValue={this.props.data.name} placeholder="Hierarchy Title" onChange={this.handleChangeText(this.props.data.level,this.props.data.order_in_own_level,this.props.data.path)}/>
          <div className="removeAddLine">
						<i title="Add Child" className="fa fa-plus addNewRw" onClick={this.addNewRow(this.props.data.level,this.props.data.order_in_own_level,this.props.data.path)}></i>
            {(this.props.data.level!=0 || this.props.data.order_in_own_level!=0) && <i title="Add Child" className="fa fa-minus addNewRw" onClick={this.removeRow(this.props.data.level,this.props.data.order_in_own_level,this.props.data.path)}></i>}
					</div>
          <div className={"text-help textHerir xpadding-"+this.props.data.level}>
            {this.props.data.name==='' && <span className="error">Enter Hierarchy Value</span>}
          </div>
          </div>
        </li>
      );

  };
}
function mapStateToProps(state) {
  return {
    userAuthenticated: state.authentications.userAuthenticated,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addNewRow:addNewRow,
      changeTextInHierachy:changeTextInHierachy,
      removeRow:removeRow
    },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowHierarchy);
