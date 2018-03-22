import axios from 'axios';

export const FETCH_FEEDS = 'fetch_feeds';
export const SIGN_IN = 'auth/signin';

//export const ROOT_URL = 'https://52.172.44.230/';
//export const ROOT_URL = 'http://52.172.44.230:9009/';
//export const ROOT_URL = 'http://localhost:9009/';
export const ROOT_URL = 'http://52.15.231.62:9009/';
export const PARTICIPANT_CONTEXT = 'iot-utility/';

export const HEADER_CONTENT_TYPE_VALUE = 'application/json';
export const SIGNIN_URL = 'auth/signin';

export const PROMISE_LOADER_SUFFIX="_FULFILLED";
export const PROMISE_REJECTED_SUFFIX="_REJECTED";

export const DEVICE_TYPE_SEARCH_FOR_OPTION = "DEVICE_TYPE_SEARCH_FOR_OPTION";

export const deviceTypeNameIdMap=[];

axios.defaults.baseURL = ROOT_URL;
//axios.defaults.headers.common['authorization'] = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbWxlc2hzaW5oYUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1MTU1NjQ1Mzc2MTAsImV4cCI6MTUxNzk4MzczNywianRpIjoiNWE1NDlhZGM1YzgyNjYzMzc4ZTBhZjkyIn0.rbofmC01v5h_du02I89J_ZfTo5udTv-MibwRO6iflR5s2zjHWqsH831WMFcxTgyW3Sag85ITEb3pBZO-im2ecw';
axios.defaults.headers.post['Content-Type'] = HEADER_CONTENT_TYPE_VALUE;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.data['advertisementid'] = 'web';
    config.data['deviceid'] = 'web';
    config.data['devicetype'] = 'web';
    config.data['gcmorapnsid'] = 'web';
    config.data['source'] = 'web';
    if(localStorage.getItem("sheUserAuth") != null) {
      const sheUserAuth = JSON.parse(localStorage.getItem("sheUserAuth"));
       const token = sheUserAuth.token;
         if (token) {
             config.headers['Authorization'] = token;
             if(sheUserAuth.user_summary.userType!=1) {
               config.data['site_id'] = localStorage.getItem("selectedSiteId");
               config.data['selected_site_id'] = config.data['site_id'];
               config.data['selecetd_customer_id'] = sheUserAuth.user_summary.customerId;
               config.data['customer_id'] = sheUserAuth.user_summary.customerId;
               if(!config.data['deviceType']) {
                 config.data['deviceType'] = localStorage.getItem("selectedDeviceTypeInHeader");
               }
             }
         } else {
             config.headers['Authorization'] = null;
             //if setting null does not remove `Authorization` header then try
            delete config.headers['Authorization'];
             //
         }
     }

    //console.log(config.data);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  /*(function() {

    if(localStorage.getItem("sheUserAuth") != null) {
      const sheUserAuth = JSON.parse(localStorage.getItem("sheUserAuth"));
       const token = sheUserAuth.token;
         if (token) {
             axios.defaults.headers.common['Authorization'] = token;
         } else {
             axios.defaults.headers.common['Authorization'] = null;
             //if setting null does not remove `Authorization` header then try
              // delete axios.defaults.headers.common['Authorization'];
             //
         }
     }
  })();*/
