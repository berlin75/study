var net = require('net');
var server = net.createServer();
server.on("connection",socket => {
	console.log("有新的连接");
	socket.write("警告：10秒空闲就会被踢出！")
    socket.setTimeout(10*1000, () => {
       socket.write("踢出！！");
       socket.destroy();
    }) 
    socket.on("data",data => {
        if(socket.bytesRead > 500*1024){    
            socket.pause();
            socket.write("数据量大于500K，3秒内自动关闭socket连接,您将会被踢出！");
            setTimeout(() => socket.destroy(),3000);
        }
    })
    socket.on('close', err => console.log('close', err))      // 触发
	socket.on('error', err => console.log('error', err))
	socket.on('end', err => console.log('end', err))          
})
server.listen(8888, () => console.log('服务器已启动！'));