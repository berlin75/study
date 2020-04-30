const net = require('net');
const socket = new net.Socket();
socket.connect(8888, () => console.log(socket.address()))