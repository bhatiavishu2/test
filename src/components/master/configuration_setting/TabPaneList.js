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
import { search } from '../../../actions/master/configuration_setting';
import ShowData from './ShowData';

class TabPaneList extends Component {
  constructor(props) {
    super(props);
    let timer = null;
  }
  componentDidMount() {
    this.props.initializer();
  }


renderPosts() {
  if(this.props.searchData) {
  return _.map(this.props.searchData.entities, data => {
    return (
      <ShowData key={data.id} data={data}/>
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
          {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="ConfigurationSetting"/>}
					<div className="row">
						<div className="col-xs-12">
							<div className="OuterTables">
								<div className="table-responsive">
									<table className="table table-striped table-bordered text-center" id="configuration_settingList">
										<thead>
											<tr>
                        <th>SMTP PWD</th>
                        <th>SMTP HOST</th>
                        <th>SMS SECONDARY USER NAME</th>
                        <th>SMS PRIMARY PROVIDER</th>
                        <th>SMTP SSL ENABLED</th>
                        <th>SMS PRIMARY PORT</th>
                        <th>SMS PRIMARY PWD</th>
                        <th>SMTP USERNAME</th>
                        <th>SMS PRIMARY USER NAME</th>
                        <th>SMS SECONDARY PWD</th>
                        <th>SMTP PORT</th>
                        <th>SMS SECONDARY PORT</th>
                        <th>SMTP MAIL FROM</th>
                        <th>SMS SECONDARY PROVIDER</th>

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
      searchData: state.configuration_setting.searchData,
      showDownloadSuccessCommand:state.configuration_setting.showDownloadSuccessCommand
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({search:search},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TabPaneList);
