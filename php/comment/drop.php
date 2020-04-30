<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>drop</title>
</head>

<body>
<?php
$con=mysqli_connect("localhost","root","","my_db01"); 
if(!$con){die('can not connect:'.mysqli_error($con));}
mysqli_query($con,'SET NAMES utf8');
$sql='DROP TABLE IF EXISTS comments';  
if($result=mysqli_query($con,$sql)){echo '删除数据库comments成功！';}
else{ echo '删除数据库comments失败！错误代码：'.mysqli_errno($con).'错误信息：'.mysqli_error($con);}
mysqli_close($con);
?>

<p><a href="comment.html">返回comment.html</a></p>
<p><a href="comment.php">返回comment.php</a></p>
</body>
</html>