<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>magic-methods序列化</title>
</head>

<body>
<?php
class persons{
	public $name='lisi';
	public $sex='boy';
	private $age=22;
	protected $city='hunan';
	function __sleep(){     //序列化对象时自动调用的方法
		echo '有对象被序列化<br>';
		return array('name','sex','age');
	}
	function __wakeup(){
		echo '有对象反被序列化<br>';  
		$this->test();            //初始化工作
	} 
	function test(){
		echo '初始化工作、、、、';
	}
}

$lisi=new persons();
var_dump($lisi);
echo '<hr>';

$a=serialize($lisi);  //序列化对象
print_r($a);
var_dump($a);
echo '<hr>';

$b=unserialize($a);  //反序列化对象
var_dump($b);

?>
</body>
</html>