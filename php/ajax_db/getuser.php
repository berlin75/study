<?php
$q=(int)$_GET["q"];

try{
    $pdo = new PDO('mysql:host=localhost;dbname=my_db01', 'root', '');
}catch(PDOException $e){
    die('数据库连接失败:'.$e->getMessage());
}

$sql='SELECT * FROM users WHERE uid = '.$q;
$result = $pdo->query($sql);

// foreach($res as $row){
//  echo $row['username'].'';
// }

echo "<table border='1'>
<tr>
<th>username</th>
<th>password</th>
<th>age</th>
</tr>";

$row = $result->fetch();
 echo "<tr>";
 echo "<td>" . $row['username'] . "</td>";
 echo "<td>" . $row['password'] . "</td>";
 echo "<td>" . $row['age'] . "</td>";
 echo "</tr>";
echo "</table>";

$pdo = null;
?>