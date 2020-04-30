<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>procss-search</title>
</head>

<body>
<?php
require_once '/config.php';

$username=isset($_GET['username'])?$_GET['username']:'';
if(empty($username)){die('用户名不能为空!<br>');}
var_dump($username);

$link=mysqli_connect($db_host,$db_user,$db_psw,$db_name);
if(!$link){die('Not conncet,错误代码：'.mysqli_errno().',错误信息：'.mysqli_error());}
else {echo 'Connected!<br>';}
mysqli_set_charset($link,$db_charset);
$sql='SELECT * FROM users WHERE username="'.$username.'"';
$result=mysqli_query($link,$sql);
$userinfo=mysqli_fetch_assoc($result);
mysqli_close($link);
if($userinfo){
	echo $userinfo["uid"].' : '.$userinfo["username"].' '.$userinfo["password"].' '.$userinfo["age"].'<br>';	
}else{ 
	echo '不存在用户:<font color="red">'.$username.'</font>!<br>';
}

?>

<br><hr>
<P>通过地址栏输入用户名:?username=lisi</P>
</body>
</html>