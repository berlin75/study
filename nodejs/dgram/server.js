// 服务器代码
var dgram = require("dgram");
var server = dgram.createSocket('udp4');
server.bind(8888);
server.on("message", (msg,rinfo) => {
	console.log(msg.toString())
	console.log(rinfo)
})