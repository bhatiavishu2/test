import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT, HEADER_CONTENT_TYPE_VALUE, SIGNIN_URL, SIGN_IN} from '../';
export const INITIATE_DOWNLINK_API = 'INITIATE_DOWNLINK_API';

export const DOWNLINK_URL='downlink/';

export const INITIATE_TIMESERIES_REPORT = 'Initiate_TimeSeries_Report';

export const SEARCH_UPLINK_DATA = 'uplink/search';

export const TOGGLE_DETAILS_MODAL = 'TOGGLE_DETAILS_MODAL';

axios.defaults.baseURL = ROOT_URL;
//axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = HEADER_CONTENT_TYPE_VALUE;

export function search(values, callback) {

    const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_UPLINK_DATA}`, values);
    return {
      type: INITIATE_TIMESERIES_REPORT,
      payload: request
    };
//.then(res => {console.log(res)});

}
export function doCloseDetailsModal() {
  return {
    type: TOGGLE_DETAILS_MODAL,
    payload: false
  };
}
export function doOpenDetailsModal(values) {
  return {
    type: TOGGLE_DETAILS_MODAL,
    payload: true,
    data:values
  };
}
export function downlink(values, callback) {
  const devId = values['devid'];
  const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${DOWNLINK_URL}`, values['data']);
  return {
    type: INITIATE_DOWNLINK_API,
    payload: request
  };
}
