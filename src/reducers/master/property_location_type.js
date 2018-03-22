import _ from 'lodash';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../../actions/';
import {PROPERTY_LOCATION_TYPE_TOGGLE_DETAILS_MODAL, PROPERTY_LOCATION_TYPE_CHANGE_TAB, PROPERTY_LOCATION_TYPE_INITIATE_STATE_OF_PAGE,PROPERTY_LOCATION_TYPE_ENTITY_SEARCH_REQUEST, PROPERTY_LOCATION_TYPE_ENTITY_ADD_REQUEST, PROPERTY_LOCATION_TYPE_ADD_ROW_REQUEST, PROPERTY_LOCATION_TYPE_CHANGE_TEXT_REQUEST, PROPERTY_LOCATION_TYPE_REMOVE_ROW_REQUEST,PROPERTY_LOCATION_TYPE_CHECK_VALID_REQUEST, PROPERTY_TYPE_FLAT_HIERARCHY_MAP_REQUEST} from '../../actions/master/property_location_type';
import {PROPERTY_TYPE_ENTITY_SEARCH_REQUEST} from '../../actions/master/property_type';
import { getErrorMessage } from '../';

const { Map } = require('immutable');

export default function(state = {}, action) {
  //console.log("action.type "+action);
  //console.log(state);
  //console.log("hello "+action.type);
  switch (action.type) {

    case PROPERTY_LOCATION_TYPE_INITIATE_STATE_OF_PAGE:
      return {...state, errorMsg:"",activeTabId:1,
              showDetailsModal:false, showErrorCommand:false, showDownloadSuccessCommand:false,hierarchy:{name:'',level:0,order_in_own_level:0,path:[0],nodeKey:'0'}
            };

    case PROPERTY_LOCATION_TYPE_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,addResponse:action.payload.data,showErrorCommand:false, showDownloadSuccessCommand:false,errorMsg:""};

    case PROPERTY_LOCATION_TYPE_ENTITY_ADD_REQUEST + PROMISE_REJECTED_SUFFIX:
      return {...state,showErrorCommand:true, showDownloadSuccessCommand:false,errorMsg:getErrorMessage(action)};

    case PROPERTY_LOCATION_TYPE_CHANGE_TAB:
      return {...state,activeTabId:action.activeTabId, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[],hierarchy:{name:'',level:0,order_in_own_level:0,path:[0],nodeKey:'0'}};

    case PROPERTY_LOCATION_TYPE_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state, searchData:action.payload.data, showDownloadSuccessCommand:false}

    case PROPERTY_TYPE_FLAT_HIERARCHY_MAP_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,propertTypeFlatHierarchyMap:action.payload.data.property_type_id_hierarchy_map}

    case PROPERTY_LOCATION_TYPE_TOGGLE_DETAILS_MODAL:
      return {...state, showDetailsModal:action.payload, selectedData:action.data, hierarchy:(action.data?action.data.hierarchy:{name:'',level:0,order_in_own_level:0,path:[0],nodeKey:'0'}),showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};
    case PROPERTY_LOCATION_TYPE_ADD_ROW_REQUEST:
      let res = state.hierarchy;
      return {...state,hierarchy:addNewHierarchyInTree(res,action.payload)};
    case PROPERTY_LOCATION_TYPE_CHANGE_TEXT_REQUEST:
      var res2 = state.hierarchy;
      return {...state,hierarchy:getTextChangedHierarchy(res2,action.payload)};
    case PROPERTY_LOCATION_TYPE_REMOVE_ROW_REQUEST:
      var res2 = state.hierarchy;
      return {...state,hierarchy:removeHierarchy(res2,action.payload)};
    default:
      return state;
  }
}
function getOptions(roleResponse) {
  const roleOptions = [];
  let c =0;
  const roleMap = [];
  const roleRes = [];
  if(roleResponse) {
    for(c=0;c<roleResponse.entities.length;c++) {
      const dp = roleResponse.entities[c];
      if(dp.is_active && dp.is_active===true) {
        roleOptions.push({label:dp.name,value:dp.id});
        roleMap[dp.id]=dp;
      }
    }
  }
  roleRes[0] = roleOptions;
  roleRes[1] = roleMap;
  return roleRes;
}


function getTextChangedHierarchy(root,changedRes) {
  var path = changedRes.path.slice();
  var newText = changedRes.name;
  root = getUpdatedTextHierarchy(path,0,root,newText);
  return jQuery.extend(true, {}, root);
  //return root;
}
function getUpdatedTextHierarchy(path,count,root,text) {
  if(count===path.length-1) {
    root.name=text.trim();
    return root;
  }
  //count++;
  root.children[path[count+1]]=getUpdatedTextHierarchy(path,count+1,root.children[path[count+1]],text);
  return root;
}
function addNewHierarchyInTree(root,child) {

  var parentPath = child.parentPath.slice();
  root = getNewHierarchy(parentPath,0,root,child);
  return jQuery.extend(true, {}, root);
  //return root;
}
function getNewHierarchy(parentPath,count,root,child) {

  if(count===parentPath.length-1) {
    if(!root.children) {
      root.children=[];
    }
    parentPath.push(root.children.length);
    child.path=parentPath;
    child.nodeKey = getNodeKey(parentPath);
    child.order_in_own_level=root.children.length;
    root.children.push(child);
    return root;
  }
  //count++;
  root.children[parentPath[count+1]]=getNewHierarchy(parentPath,count+1,root.children[parentPath[count+1]],child);
  return root;
}


function removeHierarchy(root,removedRes) {
  var path = removedRes.path.slice();
  root = removeNodeFromHierarchy(path,0,root);
  return jQuery.extend(true, {}, root);
  //return root;
}
function removeNodeFromHierarchy(path,count,root) {
  if(count===path.length-2) {
    root.children.splice(path[count+1],1);
    if(!root.children || root.children.length==0) {
      return root;
    }
    var cnt =0;
    for(cnt=0;cnt<root.children.length;cnt++) {
      root.children[cnt] = updateNodeForPathAndParentPath(root.children[cnt],cnt,root.path);
    }
    return root;
  }
  //count++;
  root.children[path[count+1]]=removeNodeFromHierarchy(path,count+1,root.children[path[count+1]]);
  return root;
}
function updateNodeForPathAndParentPath(root,childIndexOfParent,parentPath) {
  root.parentPath = parentPath;
  var ownPath = parentPath.slice();
  ownPath.push(childIndexOfParent);
  root.path = ownPath;
  root.nodeKey = getNodeKey(ownPath);
  root.order_in_own_level = childIndexOfParent;
  if(!root.children || root.children.length==0) {
    return root;
  }
  var cnt =0;
  for(cnt=0;cnt<root.children.length;cnt++) {
    root.children[cnt] = updateNodeForPathAndParentPath(root.children[cnt],cnt,root.path);
  }
  return root;
}
function getNodeKey(path) {
  var key = path[0];
  for(var cnt=1;cnt<path.length;cnt++) {
    key = key + "-" + path[cnt];
  }
  return key;
}
