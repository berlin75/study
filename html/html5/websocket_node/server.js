var port = 8000;
var host = '127.0.0.1';
var WS = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
require('net').createServer(function(o){
  console.log("coming~~~");
  var key;
  o.on('data',function(e){
    if(!key){    //握手
      key = e.toString().match(/Sec-WebSocket-Key: (.+)/)[1];
      key = require('crypto').createHash('sha1').update(key+WS).digest('base64');
      o.write('HTTP/1.1 101 Switching Protocols\r\n');
      o.write('Upgrade: websocket\r\n');
      o.write('Connection: Upgrade\r\n');
      o.write('Sec-WebSocket-Accept: '+key+'\r\n');
      o.write('\r\n');
    }else{
      onmessage(e);     //接收并交给处理函数
    }
  });
}).listen(port, host, () => console.log(`server ${host}:${port} is listenning...`))

function onmessage(e){
  e=decodeDataFrame(e); //解析数据帧
    console.log(e);     //把数据输出到控制台
};

function decodeDataFrame(e){
  console.log(e, e.length, e[0], e[1]); 
  // < Buffer 81 8c e4 b1 24 7b 02 1d 85 9c 46 02 cd fe 5c 58 b6 cf > 18 129 140
  var i=0,j,s;
  var frame={                    //解析前两个字节的基本数据,{ FIN: 1,Opcode: 1,Mask: 1,PayloadLength: 12 }
    FIN:e[i] >> 7,               // 81 -> 129 -> 10000001 -> FIN:1,opcode:1
    Opcode:e[i++] & 15,          
    Mask:e[i] >> 7,              // 8c -> 140 -> 10001100 -> MASK:1,PayloadLen:12
    PayloadLength:e[i++] & 0x7F  
  };

  // 处理特殊长度126和127
  if(frame.PayloadLength==126)
    frame.PayloadLength=(e[i++] << 8) + e[i++];
  if(frame.PayloadLength==127)
    i+=4, // 长度一般用四字节的整型,前四个字节通常为长整形留空的
    frame.PayloadLength=(e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];

  // 判断是否使用掩码
  if(frame.Mask){
    // 获取掩码实体[e4,b1,24,7b] -> [11100100, 10110001, 00100100, 01111011] ->[]
    // 12字节数据：02 1d 85 9c 46 02 cd fe 5c 58 b6 cf -> 00000010 00011101 10000101 10011100 1000110 00000010 11001101 11111110 01011100 01011000 10110110 11001111 
    frame.MaskingKey=[e[i++],e[i++],e[i++],e[i++]];
    // 对数据和掩码做异或运算
    for(j=0,s=[];j < frame.PayloadLength;j++)
      s.push(e[i+j]^frame.MaskingKey[j%4]);
  }else{
    // 否则直接使用数据
  s=e.slice(i,i+frame.PayloadLength); 
  }

  // 数组转换成缓冲区来使用
  s=new Buffer(s);
  // 如果有必要则把缓冲区转换成字符串来使用
  if(frame.Opcode==1) s=s.toString();
  // 设置上数据部分
  frame.PayloadData=s;
  // 返回数据帧
  return frame;
};