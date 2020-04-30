<?php
header('Content-Type: text/html; charset=utf-8');
$pcode = $_POST["pcode"];

require_once "./DBDA.class.php";

$db = new DBDA();

$sql = "select * from china where pid={$pcode}";

echo $db->JsonQuery($sql,0);
