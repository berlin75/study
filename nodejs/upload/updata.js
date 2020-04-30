const http = require('http');
const querystring = require('querystring');
const os = require('os');

http.createServer((req, res) => {
	if(req.url == '/'){
		var updatahtml = `
<!doctype html>
<html>
    <head><title>post</title></head>
    <body>
        <form action="http://localhost:8888/postfile" enctype="multipart/form-data" method="post">
            <p><input type="text" name="title" placeholder="title"/></p>
            <p><input type="text" name="content" placeholder="content"/></p>
            <p><input type="file" name="img"/></p>
            <input  type="submit" value="postfile"/>
        </form>
        <form action="http://localhost:8888/post" method="post">
            <p><input type="text" name="title" placeholder="title"/></p>
            <p><input type="text" name="content" placeholder="content"/></p>
            <input  type="submit" value="post"/>
        </form>
    </body>
</html>
		`;
		res.end(updatahtml);
	}else if(req.url == '/postfile'){
		console.log(req.headers);

		var chunks = [];
		var size = 0;
	    req.on('data', chunk => {
	        chunks.push(chunk);
	        size += chunk.length;
	    });
	    req.on('end', () => {
	        var buffer = Buffer.concat(chunks, size); 
	        var body = buffer.toString();
	        console.log(body);
			res.end();   
	    });
		
	}else if(req.url == '/post'){
		console.log(req.headers);
		var chunks = [];
		var size = 0;
	    req.on('data', chunk => {
	        chunks.push(chunk);
	        size += chunk.length;
	    });
	    req.on('end', () => {
	        var buffer = Buffer.concat(chunks, size); 
	        var body = buffer.toString();
	        console.log(body);               // title=sd&content=sd
			res.end();   
	    });
	}

}).listen(8888)

/*
'content-type': 'application/x-www-form-urlencoded'
'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarysbHAJUwdYRfvQpyT'

{ host: 'localhost:8888',
  connection: 'keep-alive',
  'content-length': '31294',
  'cache-control': 'max-age=0',
  origin: 'http://localhost:8888',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
  'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarysbHAJUwdYRfvQpyT',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,* /*;q=0.8',
  referer: 'http://localhost:8888/',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.8',
  cookie: 'Hm_lvt_9c975eeec1197cd1210a40e18a2b2f54=1510056953,1510281340,1510486680,1510910488; Hm_lpvt_9c975eeec1197cd1210a40e18a2b2f54=1511166947' }

------WebKitFormBoundarysbHAJUwdYRfvQpyT \r\n
Content-Disposition: form-data; name="title" \r\n\r\n                           

sd \r\n
------WebKitFormBoundarysbHAJUwdYRfvQpyT \r\n                                   
Content-Disposition: form-data; name="content" \r\n\r\n                         

sd \r\n                                                                          
------WebKitFormBoundarysbHAJUwdYRfvQpyT \r\n                                    
Content-Disposition: form-data; name="img"; filename="3434344.jpg" \r\n          
Content-Type: image/jpeg \r\n\r\n                                                

................. \r\n                                                           
------WebKitFormBoundarysbHAJUwdYRfvQpyT-- \r\n                                  

表单字段信息头
Content-Disposition: form-data; name="title" \r\n\r\n

二进制文件信息头
Content-Disposition: form-data; name="img"; filename="favicon2.ico" \r\n
Content-Type: image/x-icon \r\n\r\n

*/