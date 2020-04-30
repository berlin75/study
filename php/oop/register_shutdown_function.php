<?php
$finish = false;
error_reporting(0);
function shutdown_func(){
  global $finish;
  if (!$finish){
  	header('HTTP/1.1 500 Internal Server Error');
    die("not a finish shutdown, Internal Server Error");
  }
  return false;
}
register_shutdown_function("shutdown_func");
$a = 1;
$a = new FooClass(); // 将因为致命错误而失败
$finish = true;