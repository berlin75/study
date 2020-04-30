<?php
header("Content_type:text/html;charset=utf-8");
date_default_timezone_set('PRC');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {  //地址栏进入
    http_response_code(405);
    exit('Use POST method.');
}   

/*$str='<?php return '.var_export($GLOBALS,true).';?>';
file_put_contents('globals.php',$str);*/  

// 定义接口返回值
$totallnum = 0;
$successnum = 0;
$result = [];
$error = [];

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
	$error[] = '请选择要上传的文件!';
}else{
	$totallnum = count($_FILES['upload_file']["error"]);
	foreach($_FILES['upload_file']['name'] as $key=>$value){
		$originalname=$value;
		$errno = $_FILES['upload_file']["error"][$key];
		if($errno>0){
			$error[] = $originalname . '上传错误:' . $errarr[$errno] . '<br/>';
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
}

$data=array(
    "status" => "200",
    "totallnum" => $totallnum,
    "successnum" => count($result),
    "result" => $result,
    "error" => $error
);
echo json_encode($data);
