<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>object-search</title>
</head>

<body>
<?php
require_once 'User.php';

$username=isset($_GET['username'])?$_GET['username']:'';
if(empty($username)){die('用户名不能为空!<br>');}

$lisi=new User($username); //创建一个users对象
$userinfo=$lisi->getUserinfo();  //调用对象的方法，获取用户信息

if($userinfo){
	echo $userinfo["uid"].' : '.$userinfo["username"].' '.$userinfo["password"].' '.$userinfo["age"].'<br>';	
}
else{ echo '不存在用户:<font color="red">'.$username.'</font>!<br>';}
?>

<P>通过地址栏输入用户名:?username=lisi</P>
</body>
</html>