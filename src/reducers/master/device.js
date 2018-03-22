import _ from 'lodash';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX, DEVICE_TYPE_SEARCH_FOR_OPTION } from '../../actions/';
import {INITIATE_DOWNLINK_API, DEVICE_TOGGLE_DETAILS_MODAL, DEVICE_CHANGE_TAB, DEVICE_INITIATE_STATE_OF_PAGE,DEVICE_ENTITY_SEARCH_REQUEST, DEVICE_ENTITY_ADD_REQUEST, DEVICE_QUERY_SEARCH_REQUEST,DEVICE_TOGGLE_PROPERTY_MAP_MODAL, DEVICE_ENTITY_UNMAPPED_SEARCH_REQUEST, DEVICE_PROPERTY_DEVICE_MAP_REQUEST,DEVICE_TOGGLE_DETACH_MODAL,DEVICE_DETACH_REQUEST} from '../../actions/master/device';
import { getErrorMessage } from '../';
import {PROPERTY_UNMAPPED_SEARCH_REQUEST} from '../../actions/master/property';

export default function(state = {}, action) {
  //console.log("action.type "+action);
  //console.log(state);
  //console.log("hello "+action.type);
  switch (action.type) {

    case DEVICE_INITIATE_STATE_OF_PAGE + PROMISE_LOADER_SUFFIX:
      const devProfRes = getDeviceProfileOptions(action.payload.data);
      return {...state, deviceProfileOptions: devProfRes[0],
              deviceProfilesMap:devProfRes[1],errorMsg:"",activeTabId:1,
              showDetailsModal:false, showErrorCommand:false, showDownloadSuccessCommand:false
            };

    case DEVICE_TYPE_SEARCH_FOR_OPTION + PROMISE_LOADER_SUFFIX:
      const devTpRes = getDeviceTypeOptions(action.payload.data);
      return { ...state, deviceTypeOptions: devTpRes[0],
              deviceTypeMap:devTpRes[1]
            };

    case DEVICE_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,addResponse:action.payload.data,showErrorCommand:false, showDownloadSuccessCommand:false,errorMsg:""};

    case DEVICE_ENTITY_ADD_REQUEST + PROMISE_REJECTED_SUFFIX:
      return {...state,showErrorCommand:true, showDownloadSuccessCommand:false,errorMsg:getErrorMessage(action)};

    case DEVICE_CHANGE_TAB:
      return {...state,activeTabId:action.activeTabId, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};

    case DEVICE_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state, searchData:action.payload.data, showDownloadSuccessCommand:false};
    case DEVICE_ENTITY_UNMAPPED_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state, unMappedDevices:action.payload.data.entities};
    case DEVICE_QUERY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state, downlinkQueryData:action.payload.data};
    case INITIATE_DOWNLINK_API+ PROMISE_LOADER_SUFFIX:
      return {...state, showDownloadSuccessCommand:true};
    case DEVICE_TOGGLE_DETAILS_MODAL:
      return {...state,showDevicePropertyMapModel:false, showDetailsModal:action.payload, selectedData:action.data, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};
    case PROPERTY_UNMAPPED_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,unMappedProperties:action.payload.data}

    case DEVICE_TOGGLE_PROPERTY_MAP_MODAL:
      return {...state, showDevicePropertyMapModel:action.payload, selectedPropertyData:action.data,showDetailsModal:false, showDownloadSuccessCommand:false, showErrorCommand:false,addResponse:[]};
    case DEVICE_PROPERTY_DEVICE_MAP_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state,showDevicePropertyMapModel:false, selectedPropertyData:{}};
    case DEVICE_DETACH_REQUEST + PROMISE_LOADER_SUFFIX:
      return {...state, showDeviceDetachModel:false, selectedPropertyData:{}};

    case DEVICE_TOGGLE_DETACH_MODAL:
      return {...state, showDeviceDetachModel:action.payload, selectedDeviceData:action.data};
    default:
      return state;
  }
}


function getDeviceProfileOptions(deviceProfiles) {
  const deviceProfileOptions = [];
  let c =0;
  const deviceProfilesMap = [];
  const devProfRes = [];
  if(deviceProfiles) {
    for(c=0;c<deviceProfiles.entities.length;c++) {
      const dp = deviceProfiles.entities[c];
      deviceProfileOptions.push({label:dp.device_profile_name,value:dp.id});
      deviceProfilesMap[dp.id]=dp;
    }
  }
  devProfRes[0] = deviceProfileOptions;
  devProfRes[1] = deviceProfilesMap;
  return devProfRes;
}

function getDeviceTypeOptions(deviceTypeResponse) {
  const deviceTypeOptions = [];
  let c =0;
  const deviceTypeMap = [];
  const devTpRes = [];
  if(deviceTypeResponse) {
    for(c=0;c<deviceTypeResponse.entities.length;c++) {
      const dp = deviceTypeResponse.entities[c];
      deviceTypeOptions.push({label:dp.name,value:dp.id});
      deviceTypeMap[dp.id]=dp;
    }
  }
  devTpRes[0] = deviceTypeOptions;
  devTpRes[1] = deviceTypeMap;
  return devTpRes;
}
