<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>mysql</title>
</head>

<body>
<?php
$con=@mysql_connect('localhost','root','');
if(!$con){ echo '连接数据库失败，错误代码：'.mysql_errno().'错误信息：'.mysql_error();}
else{ echo '数据库连接成功<br>';}
mysql_select_db('my_db01');
mysql_set_charset('utf8');
$sql='SELECT * FROM persons LIMIT 5';
$result=mysql_query($sql);
var_dump($result);
var_dump(mysql_fetch_assoc($result)); //每次只读取一条数据
var_dump(mysql_fetch_assoc($result));
var_dump(mysql_fetch_assoc($result));
var_dump(mysql_fetch_assoc($result));
var_dump(mysql_fetch_assoc($result));
var_dump(mysql_fetch_assoc($result));

$result=mysql_query($sql);
while($row=mysql_fetch_assoc($result)){
	echo $row['FirstName'].' '.$row['LastName'].' '.$row['Age'].'<br>';
}
mysql_close($con);

?>
</body>
</html>