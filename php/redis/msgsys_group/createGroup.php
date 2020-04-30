<?php
/**
 * 测试创建群组功能
 */
include './ManyPullMessage.class.php';
$object=new ManyPullMessage();
#创建群组
$user='jack';
$arr=array('jane1','jane2');
$a=$object->createGroup($user,$arr);
echo "<pre>";
print_r($a);
echo "</pre>";
die;