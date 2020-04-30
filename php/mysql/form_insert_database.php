<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php 

session_start();      //开始session

if(isset($_SESSION["views"])) {$_SESSION["views"]+=1;}

else{$_SESSION["views"]=1;}  //存储session

echo "views=".$_SESSION["views"]."<br><br><br>";  //取回session

 ?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>form_insert_database</title>
</head>

<body>
<?php

$con=mysqli_connect("localhost","root","");

if(!$con){die("Erro can not connect".mysqli_error($con));}

mysqli_select_db($con,"my_db01");

mysqli_set_charset($con,'utf8');

$sql="INSERT INTO persons(FirstName,LastName,Age) VALUE('$_POST[firstname]','$_POST[lastname]','$_POST[age]')";

if(!mysqli_query($con,$sql)){die("错误代码".mysqli_errno($con).",错误信息:".mysqli_error($con));}

echo "1 record added!";

echo "<br><br><a href='form_insert_database.html'>继续插入内容<a>";

mysqli_close($con);
?>
</body>
</html>