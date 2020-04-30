var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(request, response){
	var pathname = url.parse(request.url).pathname;
	console.log(`request for ${pathname} received`);

	fs.readFile(pathname.substr(1), function(err, data){
		if(err){
			console.log(err.stack);
			response.writeHead(404, {'Content-Type': 'text/html'})
		}else{
			response.writeHead(200, {'Content-Type': 'text/html'})
			response.write(data.toString());
		}
		response.end();
	});

	console.log('-------------------------------------request-------------------------------------');
	console.log(request);
	console.log('-------------------------------------response-------------------------------------');
	console.log(response);

}).listen(8888);

console.log('server start');