import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT} from '../';

export const SEARCH_CONFIGURATION_SETTING_PROFILE= 'configuration_setting_profile/search';
export const CREATE_CONFIGURATION_SETTING= 'configuration_setting/create';
export const EDIT_CONFIGURATION_SETTING= 'configuration_setting/edit';
export const SEARCH_CONFIGURATION_SETTING= 'configuration_setting/search';
export const SEARCH_CONFIGURATION_SETTING_TYPE= 'configuration_setting_type/search';

export const CONFIGURATION_SETTING_TOGGLE_DETAILS_MODAL = 'CONFIGURATION_SETTING_TOGGLE_DETAILS_MODAL';

export const CONFIGURATION_SETTING_CHANGE_TAB ="CONFIGURATION_SETTING_CHANGE_TAB";

export const CONFIGURATION_SETTING_INITIATE_STATE_OF_PAGE ="CONFIGURATION_SETTING_INITIATE_STATE_OF_PAGE";
export const CONFIGURATION_SETTING_ENTITY_ADD_REQUEST ="CONFIGURATION_SETTING_ENTITY_ADD_REQUEST";
export const CONFIGURATION_SETTING_ENTITY_SEARCH_REQUEST ="CONFIGURATION_SETTING_ENTITY_SEARCH_REQUEST";


export function initiateState(values) {
  //const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_CONFIGURATION_SETTING_PROFILE}`, values['configuration_setting_profile_search_request']);
  return {
    type: CONFIGURATION_SETTING_INITIATE_STATE_OF_PAGE,
    payload: values
  };
}
export function addSubmit(values) {
  const action = ((values.id && values.id!="")?EDIT_CONFIGURATION_SETTING:CREATE_CONFIGURATION_SETTING);
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${action}`, values);
  return {
    type: CONFIGURATION_SETTING_ENTITY_ADD_REQUEST,
    payload: request,
  };
}
export function search(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_CONFIGURATION_SETTING}`, values);
  return {
    type: CONFIGURATION_SETTING_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}

export function doCloseDetailsModal(values) {
  return {
    type: CONFIGURATION_SETTING_TOGGLE_DETAILS_MODAL,
    payload: false,
  };
}
export function changeTab(values) {
  return {
    type: CONFIGURATION_SETTING_CHANGE_TAB,
    activeTabId:values.activeTabId
  };
}
export function doOpenDetailsModal(values) {
  return {
    type: CONFIGURATION_SETTING_TOGGLE_DETAILS_MODAL,
    payload: true,
    data:values
  };
}
