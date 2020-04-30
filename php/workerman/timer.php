<?php
require_once __DIR__ . '/vendor/autoload.php';
use Workerman\Worker;
use Workerman\Lib\Timer;

// 不执行任何监听的Worker容器，用来处理一些定时任务
$task = new Worker();
$task->onWorkerStart = function($task){
    // 2.5 seconds
    $time_interval = 2.5; 
    $timer_id = Timer::add($time_interval, function(){
            echo "Timer run\n";
        }
    );
};

// run all workers
Worker::runAll();