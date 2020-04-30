<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>construct-destruct</title>
</head>

<body>
<?php
class persons{
	public $name;
	public $age;
	public function __construct($name='zhang',$age='25'){ //构造方法传递参数，也可以设置参数默认值
		$this->name=$name;
		$this->age=$age;
		echo '<br>创建了一个新对象'.$this->name.'<br>';
	}
	public function __destruct(){ echo '<br>有一个对象'.$this->name.'被系统销毁了<br>';}
}


$p1=new persons();
print_r($p1); echo '<br>';
$p2=new persons('li',28);
print_r($p2); echo '<br>';

$p3=$p4=$p5=new persons('wang','22');
echo '执行$p3=$p4=$p5=new persons();<br>';
print_r($p3); echo '<br>';
print_r($p4); echo '<br>';
print_r($p5); echo '<br>';
echo xdebug_debug_zval($p5);

$p6=new persons('song',28);
print_r($p6); echo '<br>';
$p6=true;

echo '<br><font color="red">最后运行的脚本代码!</font><br>';
?>

</body>
</html>