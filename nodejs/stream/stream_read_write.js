var Readable = require('stream').Readable;  // 引用可读流的构造函数
var Writable = require('stream').Writable;

var readStream = new Readable();
var writStream = new Writable();

console.log(readStream);

readStream.push('I ');
readStream.push('love ');
readStream.push('nodejs\n ');
readStream.push(null);         // 可读流数据读取完毕

writStream._write = function(chunk, encode, cb){  // 重写方法
	console.log(chunk.toString());
	cb();
};

readStream.pipe(writStream);

