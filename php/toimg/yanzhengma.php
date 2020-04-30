<?php 
header("content-type:image/png");//设置页面编码
$num = '4323'; //模拟随机数 
$width=60;//定义画布的宽 
$height=18; //定义画布的高 
$image = imagecreate($width,$height); //创建画布 
imagecolorallocate($image,140,240,240); //设置画布颜色 
for($i=0;$i<strlen($num);$i++){  //循环读取随机数 
	$x = mt_rand(1,8)+$width*$i/4; 
	$y = mt_rand(1,$height/4); 
	$color=imagecolorallocate($image,mt_rand(0,150),mt_rand(0,150),mt_rand(0,150)); //定义图像的颜色 
	imagestring($image,5,$x,$y,$num[$i],$color);//将随机数写入到画布中 
} 
for($i=0;$i<20;$i++){//for循环语句生成干扰线 
	$randcolor=imagecolorallocate($image,rand(200,255),rand(200,255),rand(200,255));//定义颜色 
	imagesetpixel($image,mt_rand(0, $width-1), mt_rand(0, $height-1),$randcolor); //生成干扰线 
} 

imagepng($image);//生成图像 
imagedestroy($image);//释放资源 
