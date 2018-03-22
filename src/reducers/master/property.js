import _ from 'lodash';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../../actions/';
import {PROPERTY_TOGGLE_DETAILS_MODAL, PROPERTY_CHANGE_TAB, PROPERTY_INITIATE_STATE_OF_PAGE,PROPERTY_ENTITY_SEARCH_REQUEST, PROPERTY_ENTITY_ADD_REQUEST, PROPERTY_TYPE_CHANGE_REQUEST, PROPERTY_SELF_OCCUPIED_CHANGED} from '../../actions/master/property';
import { getErrorMessage } from '../';
import {PROPERTY_TYPE_FLAT_HIERARCHY_MAP_REQUEST} from '../../actions/master/property_location_type';
export default function(state = {}, action) {

  switch (action.type) {

    case PROPERTY_INITIATE_STATE_OF_PAGE:
      return {...state, errorMsg:"",activeTabId:1,hierarchy:[],
              showDetailsModal:false, showErrorCommand:false, showDownloadSuccessCommand:false
            };

    case PROPERTY_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,addResponse:action.payload.data,showErrorCommand:false, showDownloadSuccessCommand:false,errorMsg:""};

    case PROPERTY_ENTITY_ADD_REQUEST + PROMISE_REJECTED_SUFFIX:
      return {...state,showErrorCommand:true, showDownloadSuccessCommand:false,errorMsg:getErrorMessage(action)};

    case PROPERTY_CHANGE_TAB:
      return {...state,activeTabId:action.activeTabId, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};

    case PROPERTY_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state, searchData:action.payload.data, showDownloadSuccessCommand:false}

    case PROPERTY_TOGGLE_DETAILS_MODAL:
      var hierarchy = (action.data && state.propertTypeFlatHierarchyMap)?state.propertTypeFlatHierarchyMap[action.data.property_type_id]:[];
      if(action.data && action.data.location_values) {
        for(var key in action.data.location_values) {
          action.data[key] = action.data.location_values[key];
        }
      }
      return {...state, showDetailsModal:action.payload, hierarchy:hierarchy, selectedData:action.data, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};
    case PROPERTY_TYPE_FLAT_HIERARCHY_MAP_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,propertTypeFlatHierarchyMap:action.payload.data.property_type_id_hierarchy_map}
    case PROPERTY_TYPE_CHANGE_REQUEST:
      var hierarchy = (action.payload && state.propertTypeFlatHierarchyMap)?state.propertTypeFlatHierarchyMap[action.payload]:[];
      return {...state, hierarchy:hierarchy}
    case PROPERTY_SELF_OCCUPIED_CHANGED:
      return {...state,isSelfOccupied:action.payload}
    default:
      return state;
  }
}
