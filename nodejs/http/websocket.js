const net = require('net')
const crypto = require('crypto')

// 使用net模块创建服务器，返回的是一个原始的socket对象，与Socket.io的socket对象不同。
const server = net.createServer((socket) => {
  socket.once('data', (buffer) => {
		const headers = parseHeader(buffer.toString())  // 接收到HTTP请求头数据
		// 根据请求头参数，判断是否WebSocket请求
		if (headers['upgrade'] !== 'websocket') { // 若当前请求不是WebSocket连接则关闭连接,若可以升级表示为WebSocket请求
			console.log('非WebSocket连接')
			socket.end()
		} else if (headers['sec-websocket-version'] !== '13') { // 判断WebSocket版本是否为13，防止是其他版本，造成兼容错误
			console.log('WebSocket版本错误')
			socket.end()
		} else {
			// 请求为WebSocket连接时，校验Sec-WebSocket-Key，完成连接
			// 根据协议规定的方式，向前端返回一个请求头，完成建立WebSocket连接的过程
			// 若客户端校验结果正确，在控制台的Network模块可以看到HTTP请求的状态码变为101 Switching Protocols，同时客户端的ws.onopen事件被触发
			// 连接开始后，可以在控制台的Network模块看到，该连接会一直保留在pending状态，直到连接断开
			const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
      const key = headers['sec-websocket-key']
      const hash = crypto.createHash('sha1')  // 创建一个签名算法为sha1的哈希对象
      hash.update(`${key}${GUID}`)  // 将key和GUID连接后，更新到hash
      const result = hash.digest('base64') // 生成base64字符串
	  	const header = `HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-Websocket-Accept: ${result}\r\n\r\n`
      socket.write(header)  // 返回HTTP头，告知客户端校验结果，HTTP状态码101表示切换协议
      
			// 处理聊天数据,此时可以通过data事件处理客户端的数据，但此时双方通信的数据为二进制，需要按照其格式进行处理后才可以正常使用
			socket.on('data', (buffer) => {
        const data = decodeWsFrame(buffer)
        console.log(data, data.payloadData && data.payloadData.toString())

        // opcode为8，表示客户端发起了断开连接,与客户端断开连接
        if (data.opcode === 8) {
          socket.end()
        } else {  // 接收到客户端数据时的处理，此处默认为返回接收到的数据。
          socket.write(encodeWsFrame({ payloadData: `服务端接收到的消息为：${data.payloadData ? data.payloadData.toString() : ''}` }))
        }
      })
		}
	})
}).listen(8080, () => console.log('websocket on port localhost://8080'))

function parseHeader(str) {
  let arr = str.split('\r\n').filter(item => item)  // 将请求头数据按回车符切割为数组，得到每一行数据
  arr.shift()  // 第一行数据为GET / HTTP/1.1，可以丢弃。
  let headers = {}  // 存储最终处理的数据
  arr.forEach((item) => {
    let [name, value] = item.split(':')  // 需要用":"将数组切割成key和value
    name = name.replace(/^\s|\s+$/g, '').toLowerCase()  // 去除无用的空格，将属性名转为小写
    value = value.replace(/^\s|\s+$/g, '')
    headers[name] = value  // 获取所有的请求头属性
  })
  return headers
}

// 处理收到的数据：
function decodeWsFrame(data) {
  let start = 0;
  let frame = {
    isFinal: (data[start] & 0x80) === 0x80,
    opcode: data[start++] & 0xF,
    masked: (data[start] & 0x80) === 0x80,
    payloadLen: data[start++] & 0x7F,
    maskingKey: '',
    payloadData: null
  };

  if (frame.payloadLen === 126) {
    frame.payloadLen = (data[start++] << 8) + data[start++];
  } else if (frame.payloadLen === 127) {
    frame.payloadLen = 0;
    for (let i = 7; i >= 0; --i) {
      frame.payloadLen += (data[start++] << (i * 8));
    }
  }

  if (frame.payloadLen) {
    if (frame.masked) {
      const maskingKey = [ data[start++], data[start++], data[start++], data[start++] ];
      frame.maskingKey = maskingKey;
      frame.payloadData = data.slice(start, start + frame.payloadLen).map((byte, idx) => byte ^ maskingKey[idx % 4]);
    } else {
      frame.payloadData = data.slice(start, start + frame.payloadLen);
    }
  }
  return frame;
}

// 处理发出的数据：
function encodeWsFrame(data) {
  const isFinal = data.isFinal !== undefined ? data.isFinal : true,
    opcode = data.opcode !== undefined ? data.opcode : 1,
    payloadData = data.payloadData ? Buffer.from(data.payloadData) : null,
    payloadLen = payloadData ? payloadData.length : 0;

  let frame = [];

  if (isFinal) frame.push((1 << 7) + opcode);
  else frame.push(opcode);

  if (payloadLen < 126) {
    frame.push(payloadLen);
  } else if (payloadLen < 65536) {
    frame.push(126, payloadLen >> 8, payloadLen & 0xFF);
  } else {
    frame.push(127);
    for (let i = 7; i >= 0; --i) {
      frame.push((payloadLen & (0xFF << (i * 8))) >> (i * 8));
    }
  }

  frame = payloadData ? Buffer.concat([Buffer.from(frame), payloadData]) : Buffer.from(frame);
  return frame;
}
