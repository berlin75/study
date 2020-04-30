let uri = 'http://pic.keke1sassds2345.info/asdsdfds';
require('http').get(uri, res => {
	console.log(res.statusCode, res.headers);
}).on('error', err => {
	if(err) console.log(err);
})

/*
url域名段正确,某个页面不存在时返回404错误
let uri = 'http://pic.keke12345.info/picss/2017/allimg/171122/22213327-1-16294.jpg';
404 { 'content-type': 'text/html',
  server: 'Microsoft-IIS/7.5',
  'x-powered-by': 'ASP.NET',
  date: 'Tue, 06 Feb 2018 17:36:34 GMT',
  connection: 'close',
  'content-length': '1163' }
*/

/*
url域名段错误
let uri = 'http://www.csdsdsdsdsd.com';
{ Error: getaddrinfo ENOTFOUND www.badsdsdidu.com www.badsdsdidu.com:80
    at errnoException (dns.js:50:10)
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:92:26)
  code: 'ENOTFOUND',
  errno: 'ENOTFOUND',
  syscall: 'getaddrinfo',
  hostname: 'www.badsdsdidu.com',
  host: 'www.badsdsdidu.com',
  port: 80 }
*/