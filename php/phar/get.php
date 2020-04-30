<?php
$phar = new Phar('phar.phar');
$phar->extractTo('copy');      // 提取一份原项目文件
// $phar->convertToData(Phar::ZIP);  // 另外再提取一份,和上行二选一即可
