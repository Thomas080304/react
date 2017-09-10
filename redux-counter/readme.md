redux

#1  api

```javascript
    createStore,
    combineReducer,
    bindActionCreators,
    applyMiddleware,
    compose
```

#2  代码

```javscript
import React from 'react';
import ReactDom from 'react-dom';
import {
    createStore,
    applyMiddleware,
    combineReducers} from 'redux';
import count from './reducers/reducer';
import Counter from './components/Counter';
import {
    increase,
    decrease} from './actions/action';
const reducers = combineReducers({count});
const store = createStore(
    reducers,
    //preloadState
    applyMiddleware(m1,m2)
);
function render(){
    ReactDom.render(
        <Counter
            state={store.getState()} 
            onIncrease={function(){
                store.dispatch(increase());
            }}
            onDecrease={function(){
                store.dispatch(decrease());
            }} />,
        document.getElementById('root')
    );
}
render();
store.subscribe(render);
```

#3  解析createStore对reducre/combineRedurce的处理

```javascript
/*
    简单reducer
    @param state,在combineReducer中对应一个具体key的值,
    例如：{count:2}
 */
function reducer(state,action){
    const {type} = action;
    switch(type){
        case "INCREASE": return state+1;
        case "DECREASE": return state-1;
        default:         return state;
    }
}
/*
    combineReducer(复杂reducer)
    @param reducers {key,value},
    {
        counte1:function(state,action){},
        counte2:function(state,action){}
    }
    处理复杂的数据{
        counte1:function(state,action){},
        counte2:function(state,action){}
    } 为简单的reducer function(state,action){...}
*/
function combineReducers(reducers){
/*
    {
        counte1:function(state,action){},
        counte2:function(state,action){}
    }
*/
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {};
    for(let i = 0; i < reducerKeys.length; i++){
        const key = reducerKeys[i];
        finalReducers[key] = reducers[key];
    }
    const finalReducerKeys = Object.keys(finalReducers);
    return function(state={},action){
        //纯函数---返回state
        const hasChanged = false;
        const nextState = {};
        for(let i = 0; i < finalReducerKeys.length; i++){
            const key = finalReducerKeys[i];
            const reducer = finalReducers[key];
            const prevState4Key = state[key];
            const nextState4Key  = reducer(prevState4Key,action);
            if(nextState4Key !== 'undefined'){
                throw new Error('get undefined state for key:',key);
            }
            nextState[key] = nextState4Key;
            hasChanged =hasChanged|| 
                        nextState4Key !== prevState4Key;
        }
        return hasChanged ? nextState:state;
    }
}


function createStore(
    reducer,/*
                {function} 
                @param state,createStore内部的currentState
                @param action,dispatch的action
            */
    preloadState,
    enhancer){

        let currentReducer = reducer;
        let currentState = preloadState;
        const dispatch = function(action){
            try{
                //function reducer(state,action){return state;}
                currentState = currentReducer(currentState,action);
            }catch(e){

            }
            return action;
        };

        return {dispatch};
}
```

#4  解析enhancer和compose

```javascript
/*
    m1,m2是要compose的enhancer
    m1 
        @parame dispatch/getStore,
        传递redux store实例的getStore和dispatch函数
        @param next {function}
        上一次compose出来的结果实质上是包裹了reudx store实例的dispatch，
        第一次是store.dispatch
        @param action {Object}
        用户调用dispatch的action
*/
function m1(dispatch,getStore){
    return function m1In(next){
        return function(action){
            next(action);
        }
    }
}
function m2(dispatch,getStore){
    return function m2In(next){
        return function(action){
            next(action);
        }
    }
}
[m1In,m2In].reduceRight(function(m1In,m2In){
    return function(/*store.dispatch(first time)*/){
        const next = m2In.apply(undefined,arguments);
        return m1In(next);
    }
});
const composedResult = function(store.dispatch){
    const next = (function m2In(next){
        return function m2Action(action){
            next(action);
        }
    })(store.dispatch);
    return (function m1In(next){
        return function m1Action(action){
            next(action)
        }
    })(next)
}
/*
    action首先穿m1Action,调用next传递到m2Action,
    m2Action调用next传递到store.dispatch,调用reducer。
*/

const store = createStore(
    reducers,
    preloadState,
    applyMiddlewares(m1,m2)
);

function applyMiddlewares(middlewares){
    return function(createStore){
        return function(
            reducers,
            preloadState,
            enhancer/*一般为undefined*/){
            let store = createStore(reducers,preloadState,enhancer);
            const middlewareAPI = {
                getState:store.getState,
                dispatch:function(action){
                    store.disaptch(action)
                }
            };
            const chain = middlewares.map(function(middleware){
                middleware(middlewareAPI);
            });
            const dispatch = compose(chain)(store.dispatch);
            /*dispatch参见上面的composeResult*/
            return {
                ...store,
                dispatch
            }
        }
    }
}

function createStore(
    reducers,
    preloadState,
    enhancer){
        if(typeof enhancer === 'function'){
            return enhancer(createStore)
            (reducers,preloadState/*,传递undefined*/);
        }
        let currentReducers = reducers;
        let currentState = preloadState;

        const dispatch = function(action){
            try{
                currentState = currentRducers(currentState,action);
            }catch(){}
        };
        return {dispatch}
}
```

#5  待续




 





