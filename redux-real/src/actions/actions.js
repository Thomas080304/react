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

  export const loadRepo = function(){
    return dispatch(fetchRepo(fullName));
  };

  export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
  export const resetErrorMessage = function(){
    return {type:RESET_ERROR_MESSAGE};
  }















