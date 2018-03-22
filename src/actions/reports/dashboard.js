import axios from 'axios';

import { ROOT_URL, PARTICIPANT_CONTEXT, HEADER_CONTENT_TYPE_VALUE, SIGNIN_URL, SIGN_IN} from '../';
export const INITIATE_DASHBOARD_API = 'INITIATE_DASHBOARD_API';

export const SEARCH_DASHBOARD_DATA = 'report/dashboard';

axios.defaults.baseURL = ROOT_URL;
//axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = HEADER_CONTENT_TYPE_VALUE;

export function search(values, callback) {

    const request = axios.post(`${ROOT_URL}${PARTICIPANT_CONTEXT}${SEARCH_DASHBOARD_DATA}`, values);
    return {
      type: INITIATE_DASHBOARD_API,
      payload: request
    };
}
