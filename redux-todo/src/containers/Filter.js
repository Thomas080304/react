import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../actions/actions'

class Filter extends React.Component{
	constructor(props){
		super(props);
		this.onClickHandler = this.onClickHandler.bind(this);
	}
	onClickHandler(filter){
		const {dispatch} = this.props;
		return function(e){
			e.preventDefault();
			dispatch(setFilter(filter));
		}
	}
	render(){
		const {
			active,
			filter,
			children} = this.props;
		if(active){
			return (
				<span>{children}</span>
			);
		}
		return (
			<a
				href="javascript:void(0)"
				onClick={this.onClickHandler(filter)}>
				{children}
			</a>
		);
	}

}
const mapStateToProps = (state,ownProps)=>{
	const stateFilter = state.filter;
	const propsFilter = ownProps.filter;
	return {
		active: propsFilter === stateFilter
	}
}
export default connect(mapStateToProps)(Filter);