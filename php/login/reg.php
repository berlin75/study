<?php 
	session_start(); 
	header("Content_type:text/html;charset=utf8");
    if(!isset($_POST['submit'])){ exit('Invaliable visit!');}
?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="shortcut icon" href=../../favicon.ico />
<title>用户注册</title>
</head>

<body>

<?php
date_default_timezone_set("Asia/Shanghai"); 
$username=htmlspecialchars($_POST['username']);
$password=md5($_POST['password']);        
$sex=$_POST['sex'];               echo $sex;
$age=$_POST['age'];
$city=$_POST['city'];
$email=$_POST['email'];
$regdate=date("Y.m.d");

$link=mysqli_connect('localhost','root','','my_db01');
if(!$link){die('Not connect the mysql servers!');}
mysqli_set_charset($link,'utf8');
$sql="SELECT username FROM user WHERE username='$username'";
$result=mysqli_query($link,$sql); 
if($row=mysqli_fetch_assoc($result)){
	exit('用户名：'.$username.'已经注册！请点击<a href="javascript:history.back(-1);">重新注册</a>');
}else{
	echo '用户：'.$username.',注册成功，欢迎进入<a href="my.php">用户中心</a><br>';
}
$sql="INSERT INTO user(username,password,sex,age,city,email,regdate) VALUES('$username','$password','$sex','$age','$city','$email','$regdate') ";
mysqli_query($link,$sql);

//查询数据库uid保存$_SESSION['userid']
$sql="SELECT uid FROM user WHERE username='$username'";
$result=mysqli_query($link,$sql); if($result){echo '查询成功';}else{echo '查询失败';}
$row=mysqli_fetch_array($result);
$_SESSION['userid']=$row['uid'];  echo $row['uid'];



mysqli_close($link);


?>


</body>
</html>