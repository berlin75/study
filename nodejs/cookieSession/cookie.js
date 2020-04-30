const http = require('http');
http.createServer((req, res) => {
	var cookies = {};
	console.log(typeof req.headers.cookie, req.headers.cookie);
    /* string blog=s%3AjAxD2mqU4B9hTrdS3Y4hdob5vkEVmZft.vjfURE48RbIpu0KDe1vDP6OwPV0GIMq2XI%2Fwou%2BpmVM; Hm_lvt_9c975eeec1197cd1210a40e18a2b2f54=1512144034,1512457989,1512577413,1513253254; Hm_lpvt_9c975eeec1197cd121
0a40e18a2b2f54=1513253254; aaa=bbb; ccc=ddd; eee=fff */
	req.headers.cookie && req.headers.cookie.split(';').forEach(cookie =>{
		var parts = cookie.split('=');
		cookies[parts[0].trim()] = parts[1].trim();
	})
	console.log(cookies);
	/* { blog: 's%3AjAxD2mqU4B9hTrdS3Y4hdob5vkEVmZft.vjfURE48RbIpu0KDe1vDP6OwPV0GIMq2XI%2Fwou%2BpmVM',
  Hm_lvt_9c975eeec1197cd1210a40e18a2b2f54: '1512144034,1512457989,1512577413,1513253254',
  Hm_lpvt_9c975eeec1197cd1210a40e18a2b2f54: '1513253254',
  aaa: 'bbb',
  ccc: 'ddd',
  eee: 'fff' } */
    res.writeHead(200, {
	    'Set-Cookie': '["aaa=bbb","ccc=ddd","eee=fff"]',
	    'Content-Type': 'text/html'
	});
	res.end('console\n<script>console.log(document.cookie)</script>');
}).listen(8888, () => console.log('Server started on port 8888'))