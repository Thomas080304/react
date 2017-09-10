/*
 *	action types
 */
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_FILTER = "SET_FILTER";
/*
 *	vars
 */
export const filterTypes = {
	SHOW_ALL:"SHOW_ALL",
	SHOW_ACTIVE:"SHOW_ACTIVE",
	SHOW_COMPLETED:"SHOW_COMPLETED"
};
/*
 *	action creator function	
 */
export function addTodo(id,text){
	return {
		type:ADD_TODO,
		payload:{id,text}
	};
}

export function toggleTodo(id){
	return {
		type:TOGGLE_TODO,
		payload:{id}
	};
}

export function setFilter(filter){
	return {
		type:SET_FILTER,
		payload:{filter}
	};
}

