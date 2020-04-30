var http = require('http');

//2.创建HTTP服务器
var server = http.createServer(function(req,res){
    if(req.url == '/'){ //请求主页
       console.log(req.getAllResponseHeaders);
        res.writeHead(200,{ 'Content-type':"text/html"});
        res.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +'床前明月光');
        res.end();
    }else {
        res.writeHead(404,{ 'Content-type':"text/html"});
        res.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +'错误404：网页没找到');
        res.end();
    }
});

//3.启动Http服务器
server.listen(8888,() => console.info("正在监听8888端口"));