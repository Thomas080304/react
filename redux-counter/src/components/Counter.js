import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component{

	render(){
		const {value,onIncrease,onDecrease} = this.props;
		return (
			<div>
				<h1>{value}</h1>
				<button onClick={onIncrease}>+</button>
				<button onClick={onDecrease}>-</button>
			</div>
		);
	}

}
export default Counter;