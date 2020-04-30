var net = require('net');
var server = net.createServer(function(socket){ 
   	console.log('client connected');
   	socket.write('Hello client!\r\n');
   	socket.on('data', data => console.log(`【client】: ${data}`));
   	socket.on('end', () => console.log('客户端关闭连接'));

   	process.stdin.on("data",function(str){       
        if(str.toString("utf8").trim() == "quit"){   // 当输入quit时关闭服务端
            process.exit(1);                         // 退出服务端
        }else{
            socket.write(str);                       // 把数据发送到客户端
        }        
    })
});
server.listen(8888, () => console.log('server is listening ...'));
