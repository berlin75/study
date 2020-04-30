var net = require('net');
var client = net.connect({port: 8888}, () => {
   	console.log('已经连接到服务器！'); 
   	client.write('hello server!'); 
    process.stdin.on("data",function(str){       
        if(str.toString("utf8").trim() == "quit"){   // 当输入quit时关闭客户端
            process.exit(1);                         // 退出客户端
        }else{
            client.write(str);                       // 把数据发送到服务器端
        }        
    }) 
});
client.on('data', data => console.log(`【server】: ${data.toString()}`));
client.on('end', () => console.log('断开与服务器的连接'));
