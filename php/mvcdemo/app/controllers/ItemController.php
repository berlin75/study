<?php
namespace app\controllers;
use mvc\lib\Controller;
use app\models\ItemModel;

class ItemController extends Controller{

	public function index(){
		$items = (new ItemModel)->selectAll();
		$this->assign('title', '全部条目');
		$this->assign('items', $items);
	}

	public function add(){
		$data['item_name'] = $_POST['value'];
		$count = (new ItemModel)->add($data);
		$this->assign('title', '添加成功');
		$this->assign('count', $count);
	}

	public function view($id=null){
		$item = (new ItemModel)->select($id);
		$this->assign('title', '正在查看'.$item['item_name']);
		$this->assign('item', $item);
	}

	public function update(){
		$count = (new ItemModel)->update($_POST['id'], array('item_name'=>$_POST['item_name']));
		$this->assign('title', '修改成功');
		$this->assign('count', $count);
	}

	public function delete($id=null){
		$count = (new ItemModel)->delete($id);
		$this->assign('title', '删除成功');
		$this->assign('count', $count);
	}
}