import React from 'react';
import {Link} from 'react-router';
function Repo({repo,owner}){
	const {login} = owner;
	const {name,description} = repo;
	return (
		<div className="repo">
			<h3>
				<Link to={`/${login}/${name}`}>{name}</Link>
				{ 'By' }
				<Link to={`/${login}`}>{login}</Link>
			</h3>
			{
				description &&
		        <p>{description}</p>
		    }
		</div>
	);

}
export default Repo;