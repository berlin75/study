// 广播端
var udp = require("dgram");
var client = udp.createSocket("udp4",function(){});
client.on("listening", () => client.setBroadcast(true))
process.stdin.on("data", data => {
    client.send(data, 0, data.length, 8888, "255.255.255.255");
});