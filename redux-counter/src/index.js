import React from 'react';
import ReactDom from 'react-dom';
import {
	createStore,
	applyMiddleWare,
	combineReducer} from 'redux';
import reducer from './reducers/reducer';
import Counter from './components/Counter';
import {
	increase,
	decrease} from './actions/action';

const store = createStore(
	reducer
);

function render(){
	ReactDom.render(
		<Counter 
			value={store.getState()} 
			onIncrease={function(){
				store.dispatch(increase());
			}}
			onDecrease={function(){
				store.dispatch(decrease());
			}} />,
		document.getElementById('root')
	);
}

render();

store.subscribe(render);


