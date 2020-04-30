<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>database</title>
</head>

<body>
<?php
$con=mysqli_connect("localhost","root",""); 

if(!$con){die('Not connect,错误代码：'.mysqli_errno().'错误信息：'.mysqli_error());}

mysqli_set_charset($con,'utf8');

if(mysqli_query($con,"CREATE DATABASE my_db01 CHARACTER SET utf8 COLLATE utf8_general_ci"))
    {
	   echo "Database my_db01 created<br>";
    }
else{  echo "Error creating database:".mysqli_error($con).'<br>';}

mysqli_select_db($con,"my_db01");


$sql="CREATE TABLE persons
(
    personID int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(personID),
	FirstName varchar(15),
	LastName varchar(15),
	Age int
)";

if(mysqli_query($con,$sql)){echo "table persons created<br>";}

else{  echo "Error creating table:".mysqli_error($con).'<br>';}

mysqli_query($con,"INSERT INTO persons(FirstName,LastName,Age) VALUES('艺珍','孙','34')");

mysqli_query($con,"INSERT INTO persons(FirstName,LastName,Age) VALUES('Angelina','Jolie','41')");

$sql='SELECT * FROM persons';

$result=mysqli_query($con,$sql);

while($row=mysqli_fetch_assoc($result)){
	echo $row['FirstName'].' '.$row['LastName'].' '.$row['Age'].'<br>';
}

mysqli_close($con);
?>
</body>
</html>