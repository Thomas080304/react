import React from 'react';
import PropTypes from 'prop-types';

const List = function({renderItem,items}){

	return (
		<div className='list'>
			{
				items.map(renderItem)
			}
		</div>
	);
};
export default List;