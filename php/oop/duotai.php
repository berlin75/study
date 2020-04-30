<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>多态</title>
</head>

<body>
<?php
echo '正常流程实现oop编程的多态性***************<br><br>';

class Light{
	public function show($type){
		switch($type){
			case 0: echo '灯光是红色的<br>'; break;
			case 1: echo '灯光是绿色的<br>'; break;
			case 2: echo '灯光是蓝色的<br>'; break;
			default:echo '灯光是随机颜色的<br>'; break;
		}
	}
}
class User{
	function openLight($type=0){
		$light=new Light();
		$light->show($type);
	}
}
$lisi=new User();
$lisi->openLight(0);

echo '<br><br>继承实现多态********************************<br><br>';

class Light1{
	public function show(){
		echo '灯光是随机颜色的<br>';
	}
}
class Red extends Light1{
	public function show(){
		echo '灯光是红色的<br>';
	}
}
class Green  extends Light1{
	public function show(){
		echo '灯光是绿色的<br>';
	}
}
class demo{
	function show(){
		echo '不是Light1继承的类<br>';
	}
}
class User1{
	function openLight(Light1 $obj){ //只接受Light1继承的类实例化的对象
		$obj->show();
	}
}
$lisi=new User1();
$light=new Light1();
$lisi->openLight($light);
$red=new Red();
$green=new Green();
$lisi->openLight($red);
$demo=new demo();
//     $lisi->openLight($demo); //接受非Light1继承的类实例化的对象会报错

echo '<br><br>接口实现多态********************************<br><br>';
interface  Light2{
	function show();
}
class Red2 implements Light2{
	function show(){
		echo '灯光是红色的<br>';
	}
}
class Green2 implements Light2{
	function show(){
		echo '灯光是绿色的<br>';
	}
}
class demo2{
	function show(){
		echo '不是Light1继承的类<br>';
	}
}
class User2{
	function openLight(Light2 $obj){ 
			$obj->show();
	}
}
$lisi=new User2();
$red=new Red2();
$lisi->openLight($red);
$green=new Green2();
$lisi->openLight($green);
$demo=new demo2();
//$lisi->openLight($demo);










?>
</body>
</html>