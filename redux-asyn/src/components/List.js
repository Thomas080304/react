import React from 'react';

function buildItem(list){
	return (
		list.map(function(li,index){
			const {title} = li;
			return (
				<li key={index}>{title}</li>
			);
		})
	);
}

function List(props){
	const {list} = props;
	return (
		<ul>
			{buildItem(list)}
		</ul>
	);
}
export default List;