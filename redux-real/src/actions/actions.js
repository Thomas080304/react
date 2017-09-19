import Schema from '../schema/schemas';
import {CALL_API} from '../middleware/api';
/*
 *	user action types
 */
 export const USER_REQUEST = 'USER_REQUEST';
 export const USER_SUCCESS = 'USER_SUCCESS';
 export const USER_FAILURE = 'USER_FAILURE';
 /*
  *	action creator function
  */
  const fetchUser = function(login){
  	return {
  		[CALL_API]:{
  			types:[USER_REQUEST,USER_SUCCESS,USER_FAILURE],
  			endpoint:`users/${login}`,
  			schema:Schema.USER
  		}
  	};
  };

  export const loadUser = function(login,requiredFields=[]){
  		return function(dispatch,getState){
  			return dispatch(fetchUser(login));
  		}
  }

  export const STARRED_REQUEST = 'STARRED_REQUEST';
  export const STARRED_SUCCESS = 'STARRED_SUCCESS';
  export const STARRED_FAILURE = 'STARRED_FAILURE';
  const fetchStarred = function(login,nextPageUrl){
    return {
      login,
      [CALL_API]:{
        types:[STARRED_REQUEST,STARRED_SUCCESS,STARRED_FAILURE],
        endpoint:nextPageUrl,
        schema:Schema.REPO_ARRAY
      }
    };
  };
  export const loadStarred = function(login){
    
    return function(dispatch,getState){
      const state = getState();
      const {
        nextPageUrl = `users/${login}/starred`,
        pageCount = 0
      } = state.pagination.starredByUser[login]||{};
      if(pageCount > 0 && !nextPage){
        return null
      }
      return dispatch(fetchStarred(login,nextPageUrl));
    };
  };


  export const REPO_REQUEST = 'REPO_REQUEST';
  export const REPO_SUCCESS = 'REPO_SUCCESS';
  export const REPO_FAILURE = 'REPO_FAILURE';

  const fetchRepo = function(fullName){
    return {
      [CALL_API]:{
        types:[REPO_REQUEST,REPO_SUCCESS,REPO_FAILURE],
        endpoint:`repos/${fullName}`,
        schema:Schema.REPO
      }
    };
  };

  export const loadRepo = function(login){
    return function(dispatch,getState){
      return dispatch(fetchRepo(login));
    } 
  };

  export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
  export const resetErrorMessage = function(){
    return {type:RESET_ERROR_MESSAGE};
  }















