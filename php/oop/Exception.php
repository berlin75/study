<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Exception</title>
</head>

<body>
<h2>PHP异常</h2>
<?php
$e=new Exception('这是一个基础的抛出异常代码',2);
var_dump($e);

echo '<hr>异常编号：'.$e->getCode().'<br>';
echo '异常消息：'.$e->getMessage().'<br>';
echo '异常文件：'.$e->getFile().'<br>';
echo '异常行号：'.$e->getLine().'<br><hr>';

?>
<p><a href="Exception1.php" target="_blank">基础完整异常处理 > Exception1.php</a></p>
<p><a href="Exception2.php" target="_blank">异常处理try对应多个catch > Exception2.php</a></p>
<p><a href="Exception3.php" target="_blank">异常处理嵌套 > Exception3.php</a></p>
<p><a href="Exception4.php" target="_blank">自定义异常 > Exception4.php</a></p>
<p><a href="Exception-demo/Exception-demo.php" target="_blank">异常处理实例-用户登录 > Exception4.php</a></p>

</body>
</html>