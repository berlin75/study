<?php
header("Content_type:text/html;charset=utf-8");
date_default_timezone_set('PRC');
if(!$_FILES) exit('页面错误!');   //地址栏进入
var_dump($_FILES); echo '<hr>';
/*$str='<?php return '.var_export($GLOBALS,true).';?>';
file_put_contents('globals.php',$str);*/
$errarr=[
	'0' => 'UPLOAD_ERR_OK',
	'1' => 'UPLOAD_ERR_INI_SIZE',
	'2' => 'UPLOAD_ERR_FORM_SIZE',
	'3' => 'UPLOAD_ERR_PARTIAL',
	'4' => 'UPLOAD_ERR_NO_FILE',
	'6' => 'UPLOAD_ERR_NO_TMP_DIR',
	'7' => 'UPLOAD_ERR_CANT_WRITE',
];

if($_FILES['upload_file']["name"][0] == ''){
	echo '请选择要上传的文件!';
}else{
	foreach($_FILES['upload_file']['name'] as $key=>$value){
		$originalname=$value;
		$errno = $_FILES['upload_file']["error"][$key];
		if($errno>0){
			echo $originalname . '上传错误:' . $errarr[$errno] . '<br/>';
			continue;
		}
	    $supportFile = ["image/png" , "image/gif" , "image/jpeg" ];
	    if(in_array($_FILES['upload_file']['type'][$key], $supportFile)){	    	
			$tmpFilePath = $_FILES['upload_file']['tmp_name'][$key];
			if(!is_uploaded_file($tmpFilePath)){
				continue;
			}
			if($tmpFilePath){
				$newFilePath = 'upload/' . $originalname;
				if(move_uploaded_file($tmpFilePath, $newFilePath)){
					$result[] = $newFilePath;
				}
			}
	    }
	}

	if(isset($result)){
		$successnum=count($result);
	}else{
		$successnum=0;
	}	
	echo '<br/>上传' . count($_FILES['upload_file']["name"]) . '个文件,其中';
	echo '成功' . $successnum . '个文件:<br/>';
	if(isset($result)){
		foreach ($result as $k => $v) {
			echo ($k+1) .'.' . $v . '<br/>';
		}
	}
}




