import _ from 'lodash';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../../actions/';
import {ROLE_TOGGLE_DETAILS_MODAL, ROLE_CHANGE_TAB, ROLE_INITIATE_STATE_OF_PAGE,ROLE_ENTITY_SEARCH_REQUEST, ROLE_ENTITY_ADD_REQUEST, ACTION_SEARCH_FOR_ROLE} from '../../actions/master/role';
import { getErrorMessage } from '../';
export default function(state = {}, action) {
  switch (action.type) {

    case ROLE_INITIATE_STATE_OF_PAGE:
      return {...state, errorMsg:"",activeTabId:1,
              showDetailsModal:false, showErrorCommand:false, showDownloadSuccessCommand:false
            };
    case ACTION_SEARCH_FOR_ROLE + PROMISE_LOADER_SUFFIX:
      return {...state,allActions:action.payload.data}
    case ROLE_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,addResponse:action.payload.data,showErrorCommand:false, showDownloadSuccessCommand:false,errorMsg:""};

    case ROLE_ENTITY_ADD_REQUEST + PROMISE_REJECTED_SUFFIX:
      return {...state,showErrorCommand:true, showDownloadSuccessCommand:false,errorMsg:getErrorMessage(action)};

    case ROLE_CHANGE_TAB:
      return {...state,activeTabId:action.activeTabId, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};

    case ROLE_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state, searchData:action.payload.data, showDownloadSuccessCommand:false}

    case ROLE_TOGGLE_DETAILS_MODAL:
      return {...state, showDetailsModal:action.payload, selectedData:getRoleActionsSelected(action.data?action.data:{}), showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};

    default:
      return state;
  }
}
function getRoleActionsSelected(data) {
  let key = "";
  for (key in data.actions) {
    data[data.actions[key]] = true;
  }
  return data;
}
