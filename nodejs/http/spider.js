const http = require('http');
const fs = require('fs');
const path = require('path');
const targetUrl = 'http://localhost/study/seoimg/socket.jpg';
const file = path.join(__dirname, path.basename(targetUrl));

function spider(targetUrl, i){
  return new Promise((resolve, reject) => {
    http.get(targetUrl, res => {
      // res.destroy();        // 触发client res close pipe只接收了部分数据,不触发res.end事件
      aboutNetSocket(res.socket, 'res.socket');
      // res.socket.destroy(); // 触发client res close pipe只接收了部分数据,不触发res.end事件
      if (res.statusCode !== 200) {
        console.log(`down ${targetUrl}: ${res.statusCode}`);
      } else {
        console.log(`down ${targetUrl}: ${res.statusCode}`);
        // 响应码200才下载文件,服务端关闭连接触发close事件
        res.pipe(fs.createWriteStream(file)).on('close', () => {
          // callback(null, file);
          console.log(`pipe-close done: ${file}`)
        }); 
      }
      let chunks = [];
      res.on('data', chunk => {
        console.log(`res data, data-length: ${chunk.length}`);
        chunks.push(new Buffer(chunk));
      });
      res.on('end', () => {
        let fileBuf = Buffer.concat(chunks);
        console.log('res end！buffer', fileBuf.toString().length, fileBuf);
      });
      res.on("close", () => console.log("client res close"))
      res.on('error', () => console.log('stream error 数据读取错误'));
      // 服务器没开启时触发req的error事件 
      // err.code：ECONNREFUSED - err.message：connect ECONNREFUSED 127.0.0.1:80
    })

    .on('error', err => {
      if(!err) return;
      console.log(`req error ${targetUrl}: ${err.code} - ${err.message}`)
      reject(err);
    })
    .on('finish', () => {
      console.log('stream finish');
      resolve();
    })
    .on("socket", socket => {
      aboutNetSocket(socket, 'req socket');
      // socket.destroy(); // 触发req.error: ECONNRESET(err.code) = socket hang up(err.message)
    })
  })
}

spider(targetUrl).then(r => r && console.log(r)).catch(e => console.error(e))

function aboutNetSocket(socket, info){
  console.log(`=======================
    ${info}
累积接收到的字节数: ${socket.bytesRead}      
累积发送的字节数: ${socket.bytesWritten}
远程socket地址、端口: ${socket.remoteAddress} ：${socket.remotePort}
本地socket地址、端口: ${socket.localAddress} ：${socket.localPort}    
=======================`)
}

