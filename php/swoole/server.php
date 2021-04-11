<?php
// Server
class Server{
    private $serv;

    public function __construct() {
        // 创建swoole_server对象
        $this->serv = new Swoole\Server("0.0.0.0", 8888);
        // 调用set函数设置swoole_server的相关配置选项
        $this->serv->set(array(
            'worker_num' => 8,
            'daemonize' => false,
            'max_request' => 10000,
            'dispatch_mode' => 2,
            'debug_mode'=> 1
        ));
        // 调用on函数设置相关回调函数
        // onStart回调在server运行前被调用，onConnect在有新客户端连接过来时被调用，onReceive函数在有数据发送到server时被调用，onClose在有客户端断开连接时被调用
        // 在onConnect处监听新的连接;在onReceive处接收数据并处理，然后可以调用send函数将处理结果发送出去;在onClose处处理客户端下线的事件
        $this->serv->on('Start', array($this, 'onStart'));
        $this->serv->on('Connect', array($this, 'onConnect'));
        $this->serv->on('Receive', array($this, 'onReceive'));
        $this->serv->on('Close', array($this, 'onClose'));

        $this->serv->start();
    }

    public function onStart( $serv ) {
        echo "Start\n";
    }

    public function onConnect( $serv, $fd, $from_id ) {
        $serv->send( $fd, "Hello {$fd}!" );
    }

    public function onReceive( $serv, $fd, $from_id, $data ) {
        echo "Get Message From Client {$fd}:\n{$data}\n***************************\n";
    }

    public function onClose( $serv, $fd, $from_id ) {
        echo "Client {$fd} close connection\n";
    }
}
// 启动服务器
$server = new Server();