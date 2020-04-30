<?php
session_start();
if(isset($_SESSION['username'])){
	echo '恭喜用户'.$_SESSION['username'].'登陆成功';
	echo '<a href="logout.php">退出登录</a>';	
}
else{
	header('Location:index.html');	
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset=utf-8" />
<title>无标题文档</title>
</head>

<body>

</body>
</html>