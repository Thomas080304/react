import React from 'react';
import ReactDom from 'react-dom';
import {
	createStore,
	applyMiddleware,
	combineReducers} from 'redux';
import count from './reducers/reducer';
import Counter from './components/Counter';
import {
	increase,
	decrease} from './actions/action';
/**
 * 1.
 *	const reducer = function(state,action){...}
 *	const store = createStore(reducer); 
 * 2.
 *	const reducer = function(state,action){...}
 *	const reducers = combineReducers({reducer});
 *	const store = createStore(reducers);
 *----------------------------------------------
 *	createStore
```javascript
export const ActionTypes = {
  INIT: '@@redux/INIT'
}
function createStore(reducers,preloadState){
	let currentReducer = reducers;
	let currentState = preloadState;

	function dispatch(action){
		try{
			currentState = currentReducer(currentState,action);
		}catch(e){
			
		}
		//return action很重要
		return action;
	}

	dispatch({type:ActionTypes.INIT});

	return {dispatch};

}
```
 *----------------------------------------------
 * combineReducers
```javascript
function combineReducers(reducers){

// {
// 	count:function(state,action){...},
// 	name:function(state,action){...}
// }
	const reducerKeys = Object.keys(reducers);
	const finalReducer = {};
	for(let i = 0; i < reducerKeys.length; i++){
		const key = reducerKeys[i];
		finalReducer[key] = reducers[key];
	}
	const finalReducerKeys = Object.keys(finalReducer);
	return function(state={},action){
		let hasChanged = false;
		const nextState = {};
		for(let i = 0; i < finalReducerKeys.length; i++){
			const key = finalReducerKeys[i];
			const reducer = finalReducer[key];
			const previousStateForKey = state[key];
			const nextStateForKey = reducer(previousStateForKey,action);
			if (typeof nextStateForKey === 'undefined'){
				throw new Error('get undefined state for key:',key);
			}
			nextState[key] = nextStateForKey;
			hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
		}
		return hasChanged ? nextState : state;
	};
}
```
 */
function m1(param){
	const {getState,dispatch} = param;
	console.log('m1---',param);
	return function m1In(next){
		console.log('m1before-----next: ',next);
		return function(action){
			console.log('m1-----action: ',action);
			console.log('m1-----next: ',next);
			next(action);
		}
	}
}
function m2(param){
	const {getState,dispatch} = param;
	console.log('m2---',param);
	// const middlewareAPI = {
 	//		getState: store.getState,
 	//      dispatch: (action) => dispatch(action)
 	// }
	//chain = middlewares.map(middleware => middleware(middlewareAPI))
	return function m2In(next){
		console.log('m2before-----next: ',next);
		return function(action){
			console.log('m2-----action: ',action);
			console.log('m2-----next: ',next);
			next(action);
		}
	}
}
/**
```javascript
function m2In(next){
	return function(action){
		
	}
}
function m1In(next){
	return function(action){
		
	}
}
compose([m1,m2]);
[m1In,m2In].reduce(function(m1,m2){
	return function reduceRes(){
		const next = m2.apply(undefined,arguments);
		return m1(next)
	}
});

function reduceRes(store.dispatch){
	const next = m2.apply(undefined,arguments);
	return m1(next)
}
```
**/
const reducers = combineReducers({count});
const store = createStore(
	reducers,
	//preloadState
	applyMiddleware(m1,m2)
);
/**
 *---------------------------------------------
 *	enhancer <----- createStore
 *	
 *
 *
 **/
/*function createStore(reducers,preloadState,enhancer){
	return enhancer(createStore)(reducers,preloadState,enhancer);
}
//1.猜测enhancer
function enhancer(createStore){

	return function(reducers,preloadState,enhancer){
		const store = createStore(reducers,preloadState,enhancer);
		//增强dispatch的功能
		//替换dispatch
		return {
			...store,
			dispatch
		}
	}
}
//2.猜测增强dispatch

//所有的enhanceDispatch拿到的都是同一个store的
//getState和dispatch
function enhanceDispatch(getState,dispatch){

	return function enhance1(enhanceAction){

	}
}*/



function dispatchCust(enhanceAction){
	let nextAction = null;
	if(typeof enhanceAction === 'function'){
		nextAction = enhanceAction();
	}else{
		dispatch(action);
	}
}




function render(){
	ReactDom.render(
		<Counter
			state={store.getState()} 
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


