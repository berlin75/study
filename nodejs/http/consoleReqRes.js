var http = require('http');
var url = require('url');
var util = require('util');

function onRequest(request, response){
	if(request.url == '/favicon.ico') return;
	console.log(`__filename: `, __filename);
	console.log(`web browser request: http://localhost:8888/index.html?name=heiying&age=18`);
	console.log(`request.url: `, request.url);
	var pathname = url.parse(request.url).pathname;
	console.log(`url.parse(request.url).pathname: `, pathname);
	console.log(`request.method: `, request.method);
	console.log(`request.headers: `, request.headers);
	console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

	response.writeHead(200, {'content-Type': 'text/html'});
	response.write(`<h3>The page requested: ${pathname}</h3>\n`);
	console.log(util.inspect(request));
	console.log('----------------------------------------------------------------------------------');
	console.log(util.inspect(response));
	response.end();
}

http.createServer(onRequest).listen(8888);
console.log('Server is listening on port  8888 ...\n');

