<?php
namespace mvc\db;
use \PDO;
/**
 * 数据库基类
 */
class Db{
	protected $_dbHandle;
	
	public function connect($host, $user, $pass, $dbname){
		try {
			$dsn = sprintf("mysql:host=%s;dbname=%s;charset=utf8", $host, $dbname);
			$this->_dbHandle = new PDO($dsn, $user, $pass, array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC));
		} catch (PDOException $e) {
			exit('错误：'.$e->getMessage());
		}
	}

}