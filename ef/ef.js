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
	 * core utils
	 **/
	Ef.extend(Ef,{
		inArray:function(elem,arr,i){
			var len;
			if(arr){
				len = arr.length;
				i = i ? (i<0?Match.max(0,len+i):i) : 0;
				for(; i < len; i++){
					if(i in arr&&arr[i] === elem){
						return i;
					}
				}
				return -1;
			}
		}
	});
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
		LOADSTATE:{
			'START':'loadstart',
			'PROGRESS':'progress',
			'ERROR':'error',
			'ABORT':'abort',
			'LOADEND':'loadend'
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
			XHRUtil.handleReadyState(xhr,options);
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
			return xhr;
		},
		handleReadyState(xhr,options){
			xhr.onreadystatechange = function(){
				var state = XHRUtil.STATE;
				var loadstate = XHRUtil.LOADSTATE;
				switch(xhr.readyState){
					case state.LOADING:
						options.loadListener
						&&options.loadListener.apply(xhr,loadstate.START);
						break;
					case state.LOADED:
						options.loadListener
						&&options.loadListener.apply(xhr,loadstate.START);
						break;
					case state.INTERACTIVE:
						options.loadListener
						&&options.loadListener.apply(xhr,loadstate.PROGRESS);
						break;
					case state.COMPLETE:
						//在浏览器终止请求访问status报错
						//例如timeout的时候
						try{
							if( (xhr.status >= 200 && xhr.status < 300) 
							    || xhr.status == 304){
								XHRUtil.handlerResponse(
									xhr,XHRUtil.
									getMiniType(xhr),
									options.success
								);
							}else{
								options.error
								&&options.error.apply(xhr,arguments);
							}
						}catch(e){
							//ignor error
							
						}
						break;
					default:
						break;
				}
			}
		},
		getMiniType(xhr){
			// Specific listeners for content-type
            // The Content-Type header can include the charset:
            // Content-Type: text/html; charset=ISO-8859-4
            // So we'll use a match to extract the part we need.
			//xhr.getAllResponseHeaders()
			var reg = /\s*([^;]+)\s*(;|$)/i;
			var contentType = xhr.getResponseHeader('Content-Type');
			var miniType = contentType.match(reg)[1];
			if(miniType){
				return miniType;
			}
		},
		handlerResponse(xhr,miniType,success){
			//无论相应的内容的类型是什么，相应主体的内容都会保存在
			//responseText中，对于非xml类型responseXML为null
			var data;
			switch(miniType){
				case 'text/javascript':
				case 'application/javascript':
				case 'text/html':
					data = xhr.responseText;
					break;
				case 'application/json':
					try{
						data = parseJSON(xhr.responseText);
					}catch(e){
						data = false;
					}
					break;
				case 'text/xml':
				case 'application/xml':
				case 'application/xhtml+xml':
					data = xhr.responseXML;
					break;
			}
			success.call(xhr,data);
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
	/**
	 *	跨域请求模块
	 **/
	var XssHttpRequestCount = 0;
	var XssHttpRequest = function(){
		this.requestId = 'XSS_HTTP_REQUEST_'+(++XssHttpRequestCount);
	};
	XssHttpRequest.prototype = {
		url:null,
		scriptObject:null,
		status:0,
		readyState:0,
		timeout:30000,
		responseJSON:null,
		constructor:XssHttpRequest,
		onreadystatechange:function(){},
		setReadyState:function(nextState){
			// Only update the ready state if it's newer than the current state
	        if(this.readyState < nextState || nextState==0) {
	            this.readyState = nextState;
	            this.onreadystatechange();
	        }
		},
		open:function(url,timeout){
			this.timeout = timeout || 30000;
			// Append a special variable to the URL called XSS_HTTP_REQUEST_CALLBACK
        	// that contains the name of the callback function for this request
			this.url = url
				+ ((url.indexOf('?') != -1) ? '&': '?')
				+ 'XSS_HTTP_REQUEST_CALLBACK='
				+ this.requestId
				+ '_CALLBACK';
			this.setReadyState(0);
		},
		createScript:function(){
			this.scriptObject = document.createElement('script');
			this.scriptObject.setAttribute('id',this.requestId);
			this.scriptObject.setAttribute('type','text/javascript');
			return this.scriptObject;
		},
		insertScript:function(script,url){
			// Now set the src property and append to the document's 
	        // head. This will load the script
	        script.setAttribute('src',url);             
	        var head = document.getElementsByTagName('head')[0];
	        head.appendChild(script);
		},
		removeScript:function(script,id){
			// Re-populate the window method with an empty method incase the 
			// script loads later on after we've assumed it stalled
			window[id + '_CALLBACK'] = function(){};
			// Remove the script to prevent it from loading further
			script.parentNode.removeChild(script);
		},
		send:function(){
			var that = this;
			var script = this.createScript();
			// Create a setTimeout() method that will trigger after a given 
	        // number of milliseconds. If the script hasn't loaded by the given
	        // time it will be cancelled
	        var timeoutWatcher = setTimeout(function(){
	        	that.removeScript(script,this.requestId);
	        	// Set the status to error
            	that.status = 2;
            	that.statusText = 'Timeout after'+ that.timeout+'milliseconds';
            	// Update the state
	            that.setReadyState(2);
	            that.setReadyState(3);
	            that.setReadyState(4);
	        },this.timeout);
	        // Create a method in the window object that matches the callback
	        // in the request. When called it will processing the rest of 
	        // the request
	        window[this.requestId + '_CALLBACK'] = function(data){
	        	// When the script loads this method will execute, passing in
	            // the desired JSON object.
	            // Clear the timeoutWatcher method as the request 
	            // loaded successfully
	            clearTimeout(timeoutWatcher);
	            // Update the state
	            that.setReadyState(2);
	            that.setReadyState(3);
	            // Set the status to success 
	            that.responseJSON = data;
	            that.status=1;
	            that.statusText = 'Loaded.';
	            // Update the state
	            that.setReadyState(4);
	        };
	        this.setReadyState(1);
	        this.insertScript(script,this.url);
		}
	};
	var getXssRequestObject = function(url,options){
		var xdo = new XssHttpRequest();
		options = options || {};
		options.timeout = options.timeout || 30000;
		xdo.onreadystatechange = function(){
			switch (xdo.readyState) {
	            case 1:// Loading
	                options.loadListener
	                &&options.loadListener.apply(xdo,arguments);
	                break;
	            case 2:// Loaded
	                options.loadedListener
	                &&options.loadedListener.apply(xdo,arguments);
	                break;
	            case 3:// Interactive
	                options.ineractiveListener
	                &&options.ineractiveListener.apply(xdo,arguments);
	                break;
	            case 4:// Complete
	                if (xdo.status == 1) {
	                    // The request was successful
	                    options.success
	                    &&options.success.apply(xdo,xdo.responseJSON);
	                } else {
	                    // There was an error
	                    options.error
	                    &&options.error.apply(xdo,arguments);
	                }
	                break;
	        }
		};
		xdo.open(url,options.timeout);
		xdo.send(null);
		return xdo;
	};
	Ef.extend(Ef,{
		xssRequest:function(url,options){
			return getXssRequestObject(url,options);
		}
	});
	/**
	 *	DOMUtil
	 **/
	Ef.extend(Ef,{
		$:function(){
			var elements = new Array();
			for(var i = 0;i < arguments.length; i++){
				var element = arguments[i];
				if(typeof element === 'string'){
					element = document.getElementById(element);
				}
				if(arguments.length === 1){
					return element;
				}
				element.push(element);
			}
			return elements;
		},
		getElementsByClassName:function(className,tag,parent){
			parent = parent || document;
			parent = Ef.$(parent);
			if(!parent){
				return false;
			}
			var allTags = (tag === '*'&&parent.all)
						  ? parent.all
						  :parent.getElementsByTagName(tag);
			var matchingElements = new Array();
			className = className.replace(/\-/g,"\\-");
			var regex = new RegExp('(^|\\s)'+className+'(\\s|$)');
			var element;
			for(var i = 0; i < allTags.length; i++){
				element = allTags[i];
				if(regex.test(element.className)){
					matchingElements.push(element);
				}
			}
			return matchingElements;
		},
		getClassNames:function(element){
			element = Ef.$(element);
			if(!element){
				return false;
			}
			var classNames = element.className.replace(/\s+/,' ');
			return classNames.split(' ');
		},
		hasClassName(element,className){
			element = Ef.$(element);
			if(!element){
				return false;
			}
			var classes = getClassNames(element);
			for (var i = 0; i < classes.length; i++) {
		        // Check if the className matches and return true if it does
		        if (classes[i] === className) { return true; }
		    }
		    return false;
		},
		addClassName:function(element,className){
			element = Ef.$(element);
			if(!element){
				return false;
			}
			element.className += (element.className? ' ':'')+className;
			return true;
		}
	});
	/**
	 *	监听hash变化
	 **/
	var actionPage = {
		ajaxifClass:'',
		ajaxifyRoot:'',
		safariHistory:false,
		msieHistory:false,
		init:function(ajaxifClass,ajaxifyRoot,startingHash){
			this.ajaxifClass = ajaxifClass || 'ADSActionLink';
			this.ajaxifyRoot = ajaxifyRoot || '';
			//check browers history
			//search a & format(add expected class)
			//add event listener
			//set page init state
		},
		ajaxifyLinks:function(){
			var links = Ef.getElementsByClassName(
					this.ajaxifyClassName,
					'a',document
				);
			for(var i = 0,len = links.length; i < len; i++){
				if(Ef.hasClassName(
					links[i],
					'ADSActionPagerModified')){
					continue;
				}
				links[i].setAttribute(
					'href',
					this.convertURLToHash(links[i].getAttribute('href'))
				);
				Ef.addClassName(links[i],'ADSActionPagerModified');
				Ef.addHandler(links[i],'click',function(){
					if(this.href&&this.href.indexOf('#') > -1){
						Ef.addBackButtonHash(
							Ef.getHashFromURL(this.href)
						);
					}
				});
			}
			
		},
		getHashFromURL:function(url){
			if(!url||url.indexOf('#') === -1){
				return '';
			}
			return url.split('#')[1];
		},
		addBackButtonHash:function(ajaxHash){
			//根据浏览器处理back btn
		},
		convertURLToHash:function(url){
			if(!url){
				return '#';
			}else if(url.indexOf('#') != -1){
				return '#'+url.split('#')[1];
			}else{
				// If the URL includes the domain name (MSIE) strip it off.
	            if(url.indexOf("://") != -1) {
	                url = url.match(/:\/\/[^\/]+(.*)/)[1];
	            }
		        // Strip off the root as specified in init()
		        return '#' + url.substr(this.ajaxifyRoot.length);
			}
		}

	};
	
	/**
	 *	callbacks
	 **/
	var optionsCache = {};
	function createOptions(options){
		//'unique stopOnFalse'
		var object = optionsCache[options] = {},
			optonsArray,flag;
		optiosArray = options.match(/\S+/g)||[];
		for(var i = 0,len=optiosArray.length; i < len; i++){
			flag = optiosArray[i];
			object[flag] = true;
		}
		return object;	
	}
	var Callbacks = function(options){
		options = typeof options === 'string'
				 ? (optionsCache[options]||createOptions(options))
				 : Ef.extnd({},options);
			//list存储fn
		var list = [],
			firing,
			memory,
			fired,
			firingLength,
			firingIndex,
			firingStart,
			stack = !options.once&&[];
		var fire = function(data){
			//缓存当前的数据
			memory = options.memory&&data;
			//firingStart保存memory起点信息
			firingIndex = firingStart || 0;
			//清理起点信息
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for(; list&&firingIndex < firingLength; firingIndex++){
				if(list[firingIndex].apply(data[0],data[1]) === false&&options.stopOnFalse){
					// To prevent further calls using add
					memory = false;
					break;
				}
			}
			firing = false;
			//end
			if(list){
				//stack = !options.once&&[]，当once = true时, stack=false。
				//memory = options.memory&&data，
				//当memory == true&&[context,data]时,memory = [context,data]
				if(stack){
					//stack存在的时候表示once一定为false或者undefined
					//可以多次调用fire方法
					if(stack.length){
						//调用在firing的状态缓存的数据
						fire(stack.shift());
					}
				}else if(memory){
					//once memory同时为true时，
					//fire调用之后的数据皆清除
					list = [];
				}else{
					//once == true时，disable整个数组
					self.disable();
				}
			}
		};
		var self = {
			add:function(){
				if(list){
					//add(fn1,fn2) add([fn1,fn2]);
					var start = list.length;
					(function add(args){
						for(var i = 0,len = args.length; i< len; i++){
							var arg = args[i],
								type = (typeof arg);
							if(type === 'function'){
								//unique == false || unique == undefined 表示不需要去重
								//unique == true && !self.has(arg)
								if(!options.unique || !self.has(arg)){
									list.push(arg);
								}
							}else if(arg&&arg.length&& type !== 'string'){
								add(arg);
							}
						}
					})(arguments);
					//end
					if(firing){
						//在firing的状态中执行完成add
						//需要重置数组的长度让新添加的
						//元素可以在fire方法中被执行
						firingLength = list.length;
					}else if(memory){
						/*
							var callback = $$.Callbacks('memory');
							callback.add([fn1,fn2,fn3]);
							callback.remove(fn2);
							callback.fire();
						*/
						//memory是缓存下来的参数
						firingStart = start;
						fire(memory);
					}
				}
				return this;
			},
			remove:function(){
				if(list){				
					for(var i = 0,len = arguments.length; i < len; i++){
						var index;
						while((index = Ef.inArray(arguments[i],list,index)) > -1){
							list.splice(index,1);
						}
					}
				}
				return this;
			},
			fire:function(){
				self.fireWith(this,arguments);
			},
			fireWith:function(context,args){
				//!fired表示第一次触发fire方法
				//stack = !options.once&&[]
				//options.once为true时表示只触发一次
				//options.once不为true时表示可以多次触发
				if(list&&(!fired || stack)){
					args = args || [];
					args = [context,args.slice?args.slice():args];
					if(firing){
						//可以多次调用fire方法，先缓存数据
						//等到第一次的触发完成后在fire方法中触发
						stack.push(args);
					}else{
						fire(args);	
					}
				}
				return this;
			},
			has:function(fn){
				return fn ? Ef.inArray(fn,list) > -1 : !!(list&&list.length);	
			},
			disable:function(){
				list = stack = memory = undefined;
				return this;
			},
			disabled:function(){
				return !list;
			},
			empty:function(){
				list = [];
				firingLength = 0;
				return this;
			},
			lock:function(){
				//控制stack的状态来控制
				//是否能够调用fireWith方法
				stack = undefined;
				if(!memory){
					self.disable();
				}
				return this;
			},
			locked:function(){
				return !stack;
			}
		};
		return self;
	};
	Ef.extend(Ef,{Callbacks:Callbacks});
	/**
	 *	Deferred模块
	 **/
	var Deferred = {
		Deferred:function(func){
			var tuples = [
				['resolve','done',Ef.Callbacks(),'resolved'],
				['reject','fail',Ef.Callbacks(),'rejected'],
				['notify','progress',Ef.Callbacks()]
			],
			promise={},
			deferred={};
			for(var i = 0,len = tuples.length; i< len; i++){
				var list = tuples[2],
					stateString = tuples[3];
				promise[tuples[1]] = list.add;

				if(stateString){
					list.add(function(){
						state = stateString;
					});
				}

				deferred[tuples[0]] = function(){
					deferred[tuples[0]+'With'](this === deferred ? promise:this,arguments);
					return this;
				};
				deferred[tuples[0]+'With'] = list.fireWith;

			}

			return deferred;
		}
	};



























	

	exports = root.ef = root.$$ = Ef;
});