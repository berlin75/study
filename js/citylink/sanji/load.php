<?php
header('Content-Type: text/html; charset=utf-8');
$pcode = $_POST["pcode"];

require_once "./DBDA.class.php";

$db = new DBDA();

$sql = "select * from chinastates where parentareacode='{$pcode}'";

echo $db->JsonQuery($sql,0);
