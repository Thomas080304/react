import React from 'react';
import classnames from 'classnames';


class Tabs extends React.Component{
	constructor(props){
		super(props);
		this.onTabClick = this.onTabClick.bind(this);
		this.state = {
			activeKey:props.activeKey || ''
		};
	}
	onTabClick(key){
		/*if(this.tabBar.props.onTabClick){
			this.tabBar.props.onTabClick(key);
		}*/
		this.setActiveKey(key);
	}
	setActiveKey(key){
		this.setState({activeKey:key});
	}
	render(){
		const {
			renderTabBar,
			prefixCls,
			tabBarPosition} = this.props;
		const {activeKey} = this.state;
		const tabBar = renderTabBar();
		this.tabBar = React.cloneElement(tabBar,{
			prefixCls,
			key:'tabBar',
			onKeyDown:function(){},
			tabBarPosition,
			onTabClick:this.onTabClick,
			activeKey:activeKey
		});
		return (
			<div className="tabs-wrap">
				{this.tabBar}
				<div className="tabs-body-wrap">

				</div>
			</div>
		);
	}

}
Tabs.defaultProps = {
	prefixCls:'rc-tabs',
	tabBarPosition:'top'
};
export default Tabs;
