<?php
header("Content_type:text/html;charset=utf-8");

// 递归原理
function test($n=1){
	if($n==1){ 
		return 1;
	}else{ 
		return $n*test($n-1);
	}
}
echo '1*2*3*4*5='.test(5);

// 递归遍历目录
echo getcwd().'目录内容如下：';
fileSys();

function fileSys($dir='./'){
	if(is_dir($dir)){
		$mydir=opendir($dir);
		echo '<ul>';
		while($filename=readdir($mydir)){
			if($filename!='.'&&$filename!='..'){
				//echo $filename.' # '.is_dir($dir.'/'.$filename).' # '.is_file($dir.'/'.$filename).' @ '.realpath($filename).'<br>';
			    if(is_dir($dir.'/'.$filename)){ 
					echo '<li><font color="red">'.$filename.'</font></li>';
					fileSys($dir.'/'.$filename);
				}else{
					echo '<li>'.$filename.'</li>';
				}
			}
		}
		echo '</ul>';
		closedir($mydir);
	}else{
	    echo $dir.'不是一个目录';	
	}
}
