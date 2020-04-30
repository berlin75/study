/* TCP客户端 */
var net = require('net');
var port = 8888;
var host = '127.0.0.1';
var client = net.createConnection(port, host);
client.on('connect', () => console.log('已经与服务器端建立连接'))
client.on('data', (data) => console.log(`收到服务器数据，内容为${data}`))
client.on('close', () => console.log('断开连接'))
client.end('你好，我是客户端');