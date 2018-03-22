import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT} from '../';

export const SEARCH_ALL_ACTION= 'section/search';
export const CREATE_ROLE= 'role/create';
export const EDIT_ROLE= 'role/edit';
export const SEARCH_ROLE= 'role/search';
export const SEARCH_ROLE_TYPE= 'role_type/search';

export const ROLE_TOGGLE_DETAILS_MODAL = 'ROLE_TOGGLE_DETAILS_MODAL';

export const ROLE_CHANGE_TAB ="ROLE_CHANGE_TAB";

export const ROLE_INITIATE_STATE_OF_PAGE ="ROLE_INITIATE_STATE_OF_PAGE";
export const ROLE_ENTITY_ADD_REQUEST ="ROLE_ENTITY_ADD_REQUEST";
export const ROLE_ENTITY_SEARCH_REQUEST ="ROLE_ENTITY_SEARCH_REQUEST";
export const ACTION_SEARCH_FOR_ROLE = "ACTION_SEARCH_FOR_ROLE";


export function initiateState(values) {
  return {
    type: ROLE_INITIATE_STATE_OF_PAGE,
    payload: values
  };
}
export function getAllActions() {
  const actionsRequest ={"pageNumber": 0,"pageSize": 100,"sortBy": "order","sortDirection": "asc"};
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_ALL_ACTION}`, actionsRequest);
  return {
    type: ACTION_SEARCH_FOR_ROLE,
    payload: request,
  };
}
export function addSubmit(values) {
  const action = ((values.id && values.id!="")?EDIT_ROLE:CREATE_ROLE);
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${action}`, values);
  return {
    type: ROLE_ENTITY_ADD_REQUEST,
    payload: request,
  };
}
export function search(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_ROLE}`, values);
  return {
    type: ROLE_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}

export function doCloseDetailsModal(values) {
  return {
    type: ROLE_TOGGLE_DETAILS_MODAL,
    payload: false,
  };
}
export function changeTab(values) {
  return {
    type: ROLE_CHANGE_TAB,
    activeTabId:values.activeTabId
  };
}
export function doOpenDetailsModal(values) {
  return {
    type: ROLE_TOGGLE_DETAILS_MODAL,
    payload: true,
    data:values
  };
}
