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
            hasChanged = hasChanged || nextState4Key !== prevState4Key;
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
                currentState = currentReducer(currentState,action);
            }catch(e){

            }
            return action;
        };

        return {dispatch};
}

```

#4  待续