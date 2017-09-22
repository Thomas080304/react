#redux异步请求

##1.redux-thunk

```javascript
function createThunkMiddleware(extraArgument){
    return function({dispatch,getState}){
        return function(next){
            return function(action){
                if(typeof action === 'function'){
                    //返回action让职责链继续下去
                    return action(dispatch,getState,extraArgument);
                }
                //返回action让职责链继续下去
                return next(action);
            }
        }
    }
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```

##2.store

```javascript
import React from 'react';
import ReactDom from 'react-dom';
import {
    createStore,
    combineReducers,
    applyMiddleware} from 'redux';
//actions reducers middleware components
import {count} from './reducers';
import thunk from 'redux-thunk';
const reducers = combineReducers({count});
const m1 = function({dispatch,getState}){
    return function(next){
        return function(action){
            next(action);
        }
    }
}
const store = createStore(
    reducers,
    preloadState,
    applyMiddleware(thunk,m1)
);
```

##3.三种action调用方式

```javascript
//正常的dispatch
function requestPost(filter){
    return {
        type:REQUEST_POST,
        payload:{filter}
    };
}
dispatch(requestPost('front-end'));
//异步dispatch
function fetchPost(filter){
    return function(dispatch, getState, extraArgument){
        //请求前
        dispatch(requestPost(filter));
        return fectch(`https://www.reddit.com/r/${filter}.json`)
                .then(function(resp){
                    resp.json()
                        .then(function(data){
                            //接收到请求
                            dispatch(receivePost(filter,data));
                        });
                });
    }
}
dispatch(fetchPost('front-end'));
//嵌套调用
function fetchPostsIfNeed(){
    return function(dispatch, getState, extraArgument){
        if(shouldupdata){
            dispatch(fetchPost('front-end'));
        }
    }
}
dispatch(fetchPostsIfNeed());
```

##4.action的流动方向

```javascript

(function(next){
   return function(action){
        /*thunk*/
        if(typeof action === 'function'){
            //有可能返回undefined
            return action(dispatch,getState,extraArgument);
        }
        return next(action);
   } 
})
((function(next){
    return function(action){
        /*m1*/
        return next(action);
    }
})
(function(action){
    /*store.dispatch*/
    store.dispatch(action);
}));
```