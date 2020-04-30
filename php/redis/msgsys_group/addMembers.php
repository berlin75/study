<?php
/**
 * 测试添加成员功能
 */
include './ManyPullMessage.class.php';
$object=new ManyPullMessage();
$b=$object->addMembers('jack','568',array('jane1','jane2','jane3','jane4'));
echo "<pre>";
print_r($b);
echo "</pre>";die;