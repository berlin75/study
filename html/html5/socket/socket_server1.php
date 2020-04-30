<?php
header("Content_type:text/html;charset=utf-8");
date_default_timezone_set("PRC");
set_time_limit(0);

$address = '127.0.0.1';
$port = 10006; 

$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP) or die("socket failed:".socket_strerror(socket_last_error($sock)));
socket_bind($sock, $address, $port) or die("socket failed:".socket_strerror(socket_last_error($sock)));
socket_listen($sock, 5) or die("socket failed:".socket_strerror(socket_last_error($sock)));

do {
	$connection = socket_accept($sock) or die("socket failed:".socket_strerror(socket_last_error($sock)));
	$msg = "Welcome to connect server '$address'"."\n";
	socket_write($connection, $msg, strlen($msg)) or die("socket failed:".socket_strerror(socket_last_error($sock)));
	echo PHP_EOL.'[time:'.date('Y-m-d H:i:s').']'.PHP_EOL.'Server send: '.$msg.PHP_EOL;
	$receivedData = socket_read($connection, 8192) or die("socket failed:".socket_strerror(socket_last_error($sock)));
	echo '[time:'.date('Y-m-d H:i:s').']'.PHP_EOL.'Received client message: '.$receivedData.PHP_EOL;
	socket_close($connection);
} while(true);

socket_close($sock);

