<?php

$title=$_POST["title"];

$content=$_POST["content"];

var_dump($title,$content);

file_put_contents("data.txt",$title.",".$content."\n",FILE_APPEND);

echo "OK <a href='board.html'>继续添加</a> <a href='show.php'>查看全部</a>";



?>