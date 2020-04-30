<?php
/**
 * 测试用户获取新消息功能
 */
include './ManyPullMessage.class.php';
$object=new ManyPullMessage();
#用户获取新消息
$e=$object->getNewMessage('jane2');
echo "<pre>";
print_r($e);
echo "</pre>";die;