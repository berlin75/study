<?php
header("Content-Type:text/plain;charset=utf-8");		
$link=mysqli_connect('localhost','root','','my_db01');
if(!$link){die('Not connect the mysql servers!');}
mysqli_set_charset($link,'utf8');
if(isset($_POST['username'])){
	$username=htmlspecialchars($_POST['username']); 
	$sql="SELECT username FROM user WHERE username='$username'";
	$result=mysqli_query($link,$sql); 
	if($row=mysqli_fetch_assoc($result)){ 
		echo '用户名"'.$username.'"已经注册,请更换！';
	}else{
		echo '用户名”'.$username.'“可以使用!';
	}
}
if(isset($_POST['email'])){
	$email=$_POST['email'];
	$sql="SELECT email FROM user WHERE email='$email'";
	$result=mysqli_query($link,$sql);
	if($row=mysqli_fetch_assoc($result)){ 
		echo 'email"'.$email.'"已经注册,请更换！';
	}else{
		echo 'email”'.$email.'“可以使用!';
	}
}
mysqli_close($link);
	
?>












