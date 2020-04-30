<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>读写文件操作</title>
</head>

<body>
<?php 
//读取文件
echo readfile("demo.txt");
echo "<p style='color:red;'>readfile读取</p><hr>";

$demo_txt=fopen("demo.txt","r") or die("Unable to open the file!");
echo fread($demo_txt,filesize("demo.txt"));
fclose($demo_txt);
echo "<p style='color:red;'>fread读取</p><hr>";


$demo_txt=fopen("demo.txt","r") or die("Unable to open the file!");
echo fgets($demo_txt);
fclose($demo_txt);
echo "<p style='color:red;'>fgets单行读取</p><hr>";


$demo_txt=fopen("demo.txt","r") or die("Unable to open the file!");
echo fgetc($demo_txt);
fclose($demo_txt);
echo "<p style='color:red;'>fgetc单字符读取</p><hr>";


$demo_txt=fopen("demo.txt","r") or die("Unable to open the file!");
while(!feof($demo_txt)){
  echo fgetc($demo_txt);
}
fclose($demo_txt);
echo "<p style='color:red;'>feof单行单字全文读取</p><hr>";

//创建、写文件
$date_txt=fopen("data.txt","w") or die("Unable to open the file!");
$txt="Angelina Jolie,American,1975.6.4\n";
fwrite($date_txt,$txt);
$txt="孙艺珍,韩国,1982.1.11\n";
fwrite($date_txt,$txt);
fclose($date_txt);
echo "fwrite()会创建新文件，或者文件已存在的话会覆盖已存在的内容<br><br>";

$date_txt=fopen("data.txt","r") or die("Unable to open the file!");
echo fread($date_txt,filesize("data.txt"));
fclose($date_txt);
echo "<hr>";


?>
</body>
</html>