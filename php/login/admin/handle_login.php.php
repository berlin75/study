<?php
session_start();
#接受提交过来的用户名及密码
$username = trim($_POST['username']);//用户名
$password = trim($_POST['password']);//密码
$imgcode = strtolower($_POST['imgcode']);//接受从登陆输入框提交过来的验证码并转化为小写；
$myimagecode  = strtolower($_SESSION['thisimagecode']) ;//从session中取得验证码并转化为小写；
if($imgcode!=$myimagecode){
     echo '请输入正确的验证码';exit;
}
#拿着提交过来的用户名和密码去数据库查找，看是否存在此用户名以及其密码  
$link=mysql_connect('localhost','root','123456');
mysql_query('set names utf8');
$re=mysql_select_db('companysystem',$link);
$sql="select *from admin where username = '$username'and password='$password' ";
$result=mysql_query($sql);
$rows=mysql_fetch_assoc($result);
if($rows){
  $SESSION['is_login']=$rows['username'];
  echo '登陆成功';
 
}else{
  $is_login='';
  echo '登陆失败';
}
?>