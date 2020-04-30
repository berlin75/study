<?php
/**
 * 多对多消息发送与获取(即是群组)
模块要求：
1、用户能够自行创建群组,并成为群主
2、群主可以拉人进来作为群组成员、并且可以踢人
3、用户可以直接退出群组
4、可以发送消息,每一位成员都可以拉取消息
5、群组的消息最大容纳量为5000条
6、成员可以拉取新消息,并提示有多少新消息
7、成员可以分页获取之前已读的旧消息
可以增加其他功能,例如禁言、匿名消息发送、文件发送等等。

Redis实现思路：
1、群组的消息以及群组的成员组成采用有序集合进行存储。
群组消息有序集合的member存储用户发送的json数据消息,score采用原子操作incr记录时该群的第几条信息；
群组成员有序集合的member存储user,score使用数字1为群主,其他的存储为2。可以扩展别的功能,例如群组中成员等级

2、用户所加入的群组也是采用有序集合进行存储,member存储群组ID,score存储用户已经获取该群组的最大消息分值,对应群组消息的score值
3、用户创建群组的时候,通过原子操作incr从而获取一个唯一ID
4、用户在群中发送消息时,也是通过原子操作incr获取一个唯一自增长有序ID
5、在执行incr时,为防止并发导致竞争关系,因此需要进行加锁操作

 */
class ManyPullMessage{
  private $redis='';

  public function __construct($host='127.0.0.1',$port=6379){
    $this->redis=new Redis();
    $this->redis->connect($host,$port);
    $this->redis->select(1);
  } 

  // 用于创建群组的方法,在创建的同时还可以拉人进群组,锁名用于获取群组ID的时候用
  public function createGroup($groupManager, $addUser=array(), $lockName='chatIdLock'){
    $identifier=$this->getLock($lockName);       #获取锁
    if($identifier){
      $id=$this->redis->incr('groupID');     #获取群组ID
      $this->releaseLock($lockName,$identifier); #释放锁
    }else{
      return false;
    }

    $messageCount=$this->redis->set('countGroupMessage_'.$id, 0); #初始化这个群组消息计数器
    $pipe=$this->redis->pipeline(); 
    $this->redis->zadd('groupMembers_'.$id, 1, $groupManager);    // 创建群组成员有序集合,并添加群主
    $this->redis->zadd('hasGroups_'.$groupManager, 0, $id); // 将这个群组添加到user所参加的群组有序集合中
    foreach ($addUser as $v){                          // 创建群组的同时需要添加的用户成员
      $this->redis->zadd('groupMembers_'.$id, 2, $v);
      $this->redis->zadd('hasGroups_'.$v, 0, $id);
    }
    $pipe->exec();
    return $id;     #返回群组ID
  }

  // 群主主动拉人进群
  public function addMembers($groupManager, $groupID, $addMembers=array()){
    if($this->redis->zscore('groupMembers_'.$groupID, $groupManager)==1){ #判断user是否是群主
      $pipe=$this->redis->pipeline(); #开启非事务流水线
      foreach ($addMembers as $v){
        $this->redis->zadd('groupMembers_'.$groupID, 2, $v);   #添加进群
        $this->redis->zadd('hasGroups_'.$v, 0, $groupID); #添加群名到用户的有序集合中
      }
      $pipe->exec();
      return true;
    }
    return false;
  }

  // 群主删除成员
  public function delMembers($groupManager, $groupID, $delMembers=array()){
    if($this->redis->zscore('groupMembers_'.$groupID, $groupManager)==1){ #判断user是否是群主
      $pipe=$this->redis->pipeline(); #开启非事务流水线
      foreach ($delMembers as $v){
        $this->redis->zrem('groupMembers_'.$groupID, $v);   
        $this->redis->zrem('hasGroups_'.$v, $groupID); 
      }
      $pipe->exec();
      return true;
    }
    return false;
  }

