<?php
include './ManyPullMessage.class.php';
$object=new ManyPullMessage();
#群主删除成员
$c=$object->delMembers('jack', '568', array('jane1','jane4'));
echo "<pre>";
print_r($c);
echo "</pre>";die;