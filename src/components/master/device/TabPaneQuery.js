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

class TabPaneQuery extends Component {
  constructor(props) {
    super(props);
    let timer = null;
  }
  componentDidMount() {
    this.props.initializer();
  }


renderPosts() {
  //const {callDownlinkAPI} = this;
  if(this.props.downlinkQueryData) {
  return _.map(this.props.downlinkQueryData, data => {
    return (
      <tr key={data._id.counter} id={data._id.counter}>
        <td>{data.property_type_id}</td>
        <td>{data.consumer_number}</td>
        <td>{data.property_address}</td>
        <td>{data.user.userName}</td>
        <td>{data.crdt}</td>
        <td>{data.response["m2m:cin"]["con"]["payload_dl"]["payload_dl"]["confirmed"]?"Recieved":"Pending"}</td>
        <td>Response</td>
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
									<table className="table table-striped table-bordered text-center" id="deviceQueryList">
										<thead>
											<tr>
                        <th>Property Type</th>
                        <th>Consumer#</th>
                        <th>Property Address</th>
                        <th>Command Sent DateTime</th>
                        <th>Command Sent By</th>
                        <th>Command Status</th>
                        <th>Response</th>
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
      downlinkQueryData: state.device.downlinkQueryData,
      showDownloadSuccessCommand:state.device.showDownloadSuccessCommand
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({search:search, downlink: downlink},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TabPaneQuery);
