var stream = require('stream');
var util = require('util');       // 工具类

function ReadStream(){
	stream.Readable.call(this);
}

util.inherits(ReadStream, stream.Readable);

ReadStream.prototype._read = function(){       //私有方法
	this.push('I ');
	this.push('love ');
	this.push('nodejs\n ');
	this.push(null);         // 可读流数据读取完毕
}

function WritStream(){
	stream.Writable.call(this);
	this._cached = new Buffer('');
}

util.inherits(WritStream, stream.Writable);

WritStream.prototype._write = function(chunk, encode, cb){  // 私有方法
	console.log(chunk.toString());
	cb();
};

function TransformStream(){
	stream.Transform.call(this);
}

util.inherits(TransformStream, stream.Transform);

TransformStream.prototype._stransform = function(chunk, encode, cb){
	this.push(chunk);
	cb();
}

TransformStream.prototype._flush = function(cb){
	this.push('hahaha');
	cb();
}

var rs = new ReadStream();
var ws = new WritStream();
var ts = new TransformStream();

rs.pipe(ts).pipe(ws);