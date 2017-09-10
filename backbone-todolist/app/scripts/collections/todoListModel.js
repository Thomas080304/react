define([
	'module',
	'exports',
	'app/scripts/models/todoModel'
],function(module, exports, todo){
	var todoList = Backbone.Collection.extend({
		model:todo,
		localStorage:new Store("todos-backbone"),
		done: function() {
	      return this.where({done: true});
	    },
	    remaining: function() {
	      return this.where({done: false});
	    },
	    nextOrder: function() {
	      if (!this.length) return 1;
	      return this.last().get('order') + 1;
	    },
	    comparator: 'order'
	});
	return todoList;
});