import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT} from '../';

export const SEARCH_PROPERTY_LOCATION_TYPE_PROFILE= 'property_location_type_profile/search';
export const CREATE_PROPERTY_LOCATION_TYPE= 'property_location_type/create';
export const EDIT_PROPERTY_LOCATION_TYPE= 'property_location_type/edit';
export const SEARCH_PROPERTY_LOCATION_TYPE= 'property_location_type/search';
export const GET_HIERARCHY= 'property_location_type/hierarchy';
export const SEARCH_PROPERTY_LOCATION_TYPE_TYPE= 'property_location_type_type/search';

export const PROPERTY_LOCATION_TYPE_TOGGLE_DETAILS_MODAL = 'PROPERTY_LOCATION_TYPE_TOGGLE_DETAILS_MODAL';

export const PROPERTY_LOCATION_TYPE_CHANGE_TAB ="PROPERTY_LOCATION_TYPE_CHANGE_TAB";

export const PROPERTY_LOCATION_TYPE_INITIATE_STATE_OF_PAGE ="PROPERTY_LOCATION_TYPE_INITIATE_STATE_OF_PAGE";
export const PROPERTY_LOCATION_TYPE_ENTITY_ADD_REQUEST ="PROPERTY_LOCATION_TYPE_ENTITY_ADD_REQUEST";
export const PROPERTY_LOCATION_TYPE_ENTITY_SEARCH_REQUEST ="PROPERTY_LOCATION_TYPE_ENTITY_SEARCH_REQUEST";
export const PROPERTY_LOCATION_TYPE_ADD_ROW_REQUEST ="PROPERTY_LOCATION_TYPE_ADD_ROW_REQUEST";

export const PROPERTY_LOCATION_TYPE_CHANGE_TEXT_REQUEST ="PROPERTY_LOCATION_TYPE_CHANGE_TEXT_REQUEST";
export const PROPERTY_LOCATION_TYPE_REMOVE_ROW_REQUEST ="PROPERTY_LOCATION_TYPE_REMOVE_ROW_REQUEST";
export const PROPERTY_TYPE_FLAT_HIERARCHY_MAP_REQUEST ="PROPERTY_TYPE_FLAT_HIERARCHY_MAP_REQUEST";

export function initiateState(values) {
  //const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_PROPERTY_LOCATION_TYPE_PROFILE}`, values['property_location_type_profile_search_request']);
  return {
    type: PROPERTY_LOCATION_TYPE_INITIATE_STATE_OF_PAGE,
    payload: values
  };
}
export function addSubmit(values) {
  const action = ((values.id && values.id!="")?EDIT_PROPERTY_LOCATION_TYPE:CREATE_PROPERTY_LOCATION_TYPE);
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${action}`, values);
  return {
    type: PROPERTY_LOCATION_TYPE_ENTITY_ADD_REQUEST,
    payload: request,
  };
}
export function search(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_PROPERTY_LOCATION_TYPE}`, values);
  return {
    type: PROPERTY_LOCATION_TYPE_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}
export function hierarchy(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${GET_HIERARCHY}`, values);
  return {
    type: PROPERTY_TYPE_FLAT_HIERARCHY_MAP_REQUEST,
    payload: request,
  };
}
export function doCloseDetailsModal(values) {
  return {
    type: PROPERTY_LOCATION_TYPE_TOGGLE_DETAILS_MODAL,
    payload: false,
  };
}
export function changeTab(values) {
  return {
    type: PROPERTY_LOCATION_TYPE_CHANGE_TAB,
    activeTabId:values.activeTabId
  };
}
export function doOpenDetailsModal(values) {
  return {
    type: PROPERTY_LOCATION_TYPE_TOGGLE_DETAILS_MODAL,
    payload: true,
    data:values
  };
}
export function addNewRow(rowValue) {
  return {
    type: PROPERTY_LOCATION_TYPE_ADD_ROW_REQUEST,
    payload: rowValue,
  };
}
export function changeTextInHierachy(rowValue) {
  return {
    type: PROPERTY_LOCATION_TYPE_CHANGE_TEXT_REQUEST,
    payload: rowValue,
  };
}
export function removeRow(rowValue) {
  return {
    type: PROPERTY_LOCATION_TYPE_REMOVE_ROW_REQUEST,
    payload: rowValue,
  };
}
