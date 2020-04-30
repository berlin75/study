<?php
define('BASEDIR', __DIR__);
include BASEDIR.'/IMooc/Loader.php';
spl_autoload_register('\\IMooc\\Loader::autoload');

IMooc\Application::getInstance(__DIR__)->dispatch();
