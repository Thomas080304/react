import {combineReducers} from 'redux';
import {RESET_ERROR_MESSAGE} from '../actions/actions';
import {routerReducer} from 'react-router-redux';
import Pagination from './Pagination';
import merge from 'lodash/merge'
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
		return merge({},state,resp.entities);
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
				laketea:{
					"login": "laketea",
					"id": 3827390,
					"avatar_url": "https://avatars0.githubusercontent.com/u/3827390?v=4"
				}
			},
			repos:{
				laketea/front-road:{
					"id": 16634951,
					"name": "front-road",
					"full_name": "laketea/front-road",
					"owner": 'laketea',
					"html_url": "https://github.com/laketea/front-road",
					"description": "最近准备整理复习一下前端这块的知识，所以开个板块准备记录一些笔记··",
					"watchers": 3,
					"default_branch": "master"
				}
			}
		},
		pagination:{
			starredByUser:{
				thomas080304:{
					isFetching:false,
					nextPageUrl:'',
					ids:[
						'laketea/front-road',
						'laketea/front-demo'
					]
				}
			}
			starredByRepo:{}
		},
		errorMessag:null,
		routing:{}
	}
*/


