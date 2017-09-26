import React from 'react';
import classnames from 'classnames';

export default {
	getScrollBarNode:function(contents){
		return (
			<div
				key="container"
        		ref="container"
				className="tabs-header-wrap">
				<div className="tabs-line-though"></div>
				<div className="tabs-header-border clearfix">
					{contents}	
				</div>
			</div>	
		);
	}
};