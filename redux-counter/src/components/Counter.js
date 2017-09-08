import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component{

	render(){
		const {
			state,
			onIncrease,
			onDecrease} = this.props;
		const {count} = state;
		return (
			<div>
				<h1>{count}</h1>
				<button onClick={onIncrease}>+</button>
				<button onClick={onDecrease}>-</button>
			</div>
		);
	}

}
export default Counter;