

```javascript
const data = {
    id:'vm-1',
    title:'My first post!',
    author:{
        id:'123',
        name:'paul'
    },
    comments:[
        {
            id:'249',
            content:'Nice post!',
            commenter:{
                id:'245',
                name:'Jane'
            }
        },
        {
            id:'250',
            content:'Thanks',
            commenter:{
                id:'123',
                name:'paul'
            }
        }
    ]
}

const user = new schema.Entity('user');
const comment = new schema.Entity(
    'comment',
    {commenter:user}
);
const articles = new schema.Entity(
    'articles',
    {author:user,comments:[comment]}
);




```

