var fs = require('fs');
fs.readFile('1.png', function(err, orign_buffer){
	console.log(Buffer.isBuffer(orign_buffer));
	fs.writeFile('1_new.png', orign_buffer, err => err&&console.log(err)); //复制

	var base64Content = orign_buffer.toString('base64');	        //文件内容数据base64编码
	console.log('----------------------', base64Content);
	var base64Url = 'data:image/png;base64,' + base64Content;       //base64头信息加文件内容组成base64Url
	console.log('----------------------', base64Url);
	
	var decodeImage = new Buffer(base64Content, 'base64');
	console.log(Buffer.compare(orign_buffer, decodeImage));
	fs.writeFile('1_base64.png', decodeImage, err => err&&console.log(err)); 
});