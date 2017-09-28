/**
 *  ef framework
 *	use native code for query and set attr for dom
 *	author thomas
 **/
;(function(factory){
	//拿到当前环境中的全局对象；浏览器中为window，self也是浏览器提供的一个全局对象，始终指向window
    //server端的运行环境则提供global这个全局对象
	var root = (typeof self === 'object'&&self.self === self&&self);
	
	if(typeof define === 'function'&&define.amd){
	   	//AMD规范定义两个全局函数define和requrie，
    	//并且规定define有个amd属性，来区分amd的define和普通名为define的函数
		define(['module','exports'],function(module,exports){
			// Export global even in AMD case in case this script is loaded with
      		// others that may still expect a global Backbone.
      		factory(root,exports,undefined);
		});
	}else if(typeof exports !== 'undefined'){
		factory(root,exports,undefined);
	}else{
		factory(root,{},undefined);
	}
})(function(root,exports,undefined){
	var VERSION = '0.0.1',
		document = window.document,
		docElem = document.documentElement;


	var Ef = function(){
		return new Ef.fn.init(arguments);
	};
	//Ef.prototype
	//constructor(Ef) __proto__
	Ef.fn = Ef.prototype = {
		constructor:Ef,
		init:function(args){
			var i = 0,len,nodes = args;
			if(typeof args[0] === 'string'){
				nodes = (args[1]||document).querySelectorAll(args[0]);
			}else if(
				(0 in args) 
				&& !(args[0] instanceof Node)
				&& 'length' in args[0] ){
				nodes = args[0];
				if(args[1]){
					this.owner = args[1];
				}
			}
			for(len = this.length = nodes.length;i<len;i++){
				this[i] = nodes[i];
			}
		},
		version:VERSION
	};
	//Ef.prototype
	//constructor(Ef) init version __proto__
	//Ef.fn.init.prototype
	//constructor(init) __proto__
	Ef.fn.init.prototype = Ef.fn;
	//Ef.fn.init.prototype
	//constructor(Ef) init version __proto__
	Ef.extend = Ef.fn.extend = function(){
		var src,copyIsArray,copy,name,options,clone,
			target = arguments[0]||{},
			i = 1,
			length = arguments.length,
			deep = false;
		//第一个参数是string,undefined,null,Boolean
		//只传递一个值的情况
		for(; i < length; i++){
			options = arguments[i];
			if(options != null){
				for(name in options){
					src = target[name];
					copy = options[name];
					//阻止浏览器溢出或者死循环
					//var ss = {a:'a'}
					//var tar = {a:ss}
					//var sou = {b:tar}
					//tar.b = sou浏览器溢出
					if(target === copy){
						continue;
					}
					if(copy !== undefined){
						target[name] = copy;
					}
				}
			}
		}
		return target;
	};
	/**
	 *	事件模块
	 **/
	Ef.extend(Ef,{
		addHandler:function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}else if(element.attachEvent){
				element.attachEvent('on'+type,handler);
			}else{
				element['on'+type]=handler;
			}
		},
		removeHandler:function(element, type, handler){
			if(element.removeEventListener){
				element.removeEventListener(type,handler,false);
			}else if(element.detachEvent){
				element.detachEvent('on'+type,handler);
			}else{
				element['on'+type] = null;
			}
		},
		getEvent:function(event){
            return event ? event : window.event;
        },
		getTarget:function(event){
			return event.targe || even.srcElement;
		},
		getRelatedTarget:function(event){
			if (event.relatedTarget){
                return event.relatedTarget;
            }else if(event.toElement){
                return event.toElement;
            }else if(event.fromElement){
                return event.fromElement;
            }else{
                return null;
            }
		},
		preventDefault:function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},
		stopPropagation:function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		},
		getCharCode:function(event){
			if(typeof event.charCode === 'number'){
				return event.charCode;
			}else{
				return event.keyCode
			}
		},
		getWheelDelta:function(event){
            if(event.wheelDelta){
                return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
            }else{
                return -event.detail * 40;
            }
        },
        getClipboardText: function(event){
            var clipboardData =  (event.clipboardData || window.clipboardData);
            return clipboardData.getData("text");
        },
        setClipboardText: function(event, value){
            if (event.clipboardData){
                event.clipboardData.setData("text/plain", value);
            } else if (window.clipboardData){
                window.clipboardData.setData("text", value);
            }
        },
        getButton: function(event){
            if (document.implementation.hasFeature("MouseEvents", "2.0")){
                return event.button;
            } else {
                switch(event.button){
                    case 0:
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                        return 0;
                    case 2:
                    case 6:
                        return 2;
                    case 4: return 1;
                }
            }
        }
	});
	/**
	 *	ajax模块
	 **/
	var XHRUtil = {
		STATE:{
			'INIT':0,
			'LOADING':1,
			'LOADED':2,
			'INTERACTIVE':3,
			'COMPLETE':4
		},
		sendRequest:function(url,options){
			var xhr = XHRUtil.xhrLazyLoad(),
				url=url;
			options = options || {};
			options.method = options.method || 'GET';
			options.data = options.data || null;
			xhr.onload = function(event){};
			xhr.onprogress = function(event){};
			xhr.onloadend = function(event){};
			xhr.onreadystatechange = function(){
				var state = XHRUtil.STATE;
				switch(xhr.readyState){
					case state.LOADING:
						options.loadListener
						&&options.loadListener.apply(xhr,arguments);
						break;
					case state.LOADED:
						options.loadedListener
						&&options.loadedListener.apply(xhr,arguments);
						break;
					case state.INTERACTIVE:
						options.interactiveListener
						&&options.interactiveListener.apply(xhr,arguments);
						break;
					case state.COMPLETE:
						//在浏览器终止请求访问status报错
						//例如timeout的时候
						try{
							if( (xhr.status >= 200 && xhr.status < 300) 
							    || xhr.status == 304){
								// Specific listeners for content-type
			                    // The Content-Type header can include the charset:
			                    // Content-Type: text/html; charset=ISO-8859-4
			                    // So we'll use a match to extract the part we need.
								//xhr.getAllResponseHeaders()
								var contentType = xhr.getResponseHeader('Content-Type');
								var miniType = contentType.match(/\s*([^;]+)\s*(;|$)/i)[1];
								//无论相应的内容的类型是什么，相应主体的内容都会保存在
								//responseText中，对于非xml类型responseXML为null
								switch(miniType){
									case 'text/javascript':
									case 'application/javascript':
										options.jsResponseListener
										&&options.jsResponseListener.call(xhr,xhr.responseText);
										break;
									case 'application/json':
										var json = null;
										try{
											json = parseJSON(xhr.responseText);
										}catch(e){
											json = false;
										}
										options.jsonResponseListener
										&&options.jsonResponseListener.call(xhr,json);
										break;
									case 'text/xml':
									case 'application/xml':
									case 'application/xhtml+xml':
										options.xmlResponseListener
										&&options.xmlResponseListener.call(xhr,xhr.responseXML);
										break;
									case 'text/html':
										options.htmlResponseListener
										&&options.htmlResponseListener.call(xhr,xhr.responseText);
										break;
									default:
										break;
								}
								options.completeListener
								&&options.completeListener.apply(xhr,arguments);
							}else{
								options.errorListener
								&&options.errorListener.apply(xhr,arguments);
							}
						}catch(e){
							//ignor error
						}
						break;
					default:
						break;
				}
			};
			if( options.method.toUpperCase() === 'GET'
				&&options.data){
				for(var name in options.data){
					url = XHRUtil.addURLParam(url,name,options.data[name]);
				}
				options.data = null;
			}
			xhr.open(options.method, url, true);
			xhr.setRequestHeader('X-ADS-Ajax-Request','AjaxRequest');
			xhr.send(options.data);
		},
		addURLParam:function(url,name,value){
			url += (url.indexof('?') === -1 ? "?":"&");
			url += (encodeURIComponent(name)
					+'='
					+ encodeURIComponent(value)
				);
			return url;
		},
		xhrFactory:function(){
			if(typeof XMLHttpRequest !== 'undefined'){
				return new XMLHttpRequest();
			}else if(typeof ActiveXObject !== 'undefined'){
				//arguments.callee.activeXString
				//loop xxx
				if(typeof arguments.callee.activeXString != "string"){
                    var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                        i,len;
                    for(i = 0,len = version.length; i < len; i++){
                        try{
                            new ActiveXObject(version[i]);
                            arguments.callee.activeXString = version[i];
                            break;
                        }catch (ex){
                           continue;
                        }
                    }
                    return new ActiveXObject(arguments.callee.activeXString);
                }
			}else{
				throw new Error('NO XHR OBJECT AVALIABLE');
			}
		},
		xhrLazyLoad:function(){
			if(typeof XMLHttpRequest !== 'undefined'){
				xhrLazyLoad = function(){
					return new XMLHttpRequest();
				};
			}else if(typeof ActiveXObject !== 'undefined'){
				xhrLazyLoad = function(){
					if(typeof arguments.callee.activeXString != "string"){
                        var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                            i,len;
                        for(i = 0,len = version.length; i < len; i++){
                            try{
                                new ActiveXObject(version[i]);
                                arguments.callee.activeXString = version[i];
                                break;
                            }catch (ex){
                               continue;
                            }
                        }
                        return new ActiveXObject(arguments.callee.activeXString);
                    }
				};
			}else{
				xhrLazyLoad = function(){
					throw new Error('NO XHR OBJECT AVALIABLE');
				};
			}
			return xhrLazyLoad();
		}
	};
	Ef.extend(Ef,{
		ajaxRequest:function(url,options){
			return XHRUtil.sendRequest(url,options);
		}
	});
	
	exports = root.ef = root.$$ = Ef;
});