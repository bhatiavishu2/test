import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT} from '../';

export const SEARCH_DEVICE_PROFILE_PROFILE= 'device_profile_profile/search';
export const CREATE_DEVICE_PROFILE= 'device_profile/create';
export const EDIT_DEVICE_PROFILE= 'device_profile/edit';
export const SEARCH_DEVICE_PROFILE= 'device_profile/search';
export const SEARCH_DEVICE_PROFILE_TYPE= 'device_profile_type/search';

export const DEVICE_PROFILE_TOGGLE_DETAILS_MODAL = 'DEVICE_PROFILE_TOGGLE_DETAILS_MODAL';

export const DEVICE_PROFILE_CHANGE_TAB ="DEVICE_PROFILE_CHANGE_TAB";

export const DEVICE_PROFILE_INITIATE_STATE_OF_PAGE ="DEVICE_PROFILE_INITIATE_STATE_OF_PAGE";
export const DEVICE_PROFILE_ENTITY_ADD_REQUEST ="DEVICE_PROFILE_ENTITY_ADD_REQUEST";
export const DEVICE_PROFILE_ENTITY_SEARCH_REQUEST ="DEVICE_PROFILE_ENTITY_SEARCH_REQUEST";


export function initiateState(values) {
  //const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_DEVICE_PROFILE_PROFILE}`, values['device_profile_profile_search_request']);
  return {
    type: DEVICE_PROFILE_INITIATE_STATE_OF_PAGE,
    payload: values
  };
}
export function addSubmit(values) {
  const action = ((values.id && values.id!="")?EDIT_DEVICE_PROFILE:CREATE_DEVICE_PROFILE);
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${action}`, values);
  return {
    type: DEVICE_PROFILE_ENTITY_ADD_REQUEST,
    payload: request,
  };
}
export function search(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_DEVICE_PROFILE}`, values);
  return {
    type: DEVICE_PROFILE_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}

export function doCloseDetailsModal(values) {
  return {
    type: DEVICE_PROFILE_TOGGLE_DETAILS_MODAL,
    payload: false,
  };
}
export function changeTab(values) {
  return {
    type: DEVICE_PROFILE_CHANGE_TAB,
    activeTabId:values.activeTabId
  };
}
export function doOpenDetailsModal(values) {
  return {
    type: DEVICE_PROFILE_TOGGLE_DETAILS_MODAL,
    payload: true,
    data:values
  };
}
