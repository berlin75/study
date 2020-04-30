<?php
class User{
	public $userinfo=array();
	public $username='';
	public function __construct($username){
		$this->username=$username;	
	}
	public function getUserinfo(){
		require_once 'config.php';
		$link=mysqli_connect($db_host,$db_user,$db_psw,$db_name);
		if(!$link){
			die('Not conncet,错误代码：'.mysqli_errno().',错误信息：'.mysqli_error());
		}
		mysqli_set_charset($link,$db_charset);
		$sql='SELECT * FROM users WHERE username="'.$this->username.'"';
		$result=mysqli_query($link,$sql);
		$userinfo=mysqli_fetch_assoc($result);
		if($userinfo){
			$this->userinfo=$userinfo;
		}
		mysqli_close($link);
		return $this->userinfo;	
	}
}
