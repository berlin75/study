<?php
$login_url = 'http://localhost/study/php/login/login.php'; 
$useragent = 'user-agent:Mozilla/5.0 (Windows NT 5.1; rv:24.0) Gecko/20100101 Firefox/24.0'; 
$post_fields = [
	'username' => '张三',  
	'password' => 'admin', 
	'submit' => '登录'
];
$post_fields = http_build_query($post_fields);
// cookie文件存放在网站根目录的temp文件夹下 
$cookie_file = tempnam(__DIR__,'cookie');  

var_dump('登录操作');
$ch = curl_init($login_url);  
curl_setopt_array($ch, [
	CURLOPT_HEADER => false,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_USERAGENT => $useragent,
	CURLOPT_MAXREDIRS => 1,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_AUTOREFERER => true,
	CURLOPT_POST => true,
	CURLOPT_POSTFIELDS => $post_fields,
	CURLOPT_COOKIEJAR => $cookie_file,
]);

$res = curl_exec($ch);  
echo !curl_errno($ch) ? $res : 'curl error: '.curl_error($ch); // 错误处理
curl_close($ch);  
  
//带上cookie文件，访问需要访问的页面 
var_dump("进入用户中心"); 
$send_url='http://localhost/study/php/login/my.php';  
$ch = curl_init($send_url);  
curl_setopt_array($ch, [
	CURLOPT_HEADER => false, 
	CURLOPT_RETURNTRANSFER => true, 
	CURLOPT_COOKIEFILE => $cookie_file
]);  
$contents = curl_exec($ch);  
curl_close($ch);  
  
//清理cookie文件  
unlink($cookie_file);  
  
//输出网页内容 
print_r($contents);