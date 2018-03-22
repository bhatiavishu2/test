import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import TableHeader from '../common/TableHeader';
import EntitySearchBox from '../common/EntitySearchBox';
import { search, downlink } from '../../../actions/master/device';
import ShowData from './ShowData';

class TabPaneList extends Component {
  constructor(props) {
    super(props);
    let timer = null;
  }
  componentDidMount() {
    this.props.initializer();
  }


callDownlinkAPI(data) {
  if(confirm('Are you sure to get instantaneous data for device id '+data.device_id+'?')) {
    const values= {devid:data.device_id,data:{ "m2m:cin" : { "ty":4, "cnf":"text/plain:0", "cs":300, "con": "{\"payload_dl\":{\"deveui\":\""+data.device_id+"\",\"port\":2,\"confirmed\":true,\"data\":\"Ag==\",\"on_busy\":\"fail\",\"tag\":\"981500001110632\"}}" } }};
    this.props.downlink(values, () => {});
  }
}
callDetachAPI(data) {
  if(confirm('Are you sure to get detach data for device id '+data.device_id+'?')) {
    const values= {devid:data.device_id,data:{ "m2m:cin" : { "ty":4, "cnf":"text/plain:0", "cs":300, "con": "{\"payload_dl\":{\"deveui\":\"3cc1f60500000342\",\"port\":2,\"confirmed\":true,\"data\":\"Ag==\",\"on_busy\":\"fail\",\"tag\":\"981500001110632\"}}" } }};
    //this.props.downlink(values, () => {});
  }
}
renderPosts() {
  //const {callDownlinkAPI} = this;
  if(this.props.searchData) {
  return _.map(this.props.searchData.entities, data => {
    return (
      <ShowData key={data.id} data={data} downink={() => this.callDownlinkAPI(data)} detach={()=>this.callDetachAPI(data)}/>
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
					{/*<EntitySearchBox/>*/}
          { this.props.showDownloadSuccessCommand && (
            <div className="row success">
              <div className="col-xs-12">
                  <span className="label-success">
                    Downlink Command Sent Successfully.
                  </span>
              </div>
            </div>
          )
          }
          {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="Device"/>}
					<div className="row">
						<div className="col-xs-12">
							<div className="OuterTables">
								<div className="table-responsive">
									<table className="table table-striped table-bordered text-center" id="deviceList">
										<thead>
											<tr>
                        <th>Device Profile</th>
                        <th>Device Type</th>
                        <th>Device Id</th>
                        <th>Serial No.</th>
                        <th>Active Status</th>
                        <th>Device Status</th>
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
      searchData: state.device.searchData,
      showDownloadSuccessCommand:state.device.showDownloadSuccessCommand
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({search:search, downlink: downlink},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TabPaneList);
