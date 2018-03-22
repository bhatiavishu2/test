import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT} from '../';

export const SEARCH_USER_PROFILE= 'user_profile/search';
export const CREATE_USER= 'user/create';
export const EDIT_USER= 'user/edit';
export const SEARCH_USER= 'user/search';
export const SEARCH_CUSTOMER= 'customer/search';
export const SEARCH_USER_TYPE= 'user_type/search';

export const USER_TOGGLE_DETAILS_MODAL = 'USER_TOGGLE_DETAILS_MODAL';

export const USER_CHANGE_TAB ="USER_CHANGE_TAB";
export const USER_TYPE_CHANGE_IN_DROPWON ="USER_TYPE_CHANGE_IN_DROPWON";

export const USER_INITIATE_STATE_OF_PAGE ="USER_INITIATE_STATE_OF_PAGE";
export const USER_ENTITY_ADD_REQUEST ="USER_ENTITY_ADD_REQUEST";
export const USER_ENTITY_SEARCH_REQUEST ="USER_ENTITY_SEARCH_REQUEST";
export const USER_GET_CUSTOMER_OPTION = "USER_GET_CUSTOMER_OPTION";
export const USER_GET_SITE_OPTION = "USER_GET_SITE_OPTION";
const SEARCH_ROLE = "role/search";
const SEARCH_SITE = "site/search";


export function initiateState(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_ROLE}`, values);
  return {
    type: USER_INITIATE_STATE_OF_PAGE,
    payload: request
  };
}
export function addSubmit(values) {
  const action = ((values.id && values.id!="")?EDIT_USER:CREATE_USER);
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${action}`, values);
  return {
    type: USER_ENTITY_ADD_REQUEST,
    payload: request,
  };
}
export function search(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_USER}`, values);
  return {
    type: USER_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}

export function doCloseDetailsModal(values) {
  return {
    type: USER_TOGGLE_DETAILS_MODAL,
    payload: false,
  };
}
export function changeTab(values) {
  return {
    type: USER_CHANGE_TAB,
    activeTabId:values.activeTabId
  };
}
export function doOpenDetailsModal(values) {
  return {
    type: USER_TOGGLE_DETAILS_MODAL,
    payload: true,
    data:values
  };
}
export function changeUserTypeInDropDown(values) {
  return {
    type: USER_TYPE_CHANGE_IN_DROPWON,
    payload:values.userTypeId
  };
}
export function getCustomers() {
  const defaultRequest ={"pageNumber": 0,"pageSize": 100,"sortBy": "order","sortDirection": "asc"};
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_CUSTOMER}`, defaultRequest);
  return {
    type: USER_GET_CUSTOMER_OPTION,
    payload: request
  };
}
export function getMySites() {
  const defaultRequest ={"pageNumber": 0,"pageSize": 100,"sortBy": "order","sortDirection": "asc"};
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_SITE}`, defaultRequest);
  return {
    type: USER_GET_SITE_OPTION,
    payload: request
  };

}
