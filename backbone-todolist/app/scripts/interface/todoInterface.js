define([
	'module',
	'exports',
	'InterfaceUtil'
],function(module, exports, Interface){
	var TodoInterface = new Interface('todoInterface',['get','set']);
	return TodoInterface;
});