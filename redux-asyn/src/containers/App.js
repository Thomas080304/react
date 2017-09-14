import React from 'react';
import {connect} from 'react-redux';
import Picker from '../components/Picker';
import List from '../components/List';
import {
	selectList,
	invalidList,
	fetchPostsIfNeed} from '../actions';

class App extends React.Component{
	constructor(props){
		super(props);
		this.onSelectChange = this.onSelectChange.bind(this);
		this.onClickHandle = this.onClickHandle.bind(this);
	}
	onSelectChange(value){
		console.log(value);
		const {dispatch} = this.props;
		dispatch(selectList(value));
	}
	onClickHandle(e){
		e.preventDefault();
		const {dispatch,filter} = this.props;
		dispatch(invalidList(filter));
		dispatch(fetchPostsIfNeed(filter));
	}
	componentDidMount(){
		const {dispatch,filter} = this.props;
		dispatch(fetchPostsIfNeed(filter));
	}
	componentWillReceiveProps(nextProps,nextState){
		const nextFilter = nextProps.filter;
		const currFilter = this.props.filter;
		if(nextProps !== currFilter){
			this.props.dispatch(fetchPostsIfNeed(nextFilter));
		}
	}
	render(){
		const {
			filter,
			isFetching,
			isInvalid,
			lastUpdated,
			items} = this.props;
		const isEmpty = items.length === 0;
		return (
			<div className="layout-wrap">
				<div className="layout-header">
					<h1>{filter}</h1>
				</div>
				<div className="layout-body">
					<div className="filter-wrap">
						<Picker 
							filter={filter}
							onChange={this.onSelectChange} 
							options={['reactjs','frontend']} />
					</div>
					<div className="refresh-wrap">
						<p>
							{
								lastUpdated&&
								<span>
									Last Update At : 
									{new Date(lastUpdated).toLocaleTimeString()}
									{'  '}
								</span>
							}
							{
								!isFetching&&
								<a 
									href="javascript:void(0)" 
									onClick={this.onClickHandle}>
									Refresh
								</a>
							}
						</p>
					</div>
					<div className="content-wrap">
						{
							isEmpty
							? (
								isFetching
								? (<h2>loading...</h2>)
								: (<h2>empty...</h2>)
							  )
							: (
								<div style={{opcity:isFetching?0.5:1}}>
									<List list={items} />
								</div>
							  )
						}
					</div>
				</div>
			</div>
		);
	}

}

const mapStateToProps = (state)=>{
	const {filter,result} = state;
	const {
		isFetching,
		isInvalid,
		lastUpdated,
		items} = result[filter] || {isFetching:true,items:[]};
	return {filter,isFetching,isInvalid,lastUpdated,items};
};

export default connect(mapStateToProps)(App);






