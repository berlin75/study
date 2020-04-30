<?php
require_once __DIR__ . '/vendor/autoload.php';
use Workerman\WebServer;
use Workerman\Worker;

// WebServer
// 0.0.0.0 代表监听本机所有网卡，不需要把0.0.0.0替换成其它IP或者域名
// 这里监听8080端口，如果要监听80端口，需要root权限，并且端口没有被其它程序占用
$web = new WebServer("http://0.0.0.0:8080");

// 4 processes
$web->count = 4;

// Set the root of domains
// 类似nginx配置中的root选项，添加域名与网站根目录的关联，可设置多个域名多个目录
$web->addRoot('www.your_domain.com', '/your/path/Web');
$web->addRoot('www.another_domain.com', '/another/path/Web');
// run all workers
Worker::runAll();