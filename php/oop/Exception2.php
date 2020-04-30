<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Exception2-try对应多个catch</title>
</head>

<body>
<?php

/* 异常处理try对应多个catch */
class A {
	function __construct(){
		$i=mt_rand(0,5);
		echo '$i='.$i.'<br>';
		if($i>4){
			throw new Exception('这是一个基础的抛出异常代码',2);
		}else if($i<2){
			throw new OutOfBoundsException('这是数组越界异常',3);
		}
	}
}
try{
	new A();
	echo '没有异常时会继续执行<br>';	
}catch(OutOfBoundsException $e){
	echo '数组越界异常->在文件：'.$e->getFile().'的第'.$e->getLine().'行产生异常，异常信息：'.$e->getMessage().'<br>';
}catch(Exception $e){
	echo '普通异常，异常信息：'.$e->getMessage().'<br>';
}

echo '<br><b><font color="red">刷新</font></b>';

?>
</body>
</html>