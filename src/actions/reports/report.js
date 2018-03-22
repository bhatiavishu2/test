import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT, HEADER_CONTENT_TYPE_VALUE, SIGNIN_URL, SIGN_IN} from '../';
export const INITIATE_CONSUMPTION_REPORT = 'INITIATE_CONSUMPTION_REPORT';
export const INITIATE_CONSUMPTION_PATTERN_REPORT = 'INITIATE_CONSUMPTION_PATTERN_REPORT';

export const INITIATE_TAMPER_REPORT = 'INITIATE_TAMPER_REPORT';

export const SEARCH_CONSUMPTION_DATA = 'report/consumption';
export const SEARCH_CONSUMPTION_PATTERN_DATA = 'report/consumptionPattern';
export const SEARCH_TAMPER_DATA = 'report/tamperData';

axios.defaults.baseURL = ROOT_URL;
//axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = HEADER_CONTENT_TYPE_VALUE;

export function consumption(values, callback) {

    const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_CONSUMPTION_DATA}`, values);
    return {
      type: INITIATE_CONSUMPTION_REPORT,
      payload: request
    };
}
export function consumptionPattern(values, callback) {

    const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_CONSUMPTION_PATTERN_DATA}`, values);
    return {
      type: INITIATE_CONSUMPTION_PATTERN_REPORT,
      payload: request
    };
}

export function tamperData(values, callback) {
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_TAMPER_DATA}`, values);
  return {
    type: INITIATE_TAMPER_REPORT,
    payload: request
  };
}
