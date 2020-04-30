//测试http://localhost/study/d/comment/comment.html
var http = require('http');
var querystring = require('querystring');

var formData = querystring.stringify({
	'title': 'new nodejs进行测试',
	'author': 'new nodejs进行测试',
	'txt': 'new nodejs进行测试',
});

var options = {
	hostname: 'localhost',
	port: 80,
	path: 'study/d/comment/comment.php',
	method: 'POST',
	headers: {
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':formData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=a5d8a2cd-8ded-48fe-9315-cf8b84311610; imooc_isnew_ct=1508825645; loginstate=1; apsid=g0NmJmODAyMjZjMzJiZGQ0YTUxYmI3YmU2NzljNzIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDc3Mjk5NQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NjUxMzc4NjlAcXEuY29tAAAAAAAAAAAAAAAAAAAAADY1M2MyMDI5NmNkY2Q0OGNkYWJiMzY4ZDgwZWQxN2RkONruWTja7lk%3DZj; last_login_username=465137869%40qq.com; PHPSESSID=j4tq2bs8ovjqb13i2j1qlbdu45; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1508857242,1508921087,1508989300,1509123941; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1509261972; imooc_isnew=2; cvde=59ef55971df35-547',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
};

var req = http.request(options, function(res){
	console.log(res.statusCode);
	console.log(JSON.stringify(res.headers));

	res.on('data', function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	})

	res.on('end', function(){
		console.log('评论完毕');
	});
})

req.on('error', function(err){
	console.log(`request failed: ${err.message}`);
});

req.write(formData);

req.end();