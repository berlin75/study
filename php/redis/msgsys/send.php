<?php
include './SinglePullMessage.class.php';
$object = new SinglePullMessage();
#发送消息
$sender = 'boss';         // 发送者
$to = 'jane';             // 接收者
$message = 'How are you'; // 信息
$time = time();
$arr = array('sender'=>$sender,'message'=>$message,'time'=>$time);
echo $object->sendSingle($to, $arr);