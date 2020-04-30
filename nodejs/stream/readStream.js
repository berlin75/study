var fs = require("fs");
var util = require('util');
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('stdin.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
	console.log('isBuffer: '+util.isBuffer(chunk), typeof chunk);
   	data += chunk;
});

readerStream.on('end',function(){
   console.log(typeof data, data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");