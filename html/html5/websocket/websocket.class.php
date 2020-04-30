<?php
/*
创建类websocket($config);
$config结构:
$config=array(
  'address'=>'192.168.0.200',//绑定地址
  'port'=>'8000',//绑定端口
  'event'=>'WSevent',//回调函数的函数名
  'log'=>true,//命令行显示记录
);
 
回调函数返回数据格式
function WSevent($type,$event)
 
$type字符串 事件类型有以下三种
in  客户端进入
out 客户端断开
msg 客户端消息到达
均为小写
 
$event 数组
$event['k']内置用户列表的userid;
$event['sign']客户标示
$event['msg']收到的消息 $type='msg'时才有该信息
 
方法:
run()运行
search(标示)遍历取得该标示的id
close(标示)断开连接
write(标示,信息)推送信息
idwrite(id,信息)推送信息
 
属性:
$users 客户列表
结构:
$users=array(
[用户id]=>array('socket'=>[标示],'hand'=[是否握手-布尔值]),
[用户id]=>arr.....
)
*/
 
class websocket{
  public $log;
  public $event;
  public $signets;
  public $users;  
  public $master; 

  public function __construct($config){
    if (substr(php_sapi_name(), 0, 3) !== 'cli') {
      die("请通过命令行模式运行!");
    }
    error_reporting(E_ALL);
    set_time_limit(0);
    //打开/关闭绝对刷送,绝对（隐式）刷送将导致在每次输出调用后有一次刷送操作,以便不再需要对flush()的显式调用
    ob_implicit_flush(); 
    $this->event = $config['event'];
    $this->log = $config['log'];
    $this->master = $this->WebSocket($config['address'], $config['port']);
    $this->sockets = array('s'=>$this->master);
  }

  function WebSocket($address, $port){
    $server = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    if(!is_resource($server)){
        die('Unable to create socket: '. socket_strerror(socket_last_error()) . PHP_EOL);
    }else{
        echo 'created socket!'. PHP_EOL;
    }
    socket_set_option($server, SOL_SOCKET, SO_REUSEADDR, 1);
    echo 'try to bild......'. PHP_EOL;
    socket_bind($server, $address, $port);
    echo 'bild success!'. PHP_EOL;
    socket_listen($server);
    $this->log('开始监听: '.$address.' : '.$port);
    return $server;
  }

  function run(){
    while(true){
      $changes=$this->sockets; 
      echo "changes...............". PHP_EOL; 
      var_dump($changes);
      echo "changes...............". PHP_EOL;
      @socket_select($changes, $write=NULL, $except=NULL, NULL);
      foreach($changes as $sign){
        if($sign==$this->master){
          $client=socket_accept($this->master);
          echo 'accept a client socket!'. PHP_EOL;
          $this->sockets[]=$client;
          $user = array(
            'socket'=>$client,
            'hand'=>false,
          );
          $this->users[] = $user;
          $k=$this->search($client);  //通过标示遍历获取id
          $eventreturn = array('k'=>$k,'sign'=>$sign);
          $this->eventoutput('in', $eventreturn);  //$this->event作为回调函数
        }else{
          $len=socket_recv($sign,$buffer,2048,0); //从已连接的socket中接收帧数据保存到$buffer中
          $k=$this->search($sign);
          $user=$this->users[$k];
          if($len<7){                //client offline
            $this->close($sign);
            $eventreturn = array('k'=>$k,'sign'=>$sign);
            $this->eventoutput('out',$eventreturn);
            continue;
          }
          if(!$this->users[$k]['hand']){   //没有握手进行握手
            $this->handshake($k,$buffer);  //$buffer为请求头数据
          }else{
            $buffer = $this->uncode($buffer);
            $eventreturn = array('k'=>$k,'sign'=>$sign,'msg'=>$buffer);
            $this->eventoutput('msg',$eventreturn);
          }
        }
      }
    }
  }

  function search($sign){  //通过标示遍历获取id
    foreach ($this->users as $k=>$v){
      if($sign==$v['socket'])
      return $k;
    }
    return false;
  }

