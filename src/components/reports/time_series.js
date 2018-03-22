import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators} from 'redux';
import { initiateReport } from '../../actions/reports/timeseries';
import { Redirect } from 'react-router';
import ReportNav  from '../../components/reports/report_nav';
import TimeSeriesTopNav from './timeseries/time_series_top_nav';
import ReportTableHeader from './timeseries/report_table_header';
import ReportNavTitle from './report_title';
import ShowData from './timeseries/show_data';
import DetailModal from './timeseries/detail_modal';
import { search } from '../../actions/reports/timeseries';
import { ROOT_URL, PARTICIPANT_CONTEXT } from '../../actions/index';

class ReportTimeSeries extends Component {
  constructor(props) {
    super(props);
    let timer = null;
  }
  initiateReport() {
    this.props.initiateReport();
  }
  renderPosts() {
    if(this.props.data && this.props.data.data) {
    return _.map(this.props.data.data.entities, data => {
      return (
        <ShowData key={data.id} data={data}/>
      );
    });
  }
  }
  renderPageLink(pageNo) {
    if(this.props.data.data.request.pageNumber == pageNo) {
      return (<span className="disabled">{pageNo+1}</span>);
    } else {
      return (
        <a href="#" onClick={() => this.changePage(pageNo)} value={pageNo}><span>
          {pageNo+1}
        </span></a>
      );
    }
  }
  showNext() {
    if(this.props.data && this.props.data.data && this.props.data.data.request) {
      if(this.props.data.data.request.pageNumber==this.props.data.data.totalPages-1) {
        return (<span className="disabled">Next</span>);
      } else {
        return (
          <a href="#" onClick={() => this.changePage(this.props.data.data.request.pageNumber+1)} value={this.props.data.data.request.pageNumber+1}>
            <span>
              Next
            </span>
          </a>
      );
      }

    } else {
      return (<span className="disabled">Next</span>);
    }
  }
  showPrev() {
    if(this.props.data && this.props.data.data && this.props.data.data.request) {
      if(this.props.data.data.request.pageNumber<=0) {
        return (<span className="disabled">Prev</span>);
      } else {
        return (
        <a href="#" onClick={() => this.changePage(this.props.data.data.request.pageNumber-1)} value={this.props.data.data.request.pageNumber-1}>
          <span>
            Prev
          </span>
        </a>
      );
      }
    } else {
      return (<span className="disabled">Prev</span>);
    }
  }
  renderPages() {
    if(this.props.data && this.props.data.data) {
      const request = this.props.data.data.request;
      const pages = [];
      let startPage = 0;
      if(request['pageNumber']>=5) {
        startPage = request['pageNumber'] - 5 + 1;
      } else {
        startPage = 0;
      }
      let count = 1;

      for(let i=startPage;i<this.props.data.data.totalPages;i++) {
        pages.push(i);
        count++;
        if(count==6) {
          break;
        }
      }
      return _.map(pages, i => {
        return (
          <li key={i}>
            {this.renderPageLink(i)}
          </li>
        );
      });
    }
  }
  showLastPage() {
    if(this.props.data && this.props.data.data) {
      const request = this.props.data.data.request;
      const pages = [];
      let startPage = 0;
      if(request['pageNumber']>=5) {
        startPage = request['pageNumber'] - 5 + 1;
      } else {
        startPage = 0;
      }
      let count = 1;
      let i=startPage;
      for(;i<this.props.data.data.totalPages;i++) {
        pages.push(i);
        count++;
        if(count==6) {
          break;
        }
      }
      if(i<this.props.data.data.totalPages) {
        return(

          <li><a href="#" onClick={() => this.changePage(this.props.data.data.totalPages-1)} value={this.props.data.data.totalPages-1}><span>
            Last
          </span></a></li>
        );
      }

    }
  }
  showFirstPage() {
    if(this.props.data && this.props.data.data) {
      const request = this.props.data.data.request;
      const pages = [];
      let startPage = 0;
      if(request['pageNumber']>=5) {
        startPage = request['pageNumber'] - 5 + 1;
      } else {
        startPage = 0;
      }

      if(startPage>0) {
        return(
          <li><a href="#" onClick={() => this.changePage(0)} value={0}><span>
            First
          </span></a></li>
        );
      }

    }
  }
  renderPageInfo() {
    if(this.props.data && this.props.data.data && this.props.data.data.request) {
      const request = this.props.data.data.request;
      const startPos = (request.pageNumber * request.pageSize) + 1;
      const endPos = (request.pageNumber * request.pageSize) + this.props.data.data.entities.length;
      return (
        <span>
        Showing {startPos}-{endPos} of {this.props.data.data.totalNumberOfRecords} Records From Page# {request.pageNumber+1} Of {this.props.data.data.totalPages} Pages.
        </span>
      );
    }
  }
  changePage(pageNumber) {
    if(this.props.data && this.props.data.data && this.props.data.data.request) {
      const request = this.props.data.data.request;
      request["pageNumber"] = pageNumber;
      this.props.search(request, () => {
        //this.props.history.push('/');
      });
    }
  }
  sortData(sortOn) {
    if(this.props.data && this.props.data.data && this.props.data.data.request) {
      const request = this.props.data.data.request;
      if(request["sortBy"] == sortOn) {
        request["sortDirection"] = request["sortDirection"]=="asc"?"desc":"asc";
      } else {
        request["sortDirection"] = "asc";
      }
      request["sortBy"] = sortOn;
      request["pageNumber"] = 0;
      this.props.search(request, () => {
        //this.props.history.push('/');
      });
    }
  }
  handlePageSizeChange(event) {
    if(this.props.data && this.props.data.data && this.props.data.data.request) {
      const request = this.props.data.data.request;
      request["pageSize"] = event.target.value;
      this.props.search(request, () => {
        //this.props.history.push('/');
      });
    }
  }
  filterResults(event) {
    //const q = event.target.value;
    //console.log("heeloo "+q);
    if(this.props.data && this.props.data.data && this.props.data.data.request) {
      clearTimeout(this.timer);
      const request = this.props.data.data.request;
      request["q"] = event.target.value;
      request["pageNumber"] = 0;
      const doSearch = this.props.search
      this.timer = setTimeout(function () {
          doSearch(request, () => {
            //this.props.history.push('/');
          });

      }, 300);
    }
  }
  getExportLink() {
    if(this.props.data && this.props.data.data && this.props.data.data.request) {
      const request = this.props.data.data.request;
      return ROOT_URL+PARTICIPANT_CONTEXT+"uplink/export?auth="+this.props.authentications.userAuth.token+
        "&deviceType="+request.deviceType+"&daySince="+request.daysSince+"&packetType="+request.packetType+"&q="+request.q+
        "&sortBy="+request.sortBy+"&sortDirection="+request.sortDirection;
    }
    return "#";
  }
  getSortingClass(sortOn) {
    const classNames = "fa fa-sort";
    if(this.props.data && this.props.data.data && this.props.data.data.request) {
      const request = this.props.data.data.request;
      if(request["sortBy"] == sortOn) {
        return "fa fa-sort fa-sort-"+request["sortDirection"];
      }
    }
    return "fa fa-sort";
  }
  renderPageFooter() {
    if(this.props.data && this.props.data.data && this.props.data.data.request && this.props.data.data.entities && this.props.data.data.entities.length>0) {
      return (
        <ul className="pager">
          <li>
            <select onChange={this.handlePageSizeChange.bind(this)} name="page_size" className="pager">
              <option value="10">10</option>
              {/*<option value="20">20</option>*/}
              <option value="25">25</option>
              {/*<option value="40">40</option>*/}
              <option value="50">50</option>
            </select>
          </li>
          <li className="showRecords">{this.renderPageInfo()}</li>
          {this.showFirstPage()}
          <li>{this.showPrev()}</li>
          {this.renderPages()}
          <li>{this.showNext()}</li>
          {this.showLastPage()}
        </ul>
      )
    } else {
      return (
        <span><i className="fa fa-frown-o" aria-hidden="true"></i> No results found.</span>
      )
    }
  }
  render(){
    const { handleSubmit } = this.props;
      return (
        <div className="tabContainer">
          <ReportNav nav="timeseries"/>
          <div className="tab-pane" id="timeseries">
            <TimeSeriesTopNav deviceType={this.props.authentications.selectedDeviceTypeInHeader}/>

            <div className="row page-titles gapZeros withoutbg">
            <a className="btn" href={this.getExportLink()} target="_blank"> Export <i className="fa fa-file-excel-o" aria-hidden="true"></i> </a>
              <div className="col-xs-12 col-sm-3 align-self-center addSearch addSearchTimeSeries">

          				<div className="header-search-form input-group">
        					<input className="form-control" placeholder="Search" type="text" onKeyUp={this.filterResults.bind(this)}/>
        					<span className="input-group-addon" id="searcAll"><span className="ti-search"></span></span>
        				</div>
        			</div>
            </div>

            {/*<ReportNavTitle title={this.props.data?this.props.data.data.deviceTypeLabel:""} title2={this.props.data?this.props.data.data.packetTypeLabel:""} title3={this.props.data?this.props.data.data.daysSinceLabel:""}/>*/}
            <div className="row">
  						<div className="col-xs-12">
    						<div className="OuterTables">
      						<div className="table-responsive">
        						<table className="table table-striped table-bordered text-center">
                      <thead>
                        <tr>
                            <ReportTableHeader heading="DateTime" click={() => this.sortData("createdDate")} addClassNames = {this.getSortingClass("createdDate")} value="createdDate"/>
                            <ReportTableHeader heading="Consumer #"  click={() => this.sortData("consumerNumber")} addClassNames = {this.getSortingClass("consumerNumber")} value="consumerNumber"/>
                            <ReportTableHeader heading="Device Id"  click={() => this.sortData("deviceId")} addClassNames = {this.getSortingClass("deviceId")} value="deviceId"/>
                            <ReportTableHeader heading="Device Status"  click={() => this.sortData("deviceStatus")} addClassNames = {this.getSortingClass("deviceStatus")} value="deviceStatus"/>
                            <ReportTableHeader heading="Packet Type"  click={() => this.sortData("displayPacketType")} addClassNames = {this.getSortingClass("displayPacketType")} value="displayPacketType"/>
                            <ReportTableHeader heading="Consumption"  click={() => this.sortData("consumption")} addClassNames = {this.getSortingClass("consumption")} value="consumption"/>
                            <ReportTableHeader addClassNames = "" heading="Actions" />
                        </tr>
                      </thead>
                      <tbody>
                        {this.renderPosts()}
                      </tbody>
                      <tfoot>
                        <tr>

                            <th colSpan="7" className="text-center">
                                {this.renderPageFooter()}

                          </th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DetailModal/>
        </div>
      );
  }
}
function mapStateToProps(state) {
  //console.log(state);
  return {
      authentications: state.authentications,
      data: state.timeseries.data,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({initiateReport: initiateReport, search: search},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportTimeSeries);
