<?php
header("Content_type:text/html;charset=utf-8");
$file='./test.txt';     //相对路径
//$file='E:/wamp/www/d/php/file/test1.txt';      //绝对垃圾
//$file='http:/localhost/d/php/file/test2.txt';  //url地址远程文件只能以只读打开存在的文件
$fp=fopen($file,'a+b');        //以二进制写入的方式打开文件
if(!$fp){ echo '打开文件失败';}
else{ 
	  echo '打开文件成功';   var_dump($fp);
      $str=md5(time());       var_dump($str);
	  $res=fwrite($fp,$str);    var_dump($res);
	  $res=fwrite($fp,' | ');
	  $res=fwrite($fp,$str,22);   var_dump($res);
      fclose($fp);
}
//*****************************************************
$file='./test.txt';
$fp=fopen($file,'rb');  
if(!$fp){ echo '打开文件失败';}
else{ 
	  echo '打开文件成功***********************************';  
	  $str_read=fread($fp,filesize($file));
	  var_dump($str_read);
	  echo $str_read;
      fclose($fp);
}