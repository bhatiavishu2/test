import _ from 'lodash';
import { INITIATE_CONSUMPTION_REPORT,INITIATE_CONSUMPTION_PATTERN_REPORT,INITIATE_TAMPER_REPORT } from '../../actions/reports/report';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../../actions/';

export default function(state = {}, action) {
  //console.log("action.type "+action);
  //console.log(state);
  switch (action.type) {
    case INITIATE_CONSUMPTION_REPORT + PROMISE_LOADER_SUFFIX:
      return { ...state, consumptionData: action.payload.data};
    case INITIATE_CONSUMPTION_PATTERN_REPORT + PROMISE_LOADER_SUFFIX:
      return { ...state, consumptionPatternData: action.payload.data};
    case INITIATE_TAMPER_REPORT + PROMISE_LOADER_SUFFIX:
      return { ...state, searchTamperData: action.payload.data};
    default:
      return state;
  }
}
