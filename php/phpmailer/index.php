<?php
date_default_timezone_set("PRC");
// 引入PHPMailer的核心文件
require_once("PHPMailer/src/PHPMailer.php");
require_once("PHPMailer/src/SMTP.php");
require_once("PHPMailer/src/Exception.php");
use \PHPMailer\PHPMailer\PHPMailer;
use \PHPMailer\PHPMailer\Exception;

// 实例化PHPMailer核心类
$mail = new PHPMailer();
// 是否启用smtp的debug调试,开发环境建议开启,生产环境注释掉即可,默认关闭
// Enable SMTP debugging,0=off (for production use),1=client messages,2=client and server messages
$mail->SMTPDebug = 2;
// 调试输出格式
// $mail->Debugoutput = 'html';
// 使用smtp鉴权方式发送邮件
$mail->isSMTP();
// smtp需要鉴权必须是true
$mail->SMTPAuth = true;
// 链接qq域名邮箱的服务器地址
$mail->Host = 'smtp.qq.com';
// 设置使用ssl加密方式登录鉴权
$mail->SMTPSecure = 'ssl';
// 设置ssl连接smtp服务器的远程服务器端口号,likely to be 25, 465 or 587
$mail->Port = 465;
// 设置发送的邮件的编码
$mail->CharSet = 'UTF-8';
// 设置发件人昵称 显示在收件人邮件的发件人邮箱地址前的发件人姓名
$mail->FromName = 'phpmailer';
// smtp登录的账号 QQ邮箱即可
$mail->Username = '465137869@qq.com';
// smtp登录的密码 使用生成的授权码
$mail->Password = 'htyrnrdxwaqkcaga';
// 设置发件人邮箱地址 同登录账号
$mail->From = '465137869@qq.com';
// 回复地址
$mail->addReplyTo('replyto@example.com', 'First Last');
// send as HTML,邮件正文是否为html编码,注意此处是一个方法
$mail->isHTML(true);
// 设置收件人邮箱地址,添加多个收件人则多次调用方法即
$mail->addAddress('1024940433@qq.com');
$mail->addAddress('heiying6958@sina.com');
// 添加该邮件的主题
$mail->Subject = '邮件主题';
// 添加邮件正文
$mail->Body = '<h1>Hello World</h1>';
// 为该邮件添加附件
$mail->addAttachment('./a.txt');
// 发送邮件,返回状态的布尔值
$status = $mail->send();


/**
* thinkphp5邮件发送
* @param $to 接收人
* @param string $subject 邮件标题
* @param string $content 邮件内容(html模板渲染后的内容)
* @throws Exception
* @throws phpmailerException
*/
/*
function send_email($to,$subject='',$content=''){
　　vendor('phpmailer.PHPMailerAutoload'); 
	//require_once 'vendor/phpmailer/PHPMailerAutoload.php';
　　$mail = new PHPMailer;
　　$arr = db('config')->where('inc_type','smtp')->select();
　　$config = convert_arr_kv($arr,'name','value');
　　$mail->CharSet = 'UTF-8'; // 设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置，否则乱码
　　$mail->isSMTP();
	//Enable SMTP debugging,0=off (for production use),1=client messages,2=client and server messages
　　$mail->SMTPDebug = 0;
	//调试输出格式
	//$mail->Debugoutput = 'html';
	//smtp服务器
　　$mail->Host = $config['smtp_server'];
	//端口 - likely to be 25, 465 or 587
　　$mail->Port = $config['smtp_port'];

　　if($mail->Port === 465) $mail->SMTPSecure = 'ssl';// 使用安全协议
	//Whether to use SMTP authentication
　　$mail->SMTPAuth = true;
	//发送邮箱
　　$mail->Username = $config['smtp_user'];
	//密码
　　$mail->Password = $config['smtp_pwd'];
	//Set who the message is to be sent from
　　$mail->setFrom($config['smtp_user'],$config['email_id']);
	//回复地址
	//$mail->addReplyTo('replyto@example.com', 'First Last');
	//接收邮件方
　　if(is_array($to)){
　　　　foreach ($to as $v){
　　　　　　$mail->addAddress($v);
　　　　}
　　}else{
　　　　$mail->addAddress($to);
　　}

　　$mail->isHTML(true);// send as HTML
	//标题
　　$mail->Subject = $subject;
	//HTML内容转换
　　$mail->msgHTML($content);
	//Replace the plain text body with one created manually
	//$mail->AltBody = 'This is a plain-text message body';
	//添加附件
	//$mail->addAttachment('images/phpmailer_mini.png');
	//send the message, check for errors
　　return $mail->send();
}
*/

