// 接收方
var udp = require("dgram");
var socket = udp.createSocket('udp4', msg => console.log(msg.toString()));
socket.bind(8888);