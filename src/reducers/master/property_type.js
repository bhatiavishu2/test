import _ from 'lodash';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../../actions/';
import {PROPERTY_TYPE_TOGGLE_DETAILS_MODAL, PROPERTY_TYPE_CHANGE_TAB, PROPERTY_TYPE_INITIATE_STATE_OF_PAGE,PROPERTY_TYPE_ENTITY_SEARCH_REQUEST, PROPERTY_TYPE_ENTITY_ADD_REQUEST} from '../../actions/master/property_type';
import { getErrorMessage } from '../';
export default function(state = {}, action) {
  //console.log("action.type "+action);
  //console.log(state);
  //console.log("hello "+action.type);
  switch (action.type) {

    case PROPERTY_TYPE_INITIATE_STATE_OF_PAGE:
      return {...state, errorMsg:"",activeTabId:1,
              showDetailsModal:false, showErrorCommand:false, showDownloadSuccessCommand:false
            };

    case PROPERTY_TYPE_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,addResponse:action.payload.data,showErrorCommand:false, showDownloadSuccessCommand:false,errorMsg:""};

    case PROPERTY_TYPE_ENTITY_ADD_REQUEST + PROMISE_REJECTED_SUFFIX:
      return {...state,showErrorCommand:true, showDownloadSuccessCommand:false,errorMsg:getErrorMessage(action)};

    case PROPERTY_TYPE_CHANGE_TAB:
      return {...state,activeTabId:action.activeTabId, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};

    case PROPERTY_TYPE_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      const propTypeRes = getOptions(action.payload.data);
      return {...state, searchData:action.payload.data, showDownloadSuccessCommand:false,propTypeOptions:propTypeRes[0],propTypeIdNameMap:propTypeRes[1]}

    case PROPERTY_TYPE_TOGGLE_DETAILS_MODAL:
      return {...state, showDetailsModal:action.payload, selectedData:action.data, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};

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
