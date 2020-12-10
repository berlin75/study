<?php
// $GLOBALS['fd'][1] = ['id' => 1, 'name' =>'匿名游客'];
// $GLOBALS['fd'][2] = ['id' => 2, 'name' =>'匿名游客'];
// $rand = mt_rand();
// $GLOBALS['fd'][$rand] = ['id' => $rand, 'name' =>'匿名游客'];
// $rand = mt_rand();
// $GLOBALS['fd'][$rand] = ['id' => $rand, 'name' =>'匿名游客'];
// var_dump($GLOBALS['fd']);
// $GLOBALS['fd'] = [
//  10 => ['id' => 10, 'name' => '匿名游客'],
//  20 => ['id' => 20, 'name' => '匿名游客'],
//  30 => ['id' => 30, 'name' => '匿名游客'],
// ];
// var_dump($GLOBALS['fd']);

echo "starting" . PHP_EOL;
$ws = new Swoole\WebSocket\Server('0.0.0.0', 9501);
$ws->on('open', function($ws, $request){
    echo "加入新用户 $request->fd".PHP_EOL;
    // $GLOBALS['fd'][$request->fd] = ['id' => $request->fd, 'name' =>'匿名游客'];
    // var_dump($GLOBALS['fd']);
    file_put_contents('clients.txt', $request->fd.',', FILE_APPEND);
});
$ws->on('message', function($ws, $request){
    var_dump($request);
    echo "onmessage {$request->fd}: {$request->data}\n";
    if(strstr($request->data, "#name#")){
        $GLOBALS['fd'][$request->fd]['name'] = ltrim($request->data, "#name#");
    }else{
        $msg = $GLOBALS['fd'][$request->fd]['name'] . ":" .$request->data . "\n";
        // foreach($GLOBALS['fd'] as $i){
        $clients = file_get_contents('clients.txt');
        $clients = explode(',', $clients);
        foreach($clients as $i){
            $res = $ws->push($i['id'], $msg);
            var_export($res);
        }
    }
});
$ws->on('close', function($ws, $request){
    echo "用户 $request 断开连接".PHP_EOL;
    unset($GLOBALS['fd'][$request]);
});
$ws->start();

/*
var websocket = new WebSocket('ws://127.0.0.1:9502');
websocket.onopen = function (evt) {
    console.log("Connected to WebSocket server.");
    websocket.send('this is client');
};
 
websocket.onclose = function (evt) {
    console.log("Disconnected");
};
 
websocket.onmessage = function (evt) {
    console.log('Retrieved data from server: ' + evt.data);
};
 
websocket.onerror = function (evt, e) {
    console.log('Error occured: ' + evt.data);
};
*/