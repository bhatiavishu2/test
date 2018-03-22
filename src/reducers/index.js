import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import timeseries from './reports/timeseries';
import AuthenticationsReducers from './authentications';
import { loadingBarReducer } from 'react-redux-loading-bar';
import  device from './master/device';
import  property_type from './master/property_type';
import  property from './master/property';
import  user from './master/user';
import  site from './master/site';
import  device_profile from './master/device_profile';
import  customer from './master/customer';
import  configuration_setting from './master/configuration_setting';
import {MASTER_ENTITY_ADD_REQUEST, PROMISE_LOADER_SUFFIX} from '../actions/';
import {CUSTOMER_ENTITY_ADD_REQUEST} from '../actions/master/customer';
import {SITE_ENTITY_ADD_REQUEST} from '../actions/master/site';
import {DEVICE_PROFILE_ENTITY_ADD_REQUEST} from '../actions/master/device_profile';
import {ROLE_ENTITY_ADD_REQUEST} from '../actions/master/role';
import {PROPERTY_ENTITY_ADD_REQUEST, PROPERTY_REGISTER_LOCATION_HIERARCHY_VALUES} from '../actions/master/property';
import {PROPERTY_TYPE_ENTITY_ADD_REQUEST} from '../actions/master/property_type';
import {DEVICE_ENTITY_ADD_REQUEST} from '../actions/master/device';
import {USER_ENTITY_ADD_REQUEST, USER_CHANGE_TAB} from '../actions/master/user';
import  role from './master/role';
import  property_location_type from './master/property_location_type';
import dashboard from './reports/dashboard';
import report from './reports/report';

const rootReducer = combineReducers({
  device: device,
  timeseries: timeseries,
  property:property,
  user:user,
  site:site,
  device_profile:device_profile,
  customer:customer,
  configuration_setting:configuration_setting,
  property_type: property_type,
  authentications: AuthenticationsReducers,
  loadingBar: loadingBarReducer,
  role:role,
  property_location_type:property_location_type,
  dashboard:dashboard,
  report:report,

  form: formReducer.plugin({
    CustomerTabPaneAdd: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case CUSTOMER_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
          if(action.payload.request.responseURL.indexOf("/create")>0) {
            return undefined;       // <--- blow away form data
          }
          return state;
        default:
          return state;
      }
    },
    DeviceProfileTabPaneAdd: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case DEVICE_PROFILE_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
          if(action.payload.request.responseURL.indexOf("/create")>0) {
            return undefined;       // <--- blow away form data
          }
          return state;
        default:
          return state;
      }
    },
    PropertyTabPaneAdd: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case PROPERTY_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
          if(action.payload.request.responseURL.indexOf("/create")>0) {
            return undefined;       // <--- blow away form data
          }
          return state;
        case PROPERTY_REGISTER_LOCATION_HIERARCHY_VALUES:
          var values = jQuery.extend(true, {}, state.values);
          for(var cnt in action.payload) {
            values[action.payload[cnt]]="";
          }
          return {...state,values:values};
        default:
          return state;
      }
    },
    ProprtTypeTabPaneAdd: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case PROPERTY_TYPE_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
          if(action.payload.request.responseURL.indexOf("/create")>0) {
            return undefined;       // <--- blow away form data
          }
          return state;
        default:
          return state;
      }
    },
    RoleTabPaneAdd: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case ROLE_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
          if(action.payload.request.responseURL.indexOf("/create")>0) {
            return undefined;       // <--- blow away form data
          }
          return state;
        default:
          return state;
      }
    },
    SiteTabPaneAdd: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case SITE_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
          if(action.payload.request.responseURL.indexOf("/create")>0) {
            return undefined;       // <--- blow away form data
          }
          return state;
        default:
          return state;
      }
    },
    DeviceTabPaneAdd: (state, action) => { // <------ 'account' is name of form given to reduxForm()

      switch(action.type) {
        case DEVICE_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
          if(action.payload.request.responseURL.indexOf("/create")>0) {
            return undefined;       // <--- blow away form data
          }
          return state;
        default:
          return state;
      }
    },
    UserTabPaneAdd: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case USER_ENTITY_ADD_REQUEST + PROMISE_LOADER_SUFFIX:
          if(action.payload.request.responseURL.indexOf("/create")>0) {
            return undefined;       // <--- blow away form data
          }
          return state;
        case USER_CHANGE_TAB:
          //console.log("hello ----------")
          return {
            ...state,
            values: undefined,
          };
        default:
          return state;
      }
    }
  })
,
});

export default rootReducer;

export const getErrorMessage = function(action) {
  let msg = "";
  if(action.payload && action.payload.response && action.payload.response.data) {
    msg = "ERROR:"+action.payload.response.data.error;
    let c =0;
    if(action.payload.response.data.errors) {
      for(c=0;c<action.payload.response.data.errors.length;c++) {
        const er = action.payload.response.data.errors[c];
        msg = msg+"|"+er.defaultMessage;
      }
    }
  }
  return msg;
}
