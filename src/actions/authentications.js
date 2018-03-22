import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT, HEADER_CONTENT_TYPE_VALUE, SIGNIN_URL, SIGN_IN} from './';
import {SEARCH_SITE} from './master/site';
import {SEARCH_CUSTOMER} from './master/customer';
export const INITIATE_AUTH = 'initiateAuth';
export const SIGN_OUT = 'signout';
export const CHANGE_DEVICE_TYPE_IN_HEADER = 'CHANGE_DEVICE_TYPE_IN_HEADER';

axios.defaults.baseURL = ROOT_URL;
//axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = HEADER_CONTENT_TYPE_VALUE;

export const USER_SITE_ENTITY_SEARCH_REQUEST = "USER_SITE_ENTITY_SEARCH_REQUEST";
export const USER_CUSTOMER_ENTITY_SEARCH_REQUEST = "USER_CUSTOMER_ENTITY_SEARCH_REQUEST";
const GET_ROLE_URL = 'role/get_entity';
export const USER_ROLE_ENTITY_SEARCH_REQUEST = "USER_ROLE_ENTITY_SEARCH_REQUEST";
export const USER_SELECTED_SITE_CHANGE = "USER_SELECTED_SITE_CHANGE";
export const SUPER_USER_TO_CUSTOMER_ADMIN_REQUEST = "SUPER_USER_TO_CUSTOMER_ADMIN_REQUEST";
export const SUPER_USER_TO_CUSTOMER_ADMIN_URL="user/adminSwitch";
export const USER_SWITCH_BACK_TO_ADMIN = "USER_SWITCH_BACK_TO_ADMIN";

export function doInitiateAuth() {
  return {
    type:INITIATE_AUTH,
    payload:false
  }
}

export function searchSites(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_SITE}`, values);
  return {
    type: USER_SITE_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}

export function searchCustomer(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_CUSTOMER}`, values);
  return {
    type: USER_CUSTOMER_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}

export function switchToCustomer(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SUPER_USER_TO_CUSTOMER_ADMIN_URL}`, values);
  return {
    type: SUPER_USER_TO_CUSTOMER_ADMIN_REQUEST,
    payload: request,
  };
}

export function signIn(values, callback) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SIGNIN_URL}`, values);
    //.then(res => {console.log(res)});
  return {
    type: SIGN_IN,
    payload: request
  };
}
export function signOut() {
  return {
    type:SIGN_OUT,
    payload:false
  }
}
export function changeDeviceTypeSelectionInHeader(value) {
  return {
    type:CHANGE_DEVICE_TYPE_IN_HEADER,
    payload:value
  }
}
export function getRole(roleId) {
  const values = {id:roleId};
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${GET_ROLE_URL}`, values);
    //.then(res => {console.log(res)});
  return {
    type: USER_ROLE_ENTITY_SEARCH_REQUEST,
    payload: request
  };
}
export function changeSelectedSite(selectedSiteId) {
  return {
    type: USER_SELECTED_SITE_CHANGE,
    payload: selectedSiteId
  };
}
export function switchBackToAdmin() {
  return {
    type: USER_SWITCH_BACK_TO_ADMIN,
    payload: false
  };
}
