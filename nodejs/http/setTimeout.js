var http = require("http");
var server = http.createServer();
server.on("request", (req, res) => {
	console.log('有客户端新的请求');
	res.write('hello');
    res.end();   // 模拟超时
    res.setTimeout(3000, () => console.log("res timeout"));
})
server.setTimeout(10*1000, () => console.log("server timeout"))
server.listen(8888, () => console.log('server start ...'))