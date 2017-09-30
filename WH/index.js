var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
	
	var params = url.parse(req.url, true);
	var query = params.query;
	if(query&&query['XSS_HTTP_REQUEST_CALLBACK']){
		var fn = query['XSS_HTTP_REQUEST_CALLBACK'];
		// jsonp∑µªÿ…Ë÷√
		res.writeHead(200, { 'Content-Type': 'text/javascript' });
		res.write(fn + '(' + util.inspect(query) + ')');
	}else{
		res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
		res.write(util.inspect(params));
	}
	res.end();
}).listen(3000);
console.log('start server listen on 3000');