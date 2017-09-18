import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from './containers/App';
import UserPage from './containers/UserPage';


const routes = ()=>{
	return (
		<Route path="/" component={App}>
			<Route path="/:login" component={UserPage}></Route>
		</Route>
	);
};
export default routes();