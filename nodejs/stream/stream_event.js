const fs = require('fs');
var readStream = fs.createReadStream('stream_copy.js');
readStream.on('data',function(chunk){
	console.log('data emits');
	console.log(Buffer.isBuffer(chunk));
	console.log(chunk.toString());
}).on('readable', function(){
	console.log('readable emits');
}).on('end',function(){
	console.log('end emits');
}).on('close',function(){
	console.log('close emits');
}).on('error',function(e){
	console.log('error emits', e);
})