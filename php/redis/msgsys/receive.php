<?php
include './SinglePullMessage.class.php';
$object = new SinglePullMessage();
$preArr = $object->getPreMessage('jane');
if($preArr){
 	$object->dealArr($preArr); 
}else{
 	echo "无消息";
}


$arr = $object->getNewMessage('jane');
if($arr){
 	echo $arr['count']."个联系人发来新消息<br/><hr/>";
 	$object->dealArr($arr['messageArr']); 
}else{
 	echo "无新消息";
}
