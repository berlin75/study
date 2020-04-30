<?php
//设置页面内容是html编码格式是utf-8，告诉客户端服务器响应过来的内容格式是什么
//header("Content-Type:text/plain;charset=utf-8");  //格式是纯文本
header("Content-Type:application/json;charset=utf-8");  //格式是json字符串
header('Access-Control-Allow-Origin:*'); 
header("Access_Control-Allow-Methods:POST,GET");
header('Access-Control-Allow-Credentials:true'); 
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//header("Content-Type:text/xml;charset=utf-8");
//header("Content-Type:text/html;charset=utf-8");
//header("Content-Type:application/javascript;charset=utf-8");

$staff = [
		["name"=>"洪七","number"=>"101","sex"=>"男","job"=>"总经理"],
		["name"=>"郭靖","number"=>"102","sex"=>"男","job"=>"开发工程师"],
		["name"=>"黄蓉","number"=>"103","sex"=>"女","job"=>"产品经理"]
	];

if($_SERVER['REQUEST_METHOD']=="GET"){    
	search();
}elseif($_SERVER['REQUEST_METHOD']=="POST"){
	create();
}

function search(){
	if(!isset($_GET["number"])||empty($_GET["number"])){
		echo '{"success":false,"msg":"参数错误"}'; 
		return;
	}
	global $staff;
	$number=$_GET["number"];
	$result='{"success":false,"msg":"没有找到相关信息"}'; 
	foreach($staff as $value){
		if($value["number"]==$number){      
			$result='{"success":true,"msg":  
			         "编号：'.$value["number"].
			         ',姓名：'.$value["name"].
					 ',性别：'.$value["sex"].
					 ',职位：'.$value["job"].'"}';
			break;
		}
	}
	echo $result;
}

function create(){
	if(!isset($_POST["name"])||empty($_POST["name"])||
		!isset($_POST["number"])||empty($_POST["number"])||
		!isset($_POST["sex"])||empty($_POST["sex"])||
		!isset($_POST["job"])||empty($_POST["job"])
	  ){
		echo '{"success":false,"msg":"<b>您提供的信息不完整</b>"}';;
		return;
	}
	echo '{"success":true,"msg":"目标：'.$_POST["name"].'信息已保存成功！"}';
}


?>