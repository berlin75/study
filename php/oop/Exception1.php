<?php
header("Content-type:text/html;charset=utf-8");

class A {
	function __construct(){
		throw new Exception('这是一个基础的抛出异常代码',2);
	}
}

try{
	new A();
	echo '没有异常时会继续执行<br>';	
}catch(Exception $e){
	echo '在文件：'.$e->getFile().'的第'.$e->getLine().'行产生异常，异常信息：'.$e->getMessage().'<br>';
}

