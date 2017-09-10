import React from 'react';
import {connect} from 'react-redux'
import {addTodo} from '../actions/actions';
let nextTodoId = 0;

class AddTodo extends React.Component{

	constructor(props){
		super(props);
		this.onSubmitHandle = this.onSubmitHandle.bind(this);
	}
	onSubmitHandle(e){
		e.preventDefault();
		if(this.elem){
			const elem = this.elem;
			const {dispatch} = this.props;
			if(!elem.value.trim()){
				return;
			}
			dispatch(addTodo(nextTodoId++,elem.value));
			this.elem.value = '';
			this.elem.focus();
		}
	}
	render(){
		return (
			<form onSubmit={this.onSubmitHandle}>
				<input ref={(ref)=>this.elem=ref} />
				<button type="submit">Add Todo</button>
			</form>
		);
	}
}
export default connect()(AddTodo);