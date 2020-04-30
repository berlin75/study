<?php
define('HOST', '0.0.0.0');
define('PORT', '9501');
define('WORKER_NUM', 8);
define('DISPATCH_MODE', 2);
define('DAEMONIZE', 0);

class swoole_ws{
    private $pdo;
    private $server;

    //这里写死了数据表，之后完成数据库监听后改写这里逻辑
    private $table = [
            'swoole_test',
        ];

    public function __construct(){
        $this->server = new swoole_websocket_server(HOST, PORT);
        $this->server->set([
                'worker_num'    => WORKER_NUM,
                'dispatch_mode' => DISPATCH_MODE,
                'daemonize'     => DAEMONIZE,
            ]
        );
        $this->server->on('message', [$this, 'onMessage']);
        $this->server->on('open', [$this, 'onOpen']);
        $this->server->on('workerStart', [$this, 'onWorkerStart']);
        $this->server->start();
    }

    //woker进程
    public function onWorkerStart(swoole_websocket_server $server, $worker_id){
        if ($worker_id == 0) {
            // 0 worker进程开启一个定时器去监听mysql数据变化
            $this->server->tick(500, [$this, 'onTick']);
        }
        //每个worker进程维持一个pdo连接
        $this->pdo = new PDO("mysql:host=127.0.0.1;dbname=my_db01", "root", "");
    }

    //接受客户端数据
    public function onMessage(swoole_websocket_server $server, swoole_websocket_frame $frame){
//        echo $frame->data;   //客户端发送的数据
//        echo $server->worker_id;
    }

    //客户端 服务端建立连接并完成握手后的回调
    public function onOpen(swoole_websocket_server $server, swoole_http_request $request){
        //第一次连接去获取一下Mysql数据
        $this->update();
    }

    private function update(){
        $res = [];
        foreach ($this->table as $table) {
            $res[$table] = $this->getTableData($table);
        }
        foreach ($this->server->connections as $connection) {
            //向所有客户端发送数据
            $this->server->push($connection, json_encode($res));
        }
    }

    //获取表数据
    private function getTableData($table){
        $sql = 'select * from ' . $table;
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $res ?: [];
        } catch (Exception $e) {
            return [];
        }
    }

    //定时器回调
    public function onTick(){
        /*
         * is_update表记录表是否更新过
         * swoole_test表添加了3个触发器， after insert、update、delete，
         * 会向is_update表更新swoole_test是否有更新操作
         */
        try {
            $sql = 'select is_update from is_update where table_name = "swoole_test"';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ( ! $res) {
                return [];
            }
            if ($res[0]['is_update'] == 1) {
                //当is_update字段为1时表明数据有更新，向客户端推送消息
                $this->update();
                //更新下表更新字段
                $update = 'update is_update set is_update=0 where table_name = "swoole_test"';
                $stmt = $this->pdo->prepare($update);
                $stmt->execute();
            }
        } catch (Exception $e) {
            $this->pdo = new PDO("mysql:host=127.0.0.1;dbname=my_db01", "root", "");
        }
    }
}

new swoole_ws();
