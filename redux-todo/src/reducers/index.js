/*
	{
		filter:'all',
		todos:[
			{id:'1',text:'xxx',completed:false},
			{id:'2',text:'xxx',completed:false}
		]
	}
*/
import {
	ADD_TODO,
	TOGGLE_TODO,
	SET_FILTER,
	filterTypes} from '../actions/actions';
const {SHOW_ALL} = filterTypes;

/*
	filter reducer
 */
export const filter = function(state=SHOW_ALL,action){
	const {type,payload} = action;
	switch(type){
		case SET_FILTER:
			return payload.filter;
		default: return state;
	}
};

/*
	todo reducer
*/
const todo = function(state,action){
	const {type,payload} = action;
	switch(type){
		case ADD_TODO:
			console.log('ADD_TODO',payload);
			const {id,text} = payload;
			return {
				id,text,
				completed:false
			};
		case TOGGLE_TODO: 
			const stateId = state.id;
			const actionId = action.payload.id;
			if(stateId !== actionId){
				return state;
			}
			return Object.assign(
				{},state,
				{completed:!state.completed}
			); 
		default: return state;
	}
};
/*
	todos reducer
*/
export const todos = function(state=[],action){
	const {type} = action;
	switch(type){
		case ADD_TODO:
			return [
				...state,
				todo(undefined,action)
			];
		case TOGGLE_TODO:
			return state.map(function(item,index){
				return todo(item,action);
			});
		default: return state;
	}
};




















