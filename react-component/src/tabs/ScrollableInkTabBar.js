import React from 'react';
import TabBarMixin from './TabBarMixin';
import InkTabBarMixin from './InkTabBarMixin';
import ScrollableTabBarMixin from './ScrollableTabBarMixin';

const ScrollableInkTabBar = React.createClass({
	displayName:'ScrollableInkTabBar',
	mixins:[TabBarMixin,InkTabBarMixin,ScrollableTabBarMixin],
	render(){
		const inkBarNode = this.getInkBarNode();
		const tabs = this.getTabs();
		const scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
		return this.getRootNode(scrollbarNode);
	}
});
export default ScrollableInkTabBar;