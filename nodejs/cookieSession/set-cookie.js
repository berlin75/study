const http = require('http');
http.createServer((req, res) => {
	var cookies = {};
	console.log(typeof req.headers.cookie, req.headers.cookie);

	req.headers.cookie && req.headers.cookie.split(';').forEach(cookie =>{
		var parts = cookie.split('=');
		cookies[parts[0].trim()] = parts[1].trim();
	})
	console.log(cookies);

/* 设置单条cookie */
	// res.writeHead(200, {
	//     'Set-Cookie': 'myCookie=test',
	//     'Content-Type': 'text/html'
	// });

/* headers数组形式设置多条cookie */
	// res.writeHead(200, [
	//     ['Set-Cookie', 'mycookie1=value1'],
	//     ['Set-Cookie', 'mycookie2=value2']
	// ]);

	// var date = new Date();
	// var expireDays = 10;
	// date.setTime(date.getTime() + expireDays*24*3600*1000);   
	// res.writeHead(200, [      
	// 	['Content-Type', 'text/html'],
	// 	['Set-Cookie', 'localhost=localhost'],
	// 	['Set-Cookie', 'SSID=Ap4GTEq; Expires=Wed, 13-Jan-2021 22:23:01 GMT;HttpOnly '],
	// 	['Set-Cookie', 'sessionid=sessionid; max-age=10800 '],
	//     ['Set-Cookie', "userId=828; userName=hulk; expires=" + date.toGMTString()],
	//     ['Set-Cookie', "Id=1; name=bbb; expires=" + new Date(new Date().getTime() + 10*24*60*60*10000).toGMTString()],
	//     ['Set-Cookie', ["aaa=bbb","ccc=ddd","eee=fff"]]
	// ]);

	/*
	Set-Cookie:userId=828; userName=hulk; expires=Mon, 25 Dec 2017 14:52:45 GMT
	Set-Cookie:Id=1; name=bbb; expires=Sun, 25 Mar 2018 14:52:45 GMT
	Set-Cookie:aaa=bbb
	Set-Cookie:SSID=Ap4GTEq; Expires=Wed, 13-Jan-2021 22:23:01 GMT;HttpOnly
	Set-Cookie:eee=fff
	Set-Cookie:localhost=localhost
	Set-Cookie:sessionid=sessionid; max-age=10800
	Set-Cookie:ccc=ddd

	Name      Value     Domain    Path  Expires/Max-Age              Size    Http
	Id	      1	        localhost	/	018-03-25T14:52:45.874Z	     3				
	SSID	  Ap4GTEq	localhost	/	2021-01-13T22:23:01.874Z	 11	      ✓			
	aaa	      bbb	    localhost	/	Session	                     6				
	ccc	      ddd	    localhost	/	Session	                     6				
	eee	      fff	    localhost	/	Session	                     6				
	localhost localhost	localhost	/	Session	                     18				
	sessionid sessionid	localhost	/	2017-12-15T17:52:45.874Z	 18				
	userId	  828	    localhost	/	2017-12-25T14:52:45.874Z	  9	
	*/

/* Set-Cookie以数组形式设置多条cookie */
	// res.writeHead(200, {        
	// 	'Content-Type': 'text/html',
	// 	'Set-Cookie': 
	// 	[
	// 		'SSID=Ap4GTEq; Expires=Wed, 13-Jan-2018 22:03:01 GMT; HttpOnly ',
	// 		'uid=1; max-age=10800; domain=localhost; path=/p1 ',   
	// 	    "uname=heiying6958; path=/p1/p2; expires=" + new Date(new Date().getTime() + 10*24*60*60*1000).toGMTString(),
	// 	    "uage=29; expires=" + new Date(new Date().getTime() + 10*24*60*60*1000).toGMTString(),
	// 	    ["aaa=bbb","ccc=ddd","eee=fff"]
	// 	]
	// });

/* 设置多条cookie的首选方法 */
	if(!cookies.uid){
		res.setHeader('Set-Cookie', [
			'SSID=Ap4GTEq; Expires=Wed, 13-Jan-2018 22:03:01 GMT; HttpOnly ',
			'uid=1; max-age=10800; domain=localhost; path=/p1 ',   
		    "uname=heiying6958; path=/p1/p2; expires=" + new Date(new Date().getTime() + 10*24*60*60*1000).toGMTString(),
		    "uage=29; expires=" + new Date(new Date().getTime() + 10*24*60*60*1000).toGMTString(),
		    ["aaa=bbb","ccc=ddd","eee=fff"]
		]);
	}
	res.writeHead(200, {'Content-Type': 'text/html'})

	/*
	Set-Cookie:SSID=Ap4GTEq; Expires=Wed, 13-Jan-2018 22:03:01 GMT; HttpOnly
	Set-Cookie:uid=1; max-age=10800; domain=localhost; path=/p1
	Set-Cookie:uname=heiying6958; path=/p1/p2; expires=Mon, 25 Dec 2017 15:04:44 GMT
	Set-Cookie:uage=29; expires=Mon, 25 Dec 2017 15:04:44 GMT
	Set-Cookie:aaa=bbb,ccc=ddd,eee=fff

	Name      Value             Domain     Path     Expires/Max-Age            Size    Http
	SSID	Ap4GTEq	            localhost	/p1	    2018-01-13T22:03:01.799Z	11	   ✓			
	SSID	Ap4GTEq	            localhost	/	    2018-01-13T22:03:01.926Z	11	   ✓			
	aaa	    bbb,ccc=ddd,eee=fff	localhost	/p1	    Session	                    22				
	aaa	    bbb,ccc=ddd,eee=fff	localhost	/	    Session	                    22				
	uage	29	                localhost	/	    2017-12-25T15:04:44.927Z	6				
	uage	29	                localhost	/p1	    2017-12-25T15:04:44.799Z	6				
	uid	    1	                localhost	/p1	    2017-12-15T18:04:44.927Z	4				
	uname	heiying6958	        localhost	/p1/p2	2017-12-25T15:04:44.927Z	16				
	*/

	res.end('console\n<script>console.log(document.cookie)</script>');
}).listen(8888, 'localhost', () => console.log('Server started on port 8888'))
