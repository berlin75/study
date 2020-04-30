<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>error</title>
</head>

<body>
<?php
function error_handler($errno,$errmsg,$errflie,$errline){  //自定义处理函数
	switch($errno){
		case E_USER_ERROR:
			echo '已定义错误处理类型:['.$errno.'],错误消息：'.$errmsg.'<br>';
			echo '产生错误的文件：'.$errflie.'所在行：'.$errline.'<br><br>';
			break;
		case E_WARNING:
			echo '已定义错误处理类型:['.$errno.'],错误消息：'.$errmsg.'<br>';
			echo '产生错误的文件：'.$errflie.'所在行：'.$errline.'<br><br>';
			break;
		case E_NOTICE:
			echo '已定义错误处理类型:['.$errno.'],错误消息：'.$errmsg.'<br>';
			echo '产生错误的文件：'.$errflie.'所在行：'.$errline.'<br><br>';
			break;
		default :
		    echo '未定义错误类型：['.$errno.'],错误消息：'.$errmsg.'<br>';
			echo '产生错误的文件：'.$errflie.'所在行：'.$errline.'<br><br>';
			break;
	}
}
set_error_handler('error_handler');


echo $b;
$age=-50;
if($age<0){
	trigger_error('年龄必须大于0');
}
echo '************';
$a=new A();
echo '************';
?>
</body>
</html>