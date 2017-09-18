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
import { normalize, schema } from 'normalizr';
const myData = { users: [ { id: 1 }, { id: 2 } ] };
const user = new schema.Entity('users');//设置entities的key值
const mySchema = { users: [ user ] }//设置result的key
const normalizedData = normalize(myData, mySchema);

{
  result: { users: [ 1, 2 ] },
  entities: {
    users: {
      '1': { id: 1 },
      '2': { id: 2 }
    }
  }
}

	
*/