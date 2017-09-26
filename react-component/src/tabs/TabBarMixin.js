import React from 'react';
import classnames from 'classnames';

export default {
	onTabClick(key){
		this.props.onTabClick(key);
	},
	getTabs(){
		const {tabs,activeKey,prefixCls} = this.props;
		var that = this;
		return tabs.map(function(tab,index){
			const {key,text,disabled} = tab;
			let cls = classnames({
				[`${prefixCls}-tab-active active`]:activeKey === key,
				[`${prefixCls}-tab`]:true,
				'tabs-header-item':true
			});
			let events = {};
			if(disabled){
				cls = classnames({
					[cls]:true,
					[`${prefixCls}-tab-disabled disabled`]:true
				});
			}else{
				events = {
					onClick:that.onTabClick.bind(that,key)
				};
			}
			return (
				<div 
					key={key}
					className={cls}
					{...events}>
					{text}
				</div>
			);
		});
	},
	getRootNode(contents){
		return (
			<div
				ref="root"
				className="tabs-wrap">
				{contents}
			</div>
		);
	}
};