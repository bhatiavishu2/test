import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT} from '../';

export const SEARCH_PROPERTY_PROFILE= 'property_profile/search';
export const CREATE_PROPERTY= 'property/create';
export const EDIT_PROPERTY= 'property/edit';
export const SEARCH_PROPERTY= 'property/search';
export const SEARCH_PROPERTY_TYPE= 'property_type/search';
const SEARCH_UNMAPPED_URL='property/searchUnMapped';

export const PROPERTY_TOGGLE_DETAILS_MODAL = 'PROPERTY_TOGGLE_DETAILS_MODAL';

export const PROPERTY_CHANGE_TAB ="PROPERTY_CHANGE_TAB";

export const PROPERTY_INITIATE_STATE_OF_PAGE ="PROPERTY_INITIATE_STATE_OF_PAGE";
export const PROPERTY_ENTITY_ADD_REQUEST ="PROPERTY_ENTITY_ADD_REQUEST";
export const PROPERTY_ENTITY_SEARCH_REQUEST ="PROPERTY_ENTITY_SEARCH_REQUEST";
export const PROPERTY_TYPE_CHANGE_REQUEST= "PROPERTY_TYPE_CHANGE_REQUEST";
export const PROPERTY_REGISTER_LOCATION_HIERARCHY_VALUES = "PROPERTY_REGISTER_LOCATION_HIERARCHY_VALUES";
export const PROPERTY_SELF_OCCUPIED_CHANGED = "PROPERTY_SELF_OCCUPIED_CHANGED";
export const PROPERTY_UNMAPPED_SEARCH_REQUEST = "PROPERTY_UNMAPPED_SEARCH_REQUEST";

export function initiateState(values) {
  //const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_PROPERTY_PROFILE}`, values['property_profile_search_request']);
  return {
    type: PROPERTY_INITIATE_STATE_OF_PAGE,
    payload: values
  };
}
export function addSubmit(values) {
  const action = ((values.id && values.id!="")?EDIT_PROPERTY:CREATE_PROPERTY);
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${action}`, values);
  return {
    type: PROPERTY_ENTITY_ADD_REQUEST,
    payload: request,
  };
}
export function search(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_PROPERTY}`, values);
  return {
    type: PROPERTY_ENTITY_SEARCH_REQUEST,
    payload: request,
  };
}
export function searchUnMappedProperties(values) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_UNMAPPED_URL}`, values);
  return {
    type: PROPERTY_UNMAPPED_SEARCH_REQUEST,
    payload: request,
  };
}
export function doCloseDetailsModal(values) {
  return {
    type: PROPERTY_TOGGLE_DETAILS_MODAL,
    payload: false,
  };
}
export function changeTab(values) {
  return {
    type: PROPERTY_CHANGE_TAB,
    activeTabId:values.activeTabId
  };
}
export function doOpenDetailsModal(values) {
  return {
    type: PROPERTY_TOGGLE_DETAILS_MODAL,
    payload: true,
    data:values
  };
}
export function propertyTypeChanged(selectedPropertyTyeId) {
  return {
    type: PROPERTY_TYPE_CHANGE_REQUEST,
    payload: selectedPropertyTyeId
  };
}
export function registerLocationHierarchyValues(hierarchyNodeKeys) {
  return {
    type: PROPERTY_REGISTER_LOCATION_HIERARCHY_VALUES,
    payload: hierarchyNodeKeys
  }
}
export function selfOccupiedChanged(value) {
  return {
    type:PROPERTY_SELF_OCCUPIED_CHANGED,
    payload:value
  }
}
