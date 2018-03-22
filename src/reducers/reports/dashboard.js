import _ from 'lodash';
import { INITIATE_DASHBOARD_API } from '../../actions/reports/dashboard';
import { PROMISE_LOADER_SUFFIX, PROMISE_REJECTED_SUFFIX } from '../../actions/';
import Moment from 'moment';

export default function(state = {}, action) {
  //console.log("action.type "+action);
  //console.log(state);
  switch (action.type) {
    case INITIATE_DASHBOARD_API + PROMISE_LOADER_SUFFIX:
      var aggregated = aggregateDeviceTypeResponse(action.payload.data);
      return { ...state, searchData: action.payload.data, deviceChartData:aggregated[1],labelValue:aggregated[0],loadProfileChartData:aggregateLoadProfileResponse(action.payload.data)};
    default:
      return state;
  }
}

function aggregateDeviceTypeResponse(res) {
  var labelValue = [];
  var chartData = [];
  var aggregated = [];
  if(res) {
    for(var c=0;c<res.deviceStatusResponse.entities.length;c++) {
      var dataObj = res.deviceStatusResponse.entities[c];
      labelValue[dataObj._id.status] = dataObj.count;
      chartData.push({label:dataObj._id.status,value:dataObj.count,});
    }
  }
  aggregated[0]=labelValue;
  aggregated[1]=chartData;
  return aggregated;
}
function aggregateLoadProfileResponse(res) {
  var labelValue = [];
  var chartDataKv = [];
  var chartDataKw = [];
  var aggregated = [];

  if(res && res.loadProfileResponse) {
    for(var c=0;c<res.loadProfileResponse.entities.length;c++) {
      var dataObj = res.loadProfileResponse.entities[c];
      labelValue.push(new Moment(new Date(dataObj._id.load_profile_start_time)).format('LT'));
      chartDataKv.push(dataObj.total_kvah+Math.random());
      chartDataKw.push(dataObj.total_kwh+Math.random());
      if(c==48) break;
    }
  }
  var lineChartData = {
			labels: labelValue,
			datasets: [{
				label: 'kvah',
				//borderColor: "#FF0000",
				//backgroundColor: window.chartColors.red,
				fill: false,
				data: chartDataKv,
				yAxisID: 'y-axis-1',
        fillColor: "rgba(255,255,255,0)",
        strokeColor: "rgba(255,152,0,1)",
        pointColor: "rgba(255,152,0,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
			}, {
				label: 'kwh',
				borderColor: "#0000FF",
				//backgroundColor: window.chartColors.blue,
				fill: false,
				data: chartDataKw,
				yAxisID: 'y-axis-2',
        fillColor: "rgba(255,255,255,0)",
        strokeColor: "rgba(1,178,172,1)",
        pointColor: "rgba(1,178,172,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
			}]
		};
    return lineChartData;
}
