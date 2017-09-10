import React from 'react';
import Filter from '../containers/Filter';
import {filterTypes} from '../actions/actions';
const {
	SHOW_ALL,
	SHOW_ACTIVE,
	SHOW_COMPLETED}  = filterTypes;

function Footer(props){

	return (
		<p>
			{'   '}
			<Filter filter={SHOW_ALL}>all</Filter>
			{'   '}
			<Filter filter={SHOW_ACTIVE}>active</Filter>
			{'   '}
			<Filter filter={SHOW_COMPLETED}>completed</Filter>
			{'   '}
		</p>
	);
}
export default Footer;