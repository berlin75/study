<?php
session_start();
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>超全局变量</title>
</head>
<body>
<h2>PHP超全局变量：$GLOBALS、$_SERVER、$_REQUEST、$_POST、$_GET、$_FILES、$_ENV、$_COOKIE、$_SESSION</h2>
<?php
echo $_SERVER["PHP_SELF"]." 当前执行脚本的文件名<br>";

echo $_SERVER['SERVER_NAME']." 当前执行脚本的服务器主机名<br>";

echo $_SERVER['SERVER_ADDR']." 服务器iP地址<br>";

echo $_SERVER["SERVER_SOFTWARE"]." 服务器标志字符串<br>";

echo $_SERVER["HTTP_HOST"]." 来自当前请求的host头<br>";

echo $_SERVER["SCRIPT_FILENAME"]." 当前执行脚本的绝对路径<br>";

echo $_SERVER["SCRIPT_NAME"]." 当前脚本的路径<br>";

echo $_SERVER["SERVER_SIGNATURE"]." 服务器版本和虚拟主机名<br>";

echo '<hr>';
var_dump($GLOBALS);

?>
</body>
<html>