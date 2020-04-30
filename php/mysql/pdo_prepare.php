<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>pdo</title>
</head>

<body>
<?php
try{
	$dbh=new PDO("mysql:host=localhost;dbname=my_db01","root",""); 
	//$db=new PDO("mysql:host=localhost;dbname=my_db01","root","","array(PDO::ATTR_PERSISTENT=>true)");
	echo "连接成功<br>";

	foreach($dbh->query('SELECT * FROM users') as $row){
	   print_r($row);
	   echo '<br/>';
	}

	echo "<hr>";

	$stmt = $dbh->prepare("SELECT * FROM users"); 
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC); // 设置结果集为关联数组
    foreach($stmt->fetchAll() as $row) { 
        print_r($row);
        echo '<br/>';
    }

    echo "<hr>";

    $stmt = $dbh->prepare("SELECT * FROM users"); 
    $stmt->execute();
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) { 
        print_r($row);
        echo '<br/>';
    }

	var_dump($GLOBALS); //全局变量中可以查看插入的数据

	$dbh=null;
}catch(PDOException $e){
	die ("Error:".$e->getMessage()."<br>");
}

?>
</body>
</html>