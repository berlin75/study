<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="shortcut icon" href="../../favicon.ico">
<title>API</title>
</head>

<body>
<?php
interface user{             //定义接口
	const  GROUP=12;
	public function getname();
	function setname($name);
}

interface demo{
	function demo1();
}

class animal{
	function animal1(){
		echo 'animal类中的animal1方法<br>';
	}
}

class persons extends animal implements user,demo{  //实现多个接口同时继承父类
    private $name='noname';
	
	function getname(){       
		echo $this->name.'<br>';
	}
	
	function setname($name){
		$this->name=$name;	
	}
	function demo1(){
		echo '接口demo中的demo1方法<br>';
	}
}

$p1=new persons();
$p1->setname('lisi');
$p1->getname();
$p1->demo1();
$p1->animal1();

//*****************************************************************************
echo '<hr>';

interface zileijiekou extends user,demo{  //接口继承
	function age();
}
abstract class test implements zileijiekou{ //抽象类可以不去实现接口，交付子类去实现
	abstract function chxiangff();
}

class test1 extends test{
	function getname(){ echo '权限功能1<br>';}
	function setname($name){ echo '权限功能2<br>';}
	function demo1(){ echo '权限功能3<br>';}
	function age(){ echo '权限功能4<br>';}
	function chxiangff(){ echo '权限功能5<br>';}
}

$p2=new test1();
$p2->getname();
$p2->setname(2);
$p2->demo1();
$p2->age();
$p2->chxiangff();

?>
</body>
</html>