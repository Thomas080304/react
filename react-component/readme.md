#DOM3

```javascript
//Document类型的变化
ownerDocument appendChild
//每个节点都有ownerDocument，表示文档的所属
//appendChild(node);父子节点必须属于同一文档
importNode 类似(Element cloneNode)（18章节xml相关）
var newNode = document.importNode(oldNode,true);
document.body.appendChild(newNode);
//确定文档的归属窗口
var parentWindow = document.defaultView || document.parentWindow;
//parentWindow IE支持

var myDiv = document.getElementById('myDiv');
var style = 
            document.defaultView.getComputedStyle(mydiv,null)
            || myDiv.currentStyle;


```

##1.确定浏览器距离桌面的距离

```javascript
var leftPos = (typeof window.screenLeft === 'number')
              ? window.screenLeft
              : window.screenX;
var topPos = (typeof window.screenTop === 'number')
              ? window.screenTop
              : window.screenY;
```

##2.确定浏览器视口的大小

```javascript
function getViewSize(){
    /**DOM扩展属性**/
    var pageWidth = window.innerWidth,
        pageHeight = window.innerHeight;
    if(typeof pageWidth !== 'number'){
        /**标准模式**/
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
        if(typeof pageWidth !== 'number'){
            /**兼容模式**/
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }
    return {width:pageWidth,height:pageHeight};
}
```

##3.元素的偏移量

```javascript
function getElementLeft(element){
    var left = element.offsetLeft;
    var current = element.offsetParent;
    while(current !== null){
        left += current.offsetLeft;
        current = current.offsetParent;
    }
    return left;
}
function getElementTop(element){
    var top = element.offsetTop;
    var current = element.offsetParent;
    while(current !== null){
        top += current.offsetTop;
        current = current.offsetParent;
    }
    return top;
}
```

##4.包含滚动内容元素的大小（html自带滚动属性）

```javascript
var scrollWidth = document.documentElement.scrollWidth;
var scrollHeight = document.documentElement.scrollHeight;
if(typeof pageWidth !== 'number'){
    if(document.compatMode === 'CSS1Compat'){
        scrollWidth = Math.max(
                        document.documentElement.scrollHeight,
                        document.documentElement.clientHeight
                      );
        scrollHeight = Math.max(
                        document.documentElement.scrollWidth,
                        document.documentElement.clientWidth
                      );
    }else{
       scrollWidth = Math.max(
                        document.body.scrollHeight,
                        document.body.clientHeight
                      );
        scrollHeight = Math.max(
                        document.body.scrollWidth,
                        document.body.clientWidth
                      );
    }

}

var scrollLeft = window.pageXOffset
                 || document.documentElement.scrollLeft
                 || document.body.scrollLeft
                 || 0;
var scrollTop = window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;

```


##5.获取元素的大小

```javascript
function getBoundingClientRect(element){
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;
    if(element.getBoundingClientRect){
        if(typeof arguments.callee.offset !== 'number'){
            var temp = document.createElement('div');
            temp.style.cssText = 'position:absolute;left:0;top:0;';
            document.body.appendChild(temp);
            arguments.callee.offset = -temp.getBoundingClientRect().top
                                      -scrollTop;
            document.body.removeChild(temp);
            temp = null;
        }
        var rect = element.getBoundingClientRect();
        var offset = arguments.callee.offset;
        return {
            left:rect.left+offset,
            right:rect.right+offset,
            top:rect.top+offset,
            bottom:rect.bottom+offset
        }

    }else{
        var actualLeft = getElementLeft(element);
        var actualTop = getElementTop(element);

        return {
            left:actualLeft-scrollLeft,
            right:actualLeft+element.offsetWidth-scrollLeft,
            top:actualTop-scrollTop,
            bottom:actualTop+element.offsetTop-scrollTop
        };
    }
}
```


