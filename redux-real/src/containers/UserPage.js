import React from 'react';
import {connect} from 'react-redux';
import User from '../components/User';
import List from '../components/List';
import {loadUser,loadStarred} from '../actions/actions';
const loadData = function({login,loadUser,loadStarred}){
	loadUser(login,['name']);
	loadStarred(login)
};
class UserPage extends React.Component{
	componentWillMount(){
		loadData(this.props);
	}
	componentWillReceiveProps(nextProps,nextState){
		var nextLoginVal = nextProps.login;
		var currLoginVal = this.props.login;
		if(nextLoginVal !== currLoginVal){
			loadData(nextProps);
		}
	}
	render(){
		const {login,user} = this.props;
		if(!user){
			return <h1><i>Loading {login}{"'s profile..."}</i></h1>
		}
		return (
			<div>
				<User user={user} />
				<hr />
				<List />
			</div>
		);
	}
}
const mapStateToPropTypes = (state,ownProps)=>{
	const login = ownProps.params.login.toLowerCase();
	const {pagination,entities} = state;
	const {users,repos} = entities;
	const {starredByUser} = pagination;
	const starredDatas = starredByUser[login]||{ids:[]};
	const starredRepos = starredDatas.ids.map(function(id){
		return repos[id];
	});
	const starredOwners = starredRepos.map(function(repo){
		return users[repo.owner]
	});
	return {
		login,
		starredDatas,
		starredOwners,
		starredRepos,
		user:users[login]
	};
};
export default connect(
	mapStateToPropTypes,
	{loadUser,loadStarred}
)(UserPage);