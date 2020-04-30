const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
	switch(req.url){
		case '/index.html':
		case '/':
			fs.createReadStream(__dirname + '/index.html').pipe(res);
			break;
		case '/upload':
			var chunks = [];
            var size = 0;
            req.on('data' , function(chunk){
                chunks.push(chunk);
                size+=chunk.length;
            });

            req.on("end",function(){
                var buffer = Buffer.concat(chunks, size);
                var str = buffer.toString();
                console.log(str);
                var json = JSON.parse(str);
                json.files.forEach(file =>{
                	var {filename, filecontent} = file;
                	var decodeImage = new Buffer(filecontent.substring(filecontent.indexOf(',') + 1), 'base64');
				    fs.writeFile(json.savedir + filename, decodeImage, err => {
				    	err&&console.log(err);
				    	console.log(`${filename}已保存`);
				    });
                })
                
                res.end('ok');
            })
			break;
		default:;
	}
}).listen(8888, () => console.log('server start ...'))