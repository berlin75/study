<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>单例模式</title>
</head>

<body>
<?php

class Db{
  public static $db;	//保存类的唯一实例对象
  
  final private function __construct(){
	 echo '创建了新的Db类的对象<br>'; 
  }
  //魔术方法，当前类的对象被克隆时会调用,private禁止外部clone
  private function __clone(){
	  echo '有Db类的对象被克隆了！<br>';
  }
  //获取DB类的唯一实例对象
  static function getDb(){    //判断对象是否是类实例化的对象，返回布尔
  	  if(self::$db==null && !(self::$db instanceof self)){
      	 self::$db = new self(); 
	  }
	  return self::$db;
  }
}

$db1=Db::getDb();

?>
</body>
</html>