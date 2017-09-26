
export const createLocation = function(path,state,key,currentLocation){
	let location;
	if(typeof path === 'string'){
		//push(path,state);
		//https://hao.360.cn/#abc?wd_xp1
		location = parsePath(path);
		location.state = state;
	}else{
		//push({pathname:'',state:''});
	}
	if(key){
		location.key = key;
	}

	if(currentLocation){
		if(!location.pathname){
			location.pathname = currentLocation.pathname;
		}else if(location.pathname.charAt(0) !== '/'){
			location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
		}else{
			if(!location.pathname){
				location.pathname = '/';
			}
		}
	}
	//pathname,search,hash,state
	return location;
};