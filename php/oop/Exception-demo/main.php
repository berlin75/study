<?php
session_start();
//检测是否登录，若没登录则转向登录界面
if(!isset($_SESSION['un'])){
    header("Location:index.php");
    exit();
}
echo '欢迎'.$_SESSION['un'].' <a href="login_out_sure.php" >退出登录</a>';
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>登录成功页面</title>
</head>

<body>
<h1>终于登录成功！正式进入</h1>

<p><a href="index.php" >重新登录</a></p>
</body>
</html>