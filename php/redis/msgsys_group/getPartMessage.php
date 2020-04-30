<?php
/**
 * 测试用户获取某个群组部分消息
 */
include './ManyPullMessage.class.php';
$object=new ManyPullMessage();
#用户获取某个群组部分消息
$f=$object->getPartMessage('jane2', 568, 1, 10); 
echo "<pre>";
print_r($f);
echo "</pre>";die;