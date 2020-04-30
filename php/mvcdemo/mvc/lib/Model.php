<?php
namespace mvc\lib;
use mvc\db\Db;

// 模型基类
class Model extends Db{
	protected $_model;
	protected $_table;

	function __construct(){
		// 连接数据库
		$this->connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
		// 获取模型名称
		$this->_model = get_class($this);
		$arr = explode('\\', $this->_model);
		$this->_model = rtrim(array_pop($arr), 'Model');
		// 数据库表名和类名一致
		$this->_table = strtolower($this->_model);
	}

}