<?php
header("Content-type:image/jpeg");

$img=imagecreatetruecolor(300,300);

$color=imagecolorallocate($img,255,0,0);

imagefill($img,0,0,$color);

$fontcolor=imagecolorallocate($img,255,255,255);

$font="font.ttf";

//$string=iconv("gbk","utf-8","图像中文"); //字体转换编码，使用gbk

$string="图像中文".$_SERVER['REMOTE_ADDR'];

imagettftext($img,32,0,50,50,$fontcolor,$font,$string);

for($i=100;$i<=200;$i=$i+10){
	imageline($img,$i,100,$i,200,$fontcolor);
}
imagejpeg($img);
?>