const createTransitionManager = function(){
	let prompt = null;
	const confirmTransitionTo = function(location,action,getUserConfirmation,callback){
		if(prompt != null){
			const result = (
				typeof prompt === 'function'
				? prompt(location,action)
				: prompt
			);
			if(typeof result === 'string'){
				if(typeof getUserConfirmation === 'function'){
					getUserConfirmation(result,callback);
				}else{
					 warning(
			            false,
			            'A history needs a getUserConfirmation function in order to use a prompt message'
			          )
				}
				callback(true);
			}else{
				callback(result !== false);
			}
		}else{
			callback(true);
		}
	};
	let listeners = [];
	const notifyListeners = function(...args){
	    listeners.forEach(listener => listener(...args))
	};
	return {
		confirmTransitionTo,
		notifyListeners
	};
}
export default createTransitionManager;