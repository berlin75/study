<?php
namespace mvc\lib;
/**
 * 视图基类
 */
class View{
	protected $variables = [];
	protected $_controller;
	protected $_action;
	
	function __construct($controller, $action){
		$this->_controller = $controller;
		$this->_action = $action;
	}

	// 分配变量
	function assign($name, $value){
		$this->variables[$name] = $value;
	}

	// 渲染
	function render(){
		extract($this->variables);
		$appviews = ROOT_PATH.'app/views/';
		$defaultHeader = $appviews.'header.php';
		$defaultFooter = $appviews.'footer.php';
		$controllerHeader = $appviews.$this->_controller.'/header.php';
		$controllerFooter = $appviews.$this->_controller.'/footer.php';

		file_exists($controllerHeader) ? include $controllerHeader : include $defaultHeader;
		include($appviews.$this->_controller.'/'.$this->_action.'.php');
		file_exists($controllerFooter) ? include $controllerFooter : include $defaultFooter;

	}
}