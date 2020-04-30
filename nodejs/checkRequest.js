var http = require('http');
var https = require('https');
var url = require('url');
var querystring = require('querystring');

http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write(`req.method: ${req.method} \n`);
	res.write(`req.url: ${req.url} \n`);
	res.write(`req.headers: \n`);
	for( var index in req.headers){
		res.write(`   ${index}: ${req.headers[index]} \n`);
	}	
	res.end();
}).listen(8888)

console.log('server localhost:8888 start ...');