import React from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../actions/actions';
import Search from '../components/Search';
class App extends React.Component{
	constructor(props){
		super(props);
		this.onClickHandle = this.onClickHandle.bind(this);
		this.onDismHandle = this.onDismHandle.bind(this);
	}
	onClickHandle(e){
		e.preventDefault();
		const {dispatch} = this.props;
		dispatch(loadUser('Thomas080304',['name']));
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
		const {children} = this.props;
		return (
			<div>
				<button onClick={this.onClickHandle}>
					按钮
				</button>
				<Search />
				{this.renderErrorMsg()}
				{children}
			</div>
		);
	}

}
const mapStateToProps = function(state,ownProps){
	return {};
};
export default connect(mapStateToProps)(App);