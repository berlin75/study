<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>reflection-插件</title>
</head>

<body>
<h2>菜单插件：反射类的应用</h2>
<?php
interface Plugin{         //菜单插件接口
    function showMenu();
}
class MyPlugin implements plugin{       
	function showMenu(){
		$menu=array(
			array(
				'name'=>'mymenu1',
				'link'=>'index.php?cat=mylink1'
			),
			array(
				'name'=>'mymenu2',
				'link'=>'index.php?cat=mylink2'
			),
		);
		return $menu;
	}
}
class YourPlugin implements plugin{       
	function showMenu(){
		$menu=array(
			array(
				'name'=>'yourmenu1',
				'link'=>'index.php?cat=yourlink1'
			),
			array(
				'name'=>'your_menu2',
				'link'=>'index.php?cat=yourlink2'
			),
		);
		return $menu;
	}
}

function get_plugin_menu(){
	$menus=$menu=array();
	$allclass=get_declared_classes();  //获取脚本中所有的定义好的类
	//var_dump($allclass);
	foreach($allclass as $cls){
		$ref_cls=new ReflectionClass($cls);
		//判断这是类是否实现了某个接口
		if($ref_cls->implementsInterface('plugin')){ 
			if($ref_cls->hasMethod('showMenu')){
				$ref_method=$ref_cls->getMethod('showMenu');
				if($ref_method->isPublic()&&!$ref_method->isAbstract()){
					if($ref_method->isStatic()){
						$menu=$ref_method->invoke(null);
					}else{
						//$ref_method->invoke(new $cls());  //方法可行
						//通过反射类获取类的实例
						$instance=$ref_cls->newInstance();
						$menu=$ref_method->invoke($instance);
					}
				}
			}
			$menus=array_merge($menus,$menu);
		}
	}
	return $menus;
}
$menulist=get_plugin_menu();
foreach($menulist as $menu){
	echo '<a href="'.$menu["link"].'">'.$menu["name"].'</a><br>';
}
?>
</body>
</html>