import { normalize, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
//import Schema from '../schema/schema';

const API_ROOT = 'https://api.github.com/';
export const CALL_API = 'CALL_API';

const sendData = function(endpoint,schema){
	const fullUrl = (
		endpoint.indexOf(API_ROOT) === -1
		? API_ROOT + endpoint
		: endpoint
	);
	return fetch(fullUrl).then(function(resp){

		return resp.json().then(function(data){
			if(!resp.ok){
				return Promise.reject(data);
			}
			const camelizedJSON = camelizeKeys(data);
			const result = normalize(camelizedJSON,schema);
			return Object.assign({},result);
		});
	});
};

function api({getState,dispatch}){
		
	return function nextFnWrap(next){

		return function acionFnWrap(action){
			//如果有"CALL_API",则重新整理构造action
			//{type:'',data:{}}
			const callAPI = action[CALL_API];
			if(typeof callAPI === 'undefined'){
				return next(action);
			}

			let {endpoint} = callAPI;
			const {schema,types} = callAPI;

			if(typeof endpoint === 'function'){
				endpoint  = endpoint(getState());
			}
			if(typeof endpoint !== 'string'){
				throw new Error('Specify a string endpoint');
			}
			if(!schema){
				throw new Error('Specify one of the exported Schema');
			}
			if(!Array.isArray(types) || types.length !== 3){
				throw new Error('Expected an array of three action types');
			}
			if(!types.every(type => typeof type === 'string')){
				throw new Error('Expected action types to be stirng');
			}
			const actionWith = function(data){
				const finalAction = Object.assign({},action,data);
				delete finalAction[CALL_API]
				return finalAction;
			};
			
			const [requestType,succesType,failureType] = types;			
			next(actionWith({type:requestType}));
			return sendData(endpoint,schema).then(
				function(resp){
					return next(actionWith({
						type:succesType,
						resp
					}));
				},
				function(error){
					return next(actionWith({
						type:failureType,
						msg:error.message || 'something bad'
					}));
				}
			);
		}

	}
}
export default api;