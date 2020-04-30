<?php
header('Content-Type:text/html; charset=utf-8');  
echo "<p>首页登录页面index.php（是你当前项目首页）</p>";
echo "<p>当前项目的中间件用来赋值cookie和清空cookie的文件callback.php</p>";
echo "<p>很重要的文件login.php（是sso登录也要放在第三方网站下面）</p>";
echo "<p>原理:<br/>
根据你第三方登录页面输入的信息，判断是否用户正确信息，然后记录到cookie里面，然后带上加密的sign，跳转回去中间件文件callback.php,然后解密，进行当前项目的cookie进行赋值，然后跳转回首页，并且实现登录了！</p><hr><br/><br/>";

$sso_address = 'http://www.mysso.com/sso/login.php'; // SSO所在的域名,不是当前项目地址 
$sso_address = 'login.php';                          // SSO所在的域名,不是当前项目地址  
$callback_address = 'http://'.$_SERVER['HTTP_HOST']  
                    .str_replace('index.php','',$_SERVER['SCRIPT_NAME'])  
                    .'callback.php';                  // callback地址用于回调设置cookie
if(isset($_COOKIE['sign'])){
    exit("欢迎您{$_COOKIE['sign']} <a href='{$sso_address}?logout=1'>退出</a>");  
}else{  
    echo '您还未登录 <a href="'.$sso_address.'?callback='.$callback_address.'">点此登录</a>';
}  
?> 
<iframe src="<?php echo $sso_address ?>?callback=<?php echo $callback_address ?>" frameborder="0"  width="0" height="0"></iframe>