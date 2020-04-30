<?php
$redis = new Redis;
$redis->connect('127.0.0.1', 6379);
$res = $redis->get('html');
if($res == false){
	$redis->set('html', "<a href='./'>php响应的内容</a>", 60*10);
	echo $redis->get('html');
}else{
	echo $res;
}
