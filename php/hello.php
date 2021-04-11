<?php
// phpinfo();

if (!function_exists("fastcgi_finish_request")) {
    echo 'exists';
    function fastcgi_finish_request()  {
        $status = ob_get_status(true);
        $level = \count($status);
        $flags = \PHP_OUTPUT_HANDLER_REMOVABLE | \PHP_OUTPUT_HANDLER_FLUSHABLE;

        while ($level-- > 0 && ($s = $status[$level]) && (!isset($s['del']) ? !isset($s['flags']) || ($s['flags'] & $flags) === $flags : $s['del'])) {
            if (true) {
                ob_end_flush();
            } else {
                ob_end_clean();
            }
        }
    }
}

echo '例子：';
file_put_contents('log.txt', date('Y-m-d H:i:s') . " 上传视频\n", FILE_APPEND);
fastcgi_finish_request();
sleep(10);
file_put_contents('log.txt', date('Y-m-d H:i:s') . " 转换格式\n", FILE_APPEND);
sleep(10);
file_put_contents('log.txt', date('Y-m-d H:i:s') . " 提取图片\n", FILE_APPEND);
die;


function array_sort($data, $key, $type = 'asc') {
    if (empty($data)) return $data;
    if (!is_array($data)) return $data;
    $keys = [];
    foreach ($data as $k => $v) {
      $keys[] = $v[$key];
    }
    $sort = $type == 'asc' ? SORT_ASC : SORT_DESC;
    array_multisort($keys, $sort, $data);
    return $data;
  }

$data = array(
    array('volume' => 67, 'edition' => 2),
    array('volume' => 86, 'edition' => 1),
    array('volume' => 85, 'edition' => 6),
    array('volume' => 98, 'edition' => 2),
    array('volume' => 86, 'edition' => 6),
    array('volume' => 67, 'edition' => 7)
);
var_export(array_sort($data, 'volume', 'desc'));
// array ( 
//     0 => array ( 'volume' => 67, 'edition' => 2, ), 
//     1 => array ( 'volume' => 67, 'edition' => 7, ), 
//     2 => array ( 'volume' => 85, 'edition' => 6, ), 
//     3 => array ( 'volume' => 86, 'edition' => 1, ), 
//     4 => array ( 'volume' => 86, 'edition' => 6, ), 
//     5 => array ( 'volume' => 98, 'edition' => 2, ),
// )

// try {
//     $options = [
//         PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'',
//         PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
//         PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,
//     ];
//     $pdo = new PDO('mysql:host=127.0.0.1;dbname=mysql;port=3306','admin','123456',$options);
//     $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);  // 返回原数据类型,而非统一字符串
//     echo "haha mysql" . PHP_EOL;
// } catch (PDOException $e) {
//     echo "错误信息: ".$e->getMessage();
// }

// $str = "Swoole";
// Swoole\Timer::after(1000, function() use ($str) {
//     echo "Hello, $str\n";
// });

// $redis = new Redis();
// $redis->connect('127.0.0.1',6379);
// var_dump($redis->keys('*'));
// echo "haha redis" . PHP_EOL;

// Co\run(function () {
//     $swoole_mysql = new Swoole\Coroutine\MySQL();
//     $swoole_mysql->connect([
//         'host'     => '127.0.0.1',
//         'port'     => 3306,
//         'user'     => 'admin',
//         'password' => '123456',
//         'database' => 'mysql',
//     ]);
//     $res = $swoole_mysql->query('select * from user');
//     var_dump($res);
// });
