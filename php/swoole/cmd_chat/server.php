<?php

class Server{
    private $serv;
    private $test;
    public function __construct(){
        $this->serv = new swoole_server("0.0.0.0", 9501);
        $this->serv->set(["worker_num" => 1]);
        $this->serv->on('start', [$this, 'onStart']);
        $this->serv->on('connect', [$this, 'onConnect']);
        $this->serv->on('receive', [$this, 'onReceive']);
        $this->serv->on('close', [$this, 'onClose']);
        $this->serv->start();
    }

    public function onStart($serv){
        echo "start\n";
    }
    public function onConnect($serv, $fd, $from_id){
        echo "client $fd connect\n";
    }
    public function onReceive($serv, $fd, $from_id, $data){
        echo "get message from client $fd\n";
        foreach($serv->connections as $client){
            if($fd !== $client){
                $serv->send($client, "client $client: $data");
            }
        }
    }
    public function onClose($serv, $fd, $from_id){
        echo "client $fd close connection\n";
    }
    
}
$server = new Server;