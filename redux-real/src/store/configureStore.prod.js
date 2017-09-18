import React from 'react';
import {
	createStore,
	applyMiddleware} from 'redux';
import RootReducer from '../reducers/RootReducer';
import thunk from 'redux-thunk';
import api from '../middleware/api';

function configureStore(preloadedState){
	const store = createStore(
		RootReducer,
		preloadedState,
		applyMiddleware(thunk,api)
	);

	return store;
}
export default configureStore;

/*
	function(action){
		if(typeof action === 'function'){
			return action(dispatch,getState,extraArgument);
		}
		return (
			function acionFnWrap(action){
				const callAPI = action[CALL_API];
				if(typeof callAPI === 'undefined'){
					return (
						function(action){
							store.dispatch(action);
						}
					)(action);
				}
				//
			}
		)(action);
	}
*/