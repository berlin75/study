<?php
/**
 * 一对一消息发送与获取
模块要求：
1、提示有多少个联系人发来新消息
2、信息包含发送人、时间、信息内容
3、能够获取之前的旧消息
4、并且消息能够保持7天，过期将会被动触发删除
Redis实现思路：
1、新消息与旧消息分别采用两个链表来存储
2、原始消息的结构采用数组的形式存放，并且含有发送人、时间戳、信息内容
3、在推入redis的链表前，需要将数据转换为json类型然后再进行存储
4、在取出新信息时应该使用rpoplpush来实现，将已读的新消息推入旧消息链表中
5、取出旧消息时，应该用旧消息的时间与现在的时间进行对比，若超时，则直接删除后面的全部数据（因为数据是按时间一个一个压进链表中的，所以对于时间是有序排列的）
 */

class SinglePullMessage{
  private $redis = '';     

  public function __construct($host = '127.0.0.1',$port = 6379){
    $this->redis = new Redis();
    $this->redis->connect($host,$port);
    $this->redis->select(1);
  } 

  // 给接收人$toUser发送消息,$messageArr包含sender、message、time
  public function sendSingle($toUser,$messageArr){   
    $json_message = json_encode($messageArr); 
    return $this->redis->lpush($toUser, $json_message);
  }

  // 接收新信息数据，并且将数据推入旧信息数据链表中，并且在原链表中删除
  public function getNewMessage($user){
    $messageArr = array();
    while($json_message = $this->redis->rpoplpush($user, 'preMessage_'.$user)){
      $temp = json_decode($json_message); 
      $messageArr[$temp->sender][] = $temp;
    }
    if($messageArr){
      $arr['count'] = count($messageArr); // 统计有多少个用户发来信息
      $arr['messageArr'] = $messageArr;
      return $arr;
    }
    return false;
  }

  // 取出旧消息
  public function getPreMessage($user){  
    $messageArr = array();
    $json_pre = $this->redis->lrange('preMessage_'.$user, 0, -1);
    foreach($json_pre as $k => $v){
      $temp = json_decode($v);
      $timeout = $temp->time + 60*60*24*7;
      if($timeout < time()){                             // 判断数据是否过期
        if($k == 0){                                     // 若是最迟插入的数据都过期了，则将所有数据删除
          $this->redis->del('preMessage_'.$user);
          break;
        }
        $this->redis->ltrim('preMessage_'.$user, 0, $k); // 检测出有过期的则将比它之前插入的所有数据删除
        break;
      }
      $messageArr[$temp->sender][] = $temp;
    }
    return $messageArr;
  }

  // 处理数组信息，然后将其输出
  public function dealArr($arr){
    foreach ($arr as $k => $v){
      foreach ($v as $k1 => $v2){
        echo '发送人：'.$v2->sender;
        echo '发送时间：'.date('Y-m-d h:i:s',$v2->time).'<br/>';
        echo '消息内容：'.$v2->message.'<br/>';
      }
      echo "<hr/>";
    }
  }
}