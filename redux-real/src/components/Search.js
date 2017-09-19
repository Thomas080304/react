import React from 'react';
import PropTypes from 'prop-types';

const GITHUB_REPO = 'https://github.com/reactjs/redux';

class Search extends React.Component{
	constructor(props){
		super(props);
		this.onSearchHandle = this.onSearchHandle.bind(this);
		this.getInputValue = this.getInputValue.bind(this);
		this.onKeyUpHandle = this.onKeyUpHandle.bind(this);
	}
	getInputValue(){
		return this.refs.input.value
	}
	setInputValue(val){
		this.refs.input.value = val;
	}
	onKeyUpHandle(e){
		if(e.keyCode === 13){
			this.onSearchHandle();
		}
	}
	onSearchHandle(){
		const {onSearch} = this.props;
		onSearch(this.getInputValue());
	}
	componentWillReceiveProps(nextProps,nextState){
		const nextInputVal = nextProps.value;
		const currInputVal = this.props.value;
		if(nextInputVal!==currInputVal){
			this.setInputValue(nextInputVal);
		}
	}
	render(){
		return (
			<div>
		        <p>Type a username or repo full name and hit 'Go':</p>
		        <input size="45"
		               ref="input"
		               onKeyUp={this.onKeyUpHandle} />
		        <button onClick={this.onSearchHandle}>Go!</button>
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

