import fetch from 'isomorphic-fetch';
/*
	action types
*/
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const SELECTE_LIST = 'SELECTE_LIST';
export const INVALID_LIST = 'INVALID_LIST';


/*
	action creator function
*/
function fetchPosts(filter){

	return function(dispatch, getState, extraArgument){
		dispatch(requestPost(filter));
		return fetch(`https://www.reddit.com/r/${filter}.json`)
				.then(function(response){
					return response.json();
				})
				.then(function(data){
					dispatch(receivePost(filter,data));
				});
	};
}
export function requestPost(filter){
	return {
		type:REQUEST_POST,
		payload:{filter}
	};
}
export function receivePost(filter,items){
	return {
		type:RECEIVE_POST,
		payload:{
			filter,
			items:items.data.children.map(child=>child.data),
			lastUpdated:Date.now()
		}
	};
} 
export function selectList(filter){
	return {
		type:SELECTE_LIST,
		payload:{filter}
	};
}
export function invalidList(filter){
	return {
		type:INVALID_LIST,
		payload:{filter}
	};
}
function shouldFetchPosts(state,filter){
	const data = state.result[filter];
	if(!data){
		return true;
	}
	if(data.isFetching){
		return false;
	}
	return data.isInvalid;
}
export function fetchPostsIfNeed(filter){

	return function(dispatch, getState, extraArgument){
		if(shouldFetchPosts(getState(),filter)){
			return dispatch(fetchPosts(filter));
		}
	}
}
