/* tcp服务端正常关闭 */
// var net = require('net');
// var server = net.createServer(function(){});
// server.listen(8888, '127.0.0.1', () => {
//     server.close(error => {
//         error?console.log(`close回调：服务端异常：${error.message}`):console.log(`close回调：服务端正常关闭`);
//     }); 
// });
// server.on('close', () => console.log( 'close事件：服务端关闭' ));
// server.on('error', error => console.log( 'error事件：服务端异常：' + error.message ));

/* tcp服务端异常关闭 */
var net = require('net');
var server = net.createServer(function(){});
server.listen(8888, '127.0.0.1');        // 没有正式启动请求监听
server.on('close', () => console.log( 'close事件：服务端关闭' ));
server.on('error', error => console.log( 'error事件：服务端异常：' + error.message ));
server.close(error => {
    error?console.log(`close回调：服务端异常：${error.message}`):console.log(`close回调：服务端正常关闭`);
});