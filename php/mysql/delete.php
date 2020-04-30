<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>delete</title>
</head>

<body>

<?php

$con=mysqli_connect('localhost','root','');

if(!$con){die('Error can not connect'.mysqli_error($con));}

mysqli_select_db($con,'my_db01');

mysqli_query($con,'DELETE FROM persons  WHERE FirstName="Angelina" AND LastName="Jolie" AND Age="41"');

mysqli_close($con);

?>
</body>
</html>