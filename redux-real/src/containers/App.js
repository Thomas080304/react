import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {loadUser} from '../actions/actions';
import Search from '../components/Search';
class App extends React.Component{
	constructor(props){
		super(props);
		this.onSearchHandle = this.onSearchHandle.bind(this);
		this.onDismHandle = this.onDismHandle.bind(this);
		this.onClickHandle = this.onClickHandle.bind(this);
	}
	onSearchHandle(value){
		browserHistory.push(`/${value}`);
	}
	onClickHandle(){
		const {dispatch} = this.props;
		dispatch(loadUser('Thomas080304'));
	}
	onDismHandle(){
		
	}
	renderErrorMsg(){
		const {errorMessag} = this.props;
		if(!errorMessag){
			return null;
		}
		return (
			<p>
				<b>errorMessag</b>
				{' '}
				<a 
					href="javascript:void(0)"
					onClick={this.onDismHandle}>
					Dismiss
				</a>
			</p>
		);
	}
	render(){
		const {children,inputVal} = this.props;
		return (
			<div>
				<button onClick={this.onClickHandle}>
					按钮
				</button>
				<Search
					value={inputVal}
					onSearch={this.onSearchHandle} />
				{this.renderErrorMsg()}
				{children}
			</div>
		);
	}

}
const mapStateToProps = function(state,ownProps){
	return {
		inputVal:ownProps.location.pathname.substring(1)
	};
};
export default connect(mapStateToProps)(App);