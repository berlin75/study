<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>static-const静态延迟绑定</title>
</head>

<body>
<?php
/* static-const静态延迟绑定 */

class persons{
	static $name='lisi';
	const AGE=22;       //常量
	public static function infor(){
		echo self::$name.'<br>';
		echo self::AGE.'<br>';
	}
	public static function infor1(){
		echo static::$name.'<br>';
		echo static::AGE.'<br>';
	}
}
$p1=new persons();
persons::infor();
$p1->infor();
echo '<hr>';
//**********************************************

class students extends persons{
	static $name='wangwu';
	const AGE=18;	
}
students::infor();  //lisi
students::infor1();  //wangwu

echo '<hr>';
//**********************************************

class stu extends persons{
	static $name='wangwu';
	const AGE=18;
	public static function infor(){
		echo self::$name.'<br>';
		echo self::AGE.'<br>';
	}	
}
stu::infor();  //wangwu

?>


<p>static:: 用法类似于self，但是不再被解析为定义当前方法所在的类，而是在实际运行时计算</p>
</body>
</html>