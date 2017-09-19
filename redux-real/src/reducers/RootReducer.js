import {combineReducers} from 'redux';
import {RESET_ERROR_MESSAGE} from '../actions/actions';
import {routerReducer} from 'react-router-redux';
import Pagination from './Pagination';
import {
	STARRED_REQUEST,
	STARRED_SUCCESS,
	STARRED_FAILURE
} from '../actions/actions';

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

const pagination = combineReducers({
	starredByUser:Pagination({
		mapActionToKey:function(action){ return action.login; },
		types:[STARRED_REQUEST,STARRED_SUCCESS,STARRED_FAILURE]
	})
});
const RootReducer = combineReducers({
	entities,
	errorMessag,
	pagination,
	routing:routerReducer
});
export default RootReducer;
/*
	{
		entities:{
			users:{
				thomas080304:{login,id},
				laketea:{login,id}
			},
			repos:{
				laketea/front-road:{id,name,owner},
				js-cookie/js-cookie:{id,name,owner}
			}
		},
		pagination:{
			starredByUser:{
				thomas080304:{
					isFetching:false,
					nextPageUrl:'',
					ids:[]
				}
			}
			starredByRepo:{}
		},
		errorMessag:null,
		routing:{}
	}
*/


