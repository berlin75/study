// 直接用ws模块提供的WebSocket来充当客户端
const WebSocket = require('ws');
let ws = new WebSocket('ws://localhost:3000/test');

// 打开WebSocket连接后立刻发送一条消息:
ws.on('open', () => {
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});

// 响应收到的消息:
ws.on('message', message => {
    console.log(`[CLIENT] Received: ${message}`);
});