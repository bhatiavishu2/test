import _ from 'lodash';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../../actions/';
import {USER_TOGGLE_DETAILS_MODAL, USER_CHANGE_TAB, USER_INITIATE_STATE_OF_PAGE,USER_ENTITY_SEARCH_REQUEST, USER_ENTITY_ADD_REQUEST, USER_TYPE_CHANGE_IN_DROPWON,USER_GET_CUSTOMER_OPTION,USER_GET_SITE_OPTION} from '../../actions/master/user';
import { getErrorMessage } from '../';
export default function(state = {}, action) {
  switch (action.type) {

    case USER_INITIATE_STATE_OF_PAGE + PROMISE_LOADER_SUFFIX:
      const roleRes = getOptions(action.payload.data);
      return {...state, errorMsg:"",activeTabId:1,roleOptions:roleRes[0],roleMap:roleRes[1],
              showDetailsModal:false, showErrorCommand:false, showDownloadSuccessCommand:false,
              userTypeSelected:-1
            };

    case USER_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,addResponse:action.payload.data,showErrorCommand:false, showDownloadSuccessCommand:false,errorMsg:"",userTypeSelected:-1};

    case USER_ENTITY_ADD_REQUEST + PROMISE_REJECTED_SUFFIX:
      return {...state,showErrorCommand:true, showDownloadSuccessCommand:false,errorMsg:getErrorMessage(action)};

    case USER_CHANGE_TAB:
      return {...state,activeTabId:action.activeTabId, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};

    case USER_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state, searchData:action.payload.data, showDownloadSuccessCommand:false}

    case USER_TOGGLE_DETAILS_MODAL:
      return {...state, showDetailsModal:action.payload, selectedData:(action.payload==true?action.data:undefined),userTypeSelected:action.data?action.data.user_type:-1, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};
    case USER_TYPE_CHANGE_IN_DROPWON:
      return {...state,userTypeSelected:action.payload};
    case USER_GET_CUSTOMER_OPTION + PROMISE_LOADER_SUFFIX:
      const custRes = getOptions(action.payload.data);
      return {...state, customerOptions:custRes[0], customerMap:custRes[1]};
    case USER_GET_SITE_OPTION + PROMISE_LOADER_SUFFIX:
      const siteRes = getOptions(action.payload.data);
      return {...state, siteOptions:siteRes[0], siteMap:siteRes[1]};
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
