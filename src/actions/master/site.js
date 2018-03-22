import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT} from '../';

export const CREATE_SITE= 'site/create';
export const EDIT_SITE= 'site/edit';
export const SEARCH_SITE= 'site/search';

export const SITE_TOGGLE_DETAILS_MODAL = 'SITE_TOGGLE_DETAILS_MODAL';

export const SITE_CHANGE_TAB ="SITE_CHANGE_TAB";

export const SITE_INITIATE_STATE_OF_PAGE ="SITE_INITIATE_STATE_OF_PAGE";
export const SITE_ENTITY_ADD_REQUEST ="SITE_ENTITY_ADD_REQUEST";
export const SITE_ENTITY_SEARCH_REQUEST ="SITE_ENTITY_SEARCH_REQUEST";
export const SITE_LOGO_DATA = "SITE_LOGO_DATA";

export function initiateState(values) {
  return {
    type: SITE_INITIATE_STATE_OF_PAGE,
    payload: values
  };
}
export function addSubmit(values) {
  const action = ((values.id && values.id!="")?EDIT_SITE:CREATE_SITE);
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${action}`, values);
  return {
    type: SITE_ENTITY_ADD_REQUEST,
    payload: request,
  };
}
export function search(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_SITE}`, values);
  return {
    type: SITE_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}

export function doCloseDetailsModal(values) {
  return {
    type: SITE_TOGGLE_DETAILS_MODAL,
    payload: false,
  };
}
export function changeTab(values) {
  return {
    type: SITE_CHANGE_TAB,
    activeTabId:values.activeTabId
  };
}
export function doOpenDetailsModal(values) {
  return {
    type: SITE_TOGGLE_DETAILS_MODAL,
    payload: true,
    data:values
  };
}
export function updateLogo(value) {
  return {
    type:SITE_LOGO_DATA,
    payload:value
  }
}
