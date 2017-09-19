import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

function User(props){
	const {user} = props
	const {login,avatarUrl,name} = user;
	return (
		<div className="user">
			<Link to={`/${login}`}>
				<img 
					src={avatarUrl} 
					alt={login}
					width={72}
					height={72} />
				<h3>
					{login} 
					{
						name&&<span>({name})</span>
					}
				</h3>
			</Link>
		</div>
	);
}
export default User;