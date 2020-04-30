<?php
if (ini_get('phar.readonly')) {
    ini_set('phar.readonly','0');
}
//产生一个phar.phar文件
$phar = new Phar('phar.phar', 0, 'phar.phar');
// 添加project里面的所有文件到phar.phar归档文件
$phar->buildFromDirectory(dirname(__FILE__) . '/project');
//设置执行时的入口文件，第一个用于命令行，第二个用于浏览器访问，这里都设置为index.php
$phar->setDefaultStub('index.php', 'index.php');

