<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>selectData</title>
</head>

<body>
<?php

$con=mysqli_connect("localhost","root","");

if(!$con){die("Error can not connect:".mysqli_error($con));}

mysqli_select_db($con,"my_db01");

$result=mysqli_query($con,"SELECT * FROM persons");   //星号表示选取全部内容

if(!$result) { die("Error:数据库my_db01中数据表persons没有记录".mysqli_error($con));}

while($row = mysqli_fetch_array($result) )  //以数组的形式从记录集返回第一行记录
{
   echo $row['FirstName']." ".$row['LastName']." ".$row['Age']."<br>";	
}

//*********************************表格形式**************************************************************
$result=mysqli_query($con,"SELECT * FROM persons");  //必须重复，否则无法读取

echo "<hr><table border='1'>";

echo "<tr><th>FirstName</th><th>LastName</th><th>Age</th></tr>";

while($row = mysqli_fetch_array($result) )
{
   echo "<tr><td>".$row['FirstName']."</td><td>".$row['LastName']."</td><td>".$row['Age']."</td></tr>";	 //每次只读取一条数据
}

echo "</table>";

mysqli_close($con);
?>
</body>
</html>