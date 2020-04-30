<?php
session_start();
if(isset($_POST['username']) && isset($_POST['password'])){
	$username=$_POST['username'];
    $password=$_POST['password'];
	if($username=='admin' && $password=='123456'){
		$_SESSION['username']=$username;
		header('Location:user.php');
	}
	else{
		echo '用户名和密码不匹配！<br><a href="index.html">登录</a>';	
	}
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
</head>

<body>

</body>
</html>
