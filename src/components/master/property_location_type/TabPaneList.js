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
import { search } from '../../../actions/master/property_location_type';
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
          {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="PropertyLocationType"/>}
					<div className="row">
						<div className="col-xs-12">
							<div className="OuterTables">
								<div className="table-responsive">
									<table className="table table-striped table-bordered text-center" id="property_location_typeList">
										<thead>
											<tr>
                        <th>Property Type</th>
                        <th>Hierarchy Root</th>
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
      searchData: state.property_location_type.searchData,
      showDownloadSuccessCommand:state.property_location_type.showDownloadSuccessCommand
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({search:search},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TabPaneList);
