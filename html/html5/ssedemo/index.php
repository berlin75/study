<?php
class TalkController{
	private static $pdo=null;
	public function __construct(){
		if($_GET['a']!='login'&&!isset($_SESSION['nickname'])){ //排除登录操作
			header('Location:index.php?a=login');
		}
		if(is_null(self::$pdo)){
			try{
				$dsn='mysql:host=127.0.0.1;dbname=my_db01';
				$pdo=new PDO($dsn,'root','',array(PDO::ATTR_PERSISTENT=>true));
				$pdo->query('set names utf8');
				self::$pdo=$pdo;
			}catch(Exception $e){
				die('connet error');
			}
		}	
	}
	public function index(){
		include './show.html';
	}
	public function login(){
		if(!empty($_POST)){
			$_SESSION['nickname']=$_POST['nickname'];
			setcookie('nickname',$_POST['nickname']);
			header('Location:index.php');
		}
		include './login.html';
	}
	public function put(){
		$content=$_POST['content'];
		$time=time();
		$nickname=$_SESSION['nickname'];
		$sql="insert into message (content,nickname,time) values ('{$content}','{$nickname}',{$time})";
		self::$pdo->exec($sql);
	}
	public function get(){ 
		header('Content-Type:text/event-stream');
		header('Cache-Control:no-cache'); 
		//$sql='select * from message where id >(select max(id) from message)-15';
		$sql='select * from message order by time asc limit 15';
		$sql='select * from message';
		$result=self::$pdo->query($sql); 
		$rows=$result->fetchALL(PDO::FETCH_ASSOC); 
		foreach($rows as $v){
			$time=date('H:i:s',$v['time']);  //字符串连接
			echo "data:<tr><td style='font-size:0.8rem;color:#666;'>[".$time."]</td><td style='color:red;text-align:center;'>{$v['nickname']}</td><td>:</td><td>{$v['content']}</td></tr>\n";
		}
		echo "retry:1000\n";
		echo "\n\n";
		flush();
	}
}
session_start();
date_default_timezone_set("PRC");
$action=$_GET['a']=isset($_GET['a'])?$_GET['a']:'index';
$controller=new TalkController();
$controller->$action();












