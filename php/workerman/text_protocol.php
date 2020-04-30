<?php
// Text协议可以用telnet命令测试:telnet 127.0.0.1 8080
use Workerman\Worker;
require_once __DIR__ . '/vendor/autoload.php';

$global_uid = 0;

// 当客户端连上来时为这个连接分配uid，并保存连接，并通知所有客户端
function handle_connection($connection){
    global $text_worker, $global_uid;
    $connection->uid = ++$global_uid;
    foreach($text_worker->connections as $conn){
        $conn->send("user[{$connection->uid}] comming");
    }
}

// 当客户端发送消息过来时转发给所有人
function handle_message($connection, $data){
    global $text_worker;
    foreach($text_worker->connections as $conn){
        $conn->send("user[{$connection->uid}] said: $data");
    }
}

// 当客户端断开时，广播给所有客户端
function handle_close($connection){
    global $text_worker;
    foreach($text_worker->connections as $conn){
        $conn->send("user[{$connection->uid}] logout");
    }
}

// 创建一个文本协议的Worker监听2347接口
$text_worker = new Worker("text://0.0.0.0:8080");

// 只启动1个进程，这样方便客户端之间传输数据
$text_worker->count = 1;

$text_worker->onConnect = 'handle_connection';
$text_worker->onMessage = 'handle_message';
$text_worker->onClose = 'handle_close';

Worker::runAll();