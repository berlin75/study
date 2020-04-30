<?php 
session_start(); 
if(!isset($_SESSION['userid'])){
	header('Location:login.html');
	exit();
}
?>
<html>
<head>
<meta charset="utf-8">
<link rel="shortcut icon" href="../../../favicon.ico" />
<title>用户注册</title>
</head>

<body>

<?php

$userid=$_SESSION['userid'];

$link=mysqli_connect('localhost','root','','my_db01');
if(!$link){die('Not connect the mysql servers!');}
mysqli_set_charset($link,'utf8');
$sql="SELECT * FROM user WHERE uid='$userid' LIMIT 1";
$result=mysqli_query($link,$sql);
$row=mysqli_fetch_assoc($result);

echo '用户信息：<br>';
echo '用户ID：'.$row['uid'].'<br>';
echo '用户名：'.$row['username'].'<br>';
echo '性别：'.$row['sex'].'<br>';
echo '年龄：'.$row['age'].'<br>';
echo '城市：'.$row['city'].'<br>';
echo '邮箱：'.$row['email'].'<br>';
echo '注册日期：'.$row['regdate'].'<br>';

echo '<a href="login-index.php">注销登录</a>';
mysqli_close($link);
?>

</body>
</html>