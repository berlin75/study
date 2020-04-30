var net = require('net');
var fs = require("fs");
var filedata = fs.readFileSync(__dirname+"/../stream/luky.mp4");
var socket = net.connect(8888,"localhost",() => socket.write(filedata));
socket.on('data', data => console.log(data.toString()));
socket.on('close', err => console.log('close', err))      // 后触发
socket.on('error', err => console.log('error', err))
socket.on('end', err => console.log('end', err))          // 先触发