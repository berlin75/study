<?php
$socket = stream_socket_client('tcp://127.0.0.1:9501', $errno, $errstr, 30);

function onRead(){
	global $socket;
	$buffer = stream_socket_recvfrom($socket, 1024);
	if(!$buffer){
		echo "server closed\n";
		swoole_event_del($socket);
	}
	echo "\nrecv: $buffer\n";
	fwrite(STDOUT, "Enter Msg:");
}

function onWrite(){
	global $socket;
	echo "on write\n";
}

function onInput(){
	global $socket;
	$msg = trim(fgets(STDIN));
	if($msg == 'exit'){
		swoole_evnet_exit($socket);
		exit();
	}
	swoole_event_write($socket, $msg);
	fwrite(STDOUT, "Enter Msg:");
}

swoole_event_add($socket, 'onRead', 'onWrite');
swoole_event_add(STDIN, 'onInput');
fwrite(STDOUT, "Enter Msg:");