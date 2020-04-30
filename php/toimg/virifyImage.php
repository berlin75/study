<?php
function virifyImage($width = 80, $height = 30, $type = 1, $length = 4, $pixel = 30, $line = 5, $session_name = 'virify'){
    session_start();
    // 创建画布
    $image = imagecreatetruecolor($width, $height);
    $white = imagecolorallocate($image, 255, 255, 255);
    $black = imagecolorallocate($image, 0, 0, 0);
    // 应用填充矩形填充画布
    imagefilledrectangle($image, 1, 1, $width-2, $height-2, $white);
 
    if($type == 1){
        $chars = join('', range(0, 9));
    }elseif($type == 2){
        $chars = join('', array_merge(range('a', 'z'), range('A', 'Z')));
    }elseif($type == 3){
        $chars = join('', array_merge(range(0, 9), range('a', 'z'), range('A', 'Z')));
    }
    if($length > strlen($chars)) exit('字符串长度不够');
    $chars = substr(str_shuffle($chars), 0, $length);
 
    $_SESSION[$session_name] = $chars;
    $fontfiles = ['simkai.ttf', 'SIMLI.TTF', 'SIMYOU.TTF'];
    for($i = 0; $i < $length; $i++){
        $size = mt_rand(14, 18);
        $angle = mt_rand(-15, 15);
        $x = 5 + $i*$size;
        $y = mt_rand(20, 26);
        $color = imagecolorallocate($image, mt_rand(50, 90), mt_rand(80, 200), mt_rand(90, 180));
        $fontfile = './' . $fontfiles[array_rand($fontfiles)];
        $text = substr($chars, $i, 1);
        imagettftext($image, $size, $angle, $x, $y, $color, $fontfile, $text);
    }
 
    for($i = 0; $i < $pixel; $i++){
        imagesetpixel($image, mt_rand(0, $width-1), mt_rand(0, $height-1), $black);
    }
    for($i = 0; $i < $line; $i++){
        $color = imagecolorallocate($image, mt_rand(50, 90), mt_rand(80, 200), mt_rand(90, 180));
        imageline($image, mt_rand(0, $width-1), mt_rand(0, $height-1), mt_rand(0, $width-1), mt_rand(0, $height-1), $color);
    }
 
    header('content-type:image/gif');
    imagegif($image);
    imagedestroy($image);
}
 
virifyImage();