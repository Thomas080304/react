#histroy&location

##1.window.histroy

```javascript
PropTypes
    length
    state(Opera)
    //html5返回当前的状态对象
methods
    go {Function}
    @params num {Number}
    
    forward {Function}
    back {Function}
    
    pushState {Function}
    @params state {Object}//状态
            name  {String}//标题
            url   {String}//可选的相对url
    会创建历史记录，回退按钮会触发popstate事件

    replaceState {Function}
    @param state {Object}
           name  {String}
    不会有历史记录，只会重写当前的状态
event
hashchange
//hash改变
EventUtil.addHandler(
    window,
    'hashchange',
    function(e){
        //只有firefox 6+,Chrome,Opera支持
        //oldUrl newUrl
        //return e.oldUrl+e.newUrl
        //location.hash
        return location.hash
    }
);
support
var isSupported = 'onhashchange' in window;
//IE8在IE7文档模式下运行，返回true
var isSupported = ('onhashchange' in window)
                  &&(
                    document.documentMode === undefined
                    || document.documentMode > 7
                  );
popstate
//点击回退按钮,会触发该事件，
//获得当前状态，然后重置浏览器状态，完成回退功能
//第一个页面的state为空
EventUtil.addHandler(
    window,
    'popstate',
    function(e){
        if(e.state){//第一个页面为null
            return e.state;
        }
    }
);
support
//检查不是IE的内核
```

##2.window.location

```javascript
PropTypes
    hash
    host
    hostname
    href
    pathname
    port
    protocol
    search
methods
    function getQueryStringArgs(){
        //?name=1&id=123&_=123456
        var search = location.search,
            sLen = search.length,
            qs = (sLen > 0 ? search.substr(1):''),
            args = {},
            items = qs.length > 0 ? qs.split('&'):[],
            item = null,
            name = null,
            value= null,
            i = 0,
            len = items.length;
        for(i = 0; i < len; i++){
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if(name.length){
                args[name] = value;
            }
        }
        return args;
    }

    assign {Function}
    @params path {String}
    (window.location/location.href)
    //改变其中任何属性值都是在调用assign

    replace {Function}
    @params path {String}
            isReplace {Boolean}//是否在浏览器中产生记录
```

##3.BrowserHistory
```javascript
{
    action:"POP",
    block:function(){...},
    createHref:function(){...},
    go:function(n){...},
    goBack:function(){...},
    goForward:function(){...},
    length:5,
    listen:function(listener){...},
    location:{
        hash:"",
        pathname:"/",
        search:"",
        state:undefined
    },
    push:function(path,state){...}
    replace:function(path,state){...}
}
---------------------------------------------------------------------
window.history                  Hitory
    length                      length
    go                          go
    back                        goBack
    forward                     goForward

---------------------------------------------------------------------
window.location                 History
    hash 
    search
    pathname
    href
    host                        
    hostname
    port
    protocol                   location:{hash,search,pathname,state}   
    assign                     createHref
    replace                     push/replace
---------------------------------------------------------------------
                                action/block/listen
---------------------------------------------------------------------
```




