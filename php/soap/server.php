<?php
// 服务器验证
if ($_SERVER['PHP_AUTH_USER']!='hello' || $_SERVER['PHP_AUTH_PW']!='123456') {
      header('WWW-Authenticate: Basic realm="MyFramework Realm"');
      header('HTTP/1.0 401 Unauthorized');
      echo "You must enter a valid login ID and password to access this resource.\n";
      exit;
}
 
require("soapHandle.class.php"); // 处理请求的class
 
try{
    $server = new SOAPServer(null, array('uri'=>'http://localhost/server.php'));
    $server->setClass('soapHandle'); //设置处理的class
    $server->handle();
}catch(SOAPFault $f){
    echo $f->faultString; // 打印出错信息
}
