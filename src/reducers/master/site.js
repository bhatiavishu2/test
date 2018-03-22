import _ from 'lodash';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../../actions/';
import {SITE_TOGGLE_DETAILS_MODAL, SITE_CHANGE_TAB, SITE_INITIATE_STATE_OF_PAGE,SITE_ENTITY_SEARCH_REQUEST, SITE_ENTITY_ADD_REQUEST,SITE_LOGO_DATA} from '../../actions/master/site';
import { getErrorMessage } from '../';
export default function(state = {}, action) {
  switch (action.type) {

    case SITE_INITIATE_STATE_OF_PAGE:
      return {...state, errorMsg:"",activeTabId:1,
              showDetailsModal:false, showErrorCommand:false, showDownloadSuccessCommand:false,selectedData:{},selectedLogo:""
            };

    case SITE_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,addResponse:action.payload.data,showErrorCommand:false, showDownloadSuccessCommand:false,errorMsg:"",selectedData:{},selectedLogo:""};

    case SITE_ENTITY_ADD_REQUEST + PROMISE_REJECTED_SUFFIX:
      return {...state,showErrorCommand:true, showDownloadSuccessCommand:false,errorMsg:getErrorMessage(action)};

    case SITE_CHANGE_TAB:
      return {...state,activeTabId:action.activeTabId, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};

    case SITE_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state, searchData:action.payload.data, showDownloadSuccessCommand:false,selectedData:{},selectedLogo:""}

    case SITE_TOGGLE_DETAILS_MODAL:
      return {...state, showDetailsModal:action.payload, selectedData:action.data,selectedLogo:(action.data&&action.data.logo)?action.data.logo:"", showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};
    case SITE_LOGO_DATA:
      return {...state, selectedLogo:action.payload};
    default:
      return state;
  }
}
