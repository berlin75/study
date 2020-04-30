<?php
namespace app\models;
use mvc\lib\Model;

class ItemModel extends Model{
	public function selectAll(){
		$sql = sprintf("select * from `%s`", $this->_table);
		$stmt = $this->_dbHandle->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll();
	}

	public function select($id){
		$sql = sprintf("select * from `%s` where id = %s", $this->_table, $id);
		$stmt = $this->_dbHandle->prepare($sql);
		$stmt->execute();
		return $stmt->fetch();
	}

	public function delete($id){
		$sql = sprintf("delete from `%s` where `id` = %s", $this->_table, $id);
		$stmt = $this->_dbHandle->prepare($sql);
		$stmt->execute();
		return $stmt->rowCount();
	}

	// 自定义sql查询,返回影响的行数
	public function query($sql){
		$stmt = $this->_dbHandle->prepare($sql);
		$stmt->execute();
		return $stmt->rowCount();
	}

	public function add($data){
		$sql = sprintf("insert into `%s` %s", $this->_table, $this->formatInsert($data));
		return $this->query($sql);
	}

	public function update($id, $data){
		$sql = sprintf("update `%s` set %s where id = %s", $this->_table, $this->formatUpdate($data), $id);
		return $this->query($sql);
	}

	private function formatInsert($data){
		$fields = [];
		$values = [];
		foreach ($data as $key => $value) {
			$fields[] = sprintf("`%s`", $key);
			$values[] = sprintf("'%s'", $value);
		}
		$field = implode(',', $fields);
		$value = implode(',', $values);

		return sprintf("(%s) values (%s)", $field, $value);
	}

	private function formatUpdate($data){
		$fields = [];
		foreach ($data as $key => $value) {
			$fields[] = sprintf("`%s` = '%s'", $key, $value);
		}
		return implode(',', $fields);
	}
}