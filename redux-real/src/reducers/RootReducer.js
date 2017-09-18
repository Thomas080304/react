import {combineReducers} from 'redux';
import {RESET_ERROR_MESSAGE} from '../actions/actions';
import {routerReducer} from 'react-router-redux';

const entities = function(
	state={users:{},repos:{}},
	action){
	const {resp} = action;
	if(resp&&resp.entities){
		return Object.assign({},state,resp.entities);
	}
	return state;
};
const errorMessag = function(state=null,action){
	const {type,msg} = action;
	if(type===RESET_ERROR_MESSAGE){
		return null;
	}else if(msg){
		return msg;
	}
	return state;
};
const RootReducer = combineReducers({
	entities,
	errorMessag,
	routing:routerReducer
});
export default RootReducer;
/*
	{
		entities:{
			users:{},
			repos:{}
		},
		pagination:{},
		errorMessag:null,
		routing:{}
	}
*/


