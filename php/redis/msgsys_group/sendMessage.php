<?php
/**
 * 测试发送消息功能
 */
include './ManyPullMessage.class.php';
$object=new ManyPullMessage();
#发送消息
$user='jane2';
$message='go go go';
$groupChatID=568;
$arr=array('sender'=>$user, 'message'=>$message, 'time'=>time());
$d=$object->sendMessage($user,$groupChatID,$arr);
echo "<pre>";
print_r($d);
echo "</pre>";die;