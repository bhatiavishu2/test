import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import TableHeader from '../common/TableHeader';
import {doOpenPropertyMapModal} from '../../../actions/master/device';

class TabPanePropertyMapList extends Component {
  constructor(props) {
    super(props);
    let timer = null;
  }
  componentDidMount() {
    this.props.initializer();
  }


renderPosts() {
  const {doOpenPropertyMapModal} = this.props;
  if(this.props.searchData) {
  return _.map(this.props.searchData.entities, data => {
    return (
      <tr key={data.id} id={data.id}>
        <td>{data.id}</td>
        <td>{this.props.propTypeIdNameMap && this.props.propTypeIdNameMap[data.property_type_id].name}</td>
        <td>{data.location_values.locationvalues_0}</td>
        <td>{data.owner_name}</td>
        <td>{data.occupant_name}</td>
        <td>{data.status}</td>
        <td>{data.assigned_device_id}</td>
        <td>{data.consumer_number}</td>
        <td>
        <a className="viewList" href="#" onClick={()=>doOpenPropertyMapModal(data)}>
        attach
        </a>
        </td>
      </tr>
    );
  });
  }
}

  render(){
      return (
				<div className={this.props.className}>
        <div className="row page-titles gapZeros withoutbg">
          <div className="col-xs-12 col-sm-12">
          </div>
        </div>
					<div className="row">
						<div className="col-xs-12">
							<div className="OuterTables">
								<div className="table-responsive">
									<table className="table table-striped table-bordered text-center" id="propertyList">
										<thead>
											<tr>
                        <th>Property Id</th>
                        <th>Property Type</th>
                        <th>Billing Address</th>
                        <th>Owner Name</th>
                        <th>Occupant Name</th>
                        <th>Status</th>
                        <th>Device Id</th>
                        <th>Consumer No</th>
                        <th>Action</th>
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

      );
  }
}
function mapStateToProps(state) {
  //console.log(state);
  return {
      authentications: state.authentications,
      searchData: state.property.searchData,
      propTypeIdNameMap: state.property_type.propTypeIdNameMap,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({doOpenPropertyMapModal:doOpenPropertyMapModal},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TabPanePropertyMapList);
