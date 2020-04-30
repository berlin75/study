<?php

$host='127.0.0.1';

$user='root';

$password='';

$connection=mysql_connect($host,$user,$password);

if(!$connection){ 
     
	 die('连接mysql数据库失败');
	 
} 

echo '连接成功';

mysqli_query($connection,'SET NAMES utf8');

$dbname="chuanke";

mysql_select_db($dbname,$connection);

$sql='INSERT INTO `user` (`userName`) VALUE ("XIAOMING")';

$result=mysql_query($sql);

if($result) { echo "操作成功";}

else{ echo "操作失败";}


$sql1="SELECT * FROM `user`";

$result1=mysql_query($sql1);

while($row=mysql_fetch_array($result1)){
	
	echo $row["UserName"]."<br\>";
	
mysql_close($connection);

}

?>