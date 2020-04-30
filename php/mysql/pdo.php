<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>pdo</title>
</head>

<body>
<?php
try{
	//初始化一个PDO对象
	$dbh=new PDO("mysql:host=localhost;dbname=my_db01","root",""); 
	echo "连接成功<br>";
	// $result=$dbh->exec("INSERT INTO users(username,password,age) VALUES('赵七','123456','22'),('孙八','123456','22')");
	// var_dump($result);
	// if($result){
	// 	echo '插入数据成功<br>';
	// }
	// echo $dbh->lastInsertId().'<br>';
	
	foreach($dbh->query('SELECT * FROM users') as $row){
	   print_r($row);
	   echo "<br>";
	}

	echo '<hr>';

	$result = $dbh->query('SELECT * FROM users');
	$res = $result -> fetchAll(PDO::FETCH_ASSOC);
	var_dump($res);
	foreach($res as $row){
	   print_r($row);
	   echo "<br>";
	}

	var_dump($GLOBALS); //全局变量中可以查看插入的数据

	$dbh=null;
}catch(PDOException $e){
	die ("Error:".$e->getMessage()."<br>");
}


?>
</body>
</html>