
export const getConfirmation = function(message,callback){
	callback(window.confirm(message));
}