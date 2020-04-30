<?php

class DBDA{
	public $host="localhost";
	public $uid="root";
	public $pwd="";
	public $dbname="my_db01";

	/*

	query方法:执行用户给的sql语句,并返回相应的结果

	$sql:用户需要执行的sql语句

	$type:用户需要执行的sql语句的类型

	return:如果是增删语句改返回true或false,如果是查询语句返回二维数组

	*/

	public function query($sql,$type=1){//默认true为增删改
		$db = new MySQLi($this->host,$this->uid,$this->pwd,$this->dbname);
		if(mysqli_connect_error()){
			return "连接失败!";
		}
		$result = $db->query($sql);
		if($type==1){
			return $result;//增删改语句返回true或false
		}else{
			return $result->fetch_all();//查询语句返回二维数组
		}
	}

	//此方法用于ajax中用于对取出的数据（二维数组）进行拼接字符串处理
	public function StrQuery($sql,$type=1){
		$db = new MySQLi($this->host,$this->uid,$this->pwd,$this->dbname);
		if(mysqli_connect_error()){
			return "连接失败!";
		}
		$result = $db->query($sql);
		if($type==1){
			return $result;//增删改语句返回true或false
		}else{
			$arr = $result->fetch_all();//查询语句返回二维数组
			$str = "";
			foreach($arr as $v){
				$str = $str.implode("^", $v)."|";
			}
			$str = substr($str, 0,strlen($str)-1);
			return $str;
		}
	}

	//此方法用于ajax中用于返回为json数据类型时使用
	public function JsonQuery($sql,$type=1){
		$db = new MySQLi($this->host,$this->uid,$this->pwd,$this->dbname);
		if(mysqli_connect_error()){
			return "连接失败!";
		}
		mysqli_query($db,'SET NAMES  utf8');
		$result = $db->query($sql);
		if($type==1){
			return $result;//增删改语句返回true或false
		}else{
			$arr = $result->fetch_all();//查询语句返回二维(关联)数组
			return json_encode($arr);//将数组转换成json
		}
	}
}