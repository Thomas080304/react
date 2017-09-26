
const getHistoryState = function(){
	try{
		return window.history.state || {}
	}catch(e){
		// IE 11 sometimes throws when accessing window.history.state
		return {};
	}
};

const createBrowserHistory = function(props={}){
	const globalHistory = window.history;

	const getDOMLocation = function(historyState){
		const {key,state} = historyState || {};
		const {pathname,search,hash} = window.location;
		let path = pathname+search+hash;
		/**
			---------------------------------
			@todo basename
		**/

		return createLocation(path,basename);

	};
	//pathname,search,hash,state
	const initialLocation = getDOMLocation(getHistoryState());

	const createHref = function(location){
		return basename+createPath(location);
	};
	const createKey = function(){
		return Math.random().toString(36).substr(2, keyLength)
	};
	let allKeys = [ initialLocation.key ]
	const setState = function(nextState){
	    Object.assign(history, nextState)
	    history.length = globalHistory.length
	    transitionManager.notifyListeners(
	      history.location,
	      history.action
	    )
	};
	const push = function(path,state){
		const action = 'PUSH';
		const location = createLocation(
			path,
			state,
			createKey(),
			history.location
		);
		transitionManager.confirmTransitionTo(
			location,
			action,
			getUserConfirmation,
			function(ok){
				if(!ok){
					return;
				}
				const href = createHref(location);
				const {key,state} = location;
				if(canUseHistory){
					globalHistory.pushState({key,state},null,href);
					if(forceRefresh){
						 window.location.href = href;
					}else{
						const prevIndex = allKeys.indexOf(history.location.key)
						const nextKeys = 
							allKeys.slice(0, 
							prevIndex === -1 
							? 0 
							: prevIndex + 1);

						nextKeys.push(location.key);
						allKeys = nextKeys;
						setState({ action, location });
					}


				}else{
					warning(
			          state === undefined,
			          'Browser history cannot push state in browsers that do not support HTML5 history'
			        );
			        window.location.href = href;
				}
			}
		);
	};

	const history = {
		length:globalHistory.length,
		action:'POP',
		location:initialLocation,
		createHref,
		push,
		replace,
		go,
		goBack,
		goForward,
		block,
		listen
	};

	return history;
};