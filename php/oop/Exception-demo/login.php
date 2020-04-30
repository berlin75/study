<?php
header("Content_type:text/html;charset=utf8");
session_start();    //开启session,保存错误

if(!isset($_POST['submit'])){
	exit('invaliable visit!');
}

// 自动加载类文件
function __autoload($class){
	$file=__DIR__.'/'.strtolower($class).'.php';
	if(is_file($file)){
		include_once $file;
	}
}

__autoload('user');
__autoload('validata');
__autoload('myException');

//$un=htmlspecialchars($_POST['username']);
//$pw=md5($_POST['password']);
$un=$_POST['username'];
$pw=$_POST['password'];

$user=new user($un,$pw);

//判断是否登录成功
try{
	validata::validatauser($user);
	
	//登录成功
	$_SESSION['un']=$un;         //无异常则保持用户信息到session
	$_SESSION['pw']=$pw;
	// exit('即将进入跳转页面main.php');
	header('location:main.php'); //无异常则自动跳转到main.php
}catch(myException $me){
	echo $me -> getMessage();
	// exit('即将进入跳转页面index.php');
	// 登录失败
	header('location:index.php'); //登录异常则自动跳转到登录页面
}

