<?php
/**
 * mvc核心框架
 */
class Core{
	protected $config = [];

	public function __construct($config){
		$this->config = $config;
	}

	public function run(){
		spl_autoload_register(array($this, 'loadClass'));
	    $this->setReporting();
	    $this->removeMagicQuotes();
	    $this->setDbConfig();
	    $this->Route();
	}

	// 自动加载控制器和模型类文件
	private function loadClass($class){ 
		// var_dump(debug_backtrace());
        $file = ROOT_PATH . str_replace('\\', '/', $class) . '.php';
        if (is_file($file)) {
            include $file;
        }
	}

	// 检测开发环境
	private function setReporting(){
		if(APP_DEBUG === true){
			error_reporting(E_ALL);
			ini_set('display_errors', 'On');
		}else{
			error_reporting(E_ALL);
			ini_set('display_errors', 'Off');
			ini_set('log_errors', 'On');
			ini_set('error_log', RUNTIME_PATH.'logs/error.log');
		}
	}

	// 删除敏感字符
	private function stripSlashesDeep($value){
		return is_array($value) ? array_map('stripSlashesDeep', $value) : stripcslashes($value);
	}

	// 检测敏感字符并删除
	private function removeMagicQuotes(){
		if (get_magic_quotes_gpc()) {
			$_GET = stripSlashesDeep($_GET);
			$_POST = stripSlashesDeep($_POST);
			$_COOKIE = stripSlashesDeep($_COOKIE);
			$_SESSION = stripSlashesDeep($_SESSION);
		}
	}

	// 配置数据库信息
    public function setDbConfig(){
        if ($this->config['db']) {
            define('DB_HOST', $this->config['db']['host']);
            define('DB_NAME', $this->config['db']['dbname']);
            define('DB_USER', $this->config['db']['username']);
            define('DB_PASS', $this->config['db']['password']);
        }
    }

	// RewriteRule ^(.*)$ index.php/$1? [PT,L]
	// RewriteRule ^(.*)$ index.php？url=$1? [PT,L]
	// $_SERVER['PATH_INFO']
	// http://document/root/controller/action/param1/param2
	// $_SERVER['REQUEST_URI']
	// http://document/root/controller/action?param1=value1&param2=value2
	private function Route(){
		// var_dump($GLOBALS);
		$controllerName = $this->config['defaultController'];
		$action = $this->config['defaultAction'];
		$queryString = [];
		if(isset($_SERVER['PATH_INFO'])){
			$url = $_SERVER['PATH_INFO'];
			// var_dump($url);
			$position = strpos($url, '?');
	        $url = $position === false ? $url : substr($url, 0, $position);
	        $url = trim($url, '/');
	        if ($url) {
	            $urlArray = explode('/', $url);
	            $urlArray = array_filter($urlArray);
	            $controllerName = ucfirst($urlArray[0]);
	            array_shift($urlArray);
	            $action = $urlArray ? $urlArray[0] : $action;
	            array_shift($urlArray);
	            $queryString = $urlArray;
	        }
		}
		
		// var_dump(isset($_GET['url']) ? $_GET['url'] : 'no url');
		// if(!empty($_GET['url'])){
		// 	$url = $_GET['url'];
		// 	$urlArray = explode('/', $url);
		// 	$controllerName = ucfirst($urlArray[0]);
		// 	array_shift($urlArray);
		// 	$action = empty($urlArray[0]) ? 'index' : $urlArray[0];
		// 	array_shift($urlArray);
		// 	$queryString = empty($urlArray) ? array() : $urlArray;
		// }
		// $queryString = empty($queryString) ? array() : $queryString; // 数据为空的处理

		// 实例化控制器
		$controller = 'app\\controllers\\'.$controllerName.'Controller';

		if (!class_exists($controller)) {
            exit($controller . ' 控制器不存在');
        }
        if (!method_exists($controller, $action)) {
            exit($action . ' 方法不存在');
        }

		$dispatch = new $controller($controllerName, $action);
		call_user_func_array(array($dispatch, $action), $queryString);

	}
}