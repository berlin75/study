<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>多重继承</title>
</head>

<body>
<h2>多重继承之组合方法和接口方法</h2>
<?php
/* 多重继承之组合方法和接口方法 */

echo '<br><hr>组合实现多重继承*************<br>';
class Stu{                   //学生身份
    private $name='lisi';
	function getname(){
		echo '名字：'.$this->name.'<br>';	
	}
}
class Teach{                  //老师身份
    private $work_year=2;
	function getWorkYear(){
		echo '工作年限：'.$this->work_year."<br>";
	}
}
class Someone extends Stu{   //多重继承实现多重身份
	private $teacher;
	function __construct(){
		$this->teacher=new Teach();
	}
	function a(){
		$this->teacher->getWorkYear();
	}
}
$lisi=new Someone();
$lisi->getname();
$lisi->a();

echo '<br><hr>组合实现多重继承*************<br>';
class Someone1{
   static function getname(Stu $obj){
	   $obj->getname();
   }
   static function getWorkYear(Teach $obj){
	   $obj->getWorkYear();
   }
}
$stu=new Stu();
$teach=new Teach();
Someone1::getname($lisi);
Someone1::getname($stu);
Someone1::getWorkYear($teach);

echo '<br><hr>接口实现多重继承*************<br>';
interface Student{
   function getname();
}
interface Teacher{
   function getWorkYear();	
}
class Somebody implements Student{
   private $name='lisi';
	function getname(){
		echo '名字：'.$this->name.'<br>';	
	}
}
class Somebody1 extends Somebody implements Teacher{
	private $work_year=2;
	function getWorkYear(){
		echo '工作年限：'.$this->work_year."<br>";
	}
}
$lisi=new Somebody1();
$lisi->getname();
$lisi->getWorkYear();




?>
</body>
</html>