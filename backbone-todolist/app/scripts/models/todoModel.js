define([
	'module',
	'exports'
],function(module, exports){

	var todo = Backbone.Model.extend({

		defaults:function(){
			return {
				title:'empty todo...',
				done:false
			};
		},
		toggle: function() {
		  this.save({done: !this.get("done")});
		}
	});

	return todo;
});