import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT , DEVICE_TYPE_SEARCH_FOR_OPTION} from '../';

export const SEARCH_DEVICE_PROFILE= 'device_profile/search';
export const CREATE_DEVICE= 'device/create';
export const EDIT_DEVICE= 'device/edit';
export const SEARCH_DEVICE= 'device/search';
export const SEARCH_UNMAPPED_DEVICE= 'device/unAssignedSearch';
export const SEARCH_DEVICE_QUERY= 'downlink/search';
export const SEARCH_DEVICE_TYPE= 'device_type/search';
export const DOWNLINK_URL='downlink/';
export const PROPERTY_MAP_URL = 'device_property_link/create';
export const DETACH_URL = 'device_property_link/detach';

export const DEVICE_TOGGLE_DETAILS_MODAL = 'DEVICE_TOGGLE_DETAILS_MODAL';

export const DEVICE_CHANGE_TAB ="DEVICE_CHANGE_TAB";

export const DEVICE_INITIATE_STATE_OF_PAGE ="DEVICE_INITIATE_STATE_OF_PAGE";
export const DEVICE_ENTITY_ADD_REQUEST ="DEVICE_ENTITY_ADD_REQUEST";
export const DEVICE_ENTITY_SEARCH_REQUEST ="DEVICE_ENTITY_SEARCH_REQUEST";
export const DEVICE_QUERY_SEARCH_REQUEST ="DEVICE_QUERY_SEARCH_REQUEST";

export const INITIATE_DOWNLINK_API = 'INITIATE_DOWNLINK_API';
export const DEVICE_TOGGLE_PROPERTY_MAP_MODAL = 'DEVICE_TOGGLE_PROPERTY_MAP_MODAL';
export const DEVICE_ENTITY_UNMAPPED_SEARCH_REQUEST = 'DEVICE_ENTITY_UNMAPPED_SEARCH_REQUEST';
export const DEVICE_PROPERTY_DEVICE_MAP_REQUEST = 'DEVICE_PROPERTY_DEVICE_MAP_REQUEST';
export const DEVICE_DETACH_REQUEST = 'DEVICE_DETACH_REQUEST';
export const DEVICE_TOGGLE_DETACH_MODAL = 'DEVICE_TOGGLE_DETACH_MODAL';

export function initiateState(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_DEVICE_PROFILE}`, values['device_profile_search_request']);
  return {
    type: DEVICE_INITIATE_STATE_OF_PAGE,
    payload: request
  };
}
export function getDeviceType() {
  const devTpRequest ={"pageNumber": 0,"pageSize": 10,"sortBy": "name","sortDirection": "asc"};
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_DEVICE_TYPE}`, devTpRequest);
  return {
    type: DEVICE_TYPE_SEARCH_FOR_OPTION,
    payload: request,
  };
}
export function addSubmit(values) {
  const action = ((values.id && values.id!="")?EDIT_DEVICE:CREATE_DEVICE);
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${action}`, values);
  return {
    type: DEVICE_ENTITY_ADD_REQUEST,
    payload: request,
  };
}
export function search(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_DEVICE}`, values);
  const unMappedDevices = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_DEVICE}`, values);
  return {
    type: DEVICE_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}
export function unMappedDevicesearch(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_UNMAPPED_DEVICE}`, values);
  return {
    type: DEVICE_ENTITY_UNMAPPED_SEARCH_REQUEST,
    payload: request,
  };
}
export function searchDownlinkQuery(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_DEVICE_QUERY}`, values);
  return {
    type: DEVICE_QUERY_SEARCH_REQUEST,
    payload: request,
  };
}
export function downlink(values, callback) {
  const devId = values['devid'];
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${DOWNLINK_URL}`, values['data']);
  return {
    type: INITIATE_DOWNLINK_API,
    payload: request
  };
}

export function doCloseDetailsModal(values) {
  return {
    type: DEVICE_TOGGLE_DETAILS_MODAL,
    payload: false,
  };
}

export function doClosesDevicePropertyMapModel() {
  return {
    type: DEVICE_TOGGLE_PROPERTY_MAP_MODAL,
    payload: false,
  };
}
export function doOpenPropertyMapModal(values) {
  return {
    type: DEVICE_TOGGLE_PROPERTY_MAP_MODAL,
    payload: true,
    data:values
  };
}
export function changeTab(values) {
  return {
    type: DEVICE_CHANGE_TAB,
    activeTabId:values.activeTabId
  };
}
export function doOpenDetailsModal(values) {
  return {
    type: DEVICE_TOGGLE_DETAILS_MODAL,
    payload: true,
    data:values
  };
}
export function mapProperty(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${PROPERTY_MAP_URL}`, values);
  return {
    type: DEVICE_PROPERTY_DEVICE_MAP_REQUEST,
    payload: request
  };
}
export function detach(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${DETACH_URL}`, values);
  return {
    type: DEVICE_DETACH_REQUEST,
    payload: request
  };
}
export function doClosesDeviceDetachModel() {
  return {
    type: DEVICE_TOGGLE_DETACH_MODAL,
    payload: false,
  };
}
export function doOpenDeviceDetachModal(values) {
  return {
    type: DEVICE_TOGGLE_DETACH_MODAL,
    payload: true,
    data:values
  };
}
