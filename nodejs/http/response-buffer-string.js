// response-buffer-string.js
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {	
	fs.readFile('form.html', (err, data) => {
		if (err) {
	       res.writeHead(500);
	       return res.end('Error loading');
	    }
		res.writeHead(200, {'Content-Type': 'text/html'});
		if(req.url == 'buffer'){
			res.write(data);
		}else{
			res.write(data.toString());
		}
		res.end();
	});
}).listen(8888, () => console.log('server start on 8888'))