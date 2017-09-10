import React from 'react';
import classnames from 'classnames';

function Todo(props,onClickHandle){
	const {id,text,completed} = props;
	const cls = classnames({
		'todo-list-item':true
	});

	return (
		<li 
			key={id} 
			className={cls}
			style={{textDecoration: completed ? 'line-through' : 'none'}}
			onClick={()=>{
				console.log(id);
				onClickHandle(id)
			}}>
			{text}
		</li>
	);
}
export default Todo;