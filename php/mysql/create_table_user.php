<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>create_table_user</title>
</head>

<body>
<?php
$con=mysqli_connect("localhost","root","","my_db01"); 

if(!$con){die('Not connect,错误代码：'.mysqli_errno().'错误信息：'.mysqli_error());}

else{echo '数据库连接成功！<br>';}

mysqli_set_charset($con,'utf8');

$sql="CREATE TABLE users
(
    uid int NOT NULL AUTO_INCREMENT COMMENT 'ID',
	PRIMARY KEY(uid),
	username varchar(20) COMMENT '用户名',
	password varchar(20) COMMENT '密码',
	age int COMMENT '年龄'
) COMMENT '用户表'";

if(mysqli_query($con,$sql)){echo "Table user created<br>";}

else{  echo "Not created table,Error:".mysqli_error($con).'<br>';}

$result=mysqli_query($con,"INSERT INTO users (username,password,age) VALUES('lisi','123456','22')");

if($result){ echo '新增数据成功!新纪录：'.mysqli_affected_rows($con).'<br>';}
else{ echo '新增数据失败,失败原因：'.mysqli_error($con).'<br>';}

$result=mysqli_query($con,"INSERT INTO users (username,password,age) VALUES('zhangsan','123456','31')");

if($result){ echo '新增数据成功!新纪录：'.mysqli_affected_rows($con).'<br>';}
else{ echo '新增数据失败,失败原因：'.mysqli_error($con).'<br>';}

$sql='SELECT * FROM users';
$result=mysqli_query($con,$sql);
while($row=mysqli_fetch_assoc($result)){
	echo $row["uid"].':'.$row["username"].'-'.$row["password"].'-'.$row["age"].'<br>';
}

echo '查询数据条数：'.mysqli_num_rows($result).'<br>';

mysqli_close($con);
?>
</body>
</html>