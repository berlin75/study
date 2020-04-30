// 客户端代码
var dgram = require("dgram");
var client = dgram.createSocket("udp4");
process.stdin.on("data", data => {
    client.send(data,0,data.length,8888,"localhost");
});