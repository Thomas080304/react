import React from 'react';
import {connect} from 'react-redux';
import Todo from '../components/Todo';
import {
	filterTypes,
	toggleTodo} from '../actions/actions';
const {
	SHOW_ALL,
	SHOW_ACTIVE,
	SHOW_COMPLETED} = filterTypes;


class Todos extends React.Component{

	constructor(props){
		super(props);
		this.onClickHandle = this.onClickHandle.bind(this);
		this.filterData = this.filterData.bind(this);
	}
	onClickHandle(id){
		const {dispatch} = this.props;
		dispatch(toggleTodo(id));
	}
	buildTodo(data,onClickHandle){
		const {filter} = this.props;
		const afterFilter = this.filterData(data,filter);
		return afterFilter.map(function(item,index){
			return Todo(item,onClickHandle);
		});
	}
	filterData(todos,filter){
		switch(filter){
			case SHOW_ALL:
				return todos;
			case SHOW_ACTIVE:
				return todos.filter(t=>!t.completed);
			case SHOW_COMPLETED:
				return todos.filter(t=>t.completed);
			default:
				console.log('error---filter : ',filter)
				return todos;
		}
	}
	render(){
		const {todos} = this.props;
		return (
			<ul className="todos-list">
				{this.buildTodo(todos,this.onClickHandle)}
			</ul>
		);
	}
}

const mapStateToProps = (state)=>{
	const {todos,filter} = state;
	return {todos,filter};
}
export default connect(mapStateToProps)(Todos);

