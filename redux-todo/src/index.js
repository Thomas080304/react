import React from 'react';
import ReactDom from 'react-dom';
import {
	createStore,
	applyMiddleware,
	combineReducers} from 'redux';
import {Provider} from 'react-redux';
//reducers
//actions
//components
import {todos,filter} from './reducers';
import App from './components/App';
const reducers = combineReducers({filter,todos});

function m1({getState,dispatch}) {
	return function(next){
		return function(action){
			console.log('todo-actions-m1',action);
			next(action);
		}
	}
}
function m2({getState,dispatch}) {
	return function(next){
		return function(action){
			console.log('todo-actions-m2',action);
			next(action);
		}
	}
}
const store = createStore(
	reducers,
	/*preloadState,*/
	applyMiddleware(m1,m2)
);

ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);