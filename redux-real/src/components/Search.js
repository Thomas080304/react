import React from 'react';
import PropTypes from 'prop-types';

const GITHUB_REPO = 'https://github.com/reactjs/redux';

class Search extends React.Component{

	render(){
		return (
			<div>
		        <p>Type a username or repo full name and hit 'Go':</p>
		        <input size="45"
		               ref="input" />
		        <button>Go!</button>
		        <p>
		          Code on <a href={GITHUB_REPO} target="_blank">Github</a>.
		        </p>
		        <p>
		          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
		        </p>
	        </div>
		);
	}

}
export default Search;

