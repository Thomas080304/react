import React from 'react';
import ReactDom from 'react-dom';
import Tabs from './tabs';
import './index.css';

ReactDom.render(
	<div className="root-wrap">
		<Tabs />
	</div>,
	document.getElementById('root')
);