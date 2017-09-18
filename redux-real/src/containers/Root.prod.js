import React from 'react';
import PropTypes from 'prop-types';
import {Provider,connect} from 'react-redux';
import {Router} from 'react-router';
import routers from '../routers';

function Root(props){
	const {store,history} = props;
	return (
		<Provider store={store}>
			<Router 
				history={history}
				routes = {routers}></Router>
		</Provider>
	);
}
Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};
export default Root;