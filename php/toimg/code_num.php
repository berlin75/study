<?php
session_start();
getCode(4,60,20);

function getCode($num,$w,$h) {
	//4位验证码也可以用rand(1000,9999)直接生成
	$code = "";
	for ($i = 0; $i < $num; $i++) {
		$code .= rand(0, 9);
	}
	//将生成的验证码写入session，备验证时用
	$_SESSION["helloweba_num"] = $code;
	header("Content-type: image/PNG");
	$im = imagecreate($w, $h);
	$black = imagecolorallocate($im, 0, 0, 0);
	$gray = imagecolorallocate($im, 200, 200, 200);
	$bgcolor = imagecolorallocate($im, 255, 255, 255);
	imagefill($im, 0, 0, $gray);                     //填充背景
	imagerectangle($im, 0, 0, $w-1, $h-1, $black);   //画矩形形成边框
	//随机绘制两条虚线，起干扰作用
	$style = array ($black,$black,$black,$black,$black, $gray,$gray,$gray,$gray,$gray );
	imagesetstyle($im, $style);
	imageline($im, 0, rand(0, $h), $w, rand(0, $h), IMG_COLOR_STYLED);
	imageline($im, 0, rand(0, $h), $w, rand(0, $h), IMG_COLOR_STYLED);
	//在画布上随机生成大量黑点，起干扰作用;
	for ($i = 0; $i < 80; $i++) {
		imagesetpixel($im, rand(0, $w), rand(0, $h), $black);
	}
	//将数字随机显示在画布上,字符的水平间距和位置都按一定波动范围随机生成
	$strx = rand(3, 8);
	for ($i = 0; $i < $num; $i++) {
		$strpos = rand(1, 6);
		imagestring($im, 5, $strx, $strpos, substr($code, $i, 1), $black);
		$strx += rand(8, 12);
	}
	imagepng($im);           //输出图片
	imagedestroy($im);       //释放图片所占内存
}


