const fs = require('fs');
var readStream = fs.createReadStream('luky.mp4');
var n = 0;
readStream
	.on('data',(chunk) => {
		n++;
		console.log(`\ndata emits：第${n}次`);
		console.log(Buffer.isBuffer(chunk));
		console.log(chunk.length + 'btye');
		readStream.pause();
		console.log('readStream pause');
		setTimeout(function(){
			console.log('readStream pause end\n');
			readStream.resume();
		},100)
	})
	.on('readable', () => console.log('readable emits'))
	.on('end',() => console.log(`end emits ; 总共${n}次`))
	.on('close',() => console.log('close emits'))
	.on('error',(e) => console.log('error emits', e))