const http = require('http');
const util = require('util');
const server = http.createServer((req, res) => {
	if(req.url == '/favicon.ico') return;
	res.end('ok');
	console.log(require('util').inspect(server, true));
	console.log(server.address()); 
	server.getConnections((err, count) => {
		if(err) return console.log(err);
		console.log(count);
	})
}).listen(8888, () => console.log('server start on localhost:8888'))

/*
Server {
  domain: null,
  _events:
   { request: { [Function] [length]: 2, [name]: '' },
     connection:
      { [Function: connectionListener]
        [length]: 1,
        [name]: 'connectionListener',
        [prototype]: [Object] } },
  _eventsCount: 2,
  _maxListeners: undefined,
  _connections: 1,
  [connections]: [Getter/Setter],
  _handle:
   TCP {
     reading: false,
     owner: [Circular],
     onread: null,
     onconnection: { [Function: onconnection] [length]: 2, [name]: 'onconnection', [prototype]: [Object] },
     writeQueueSize: 0 },
  _usingSlaves: false,
  _slaves: [ [length]: 0 ],
  _unref: false,
  allowHalfOpen: true,
  pauseOnConnect: false,
  httpAllowHalfOpen: false,
  timeout: 120000,
  keepAliveTimeout: 5000,
  _pendingResponseData: 0,
  maxHeadersCount: null,
  _connectionKey: '6::::8888',
  [Symbol(asyncId)]: 6 }
{ address: '::', family: 'IPv6', port: 8888 }
1
*/