import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT} from '../';

export const SEARCH_PROPERTY_TYPE_PROFILE= 'property_type_profile/search';
export const CREATE_PROPERTY_TYPE= 'property_type/create';
export const EDIT_PROPERTY_TYPE= 'property_type/edit';
export const SEARCH_PROPERTY_TYPE= 'property_type/search';
export const SEARCH_PROPERTY_TYPE_TYPE= 'property_type_type/search';

export const PROPERTY_TYPE_TOGGLE_DETAILS_MODAL = 'PROPERTY_TYPE_TOGGLE_DETAILS_MODAL';

export const PROPERTY_TYPE_CHANGE_TAB ="PROPERTY_TYPE_CHANGE_TAB";

export const PROPERTY_TYPE_INITIATE_STATE_OF_PAGE ="PROPERTY_TYPE_INITIATE_STATE_OF_PAGE";
export const PROPERTY_TYPE_ENTITY_ADD_REQUEST ="PROPERTY_TYPE_ENTITY_ADD_REQUEST";
export const PROPERTY_TYPE_ENTITY_SEARCH_REQUEST ="PROPERTY_TYPE_ENTITY_SEARCH_REQUEST";


export function initiateState(values) {
  //const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_PROPERTY_TYPE_PROFILE}`, values['property_type_profile_search_request']);
  return {
    type: PROPERTY_TYPE_INITIATE_STATE_OF_PAGE,
    payload: values
  };
}
export function addSubmit(values) {
  const action = ((values.id && values.id!="")?EDIT_PROPERTY_TYPE:CREATE_PROPERTY_TYPE);
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${action}`, values);
  return {
    type: PROPERTY_TYPE_ENTITY_ADD_REQUEST,
    payload: request,
  };
}
export function search(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_PROPERTY_TYPE}`, values);
  return {
    type: PROPERTY_TYPE_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}

export function doCloseDetailsModal(values) {
  return {
    type: PROPERTY_TYPE_TOGGLE_DETAILS_MODAL,
    payload: false,
  };
}
export function changeTab(values) {
  return {
    type: PROPERTY_TYPE_CHANGE_TAB,
    activeTabId:values.activeTabId
  };
}
export function doOpenDetailsModal(values) {
  return {
    type: PROPERTY_TYPE_TOGGLE_DETAILS_MODAL,
    payload: true,
    data:values
  };
}
