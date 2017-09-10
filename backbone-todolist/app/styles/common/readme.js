/*
 * css架构目录
 */
 /*基本的样式，适用于任何网站*/
 1.normalize.css(新的css属性的统一性)
 2.reset.css(样式的重置)
 3.lib.css(可分离的样式)
 /*网站的样式*/
 4.网站样式库(当前网站的变量)
 	4.1网站的常见颜色，尤其是连接颜色
 		4.1.1 '<a href="$var$" rel="nofollow" data-rel="href"></a>'
 	4.2网站的常见背景，如:.bgf7{background:#f7f7f7;}
 	4.3网站的常见边框，如:.bbdd{border:1px solid #ddd}
 	4.4网站遗留的单margin属性
 	4.5网站遗留的单padding属性
 	4.6网站遗留的width属性
 	4.7网站常用的height属性
 	/*注意：
 	 * 网站通用的元素（按钮，导航，选项卡）不能作为网站的样式库，
 	 * 即不能作为网站的变量出现
 	 */
5.网站的通用小图标样式集
	5.1属性分组
	5.2功能分组
	5.3独立
6.网站的组件样式
	6.1自适应按钮 .redbtn{} redbtn .btn{height:24px;}
				  .greenbtn{} .greenbtn .btn{height:24px;}
	6.2input,textarea,select{font-size:100%;}
7.网站的公共结构
8.单页的精细结构