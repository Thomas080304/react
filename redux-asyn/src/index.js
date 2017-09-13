import React from 'react';
import ReactDom from 'react-dom';
import {
	createStore,
	applyMiddleware,
	combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
//actions
//reducers
//app
import {filter,result} from './reducers';
import App from './containers/App';
const reducers = combineReducers({filter,result});

function m1({getState,dispatch}){
	return function(next){
		return function(action){
			return next(action);
		}
	}
}
const store = createStore(
	reducers,
	/*preloadState,*/
	applyMiddleware(thunk,m1)
);

ReactDom.render(
	<Provider store={store}>
		<div className="root-wrap">
			<App />
		</div>
	</Provider>,
	document.getElementById('root')
);