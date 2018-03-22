import _ from 'lodash';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../../actions/';
import {CUSTOMER_TOGGLE_DETAILS_MODAL, CUSTOMER_CHANGE_TAB, CUSTOMER_INITIATE_STATE_OF_PAGE,CUSTOMER_ENTITY_SEARCH_REQUEST, CUSTOMER_ENTITY_ADD_REQUEST, CUSTOMER_LOGO_DATA} from '../../actions/master/customer';
import { getErrorMessage } from '../';
export default function(state = {}, action) {
  switch (action.type) {

    case CUSTOMER_INITIATE_STATE_OF_PAGE:
      return {...state, errorMsg:"",activeTabId:1,
              showDetailsModal:false, showErrorCommand:false, showDownloadSuccessCommand:false,selectedData:{},selectedLogo:""
            };

    case CUSTOMER_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,addResponse:action.payload.data,showErrorCommand:false, showDownloadSuccessCommand:false,errorMsg:"",selectedData:{},selectedLogo:""};

    case CUSTOMER_ENTITY_ADD_REQUEST + PROMISE_REJECTED_SUFFIX:
      return {...state,showErrorCommand:true, showDownloadSuccessCommand:false,errorMsg:getErrorMessage(action)};

    case CUSTOMER_CHANGE_TAB:
      return {...state,activeTabId:action.activeTabId, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};

    case CUSTOMER_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state, searchData:action.payload.data, showDownloadSuccessCommand:false,selectedData:{},selectedLogo:""}

    case CUSTOMER_TOGGLE_DETAILS_MODAL:
      return {...state, showDetailsModal:action.payload, selectedData:action.data,selectedLogo:(action.data&&action.data.logo)?action.data.logo:"", showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};
    case CUSTOMER_LOGO_DATA:
      return {...state, selectedLogo:action.payload}
    default:
      return state;
  }
}
