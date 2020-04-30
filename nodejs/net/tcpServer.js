/* TCP服务器端 */
var net = require('net');
var port = 8888;
var host = '127.0.0.1';
var server = net.createServer(function(socket){
    console.log('收到来自客户端的请求');
    socket.on('data', function(data){
        console.log(`收到客户端数据，内容为${data}`);
        socket.write('hello,this is server');
    })
    socket.on('close', () => console.log('客户端断开连接'))
})

server.listen(port, host, () => console.log(`server ${host}:${port} is listenning...`))