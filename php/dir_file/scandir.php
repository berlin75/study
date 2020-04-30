<?php

$dir='../../../image/';
$file=scandir($dir);
var_dump($file);

/*只能读取当前指定目录下的文件，对子目录中的文件则无法读取*/
if (is_dir($dir)) {
	if ($dh = opendir($dir)) {
		while (($file = readdir($dh)) !== false) {
			echo "filename: $file ; filetype: " . filetype($dir . $file) . "<br/>";
		} 
		closedir($dh);
	}
}


function searchDir($path,&$data){
	if(is_dir($path)){
		$dp=dir($path);
		while($file=$dp->read()){
			if($file!='.'&& $file!='..'){
				searchDir($path.'/'.$file,$data);
			}
		}
		$dp->close();
	}
	if(is_file($path)){
		$data[]=$path;
	}
}

function getDir($dir){
	$data=array();
	searchDir($dir,$data);
	return   $data;
}

var_dump(getDir('.'));