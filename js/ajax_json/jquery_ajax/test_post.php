<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>test_post</title>
</head>

<body>
 <?php
 $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
 $city = isset($_POST['city']) ? htmlspecialchars($_POST['city']) : '';
 echo 'Dear ' . $name ;
 echo 'Hope you live well in ' . $city;
 ?>
</body>
</html>