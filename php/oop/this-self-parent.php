<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>this-self-parent</title>
</head>

<body>
<?php
class persons{
	public $name='lisi';	
	public static $age=22;
	private $city='hunan';
	public function __construct(){
		echo '构造方法<br>';
	}
	public function test(){
		//echo $this->age.'<br>';
		echo self::$age.'<br>';
		self::test1();
		$this->test1();
		echo $this->city.'<br>';
	}
	public static function test1(){
		echo self::$age.'-test1()<br>';
		//echo $this->name;  //错误调用！静态方法不能调用非静态属性
	}
}
$lisi=new persons();
print_r($lisi); echo'<br>';
$lisi->test();
$lisi->test1();
echo persons::$age.'<br>';
echo persons::test1().'<br>';
echo '<hr>';
//***************************************************************
class students extends persons{   //子类
	public function test3(){
		$this->test();
		parent::test();
	}
}
$zhangsan=new students();
print_r($zhangsan); echo'<br>';
$zhangsan->test3();
$zhangsan->test();  //直接调用父类的方法
$zhangsan->__construct();  //子类调用父类的构造方法




?>
</body>
</html>