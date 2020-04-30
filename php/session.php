<?php 

session_start();      //开始session

if(isset($_SESSION["views"])) {$_SESSION["views"]+=1;}

else{$_SESSION["views"]=1;}  //存储session

echo "views=".$_SESSION["views"];  //取回session
echo "--------------------------------------";
var_dump($_COOKIE);
echo "--------------cookie------------------------";
var_dump($_SESSION);
echo "---------------ssession-----------------------";
var_dump(uniqid());  //uniqid()基于以微秒计的当前时间，生成一个唯一的 ID
var_dump(md5(123));     //md5()
 ?>
 
<!DOCTYPE html >
<html>
<head>
<meta charset=utf-8" />
<title>session</title>
</head>

<body>
<hr>
<span style="border:1px solid red;padding:10px;">Session应用实例登录退出：<a href="session-form/index.html">sessionDemo</a></span>

</body>
</html>