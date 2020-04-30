<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>where</title>
</head>

<body>
<?php

$con=mysqli_connect("localhost","root","");

if(!$con){ die("Error can not connect".mysqli_error($con));}

mysqli_select_db($con,"my_db01");  //FirstName='Taylor'

$result=mysqli_query($con,"SELECT * FROM persons WHERE Age>'27'");

while($row=mysqli_fetch_array($result))
{
	echo $row['FirstName'].' '.$row['LastName'].' '.$row['Age'].'<br>';	
}
mysqli_close($con);
?>
</body>
</html>