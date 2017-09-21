import { normalize, schema,denormalize } from 'normalizr'

const userSchema = new schema.Entity(
	'users',{},
	{
		idAttribute:function(input){
			return input.login.toLowerCase();
		}
	}
);

const repoSchema = new schema.Entity(
	'repos',{owner:userSchema},
	{
		idAttribute:function(input){
			return input.fullName.toLowerCase();
		}
	}
);

export default {
	USER:userSchema,
	USER_ARRAY:[userSchema],
	REPO:repoSchema,
	REPO_ARRAY:[repoSchema]
};

/*

{
	users:{
		laketea:{
			"login": "laketea",
			"id": 3827390,
			"avatar_url": "https://avatars0.githubusercontent.com/u/3827390?v=4"
		}
	},
	repos:{
		laketea/front-road:{
			"id": 16634951,
			"name": "front-road",
			"full_name": "laketea/front-road",
			"owner": 'laketea',
			"html_url": "https://github.com/laketea/front-road",
			"description": "最近准备整理复习一下前端这块的知识，所以开个板块准备记录一些笔记··",
			"watchers": 3,
			"default_branch": "master"
		}
	}
}	
*/