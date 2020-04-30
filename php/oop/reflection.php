<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>reflection</title>
</head>

<body>
<?php
/**
*测试函数的注释1
*/
function Test(){
	
	echo "测试函数<br>";   //测试函数的注释2
	function test1(){
		echo '方法test1<br>';	
	}
}
Test();


$ref_fun=new ReflectionFunction('Test');
var_dump($ref_fun);
echo $ref_fun->getDocComment().'<br>';
echo $ref_fun->getFileName().'<br>';
echo $ref_fun->getStartLine().'<hr>';

class newTest{
	static $pi=3.141579;
	function __construct(){
		echo "newTest类的构造方法<br>";
	}
	function test2(){
		echo "调用无参方法test2<br>";
	}
	static function test3($a,$b){
		echo "调用无参方法test3<br>";
		echo ($a+$b)*self::$pi."<br>";
	}
}
$newtest=new newTest(); 

$ref_class=new ReflectionClass('newTest');
var_dump($ref_class);
$ref_class1=new ReflectionClass($newtest);
var_dump($ref_class1);
var_dump($ref_class->getMethods());
//获取test2方法
$ref_method=$ref_class->getMethod('test2');
var_dump($ref_method);
var_dump($ref_method->isStatic());
//执行方法test2方法,静态方法调用invoke(null,参数)，普通方法invoke(对象，参数)
if($ref_method->isPublic()&&!$ref_method->isAbstract()&&!$ref_method->isStatic()){
    $ref_method->invoke($newtest);
}

$ref_method3=$ref_class->getMethod('test3');
var_dump($ref_method3);
var_dump($ref_method3->isStatic());
if($ref_method3->isPublic()&&!$ref_method3->isAbstract()&&$ref_method3->isStatic()){
    $ref_method3->invoke(null,'4','6');
}else{
	$ref_method3->invoke($newtest,'6','6');
}

echo '<hr>';

$ref_method=new ReflectionMethod('newTest','test2');
var_dump($ref_method);

?>
</body>
</html>