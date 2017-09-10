import React from 'react';
import AddTodo from '../containers/AddTodo';
import Todos from '../containers/Todos';
import Footer from './Footer';
function App(props){
	return (
		<div className="layout-wrap">
			<div className="layout-header">
				<AddTodo />
			</div>
			<div className="layout-body">
				<Todos />
			</div>
			<div className="layout-footer">
				<Footer />
			</div>
		</div>
	);
}

export default App;