  function close($sign){   //通过标示断开连接
    $k=array_search($sign, $this->sockets); //在数组中搜索某个键值，并返回对应的键名
    socket_close($sign);
    unset($this->sockets[$k]);
    unset($this->users[$k]);
  }

  function handshake($k,$buffer){  //参数 id和帧数据
    var_dump($buffer);             //$buffer为请求头数据
    $buf = substr($buffer,strpos($buffer,'Sec-WebSocket-Key:')+18); //从Sec-WebSocket-Key值开始截取
    $key = trim(substr($buf,0,strpos($buf,"\r\n")));                //获取Sec-WebSocket-Key值
    $new_key = base64_encode(sha1($key."258EAFA5-E914-47DA-95CA-C5AB0DC85B11",true)); //追加固定魔串
    $new_message = "HTTP/1.1 101 Switching Protocols\r\n";
    $new_message .= "Upgrade: websocket\r\n";
    $new_message .= "Sec-WebSocket-Version: 13\r\n";
    $new_message .= "Connection: Upgrade\r\n";
    $new_message .= "Sec-WebSocket-Accept: " . $new_key . "\r\n\r\n";
    socket_write($this->users[$k]['socket'],$new_message,strlen($new_message));
    $this->users[$k]['hand']=true;
    return true;
  }

  //数据帧解析
  function uncode($str){ //参数为server接收的数据
    var_dump($str);
    $mask = array();  
    $data = '';  
    $msg = unpack('H*',$str);   //从二进制字符串对数据进行解包,格式H - Hex string, high nibble first,返回数组
    var_dump($msg);
    $head = substr($msg[1],0,2); //client input hello,$msg[1]=8189e4de0fe691b06b8382b7618380共30位,$head=81
    var_dump($head); 
    if (hexdec($head{1}) === 8) {   //hexdec十六进制转为10进制,{1}变量相应序号对应的字符,0开始
      $data = false;  
    }else if (hexdec($head{1}) === 1){  
      $mask[] = hexdec(substr($msg[1],4,2)); //e4转10进制
      $mask[] = hexdec(substr($msg[1],6,2));
      $mask[] = hexdec(substr($msg[1],8,2));
      $mask[] = hexdec(substr($msg[1],10,2)); //e6转10进制
      var_dump($mask);
      $s = 12;  
      $e = strlen($msg[1])-2;  
      $n = 0;  
      for ($i=$s; $i<= $e; $i+= 2) {  
        $data .= chr($mask[$n%4]^hexdec(substr($msg[1],$i,2)));  
        $n++;  
      }  
    }  
    var_dump($data); 
    return $data;
  }

  function code($msg){
    $msg = preg_replace(array('/\r$/','/\n$/','/\r\n$/',), '', $msg);
    $frame = array();  
    $frame[0] = '81';  
    $len = strlen($msg);  
    $frame[1] = $len<16?'0'.dechex($len):dechex($len);
    $frame[2] = $this->ord_hex($msg);
    $data = implode('',$frame);
    return pack("H*", $data);
  }

  function ord_hex($data)  {  
    $msg = '';  
    $l = strlen($data);  
    for ($i= 0; $i<$l; $i++) {  
      $msg .= dechex(ord($data{$i}));  //返回字符串的首个字符的 ASCII 值
    }  
    return $msg;  
  }

  function idwrite($id,$t){//通过id推送信息
    if(!$this->users[$id]['socket']){return false;}//没有这个标示
    $t=$this->code($t);
    return socket_write($this->users[$id]['socket'],$t,strlen($t));
  }

  function write($k,$t){//通过标示推送信息
    $t=$this->code($t);
    $t=iconv('utf-8','gbk//IGNORE', $t);
    return socket_write($k,$t,strlen($t));
  }

  function eventoutput($type,$event){//事件回调;
    //第一个参数是被调用的回调函数，其余参数是回调函数的参数
    call_user_func($this->event,$type,$event);
  }

  function log($t){//控制台输出
    if($this->log) fwrite(STDOUT, iconv('utf-8','gbk//IGNORE', $t."\r\n"));  
  }
}