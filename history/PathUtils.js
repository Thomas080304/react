
export const parsePath = function(path){
	/*
		location
			hash
			search
			pathname

			href host hostname port protocol
		https://hao.360.cn/?wd_xp1#abc
	*/
	let pathname = path || '/';
	let search = '';
	let hash = '';
	const hashIndex = pathname.indexOf('#');
	if(hashIndex !== -1){
		hash = pathname.substr(hashIndex);
		pathname = pathname.substr(0,hashIndex);
	}

	const searchIndex = pathname.indexOf('?');
	if(searchIndex !== -1){
		search = pathname.substr(searchIndex);
		pathname = pathname.substr(0,searchIndex);
	}

	pathname = decodeURI(pathname);
	return {
		pathname,
		search:search === '?' ? '':search,
		hash:hash === '#' ? '':hash
	};
};

export const hasBasename = function(path,prefix){
	return (new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i')).test(path);
};

export const stripBasename = function(path,prefix){
	return (
		hasBasename(path,prefix) 
		? path.substr(prefix.length)
		: path
	);
};

export const createPath = function(location){
	const { pathname, search, hash } = location;
	let path = encodeURI(pathname || '/');
	if(search && search !=='?'){
		path += (
			search.charAt(0) === '?'
			? search
			:`?${search}`;
		);
	}
	if(hash && hash !== '#'){
		path += (
			hash.charAt(0) === '?'
			? hash
			:`?${hash}`;
		);
	}
	return path;
};