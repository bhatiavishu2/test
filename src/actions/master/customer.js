import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT} from '../';

export const SEARCH_CUSTOMER_PROFILE= 'customer_profile/search';
export const CREATE_CUSTOMER= 'customer/create';
export const EDIT_CUSTOMER= 'customer/edit';
export const SEARCH_CUSTOMER= 'customer/search';
export const SEARCH_CUSTOMER_TYPE= 'customer_type/search';

export const CUSTOMER_TOGGLE_DETAILS_MODAL = 'CUSTOMER_TOGGLE_DETAILS_MODAL';

export const CUSTOMER_CHANGE_TAB ="CUSTOMER_CHANGE_TAB";

export const CUSTOMER_INITIATE_STATE_OF_PAGE ="CUSTOMER_INITIATE_STATE_OF_PAGE";
export const CUSTOMER_ENTITY_ADD_REQUEST ="CUSTOMER_ENTITY_ADD_REQUEST";
export const CUSTOMER_ENTITY_SEARCH_REQUEST ="CUSTOMER_ENTITY_SEARCH_REQUEST";
export const CUSTOMER_LOGO_DATA = "CUSTOMER_LOGO_DATA";

export function initiateState(values) {
  //const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_CUSTOMER_PROFILE}`, values['customer_profile_search_request']);
  return {
    type: CUSTOMER_INITIATE_STATE_OF_PAGE,
    payload: values
  };
}
export function addSubmit(values) {
  const action = ((values.id && values.id!="")?EDIT_CUSTOMER:CREATE_CUSTOMER);
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${action}`, values);
  return {
    type: CUSTOMER_ENTITY_ADD_REQUEST,
    payload: request,
  };
}
export function search(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_CUSTOMER}`, values);
  return {
    type: CUSTOMER_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}

export function doCloseDetailsModal(values) {
  return {
    type: CUSTOMER_TOGGLE_DETAILS_MODAL,
    payload: false,
  };
}
export function changeTab(values) {
  return {
    type: CUSTOMER_CHANGE_TAB,
    activeTabId:values.activeTabId
  };
}
export function doOpenDetailsModal(values) {
  return {
    type: CUSTOMER_TOGGLE_DETAILS_MODAL,
    payload: true,
    data:values
  };
}
export function updateLogo(value) {
  return {
    type:CUSTOMER_LOGO_DATA,
    payload:value
  }
}
