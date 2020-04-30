var http = require('http');
var fs = require('fs');
var request = require('request');  // npm install request

http
	.createServer(function(req, res){
		// fs.readFile('23.jpg', function(err, data){
		// 	if(err){
		// 		res.end('404,file not exist!')
		// 	}else{
		// 		res.writeHeader(200, {'Content-Type': 'text/html'});
		// 		res.end(data.toString());
		// 	}
		// })	

		// fs.createReadStream('23.jpg').pipe(res);
		
		request('http://img3.mukewang.com/54584ef20001deba02200220-200-200.jpg').pipe(res);
	})
	.listen(8888)

console.log('服务器开始监听。。。');