var net = require('net');
var opt = {
    host: '127.0.0.1',
    port: '8888'
};
var client = net.connect(opt, function(){
    client.write('msg from client');               // 可写
});
client.on('data', function(data){                  // 可读
    console.log('client: got reply from server [%s]', data);
    client.end();
});