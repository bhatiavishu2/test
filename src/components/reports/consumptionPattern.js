import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import { consumptionPattern as consumption } from '../../actions/reports/report';
import InputSelect  from '../form/InputSelect';
import ReportNav  from './report_nav';
import Moment from 'moment';
import ReportSubNav from './report_sub_nav';
import { search as searchPropertyType } from '../../actions/master/property_type';

class ConsumptionPatternReport extends Component {
  monthOptions = [];
  yearOptions = [];
  componentDidMount() {
    this.initialiseList();
    var months = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    for(var c=0;c<months.length;c++) {
      this.monthOptions.push({label:months[c],value:c});
    }
    var y = new Moment(new Date()).year();
    this.yearOptions.push({label:y,value:y});
    this.yearOptions.push({label:y-1,value:y-1});
    this.yearOptions.push({label:y-2,value:y-2});
  }
  componentWillMount() {
    const req = {
      q:"",
      pageNumber:0,
      pageSize:100000,
      sortBy:"createdDate",
      sortDirection:"desc"
    };
    this.props.searchPropertyType(req);
  }
  initialiseList() {
    const request = {
      q:"",
      pageNumber:0,
      pageSize:100000,
      sortBy:"createdDate",
      sortDirection:"desc"
    };
    this.props.consumption(request).then(() => {
      setTimeout(this.initDataTable,500);
    });

    }
    addSubmit(values) {
      const request = {
        q:"",
        pageNumber:0,
        pageSize:100000,
        sortBy:"createdDate",
        sortDirection:"desc"
      };
      if(values['startMonth']) {
        request['startMonth'] = values['startMonth'];
      }
      if(values['startYear']) {
        request['startYear'] = values['startYear'];
      }
      if(values['endMonth']) {
        request['endMonth'] = values['endMonth'];
      }
      if(values['endYear']) {
        request['endYear'] = values['endYear'];
      }
      this.props.consumption(values).then(() => {
        setTimeout(this.initDataTable,100);
      });
    }
  dataTable = null;
  initDataTable =function() {
    this.dataTable = $('#consumptionPatList').DataTable({"order": [],"destroy": true,dom: 'Bfrtip',title: "consumptionPatternReport",
        buttons: [
          {
               extend: 'excelHtml5',
               title: 'consumption report',filename: "consumption report"
           },
           {
               extend: 'csvHtml5',
               title: 'consumption report',filename: "consumption report"
           }
        ]});
  }
  showConsumption(data) {
    if(this.props.consumptionData) {
      return _.map(this.props.consumptionData.columnsToShow, month => {
        return (
          <td key={data.device_id+"_"+data.property_id+"_"+month}>{data["consumption_"+month]}</td>
        );
      });
    }
  }
renderColumns() {
  if(this.props.consumptionData) {
    return _.map(this.props.consumptionData.columnsToShow, data => {
      return (
        <th key={data}>{data}</th>
      );
    });
  }
}
renderPosts() {
  if(this.props.consumptionData) {
    const {consumptionData} = this.props;
    const {propTypeIdNameMap} = this.props;
    //console.log(propTypeIdNameMap);
  return _.map(this.props.consumptionData.entities, data => {
    //console.log(propTypeIdNameMap);
    return (
      <tr key={data.device_id+"_"+data.property_id} data={data}>
        <td>{data.consumer_number}</td>
        <td>{data.property_owner}</td>
        <td>{propTypeIdNameMap && propTypeIdNameMap[data.property_type_id] && propTypeIdNameMap[data.property_type_id].name}</td>
        <td>{data.billing_address}</td>
        <td>{data.device_id}</td>
        <td>{data.device_type}</td>
        {this.showConsumption(data)}

      </tr>
    );
  });
  }
}

  render(){
    const { handleSubmit,submitting } = this.props;
      return (

        <div className="tabContainer">
          <ReportNav nav="report"/>
          <div className="tab-pane" id="report">

				<div className={this.props.className}>
        <div className="row page-titles gapZeros withoutbg">
          <div className="col-xs-12 col-sm-12">
          </div>
        </div>
        <ReportSubNav nav="cpr"/>
        <div className="row">&nbsp;</div>
        <div className="row"><h4>Consumption Pattern Report - {this.props.authentications && <span>{this.props.authentications.selectedDeviceTypeInHeader=="ENERGY-PHASE1"?'ENERGY':this.props.authentications.selectedDeviceTypeInHeader}</span>}</h4></div>
        <div className="row">
        <form onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))}>
          <div className="row">
            <div className="row formDateLabel">
              <div className="col-xs-4">
                <Field name="startMonth" options={this.monthOptions} searchable={false} className="form-control" placeholder="Start Month" label="Start Month" component={InputSelect} />
              </div>
              <div className="col-xs-4">
                <Field name="startYear" options={this.yearOptions} searchable={false} className="form-control" placeholder="Start Month" label="Start Month" component={InputSelect} />
              </div>
            </div>
            <div className="row">
            <div className="col-xs-4">
              <Field name="endMonth" options={this.monthOptions} searchable={false} className="form-control" placeholder="End Month" label="End Month" component={InputSelect} />
            </div>
            <div className="col-xs-4">
              <Field name="endYear" options={this.yearOptions} searchable={false} className="form-control" placeholder="End Year" label="End Year" component={InputSelect} />
            </div>
              <div className="col-xs-4">
                <div className="form-group">
                  <input className="btn btn-primary" type="submit" disabled={submitting} defaultValue="Search" />
                </div>
              </div>
            </div>
          </div>
        </form>
        </div>
					<div className="row">
						<div className="col-xs-12">
							<div className="OuterTables">
								<div className="table-responsive">
									<table className="table table-striped table-bordered text-center" id="consumptionPatList">
										<thead>
											<tr>
                        <th>Consumer#</th>
                        <th>Owner Name</th>
                        <th>Property Type</th>
                        <th>Billing Address</th>
                        <th>Meter#</th>
                        <th>Meter Type</th>
                        {this.renderColumns()}
                      </tr>
										</thead>
										<tbody>
											{this.renderPosts()}
										</tbody>

									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
        </div>
        </div>
      );
  }
}
function mapStateToProps(state) {
  //console.log(state);
  return {
      authentications: state.authentications,
      consumptionData: state.report.consumptionPatternData,
      propTypeIdNameMap: state.property_type.propTypeIdNameMap
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      consumption:consumption,
      searchPropertyType:searchPropertyType
    },dispatch);
}
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  return errors;
}
export default reduxForm({
  validate,
  form: 'consumptionSearch'
})(
  connect(mapStateToProps, mapDispatchToProps)(ConsumptionPatternReport)
);
