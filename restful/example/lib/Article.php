<?php
require_once __DIR__.'/ErrorCode.php';

class Article{
	private $_db;

	public function __construct($_db){
		$this->_db = $_db;
	}

	public function create($title, $content, $user_id){
		if(empty($title)){
			throw new Exception('文章标题不能为空', ErrorCode::TITLE_CANNOT_EMPTY);
		}
		if(empty($content)){
			throw new Exception('文章内容不能为空', ErrorCode::CONTENT_CANNOT_EMPTY);
		}
		$sql = 'insert into `article` (`title`, `content`, `user_id`) values (:title, :content, :user_id)';
		$stmt = $this->_db->prepare($sql);
		$stmt->bindParam(':title', $title);
		$stmt->bindParam(':content', $content);
		$stmt->bindParam(':user_id', $user_id);
		if(!$stmt->execute()){
			throw new Exception('创建文章失败！', ErrorCode::CREATE_FAIL);
		}
		return [
			'article_id' => $this->_db->lastInsertId(),
			'title' => $title,
			'content' => $content,
			'user_id' => $user_id,
			'create_time' => time()
		];
	}

	public function view($article_id){
		if(empty($article_id)){
			throw new Exception('文章id不能为空', ErrorCode::ARTICLE_ID_CANNOT_EMPTY);
		}
		$sql = 'select * from `article` where article_id = :article_id';
		$stmt = $this->_db->prepare($sql);
		$stmt->bindParam(':article_id', $article_id);
		$stmt->execute();
		$article = $stmt->fetch(PDO::FETCH_ASSOC);
		if(empty($article)){
			throw new Exception('文章不存在！', ErrorCode::Article_NOT_FOUND);
		}
		return $article;
	}

	public function edit($article_id, $title, $content, $user_id){
		$article = $this->view($article_id);
		if($article['user_id'] !== $user_id){
			throw new Exception('无权编辑该文章！', ERRORCODE::PERMISSION_DENIED);
		}
		$title = empty($title) ?  $article['title'] : $title;
		$content = empty($content) ?  $article['content'] : $content;
		if($title === $article['title'] && $content === $article['content']){
			return $article;
		}
		$sql = 'update `article` set `title` = :title,`content` = :content where `article_id` = :article_id';
		$stmt = $this->_db->prepare($sql);
		$stmt->bindParam(':title', $title);
		$stmt->bindParam(':content', $content);
		$stmt->bindParam(':article_id', $article_id);
		if(!$stmt->execute()){
			throw new Exception('文章编辑失败！', ERRORCODE::EDIT_ARTICLE_FAIL);
		}
		return [
			'article_id' => $article_id,
			'title' => $title,
			'content' => $content,
			'create_time' => $article['create_time']
		];
	}

	public function delete($article_id, $user_id){
		$article = $this->view($article_id);
		if($article['user_id'] !== $user_id){
			throw new Exception('无权删除该文章！', ERRORCODE::PERMISSION_DENIED);
		}
		$sql = 'delete from `article` where `article_id` = :article_id and `user_id` = :user_id';
		$stmt = $this->_db->prepare($sql);
		$stmt->bindParam(':article_id', $article_id);
		$stmt->bindParam(':user_id', $user_id);
		if(!$stmt->execute()){
			throw new Exception('文章删除失败！', ERRORCODE::DELETE_ARTICLE_FAIL);
		}
		return true;
	}

	public function getList($user_id, $page = 1, $size = 10){
		if($size > 100){
			throw new Exception('分页大小最大为100！', ErrorCode::PAGESIZE_TOO_BIG);
		}
		$sql = 'select * from `article` where `user_id` = :user_id limit :limit, :offset';
		$limit = ($page - 1) * $size;
		$limit = $limit < 0 ? 0 : $limit;
		$stmt = $this->_db->prepare($sql);
		$stmt->bindParam(':user_id', $user_id);
		$stmt->bindParam(':limit', $limit);
		$stmt->bindParam(':offset', $size);
		$stmt->execute();
		$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $data;
	}
}