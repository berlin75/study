<?php
require_once __DIR__.'/ErrorCode.php';

class User{
	private $_db;

	public function __construct($_db){
		$this->_db = $_db;
	}

	public function login($username, $password){
		if(empty($username)){
			throw new Exception('用户名不能为空', ErrorCode::USERNAME_CANNOT_EMPTY);
		}
		if(empty($password)){
			throw new Exception('密码不能为空', ErrorCode::PASSWORD_CANNOT_EMPTY);
		}
		$sql = 'select * from `user` where `username` = :username and `password` = :password';
		$password = $this->_md5($password);
		$stmt = $this->_db->prepare($sql);
		$stmt->bindParam(':username', $username);
		$stmt->bindParam(':password', $password);
		if(!$stmt->execute()){
			throw new Exception('服务器内部错误', ErrorCode::SERVER_INTERNAL_ERROR);
		}
		$user = $stmt->fetch(PDO::FETCH_ASSOC);
		if(empty($user)){
			throw new Exception('用户名或密码错误', ErrorCode::USERNAEM_OR_PASSWORD_INVAILD);
		}
		unset($user['password']);
		return $user;
	}

	public function register($username, $password){
		if(empty($username)){
			throw new Exception('用户名不能为空', ErrorCode::USERNAME_CANNOT_EMPTY);
		}
		if(empty($password)){
			throw new Exception('密码不能为空', ErrorCode::PASSWORD_CANNOT_EMPTY);
		}
		if($this->_isUsernameEXists($username)){
			throw new Exception('用户名已存在', ErrorCode::USERNAME_EXISTS);
		}
		$sql = 'insert into `user` (`username`, `password`) values (:username, :password)';
		$password = $this->_md5($password);
		$create_time = time();
		$stmt = $this->_db->prepare($sql);
		$stmt->bindParam(':username', $username);
		$stmt->bindParam(':password', $password);
		if(!$stmt->execute()){
			throw new Exception('注册失败！', ErrorCode::REGISTER_FAIL);
		}
		unset($password);
		return [
			'user_id' => $this->_db->lastInsertId(),
			'username' => $username,
			'create_time' => $create_time
		];
	}

	private function _isUsernameEXists($username){
		$sql = 'select * from `user` where `username` = :username';
		$stmt = $this->_db->prepare($sql);
		$stmt->bindParam(':username', $username);
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		return !empty($result);
	}

	private function _md5($string, $key = 'imooc'){
		return md5($string.$key);
	}
}