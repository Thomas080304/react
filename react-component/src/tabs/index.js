import React from 'react';
import Tabs from './Tabs';
import ScrollableInkTabBar from './ScrollableInkTabBar';

const TabsData = [
	{key:'vm-1',text:'Tab-1',disabled:false},
	{key:'vm-2',text:'Tab-2',disabled:false},
	{key:'vm-3',text:'Tab-3',disabled:true},
	{key:'vm-4',text:'Tab-4',disabled:false}
];

class TabsDemo extends React.Component{
	constructor(props){
		super(props);
		this.onTabClickHandle = this.onTabClickHandle.bind(this);
		this.renderTabBar = this.renderTabBar.bind(this);
		this.state = {
			activeKey:'vm-2'
		};
	}
	onTabClickHandle(key){
		console.log('thomas-----',key);
	}
	renderTabBar(){
		return <ScrollableInkTabBar
					tabs={TabsData}
					onTabClick={this.onTabClickHandle}/>
	}
	render(){
		const {activeKey} = this.state;
		return (
			<Tabs
				activeKey={activeKey} 
				renderTabBar={this.renderTabBar}/>
		);
	}
}
export default TabsDemo;