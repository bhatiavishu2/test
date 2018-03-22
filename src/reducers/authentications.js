import _ from 'lodash';
import { OPEN_LOGIN_MODAL, INITIATE_AUTH, SIGN_OUT,CHANGE_DEVICE_TYPE_IN_HEADER,USER_SITE_ENTITY_SEARCH_REQUEST,USER_CUSTOMER_ENTITY_SEARCH_REQUEST,USER_ROLE_ENTITY_SEARCH_REQUEST,USER_SELECTED_SITE_CHANGE,SUPER_USER_TO_CUSTOMER_ADMIN_REQUEST, USER_SWITCH_BACK_TO_ADMIN } from '../actions/authentications';
import { SIGN_IN, PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../actions/';
import { SITE_ENTITY_SEARCH_REQUEST } from '../actions/master/site';
import { CUSTOMER_ENTITY_SEARCH_REQUEST } from '../actions/master/customer';


export default function(state = {}, action) {
  //console.log("action.type "+action);
  //console.log(state);
  switch (action.type) {
    case SIGN_IN + PROMISE_LOADER_SUFFIX:
      if(action.payload.status != null && action.payload.status==200 && action.payload.data != null
        && action.payload.data.token !=null && action.payload.data.token != "") {
          localStorage.setItem("sheUserAuth", JSON.stringify(action.payload.data));
          var deviceTypeInHeader = "ENERGY-PHASE1";
          localStorage.setItem("selectedDeviceTypeInHeader", deviceTypeInHeader);
          return {userAuth: action.payload.data, userAuthenticated: true, showLoginFailedMessage:false,selectedDeviceTypeInHeader:"ENERGY-PHASE1"}
      } else {
          return { userAuth: {}, showLoginFailedMessage:true, userAuthenticated: false,selectedDeviceTypeInHeader:"",selectedSites:[],selectedCustomer:[],selectedSiteId:""};
      }
    case SUPER_USER_TO_CUSTOMER_ADMIN_REQUEST + PROMISE_LOADER_SUFFIX:
      if(action.payload.status != null && action.payload.status==200 && action.payload.data != null
        && action.payload.data.token !=null && action.payload.data.token != "") {
          var currentAuthToken = localStorage.getItem("sheUserAuth");
          var currentUserRole = JSON.parse(localStorage.getItem("sheUserAuthRole"));
          localStorage.setItem("sheUserAuthForTclAdmin", currentAuthToken);
          localStorage.setItem("sheUserAuthRoleForTclAdmin", currentUserRole);
          localStorage.setItem("sheUserAuth", JSON.stringify(action.payload.data));
          var deviceTypeInHeader = "ENERGY-PHASE1";
          localStorage.setItem("selectedDeviceTypeInHeader", deviceTypeInHeader);
          return {userAuth: action.payload.data, userAuthenticated: true, showLoginFailedMessage:false,selectedDeviceTypeInHeader:"ENERGY-PHASE1",switchBackToAdmin:true}
      } else {
          return { userAuth: {}, showLoginFailedMessage:true, userAuthenticated: false,selectedDeviceTypeInHeader:"",selectedSites:[],selectedCustomer:[],selectedSiteId:"",switchBackToAdmin:false};
      }
    case SIGN_IN + PROMISE_REJECTED_SUFFIX:
          return { userAuth: {}, showLoginFailedMessage:true, userAuthenticated: false,selectedDeviceTypeInHeader:"",selectedSites:[],selectedCustomer:{},selectedSiteId:""};
    case SIGN_OUT:
          localStorage.removeItem("sheUserAuth");
          localStorage.removeItem("sheUserAuthSites");
          localStorage.removeItem("sheUserAuthCustomer");
          localStorage.removeItem("sheUserAuthRole");
          localStorage.removeItem("selectedSiteId");
          localStorage.removeItem("selectedDeviceTypeInHeader");
          return { userAuth: {}, showLoginFailedMessage:false, userAuthenticated: false,selectedDeviceTypeInHeader:"",selectedSites:[],selectedCustomer:{},selectedSiteId:""};
    case USER_SWITCH_BACK_TO_ADMIN :
      if(localStorage.getItem("sheUserAuthForTclAdmin") != null) {
        var sheUserAuth = JSON.parse(localStorage.getItem("sheUserAuthForTclAdmin"));
        var userRole = JSON.parse(localStorage.getItem("sheUserAuthRoleForTclAdmin"));
        localStorage.removeItem("sheUserAuthForTclAdmin")
        localStorage.removeItem("sheUserAuthRoleForTclAdmin")
        localStorage.removeItem("selectedSiteId");
        localStorage.removeItem("sheUserAuthCustomer");
        localStorage.removeItem("sheUserAuthSites")
        localStorage.removeItem("selectedDeviceTypeInHeader");
        localStorage.setItem("sheUserAuth", JSON.stringify(sheUserAuth));
        localStorage.setItem("sheUserAuthRole", JSON.stringify(userRole));
        let sheUserAuthSites = [];
        let selectedCustomer={};
        let selectedSiteId="";
        return { userAuth: sheUserAuth, userAuthenticated: true, showLoginFailedMessage:false,selectedDeviceTypeInHeader:deviceTypeInHeader,selectedSites:sheUserAuthSites,selectedCustomer:selectedCustomer, userRole:userRole,selectedSiteId:selectedSiteId};
      }
      return { userAuth: {}, showLoginFailedMessage:false, userAuthenticated: false,selectedDeviceTypeInHeader:"",selectedSites:[],selectedCustomer:{},userRole:userRole};
    case INITIATE_AUTH:
      if(localStorage.getItem("sheUserAuth") != null) {
        const sheUserAuth = JSON.parse(localStorage.getItem("sheUserAuth"));
        let sheUserAuthSites = [];
        let selectedCustomer={};
        let selectedSiteId="";
        const userRole = JSON.parse(localStorage.getItem("sheUserAuthRole"));

        if(sheUserAuth.user_summary.userType!=1) {
          sheUserAuthSites = JSON.parse(localStorage.getItem("sheUserAuthSites"));
          selectedCustomer = JSON.parse(localStorage.getItem("sheUserAuthCustomer"));
          selectedSiteId = localStorage.getItem("selectedSiteId");
          var deviceTypeInHeader = "ENERGY-PHASE1";
          if(localStorage.getItem("selectedDeviceTypeInHeader") != null && localStorage.getItem("selectedDeviceTypeInHeader")!='') {
            deviceTypeInHeader = localStorage.getItem("selectedDeviceTypeInHeader")
          } else {
            localStorage.setItem("selectedDeviceTypeInHeader", deviceTypeInHeader);
          }
        }

        return { userAuth: sheUserAuth, userAuthenticated: true, showLoginFailedMessage:false,selectedDeviceTypeInHeader:deviceTypeInHeader,selectedSites:sheUserAuthSites,selectedCustomer:selectedCustomer, userRole:userRole,selectedSiteId:selectedSiteId};
      } else if(state.userAuth && state.userAuth.userAuthenticated){
        return { userAuth: {}, showLoginFailedMessage:false, userAuthenticated: false,selectedDeviceTypeInHeader:"",selectedSites:[],selectedCustomer:{},userRole:userRole};
      }
    case CHANGE_DEVICE_TYPE_IN_HEADER:
      localStorage.setItem("selectedDeviceTypeInHeader", action.payload);
      return {...state, selectedDeviceTypeInHeader:action.payload}

    case SITE_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
    case USER_SITE_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      //console.log("uuuu "+state.userAuth.user_summary.userType);
      if(state.userAuth.user_summary.userType!=-1) {
        //console.log(action.payload.data);
        localStorage.setItem("sheUserAuthSites", JSON.stringify(action.payload.data.entities));
        let selectedSiteId = "";
        for(var count in action.payload.data.entities) {
          if(action.payload.data.entities[count].is_default===true) {
            selectedSiteId = action.payload.data.entities[count].id;
          }
        }
        if(selectedSiteId == "") {//no default site
          selectedSiteId = action.payload.data.entities[0].id
        }
        localStorage.setItem("selectedSiteId", selectedSiteId);
        return {...state, selectedSites:action.payload.data.entities,selectedSiteId:selectedSiteId};
      } else {
        return {...state, selectedSites:[],selectedSiteId:""}
      }

    case CUSTOMER_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
    case USER_CUSTOMER_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      if(state.userAuth.user_summary.userType!=-1) {
        localStorage.setItem("sheUserAuthCustomer", JSON.stringify(action.payload.data.entities[0]));
        return {...state, selectedCustomer:action.payload.data.entities[0]}
      }
      return {...state, selectedCustomer:{}}
    case USER_ROLE_ENTITY_SEARCH_REQUEST + PROMISE_LOADER_SUFFIX:
      localStorage.setItem("sheUserAuthRole", JSON.stringify(action.payload.data.request));
      return {...state, userRole:action.payload.data.request}

    case USER_SELECTED_SITE_CHANGE:
      localStorage.setItem("selectedSiteId", action.payload);
      return {...state,selectedSiteId:action.payload};
    default:
      return state;
  }

}
