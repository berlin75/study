<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>mysqli</title>
</head>

<body>
<?php
$link=mysqli_connect('localhost','root','','my_db01');
if(!$link){ 
	echo '数据库连接错误，错误代码：'.mysqli_connect_errno().' 错误信息：'.mysqli_connect_error().'<br>';
}
else{ 
	echo '数据库连接成功！<br>';
}
mysqli_set_charset($link,'utf8');

$sql='SELECT * FROM persons ORDER BY Age DESC LIMIT 15';
$result=mysqli_query($link,$sql);
while($row=mysqli_fetch_assoc($result)){
	echo 'FirstName:'.$row["FirstName"].' LastName:'.$row["LastName"].' Age:'.$row["Age"].'<br>';
}

echo '查询数据条数：'.mysqli_num_rows($result).'<br>';

$sql='INSERT INTO persons VALUES("Bingbing","Fan","35")';
$result=mysqli_query($link,$sql);
if($result){ echo '新增数据成功!<br>';}
else{ echo '新增数据失败,失败原因：'.mysqli_error($link).'<br>';}

$sql='UPDATE persons SET Age="35" WHERE Age="36"';
$result=mysqli_query($link,$sql);
if($result){ echo '修改数据成功!受影响行数：'.mysqli_affected_rows($link).'<br>';}
else{ echo '修改数据失败,失败原因：'.mysqli_error($link).'<br>';}

$sql='DELETE FROM persons WHERE Age="35" LIMIT 1 ';
$result=mysqli_query($link,$sql);
if($result){ echo '删除数据成功!受影响行数：'.mysqli_affected_rows($link).'<br>';}
else{ echo '删除数据失败,失败原因：'.mysqli_error($link).'<br>';}

//mysqli_free_result($result); //查询时才调用
mysqli_close($link);
?>
</body>
</html>