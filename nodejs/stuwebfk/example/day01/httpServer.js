const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer();
server.on('request', handle);

function handle(request, response){
	function callback(err, data){
		if(err){
			console.log('readFile err: ', err.message);
			response.statusCode = 404;
		}else{
			response.write(data);
		}
		response.end();
	}
	var path = url2path(request.url);
	console.log('request: ', path);
	fs.readFile(__dirname + '/public/' + path, callback);   // 指定public目录是静态资源目录
}

server.listen(8888);

function url2path(url_str){
	return url.parse(url_str).path;
}