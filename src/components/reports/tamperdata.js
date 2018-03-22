import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import { tamperData as consumption } from '../../actions/reports/report';
import InputDate  from '../form/InputDate';
import ReportNav  from './report_nav';
import ReportSubNav from './report_sub_nav';
import Moment from 'moment';
import { search as searchPropertyType } from '../../actions/master/property_type';

class TamperReport extends Component {
  componentDidMount() {
    this.initialiseList();
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
      setTimeout(this.initDataTable,200);
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
      if(values['startDate']) {
        request['startDate'] = values['startDate'];
      }
      if(values['endDate']) {
        request['endDate'] = values['endDate'];
      }
      this.props.consumption(request).then(() => {
        setTimeout(this.initDataTable,100);
      });
    }
  dataTable = null;
  initDataTable =function() {
    this.dataTable = $('#tamperList').DataTable({destroy: true, "order": [],dom: 'Bfrtip',title: "tamperReport",
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

renderPosts() {
  if(this.props.consumptionData) {
    const {consumptionData} = this.props;
  return _.map(this.props.consumptionData.entities, data => {
    return (
      <tr key={data.device_id+"_"+data.property_id} data={data}>
        <td>{data.consumer_number}</td>
        <td>{data.property_owner}</td>
        <td>{this.props.propTypeIdNameMap && this.props.propTypeIdNameMap[data.property_type_id] && this.props.propTypeIdNameMap[data.property_type_id].name}</td>
        <td>{data.billing_address}</td>
        <td>{data.device_id}</td>
        <td>{data.device_type}</td>
        <td>{new Moment(data.created_on).format('LLL')}</td>
        <td>{data.m2m_sgn.nev.rep.m2m_cin.con.payloadsUl.data_frame.temper_code}</td>
        <td>{data.m2m_sgn.nev.rep.m2m_cin.con.payloadsUl.data_frame.temper_code.temperResponseType?data.m2m_sgn.nev.rep.m2m_cin.con.payloadsUl.data_frame.temper_code.temperResponseType:data.m2m_sgn.nev.rep.m2m_cin.con.payloadsUl.data_frame.temper_code.identifier}</td>
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
        <ReportSubNav nav="tdr"/>
        <div className="row">&nbsp;</div>
        <div className="row"><h4>Tamper Data Report - {this.props.authentications && <span>{this.props.authentications.selectedDeviceTypeInHeader=="ENERGY-PHASE1"?'ENERGY':this.props.authentications.selectedDeviceTypeInHeader}</span>}</h4></div>
        <div className="row">
        <form onSubmit={this.props.handleSubmit(this.addSubmit.bind(this))}>
          <div className="row formDateLabel">
            <div className="col-xs-4">
              <Field name="startDate" autoComplete="off" className="form-control" placeholder="Start Date" label="Start Date" maxLength="500" component={InputDate} />
            </div>
            <div className="col-xs-4">
              <Field name="endDate" autoComplete="off" className="form-control" placeholder="End Date" label="End Date" maxLength="500" component={InputDate} />
            </div>
            <div className="col-xs-4">
              <div className="form-group">
                <input className="btn btn-primary" type="submit" disabled={submitting} defaultValue="Search" />
              </div>
            </div>
          </div>
        </form>
        </div>
					<div className="row">
						<div className="col-xs-12">
							<div className="OuterTables">
								<div className="table-responsive">
									<table className="table table-striped table-bordered text-center" id="tamperList">
										<thead>
											<tr>
                        <th>Consumer#</th>
                        <th>Owner Name</th>
                        <th>Property Type</th>
                        <th>Billing Address</th>
                        <th>Meter#</th>
                        <th>Meter Type</th>
                        <th>Event Date</th>
                        <th>Event Code</th>
                        <th>Event Description</th>
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
      consumptionData: state.report.searchTamperData,
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
  connect(mapStateToProps, mapDispatchToProps)(TamperReport)
);
