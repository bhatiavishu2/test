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
import { search } from '../../../actions/master/role';
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
          {this.props.addResponse &&<SuccessMessage addResponse={this.props.addResponse} entityName="Role"/>}
					<div className="row">
						<div className="col-xs-12">
							<div className="OuterTables">
								<div className="table-responsive">
									<table className="table table-striped table-bordered text-center" id="roleList">
										<thead>
											<tr>
                        <th>Id</th>
                        <th>Name</th>
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
      searchData: state.role.searchData,
      showDownloadSuccessCommand:state.role.showDownloadSuccessCommand
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({search:search},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TabPaneList);
