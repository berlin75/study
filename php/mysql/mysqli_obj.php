<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>mysqli</title>
</head>

<body>
<?php
$conn=new mysqli('localhost','root','','my_db01');
if($conn->connect_error){ 
	echo '数据库连接错误，错误：'.$conn->connect_error.'<br>';
}else{ 
	echo '数据库连接成功！<br>';
}
mysqli_set_charset($conn,'utf8');
$sql='SELECT * FROM persons ORDER BY Age DESC LIMIT 15';
$result=$conn->query($sql);
if ($result->num_rows > 0) {                // 函数num_rows()判断返回的数据
    while($row = $result->fetch_assoc()) {  // 函数 fetch_assoc() 将结合集放入到关联数组
        echo 'FirstName:'.$row["FirstName"].' LastName:'.$row["LastName"].' Age:'.$row["Age"].'<br>';
    }
} else {
    echo "暂无结果";
}
 
$conn->close();


// while($row=mysqli_fetch_assoc($result)){
// 	echo 'FirstName:'.$row["FirstName"].' LastName:'.$row["LastName"].' Age:'.$row["Age"].'<br>';
// }

// echo '查询数据条数：'.mysqli_num_rows($result).'<br>';

// $sql='INSERT INTO persons VALUES("Bingbing","Fan","35")';
// $result=mysqli_query($link,$sql);
// if($result){ echo '新增数据成功!<br>';}
// else{ echo '新增数据失败,失败原因：'.mysqli_error($link).'<br>';}

// $sql='UPDATE persons SET Age="35" WHERE Age="36"';
// $result=mysqli_query($link,$sql);
// if($result){ echo '修改数据成功!受影响行数：'.mysqli_affected_rows($link).'<br>';}
// else{ echo '修改数据失败,失败原因：'.mysqli_error($link).'<br>';}

// $sql='DELETE FROM persons WHERE Age="35" LIMIT 1 ';
// $result=mysqli_query($link,$sql);
// if($result){ echo '删除数据成功!受影响行数：'.mysqli_affected_rows($link).'<br>';}
// else{ echo '删除数据失败,失败原因：'.mysqli_error($link).'<br>';}

// //mysqli_free_result($result); //查询时才调用
// mysqli_close($link);
?>
</body>
</html>