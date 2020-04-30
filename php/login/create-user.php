<?php
$link=mysqli_connect('localhost','root','','my_db01');
if(!$link){die('Not connect the mysql servers!');}
else{ echo 'Connected!<br>';}
mysqli_set_charset($link,'utf8');
$sql="CREATE TABLE user
(
    uid int NOT NULL AUTO_INCREMENT,
	username varchar(50),
	password varchar(50),
	sex varchar(6),
	age int,
	city varchar(50),
	email varchar(50),
	regdate varchar(30),
	PRIMARY KEY(uid)
)";
if(mysqli_query($link,$sql)){echo "Table user created<br>";}
else{  echo "Not created table, ".mysqli_errno($link).' : '.mysqli_error($link).'<br>';}
mysqli_close($link);

?>
