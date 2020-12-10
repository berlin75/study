<?php
// phpinfo();

class Xrange implements Iterator {
    protected $start;
    protected $end;
    protected $step;
    protected $value;
    public function __construct($start, $end, $step = 1){
      $this->start = $start;
      $this->end = $end;
      $this->step  = $step;
    }
    public function rewind(){
      $this->value = $this->start;
    }
    public function next(){
      $this->value += $this->step;
    }
    public function current(){
      return $this->value;
    }
    public function key(){
      return $this->value + 1;
    }
    public function valid(){
      return $this->value <= $this->end;
    }
  }
  
  $firstday = isset($time_first) ? $time_first : strtotime(date('Y-m-01 0:0:0', strtotime('-1 month')));
  $lastday = isset($time_last) ? $time_last : strtotime(date('Y-m-01 0:0:0'));
  $arr = new Xrange($firstday, $lastday, 20 * 60);
  foreach ($arr as $key => $val) {
    echo $key,'->',$val,"\t";
  }



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
