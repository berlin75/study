/* 表单通过 POST 提交并输出数据 */
var http = require('http');
var querystring = require('querystring');
var util = require('util');
 
var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';
 
http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    body = querystring.parse(body);                                   // 解析参数   
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});  // 设置响应头部信息及编码 
    if(body.name && body.url) {                                       // 输出提交的数据
        res.write("网站名：" + body.name + "<br>");
        res.write("网站 URL：" + body.url);
        console.log('响应表单内容');
    } else {                                                          // 输出表单
        res.write(postHTML);
        console.log('响应一份表单');
    }
    res.write('<hr/>');
    res.end(util.inspect(body));
  });
}).listen(8888);
console.log('The server is listening...');