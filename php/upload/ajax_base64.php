<?php
if($_SERVER["REQUEST_METHOD"] !== "POST") exit;
$upload = $_POST['upload'];
if(preg_match('/^data:image\/(\w+);base64,/', $upload, $matches)){
	$data = explode(',', $upload);
	$map = ['gif' => 'gif', 'png' => 'png', 'jpeg' => 'jpg', 'x-icon' => 'ico'];
	$photo = date('YmdHis') . rand(1000, 9999) . '.' . $map[$matches[1]];
	$fullpath = './upload/'.date('Ymd').'/';
	if(!is_dir($fullpath)) mkdir($fullpath, 0777, true);
	file_put_contents($fullpath.$photo, base64_decode($data[1]));
	echo json_encode(['code'=>200, 'message'=>'操作成功','data'=>$fullpath.$photo]);
}