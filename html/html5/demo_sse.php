<?php
date_default_timezone_set("PRC");
header('Content-Type:text/event-stream');  // 设置报头
header('Cache-Control:no-cache');          // 规定不对页面进行缓存
$time = date('r');
echo "data:The server time is:{$time}\n\n";
flush(); 