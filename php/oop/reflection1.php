<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>reflection-动态代理</title>
</head>

<body>
<?php
final class A{
    function showInfo(){
		echo 'A类的showInfo方法调用<br>';
	}
}
class B{       
	private $obj;
	function __construct(){
		$this->obj=new A();
	}
	function __call($name,$args){
		$ref_class=new ReflectionClass($this->obj);
		if($ref_class->hasMethod($name)){
			$ref_method=$ref_class->getMethod($name);
			if($ref_method->isPublic()&&!$ref_method->isAbstract()){
				if(!$ref_method->isStatic()){
					$ref_method->invoke($this->obj);
				}else{
					$ref_method->invoke(null);
				}
			}
		}
	}
}

$b=new B();
$b->showinfo();   //B中没有showInfor()方法，但是A中有这个方法

echo '扩展：';
?>
</body>
</html>