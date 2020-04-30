<?php 
	session_start(); 
?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="shortcut icon" href="../favicon.ico" />
<title>login</title>
</head>

<body>

<?php
echo $_SERVER['REQUEST_METHOD'];
if(!isset($_POST['submit'])){ 
	exit('Invaliable visit! <a href="login-index.php">登录</a>');
}
$username=htmlspecialchars(addslashes($_POST['username']));
$password=md5($_POST['password']);

$link=mysqli_connect('localhost','root','','my_db01');
if(!$link){die('Not connect the mysql servers!');}
mysqli_set_charset($link,'utf8');
$sql="select uid from user where username='$username' and password='$password'";
$result=mysqli_query($link,$sql);       
if($row=mysqli_fetch_array($result)){
	$_SESSION['username']=$username;
	$_SESSION['password']=$password;
	$_SESSION['userid']=$row['uid'];
	echo $username.',欢迎您！进入<a href="my.php">用户中心</a><br>';
	echo '<a href="login.php?action=logout">注销登录</a>';
	exit;
}else{
    exit('登陆失败！点击此处<a href="javascript:history.back(-1);">返回重试</a>');	
}
mysqli_close($link);


if($_GET['action']='logout'){
	unset($_SESSION['userid']);
	unset($_SESSION['username']);
	unset($_SESSION['password']);
	session_destroy();
	echo '注销成功！ 点击此处<a href="login-index.php">登录</a>';
	exit;
}

?>

</body>
</html>