 // 退出群组
  public function quitGroup($user, $groupID){
    $this->redis->zrem('groupMembers_'.$groupID, $user);
    $this->redis->zrem('hasGroups_'.$user, $groupID);
    return true;
  }

  // 发送消息,四参群消息锁前缀,群消息锁全名为countLock_群ID
  public function sendMessage($user, $groupID, $messageArr, $preLockName='countLock_'){
    $memberScore=$this->redis->zscore('groupMembers_'.$groupID, $user); #成员score
    if($memberScore){
      $identifier=$this->getLock($preLockName.$groupID); #获取锁
      if($identifier){ #判断获取锁是否成功
        $messageCount=$this->redis->incr('countGroupMessage_'.$groupID);
        $this->releaseLock($preLockName.$groupID,$identifier); #释放锁
      }else{
        return false;
      }

      $json_message=json_encode($messageArr);
      $this->redis->zadd('groupMessages_'.$groupID, $messageCount, $json_message);
      $count=$this->redis->zcard('groupMessages_'.$groupID); #查看信息量大小
      if($count>5000){ #判断数据量有没有达到5000条,数据量超5000,则需要清除旧数据
        $start=5000-$count;
        $this->redis->zremrangebyrank('groupMessages_'.$groupID, $start, $count);
      }
      return true;
    }
    return false;
  }

  // 获取新消息
  public function getNewMessage($user){
    $arrID=$this->redis->zrange('hasGroups_'.$user, 0, -1, 'withscores'); #获取用户拥有的群组ID
    $json_message=array();
    foreach ($arrID as $k => $v){                          // 遍历循环所有群组,查看是否有新消息
      $messageCount=$this->redis->get('countGroupMessage_'.$k); // 群组最大信息分值数
      if($messageCount>$v){   // 判断用户是否存在未读新消息,hasGroup_的score记录该群已读信息的数量
        $json_message[$k]['message']=$this->redis->zrangebyscore('groupMessages_'.$k, $v+1, $messageCount);
        $json_message[$k]['count']=count($json_message[$k]['message']); #统计新消息数量
        $this->redis->zadd('hasGroups_'.$user, $messageCount, $k); #更新已获取消息
      } 
    }
    if($json_message){
      return $json_message;
    }
    return false;
  }

  // 分页获取群组信息
  public function getPartMessage($user, $groupID, $page=1, $size=10){
    $start=$page*$size-$size; // 开始截取数据位置
    $stop=$page*$size-1;      // 结束截取数据位置
    $json_message=$this->redis->zrevrange('groupMessages_'.$groupID, $start, $stop);
    if($json_message){
      return $json_message;
    }
    return false;
  }

  // 加锁
  public function getLock($lockName, $timeout=2){
    $identifier=uniqid();     #获取唯一标识符
    $timeout=ceil($timeout);  
    $end=time()+$timeout;
    while(time() < $end){       #循环获取锁
      /*
      #这里的set操作可以等同于下面那个if操作,并且可以减少一次与redis通讯
      if($this->redis->set($lockName, $identifier array('nx', 'ex'=>$timeout)))
      return $identifier;
      */
      if($this->redis->setnx($lockName, $identifier)){ #查看$lockName是否被上锁
        $this->redis->expire($lockName, $timeout);     #为$lockName设置过期时间
        return $identifier; 
      }elseif($this->redis->ttl($lockName)===-1){
        $this->redis->expire($lockName, $timeout);     #检测是否有设置过期时间,没有则加上
      }
      usleep(0.001);  #停止0.001ms
    }
    return false;
  }

  // 释放锁
  public function releaseLock($lockName, $identifier){
    if($this->redis->get($lockName)==$identifier){ #判断是锁有没有被其他客户端修改
      $this->redis->multi();
      $this->redis->del($lockName); #释放锁
      $this->redis->exec();
      return true;
    }else{
      return false; #其他客户端修改了锁,不能删除别人的锁
    }
  }
 
}