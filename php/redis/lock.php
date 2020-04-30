<?php 
#分布式锁
class Lock{
  private $redis='';
  public function __construct($host,$port=6379){
    $this->redis = new Redis();
    $this->redis->connect($host,$port);
  } 

  /**
  * @desc 加锁方法
  * @param $lockName string | 锁的名字
  * @param $timeout int | 锁的过期时间
  * @return 成功返回identifier/失败返回false
  */
  public function getLock($lockName, $timeout = 2){
    $identifier = uniqid();        #获取唯一标识符
    $timeout = ceil($timeout);
    $end = time() + $timeout;
    while(time() < $end){          #循环获取锁
      if ($this->redis->setnx($lockName, $identifier)) { #查看$lockName是否被上锁
      	$this->redis->expire($lockName, $timeout);       #为$lockName设置过期时间，防止死锁
        return $identifier;                              #返回一维标识符
      } elseif ($this->redis->ttl($lockName)===-1) {
      	$this->redis->expire($lockName, $timeout);       #没有设置过期时间则加上
      }
      usleep(0.001);   #停止0.001ms
    }
    return false;
  }

  /**
  * @desc 释放锁
  * @param $lockName string | 锁名
  * @param $identifier string | 锁的唯一值
  * @param bool
  */
  public function releaseLock($lockName,$identifier){
    if($this->redis->get($lockName)==$identifier){ #判断是锁有没有被其他客户端修改
      $this->redis->multi();
      $this->redis->del($lockName); #释放锁
      $this->redis->exec();
      return true;
    }else{
      return false; #其他客户端修改了锁，不能删除别人的锁
    }
  }

  /**
  * @desc 测试
  * @param $lockName string | 锁名
  */
  public function test($lockName){
    $start=time();
    for ($i=0; $i < 10000; $i++){ 
      $identifier=$this->getLock($lockName);
      if($identifier){
        $count=$this->redis->get('count');
        $count=$count+1;
        $this->redis->set('count',$count);
        $this->releaseLock($lockName,$identifier);
      } 
    }
    $end=time();
    echo "this OK<br/>";
    echo "执行时间为：".($end-$start);
  }
 
}


header("content-type: text/html;charset=utf8;");
$obj=new Lock('127.0.0.1');
$obj->test('lock_count');