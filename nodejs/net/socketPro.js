const net = require('net');
const server = net.createServer();
server.on('connection',	socket => {
	console.log('客户端连接');
	console.log('socket.address(): ', socket.address()); // { address: '::ffff:127.0.0.1', family: 'IPv6', port: 8888 }
	console.log('socket.remoteFamily: ', socket.remoteFamily);    // IPv6
	console.log('socket.remoteAddress: ', socket.remoteAddress);  // ::ffff:127.0.0.1
	console.log('socket.remotePort: ', socket.remotePort);        // 60729
	console.log('socket.localAddress: ', socket.localAddress);    // ::ffff:127.0.0.1
	console.log('socket.localPort: ', socket.localPort);          // 8888
	socket.on('data', data => {
		console.log(data.toString());
		socket.write('ok!');
		console.log('socket.bytesRead: ', socket.bytesRead);       // 13
		console.log('socket.bytesWritten: ', socket.bytesWritten); // 3
	})
})

server.listen(8888, () => console.log('server started'))