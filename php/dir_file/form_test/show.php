<?php

$message=file_get_contents("data.txt");

echo str_replace("\n","<br/><br/>",$message);

echo "<p><a href='board.html'>继续添加</a></p>"

?>