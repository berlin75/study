<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>自定义异常</title>
</head>

<body>
<?php
class myException extends Exception{
   function __construct($msg,$code){
	   parent::__construct($msg,$code);
   }
   function __toString(){
		return '这是一个自定义的异常类：'.__CLASS__.'<br>';   
   }
}
try{
	throw new myException('这是一个自定义的异常',2);
}catch(myException $me){
	echo $me.'<br>';       //打印对象时自动调用__toString__方法
	echo $me->getMessage().'<br>';
}


echo '***********************************************<br>';

class myException1 extends Exception{
   function __construct($msg,$code){
	   parent::__construct($msg,$code);
   }
}
try{
	throw new myException1('这是一个自定义的异常',2);
}catch(myException1 $me){
	echo $me.'<br>';       //打印对象时自动调用__toString__方法
	echo $me->getMessage().'<br>';
}


?>
</body>
</html>