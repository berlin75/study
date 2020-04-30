<?php
require_once __DIR__ . '/vendor/autoload.php';
use Workerman\Worker;

// Create a Websocket server
$ws_worker = new Worker("websocket://0.0.0.0:8080");

// 4 processes
$ws_worker->count = 4;

// Emitted when new connection come
$ws_worker->onConnect = function($connection){
    echo "New connection\n";
 };

// Emitted when data received
$ws_worker->onMessage = function($connection, $data){
    // Send hello $data
    $connection->send('hello ' . $data);
};

// Emitted when connection closed
$ws_worker->onClose = function($connection){
    echo "Connection closed\n";
};

// Run worker
Worker::runAll();

/*
var wsServer = 'ws://127.0.0.1:8080';
var websocket = new WebSocket(wsServer);
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