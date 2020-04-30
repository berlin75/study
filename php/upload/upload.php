<?php
header("Content_type:text/html;charset=utf-8");

var_dump($_FILES);
echo '***************************************';
//sleep(10);   //休眠10s来查看临时文件，脚本结束之后临时文件立即自动删除
date_default_timezone_set('PRC');

if((($_FILES["file"]["type"]=="image/gif")
||($_FILES["file"]["type"]=="image/jpeg")
||($_FILES["file"]["type"]=="image/pjpeg"))
&&($_FILES["file"]["size"]<2000000)){
	if($_FILES["file"]["error"]>0||!is_uploaded_file($_FILES["file"]["tmp_name"])){
		echo $_FILES["file"]["error"];
	}else{
		echo "上传:".$_FILES["file"]["name"]."<br>";
		echo "类型:".$_FILES["file"]["type"]."<br>";
		echo "大小:".$_FILES["file"]["size"]."<br>";
		echo "临时文件:".$_FILES["file"]["tmp_name"]."<br>";
		echo "上传时间:".date('Y-m-d h:i:sa')."<br>";
		
		$newname=date('Ymd').mt_rand(1,1000);
		$ext=substr($_FILES['file']['name'],strrpos($_FILES['file']['name'],'.'));//截取文件名的后缀
		$newname.=$ext;
		echo '存储名：'.$newname.'<br>';
		if(file_exists("upload/".$newname)){ 
			echo $newname."已经存在";
		}else{
			move_uploaded_file($_FILES["file"]["tmp_name"],"upload/".$newname);
			echo "储存在："."upload/".$newname;
		}
	}
}else{
    echo "<br>Invalid file，err:".$_FILES["file"]["error"];	
}