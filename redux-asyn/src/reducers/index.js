/*
	{
		filter:'frontend',
		result:{
			frontend:{
				isFetching:true,
				isInvalid:false,
				items:[]
			},
			reactjs:{
				isFetching:false,
				isInvalid:false,
				items:[
					{id:42,title:'Confusion about Flux and Relay'},
					{id:500,title:'Creating a Simple Application Using React JS and Flux Architecture'}
				]
			}
		}
	}
*/
import {
	REQUEST_POST,
	RECEIVE_POST,
	SELECTE_LIST,
	INVALID_LIST} from '../actions';

export const filter = function(state='reactjs',action){
	const {type,payload} = action;
	switch(type){
		case SELECTE_LIST: 
			const {filter} = payload;
			return filter;
		default:
			return state;
	}
};
const setItem = function(
	state={isFetching:false,isInvalid:false,items:[]},
	action){
	
	const {type,payload} = action;
	switch(type){
		case REQUEST_POST:
			return Object.assign(
				{},state,
				{isFetching:true,isInvalid:false}
			);
		case RECEIVE_POST:
			const {items,lastUpdated} = payload;
			return Object.assign(
				{},state,
				{isFetching:false,isInvalid:false,items,lastUpdated}
			);
		case INVALID_LIST:
			return Object.assign(
				{},state,
				{isInvalid:true}
			);
		default:
			return state;
	}
};

export const result = function(state={},action){
	const {type,payload} = action;
	switch(type){
		case REQUEST_POST:
		case RECEIVE_POST:
		case INVALID_LIST:
			const {filter} = payload;
			return Object.assign(
				{},state,
				{[filter]:setItem(state[filter],action)}
			);
		default:
			return state;
	}
};






