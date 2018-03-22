import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';

import { loadingBarMiddleware } from 'react-redux-loading-bar';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import { Redirect } from 'react-router';

import HeaderView from './components/layout/header';
import HeaderCustomerView from './components/layout/header_customer'
import FooterView from './components/layout/footer';
import InitiateStore from './components/common/initiate_store';
import LoginIndex from './components/common/login_index';
import SignOut from './components/common/signout';
import EnsureLoggedInContainer from './components/common/ensured_loggedin_container';

import ReportTimeSeriesEnergy from './components/reports/time_series_energy';
import ReportTimeSeriesGas from './components/reports/time_series_gas';
import ReportTimeSeriesWater from './components/reports/time_series_water';
import ReportTimeSeries from './components/reports/time_series';
import LoadingBar from 'react-redux-loading-bar';
import DeviceAdmin from './components/master/device/DeviceAdmin';
import PropertyTypeAdmin from './components/master/property_type/PropertyTypeAdmin';
import PropertyAdmin from './components/master/property/PropertyAdmin';
import UserAdmin from './components/master/user/UserAdmin';
import SiteAdmin from './components/master/site/SiteAdmin';
import DeviceProfileAdmin from './components/master/device_profile/DeviceProfileAdmin';
import CustomerAdmin from './components/master/customer/CustomerAdmin';
import ConfigurationSettingAdmin from './components/master/configuration_setting/ConfigurationSettingAdmin';
import RoleAdmin from './components/master/role/RoleAdmin';
import PropertyLocationTypeAdmin from './components/master/property_location_type/PropertyLocationTypeAdmin';
import DashBoard from './components/reports/dashboard/index';
import ConsumptionReport from './components/reports/consumption';
import ConsumptionPatternReport from './components/reports/consumptionPattern';
import TamperReport from './components/reports/tamperdata';

const createStoreWithMiddleware = compose(applyMiddleware(
	promiseMiddleware(), // resolves promises
	loadingBarMiddleware(), // manages loading bar
	createLogger(), // log actions in console
))(createStore);
export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(

	<Provider store={store}>

		<BrowserRouter>
			<div>
				<InitiateStore />
				<LoadingBar showFastActions />
				<HeaderCustomerView />
				<div >
					<div >
						<Switch>
							<Route path="/timeseries" component={ReportTimeSeries} />
							<Route path="/manage/devices" component={DeviceAdmin} />
							<Route path="/manage/property_type" component={PropertyTypeAdmin} />
							<Route path="/manage/property" component={PropertyAdmin} />
							<Route path="/manage/user" component={UserAdmin} />
							<Route path="/manage/site" component={SiteAdmin} />
							<Route path="/manage/device_profile" component={DeviceProfileAdmin} />
							<Route path="/manage/customer" component={CustomerAdmin} />
							<Route path="/manage/role" component={RoleAdmin} />
							<Route path="/manage/hierarchy" component={PropertyLocationTypeAdmin} />
							<Route path="/reports/consumption" component={ConsumptionReport} />
							<Route path="/reports/consumption_pattern" component={ConsumptionPatternReport} />
							<Route path="/reports/tamperdata" component={TamperReport} />

							<Route path="/manage/configuration_setting" component={ConfigurationSettingAdmin} />
							<Route path="/dashboard" render={() => (
								store.getState()['authentications']['userAuthenticated'] == true ? (
									<DashBoard />
								) : (
										<Redirect to="/" />
									))} />

							<Route path="/signout" component={SignOut} />
							<Route path="/" component={LoginIndex} />
						</Switch>
					</div>
				</div>
				<FooterView />
			</div>
		</BrowserRouter>

	</Provider>
	, document.querySelector('.outer-container'));
