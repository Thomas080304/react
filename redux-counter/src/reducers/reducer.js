import {
	INCREASE_NUM,
	DECREASE_NUM} from '../actions/action';

export default function(state=0,action){
	const {type} = action;
	switch(type){
		case INCREASE_NUM: 
			return state+1;
		case DECREASE_NUM: 
			return state-1;
		default: 
			return state;
	}
}