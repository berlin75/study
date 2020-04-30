<?php

class MyPDO{
  protected static $_instance = null;
  protected $dbName = '';
  protected $pdo;

  private function __construct($dbHost,$dbUser,$dbPasswd,$dbName,$dbCharset){
    try {
      $this->pdo = new PDO('mysql:host='.$dbHost.';dbname='.$dbName,$dbUser,$dbPasswd);
      $this->pdo->exec('SET character_set_connection='.$dbCharset.',character_set_results='.$dbCharset.',character_set_client=binary');
    } catch (PDOException $e) {
        $this->outputError($e->getMessage());
    }
  }

  // 防止克隆
  private function __clone() {}

  // Singleton instance
  public static function getInstance($dbName,$dbHost='127.0.0.1',$dbUser='admin',$dbPasswd='',$dbCharset='utf-8'){
    if (self::$_instance === null) {
      self::$_instance = new self($dbHost,$dbUser,$dbPasswd,$dbName,$dbCharset);
    }
    return self::$_instance;
  }

  // Query 查询
  public function query($strSql,$queryMode = 'All',$debug = false){
    if ($debug === true) $this->debug($strSql);
    $recordset = $this->pdo->query($strSql);
    $this->getPDOError();
    if ($recordset) {
      $recordset->setFetchMode(PDO::FETCH_ASSOC);
      if ($queryMode == 'All') {
        $result = $recordset->fetchAll();
      } elseif ($queryMode == 'Row') {
        $result = $recordset->fetch();
      }
    } else {
      $result = null;
    }
    return $result;
  }

  // Update 更新
  public function update($table,$arrayDataValue,$where = '',$debug = false){
    $this->checkFields($table,$arrayDataValue);
    if ($where) {
      $strSql = '';
      foreach ($arrayDataValue as $key => $value) {
        $strSql .= ",`$key`='$value'";
      }
      $strSql = substr($strSql,1);
      $strSql = "UPDATE `$table` SET $strSql WHERE $where";
    } else {
      $strSql = "REPLACE INTO `$table` (`".implode('`,`',array_keys($arrayDataValue))."`) VALUES ('".implode("','",$arrayDataValue)."')";
    }
    if ($debug === true) $this->debug($strSql);
    $result = $this->pdo->exec($strSql);
    $this->getPDOError();
    return $result;
  }

  // Insert 插入
  public function insert($table,$arrayDataValue,$debug = false){
    $this->checkFields($table,$arrayDataValue);
    $strSql = "INSERT INTO `$table` (`".implode('`,`',array_keys($arrayDataValue))."`) VALUES ('".implode("','",$arrayDataValue)."')";
    if ($debug === true) $this->debug($strSql);
    $result = $this->pdo->exec($strSql);
    $this->getPDOError();
    return $result;
  }

  // Replace 覆盖方式插入
  public function replace($table,$arrayDataValue,$debug = false){
    $this->checkFields($table,$arrayDataValue);
    $strSql = "REPLACE INTO `$table`(`".implode('`,`',array_keys($arrayDataValue))."`) VALUES ('".implode("','",$arrayDataValue)."')";
    if ($debug === true) $this->debug($strSql);
    $result = $this->pdo->exec($strSql);
    $this->getPDOError();
    return $result;
  }

  // Delete 删除
  public function delete($table,$where = '',$debug = false){
    if ($where == '') {
      $this->outputError("'WHERE' is Null");
    } else {
      $strSql = "DELETE FROM `$table` WHERE $where";
      if ($debug === true) $this->debug($strSql);
      $result = $this->pdo->exec($strSql);
      $this->getPDOError();
      return $result;
    }
  }

  // execSql 执行SQL语句
  public function execSql($strSql,$debug = false){
    if ($debug === true) $this->debug($strSql);
    $result = $this->pdo->exec($strSql);
    $this->getPDOError();
    return $result;
  }

  // 获取字段最大值
  public function getMaxValue($table,$field_name,$where = '',$debug = false){
    $strSql = "SELECT MAX(".$field_name.") AS MAX_VALUE FROM $table";
    if ($where != '') $strSql .= " WHERE $where";
    if ($debug === true) $this->debug($strSql);
    $arrTemp = $this->query($strSql,'Row');
    $maxValue = $arrTemp["MAX_VALUE"];
    if ($maxValue == "" || $maxValue == null) {
      $maxValue = 0;
    }
    return $maxValue;
  }

  // 获取指定列的数量
  public function getCount($table,$field_name,$where = '',$debug = false){
    $strSql = "SELECT COUNT($field_name) AS NUM FROM $table";
    if ($where != '') $strSql .= " WHERE $where";
    if ($debug === true) $this->debug($strSql);
    $arrTemp = $this->query($strSql,'Row');
    return $arrTemp['NUM'];
  }

  // 获取表引擎
  public function getTableEngine($dbName,$tableName){
    $strSql = "SHOW TABLE STATUS FROM $dbName WHERE Name='".$tableName."'";
    $arrayTableInfo = $this->query($strSql);
    $this->getPDOError();
    return $arrayTableInfo[0]['Engine'];
  }

  // transaction 通过事务处理多条SQL语句,调用前需通过getTableEngine判断表引擎是否支持事务
  public function execTransaction($arraySql){
    $retval = 1;
    $this->pdo->beginTransaction();
    foreach ($arraySql as $strSql) {
      if ($this->execSql($strSql) == 0) $retval = 0;
    }
    if ($retval == 0) {
      $this->pdo->rollback();
      return false;
    } else {
      $this->pdo->commit();
      return true;
    }
  }

  // checkFields 检查指定字段是否在指定数据表中存在
  private function checkFields($table,$arrayFields){
    $fields = $this->getFields($table);
    foreach ($arrayFields as $key => $value) {
      if (!in_array($key,$fields)) {
        $this->outputError("Unknown column `$key` in field list.");
      }
    }
  }

  // getFields 获取指定数据表中的全部字段名
  private function getFields($table){
    $fields = array();
    $recordset = $this->pdo->query("SHOW COLUMNS FROM $table");
    $this->getPDOError();
    $recordset->setFetchMode(PDO::FETCH_ASSOC);
    $result = $recordset->fetchAll();
    foreach ($result as $rows) {
      $fields[] = $rows['Field'];
    }
    return $fields;
  }

  // getPDOError 捕获PDO错误信息
  private function getPDOError(){
    if ($this->pdo->errorCode() != '00000') {
      $arrayError = $this->pdo->errorInfo();
      $this->outputError($arrayError[2]);
    }
  }

  // 输出错误信息
  private function outputError($strErrMsg){
    throw new Exception('MySQL Error: '.$strErrMsg);
  }

  private function debug($debuginfo){
    var_dump($debuginfo);
    exit();
  }

  // destruct 关闭数据库连接
  public function destruct(){
    $this->pdo = null;
  }
}

// $res = MyPDO::getInstance('tp5')->query('select * from think_auth_user');
// var_export($res);die;

$rulecondition = '{age}>20';
$command = preg_replace('/\{(\w*?)\}/', '$user[\'\\1\']', $rulecondition); // 花括号中数字字母下划线
var_dump($command);
@(eval('$condition=(' . $command . ');'));
$condition && $authList[] = strtolower($rule['name']);

