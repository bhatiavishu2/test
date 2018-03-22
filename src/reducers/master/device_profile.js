import _ from 'lodash';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../../actions/';
import {DEVICE_PROFILE_TOGGLE_DETAILS_MODAL, DEVICE_PROFILE_CHANGE_TAB, DEVICE_PROFILE_INITIATE_STATE_OF_PAGE,DEVICE_PROFILE_ENTITY_SEARCH_REQUEST, DEVICE_PROFILE_ENTITY_ADD_REQUEST} from '../../actions/master/device_profile';
import { getErrorMessage } from '../';
export default function(state = {}, action) {
  //console.log("action.type "+action);
  //console.log(state);
  //console.log("hello "+action.type);
  switch (action.type) {

    case DEVICE_PROFILE_INITIATE_STATE_OF_PAGE:
      return {...state, errorMsg:"",activeTabId:1,
              showDetailsModal:false, showErrorCommand:false, showDownloadSuccessCommand:false
            };

    case DEVICE_PROFILE_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,addResponse:action.payload.data,showErrorCommand:false, showDownloadSuccessCommand:false,errorMsg:""};

    case DEVICE_PROFILE_ENTITY_ADD_REQUEST + PROMISE_REJECTED_SUFFIX:
      return {...state,showErrorCommand:true, showDownloadSuccessCommand:false,errorMsg:getErrorMessage(action)};

    case DEVICE_PROFILE_CHANGE_TAB:
      return {...state,activeTabId:action.activeTabId, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};

    case DEVICE_PROFILE_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state, searchData:action.payload.data, showDownloadSuccessCommand:false}

    case DEVICE_PROFILE_TOGGLE_DETAILS_MODAL:
      return {...state, showDetailsModal:action.payload, selectedData:action.data, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};

    default:
      return state;
  }
}


