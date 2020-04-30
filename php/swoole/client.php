<?php
// 通过swoole_client创建一个基于TCP的客户端实例，并调用connect函数向指定的IP及端口发起连接请求。随后即可通过recv()和send()两个函数来接收和发送请求。这里使用了默认的同步阻塞客户端，因此recv和send操作都会产生网络阻塞
class Client{
    private $client;

    public function __construct() {
        $this->client = new swoole_client(SWOOLE_SOCK_TCP);
    }

    public function connect() {
        if( !$this->client->connect("127.0.0.1", 8888 , 1) ) {
            echo "Error: {$fp->errMsg}[{$fp->errCode}]\n";
        }
        $message = $this->client->recv();
        echo "Get Message From Server:{$message}\n";

        fwrite(STDOUT, "请输入消息：");  
        $msg = trim(fgets(STDIN));
        $this->client->send( $msg );
    }
}

$client = new Client();
$client->connect();