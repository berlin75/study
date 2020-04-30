<?php
if(!isset($_GET['act'])) exit;
require 'Captcha.class.php';
$captcha = new Captcha();
if($_GET['act']=='verify'){
    echo $captcha -> checkCode($_POST['captcha']) ?  '验证码正确' : '验证码错误';
}else if($_GET['act']=='show'){
    $captcha -> makeImage();
}