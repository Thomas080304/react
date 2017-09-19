
const Pagination = function({types,mapActionToKey}){

	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected types to be an array of three elements.')
	}
	if (!types.every(t => typeof t === 'string')) {
		throw new Error('Expected types to be strings.')
	}
	if (typeof mapActionToKey !== 'function') {
		throw new Error('Expected mapActionToKey to be a function.')
	}

	const [requestType,successType,failureType] = types;
	const setKeyItem = function(
		state={isFetching:false,nextPageUrl:undefined,ids:[],pageCount: 0},
		action){
		switch(action.type){
			case requestType:
				return Object.assign({},{...state},{isFetching:true});
			case successType:
				return Object.assign(
					{},{...state},
					{
						isFetching:false,
						ids:action.resp.result,
						nextPageUrl:action.resp.nextPageUrl,
						pageCount:state.pageCount + 1
					}
				);
			case failureType:
				return Object.assign({},{...state},{isFetching:false});
			default:
				return state;
		}
	};

	return function(state={},action){
		switch(action.type){
			case requestType:
			case successType:
			case failureType:
				const key = mapActionToKey(action);
				return Object.assign(
					{},{...state},
					{[key]:setKeyItem(state[key],action)}
				);
			default:
				return state;
		}
	}
};
export default Pagination;