import _ from 'lodash';
import { INITIATE_TIMESERIES_REPORT, TOGGLE_DETAILS_MODAL, INITIATE_DOWNLINK_API } from '../../actions/reports/timeseries';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../../actions/';

export default function(state = {}, action) {
  //console.log("action.type "+action);
  //console.log(state);
  switch (action.type) {
    case INITIATE_TIMESERIES_REPORT + PROMISE_LOADER_SUFFIX:
      return { data: action.payload,showDetailsModal:false, showSuccessCommand:false };
    case TOGGLE_DETAILS_MODAL:
      return {...state, showDetailsModal:action.payload, selectedData:action.data, showSuccessCommand:false};
    case INITIATE_DOWNLINK_API+ PROMISE_LOADER_SUFFIX:
     return {...state, showSuccessCommand:true};
    default:
      return state;

  }
}
