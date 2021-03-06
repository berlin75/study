<?php
// var_dump($_SERVER);

require __DIR__.'/../lib/User.php';
require __DIR__.'/../lib/Article.php';
$pdo = require __DIR__.'/../lib/db.php';

class Restful{
	private $_user;
	private $_article;

	private $_requestMethod;
	private $_resourceName;

	private $_allowResources = ['users', 'articles'];
	private $_allowRequestMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
	private $_statusCodes = [
		200 => 'ok',
		204 => 'No Content',
		400 => 'Bad Request',
		401 => 'Unauthorized',
		403 => 'Forbidden',
		404 => 'Not Found',
		405 => 'Method Not Allowed',
		500 => 'Server Internal Error'
	];

	public function __construct(User $_user, Article $_article){
		$this->_user = $_user;
		$this->_article = $_article;

		// var_dump($_SERVER);
		// var_dump($_SERVER['REQUEST_METHOD']);
		// var_dump(explode('/', $_SERVER['PATH_INFO']));
		// if(in_array($_SERVER['REQUEST_METHOD'], $this->_allowRequestMethods)){
		// 	echo 'YES';
		// }
	}

	public function run(){
		try{
			$this->_setupRequestMethod();
			$this->_setupResourceName();
			if($this->_resourceName == 'users'){
				$this->_json($this->_handleUser());
			}
			if($this->_resourceName == 'articles'){
				$this->_json($this->_handleArticle());
			}
		}catch(Exception $e){
			$this->_json(['error' => $e->getMessage()], $e->getCode());
		}
		
	}

	private function _setupRequestMethod(){
		$this->_requestMethod = $_SERVER['REQUEST_METHOD'];
		if(!in_array($this->_requestMethod, $this->_allowRequestMethods)){
			throw new Exception('请求方法不被允许', 405);
		}
	}

	private function _setupResourceName(){
		$path = $_SERVER['PATH_INFO'];
		$params = explode('/', $path);
		$this->_resourceName = $params[1];
		if(!in_array($this->_resourceName, $this->_allowResources)){
			throw new Exception('请求资源不被允许', 400);
		}
		if(!empty($params[2])){
			$this->_id = $params[2];
		}
	}

	private function _json($array, $code = 0){
		if($array === null && $code = 0){
			$code = 204;
		}
		if($array !== null && $code = 0){
			$code = 200;
		}
		if($code > 0 && $code != 200 && $code != 204){
			header("HTTP/1.1 ".${code}." ".$this->_statusCodes[$code]);
		}
		header('Content-Type:application/json;charset=utf-8');
		if($array !== null){
			echo json_encode($array, JSON_UNESCAPED_UNICODE);
		}
		exit();
	}

	private function _handleUser(){
		if($this->_requestMethod != 'POST'){
			throw new Exception('请求方法不被允许', 405);
		}
		$body = $this->_getBodyParams();
		if(empty($body['username'])){
			throw new Exception('用户名不能为空', 400);
		}
		if(empty($body['password'])){
			throw new Exception('密码不能为空', 400);
		}
		return $this->_user->register($body['username'], $body['password']);
	}

	private function _handleArticle(){
		switch ($this->_requestMethod) {
			case 'GET':
				return empty($this->_id) ? $this->_handleArticleGetList() : $this->_handleArticleView();
			case 'POST':
				return $this->_handleArticleCreate();
				break;
			case 'PUT':
				return $this->_handleArticleEdit();
				break;
			case 'DELETE':
				return $this->_handleArticleDelete();
				break;
			default:
				throw new Exception('请求方法不被允许', 405);
				break;
		}
	}

	private function _getBodyParams(){
		$raw = file_get_contents('php://input');
		if(empty($raw)){
			throw new Exception('请求参数错误', 400);
		}
		return json_decode($raw, true);
	}

	private function _handleArticleCreate(){
		$body = $this->_getBodyParams();
		if(empty($body['title'])){
			throw new Exception('文章标题不能为空', 400);
		}
		if(empty($body['content'])){
			throw new Exception('文章内容不能为空', 400);
		}
		$user = $this->_userLogin($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);
		try {
			$article = $this->_article->create($body['title'], $body['content'], $user['user_id']);
			return $article;
		} catch (Exception $e) {
			if(in_array($e->getCode(), [ErrorCode::TITLE_CANNOT_EMPTY,ErrorCode::CONTENT_CANNOT_EMPTY])){
				throw new Exception($e->getMessage(), 400);
			}
			throw new Exception($e->getMessage(), 500);
		}
	}

	private function _handleArticleEdit(){
		try {
			$user = $this->_userLogin($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);
			$article = $this->_article->view($this->_id);
			if($article['user_id'] != $user['user_id']){
				throw new Exception("您无权编辑", 403);
			}
			$body = $this->_getBodyParams();
			$title = empty($body['title']) ? $article['title'] : $body['title'];
			$content = empty($body['content']) ? $article['content'] : $body['content'];
			if($title == $article['title'] && $content == $article['content']){
				return $article;
			}
			return $this->_article->edit($article['article_id'], $title, $content, $user['user_id']);
		} catch (Exception $e) {
			if($e->getCode() < 100){
				if($e->getCode() == ErrorCdoe::ARTICLE_NOT_FOUND){
					throw new Exception($e->getMessage(), 404);
				}else{
					throw new Exception($e->getMessage(), 400);
				}
			}else{
				throw $e;
			}
		}
	}

	private function _handleArticleDelete(){
		$user = $this->_userLogin($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);
		try {
			$article = $this->_article->view($this->_id);
			if($article['user_id'] != $user['user_id']){
				throw new Exception("您无权编辑", 403);
			}
			$this->_article->delete($article['article_id'], $user['user_id']);
			return null;
		} catch (Exception $e) {
			if($e->getCode() < 100){
				if($e->getCode() == ErrorCdoe::ARTICLE_NOT_FOUND){
					throw new Exception($e->getMessage(), 404);
				}else{
					throw new Exception($e->getMessage(), 400);
				}
			}else{
				throw $e;
			}
		}
	}

	private function _handleArticleGetList(){
		$user = $this->_userLogin($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']);
		$page = isset($_GET['page']) ? $_GET['page'] : 1;
		$size = isset($_GET['size']) ? $_GET['size'] : 10;
		if($size > 100){
			throw new Exception("分页大小最大为100", 400);
		}
		$this->_article->getList($user['user_id'], $page, $size);
	}

	private function _handleArticleView(){
		try {
			return $this->_article->view($this->_id);
		} catch (Exception $e) {
			if($e->getCode() == ErrorCode::ARTICLE_NOT_FOUND){
				throw new Exception($e->getMessage(), 404);
			}else{
				throw new Exception($e->getMessage(), 500);
			}
		}
	}

	private function _userLogin($PHP_AUTH_USER, $PHP_AUTH_PW){
		try{
			return $this->_user->login($PHP_AUTH_USER, $PHP_AUTH_PW);
		}catch(Exception $e){
			if(in_array($e->getCode(), [
				ErrorCode::USERNAME_CANNOT_EMPTY,
				ErrorCode::PASSWORD_CANNOT_EMPTY,
				ErrorCode::USERNAEM_OR_PASSWORD_INVAILD
			])){
				throw new Exception($e->getMessage(), 401);
			}
			throw new Exception($e->getMessage(), 500);
		}
		
	}
}

$user = new User($pdo);
$article = new Article($pdo);
$restful = new Restful($user, $article);
$restful->run();