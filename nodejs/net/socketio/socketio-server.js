const app = require('http').createServer(handler).listen(8888, () => console.log('server start on port 8888'));
const io = require('socket.io').listen(app);
const fs = require('fs');

function handler(req, res){
	fs.readFile(__dirname + '/socketio-client.html', (err, data) => {
		if(err){
			res.writeHead(500);
			return res.end('Error load socketio-client.html');
		}
		res.writeHead(200);
		res.end(data);
	})
}

io.sockets.on('connection', socket => {
	socket.emit('news', {server: 'hi!'});
	socket.on('reply', data => {
		console.log(data);
	})
})
