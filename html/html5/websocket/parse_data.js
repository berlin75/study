var port = 8000;
var host = '127.0.0.1';
var WS='258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
require('net').createServer(function(o){
  var key;
  o.on('data',function(e){
    if(!key){ //握手
      key=e.toString().match(/Sec-WebSocket-Key: (.+)/)[1];
      key=require('crypto').createHash('sha1').update(key+WS).digest('base64');
      o.write('HTTP/1.1 101 Switching Protocols\r\n');
      o.write('Upgrade: websocket\r\n');
      o.write('Connection: Upgrade\r\n');
      o.write('Sec-WebSocket-Accept: '+key+'\r\n');
      o.write('\r\n');

      //握手成功后给客户端发送个数据
      o.write(encodeDataFrame({ FIN:1,Opcode:1,PayloadData:"次碳酸钴" }));
      o.write(encodeDataFrame({ FIN:0,Opcode:1,PayloadData:"ABC" }));
      o.write(encodeDataFrame({ FIN:0,Opcode:0,PayloadData:"-DEF-" }));
      o.write(encodeDataFrame({ FIN:1,Opcode:0,PayloadData:"GHI" }));
    }else{
      onmessage(e); //接收并交给处理函数
    }
  });
}).listen(port, host, () => console.log(`server ${host}:${port} is listenning...`))

function onmessage(e){
  e=decodeDataFrame(e); //解析数据帧
  console.log(e); //把数据输出到控制台
};

// 解析数据帧
function decodeDataFrame(e){
  console.log(e, e.length, e[0], e[1]); 
  // <Buffer 81 8c e4 b1 24 7b 02 1d 85 9c 46 02 cd fe 5c 58 b6 cf> 18 129 140
  var i=0,j,s;
  var frame={                  //解析前两个字节的基本数据
    FIN:e[i] >> 7,               // 129 -> 10000001 -> 00000001 -> 1
    Opcode:e[i++] & 15,          // 129 -> 10000001 00001111 -> 00000001 -> 1
    Mask:e[i] >> 7,              // 140   10001100
    PayloadLength:e[i++] & 0x7F  // 140 127 -> 10001100 01111111 -> 00001100 -> 12
  };                           // { FIN: 1, Opcode: 1, Mask: 1, PayloadLength: 12 }
  //处理特殊长度126和127
  if(frame.PayloadLength==126)
    frame.PayloadLength=(e[i++] << 8) + e[i++];
  if(frame.PayloadLength==127)
    i+=4, //长度一般用四字节的整型,前四个字节通常为长整形留空的
    frame.PayloadLength=(e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];
  //判断是否使用掩码
  if(frame.Mask){
    //获取掩码实体
    frame.MaskingKey=[e[i++],e[i++],e[i++],e[i++]];
    //对数据和掩码做异或运算
    for(j=0,s=[];j < frame.PayloadLength;j++)
      s.push(e[i+j]^frame.MaskingKey[j%4]);
  }else s=e.slice(i,i+frame.PayloadLength); //否则直接使用数据
  //数组转换成缓冲区来使用
  s=new Buffer(s);
  //如果有必要则把缓冲区转换成字符串来使用
  if(frame.Opcode==1)s=s.toString();
  //设置上数据部分
  frame.PayloadData=s;
  //返回数据帧
  return frame;
};

// 生成数据帧
function encodeDataFrame(e){
  var s=[],o=new Buffer(e.PayloadData),l=o.length;
  //输入第一个字节
  s.push((e.FIN << 7) + e.Opcode);
  //输入第二个字节,判断它的长度并放入相应的后续长度消息
  //永远不使用掩码
  if(l < 126){
    s.push(l);
  }else if(l< 0x10000){
    s.push(126,(l&0xFF00)>>8,l&0xFF);
  }else{
    s.push(
      127, 0, 0, 0, 0,                      //8字节数据,前4字节一般没用留空
      (l&0xFF000000)>>24,
      (l&0xFF0000)>>16,
      (l&0xFF00)>>8,
      l&0xFF
    );
  } 
  //返回头部分和数据部分的合并缓冲区
  return Buffer.concat([new Buffer(s),o]);
};