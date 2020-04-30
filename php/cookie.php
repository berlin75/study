<?php  
if(!isset($_COOKIE["username"])&&!isset($_COOKIE["password"])){
	setcookie("username","Heiying6958",time()+3600*24*365); 
	setcookie("password","123456",time()+3600*24*7); 
	echo "完成设置<br>time() : ".time()." 格式化时间戳 : ".date('Y-m-d',time());
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8" />
<title>cookie</title>
</head>

<body>
<?php
var_dump($_COOKIE);

if(isset($_COOKIE["username"])){
	echo "欢迎".$_COOKIE["username"];
}else{
	echo "欢迎您！";
}
if(isset($_COOKIE["password"])){
	echo "<br>密码".$_COOKIE["password"]."<hr>";
}
?>

<form>
<p>usernamename:<input type="text" value="<? if(isset($_COOKIE["username"])){echo $_COOKIE["username"];}?>" /></p>
<p>password:<input type="password" value="<? if(isset($_COOKIE["password"])){echo $_COOKIE["password"];}?>" /></p>
<p><input type="submit" value="登录" /></p>
</form>

//*****************************cookie保存用户浏览记录********************
<?php
echo '<hr><h2>序列化与反序列化</h2>';
$numb='/study/d/php/cookie.php?id=26';
$numb=serialize($numb);
echo $numb.'<br>';
$numb=unserialize($numb);
echo $numb;

echo '<hr><h2>cookie保存用户浏览记录</h2>';
echo '<a href="?id='.mt_rand(1,100).'#'.time().'">随机产生URL地址</a>';

$url=$_SERVER['REQUEST_URI'];
echo '<br><br>当前页面URL：'.$url;
$arr=[];
if(isset($_COOKIE['his'])){
	$arr=unserialize($_COOKIE['his']);          //反序列化
	array_unshift($arr,$url);                   //插入
	$arr=array_unique($arr);                    //移除重复值
	$arr=array_values($arr);                    //不保留键名
	if(count($arr)>10){                         //数组元素个数
		array_pop($arr);                        //删除最后一个
	}
	setcookie('his',serialize($arr),time()+360); //序列化
}
else{
	$arr[]=$url;
	setcookie('his',serialize($arr),time()+360);
}

echo '<h3>历史记录：</h3>';
foreach($arr as $key=>$value){
	echo $key.': '.$value.'<br>';
}

?>


<button onclick="alert('To');setCookie('username',1,-1);setCookie('password',1,-1);setCookie('his',1,-1);alert('Deleted');" style="position:fixed;top:10px;right:10px;">删除cookie</button>
<script>
function setCookie(name,value,iDay){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);  //字符串编码
	document.cookie=name+ "=" +escape(value)+((iDay==null) ? "" : ";expires="+oDate.toGMTString());
}
</script>
</body>
</html>








