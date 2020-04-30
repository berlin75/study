const fs = require('fs');
const rs = fs.createReadStream('luky.mp4');
const ws = fs.createWriteStream('luky_write.mp4');

rs.on('data', function(chunk){
		if(ws.write(chunk) === false){ //写入速度赶不上读取速度时数据流在cache中爆满
			console.log('still cached');
			rs.pause();
		}
	})
	.on('end', function(){
		ws.end();
	})

ws.on('drain', function(){
		console.log('data drain');
		rs.resume();
	})