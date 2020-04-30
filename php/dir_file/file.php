<?php
session_start();      //开始session
if(isset($_SESSION["file"])) {$_SESSION["file"]+=1;}
else{$_SESSION["file"]=1;}  //存储session
header('Cache-control: private, must-revalidate'); //支持页面回跳
?>
<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8" />
<title>PHP-File-<?php echo $_SESSION["file"] ?></title>
<style>
form,#funcTest,#show,#view{ width:45%; float:left; margin-right:25px; }
#title{ width:60%; }
#content{ width:60%; height:100px;}
#submit{ width:30%; text-align:center; display:block; margin:0 auto;}
#show,#view{ border:2px solid; }
#show li{ border-bottom:2px dashed #333; }
#show span{ color:#666; }
#funcTest{ border:1px solid red; }
</style>
</head>
<body>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
    <p><b>标题：</b><input type="text" name="title" id="title" /></p>
    <p><b>内容：</b><textarea name="content" id="content" ></textarea></p>
	<p><input type="hidden" name="originator" value="" /></p>
    <p><input type="submit" name="submit" id="submit" value="提交" /></p>
	<p><input type="submit" name="dele" id="dele" value="删除txt文件" /></p>
</form>

<ul id="show">
<?php
if(isset($_POST["submit"])){
	$title=$content="";   //缺省报错
	if($_SERVER["REQUEST_METHOD"] == "POST"){  //缺省报错
		$title=$_POST["title"];
		$title=trim($title);
		$title=stripslashes($title);
		$title=htmlspecialchars($title);
		$content=htmlspecialchars(stripslashes(trim($_POST["content"]))); //简写
		if($title!=""&&$content!=""){ //写入文档
			$txt="<li><p>".$title."<span>".date('Y.m.d-h:i:sa')."</span><button>删除</button></p><p>".$content."<p></li>";
			$filedemo=fopen("filedemo.txt","a+")or exit("Unable to open file!");
			fwrite($filedemo, $txt);
			fclose($filedemo);
		}
	}
}
if(file_exists("filedemo.txt")){  //删除文档
	if(isset($_POST["dele"])){
		unlink("filedemo.txt");
		exit();
	}
	$filedemo=fopen("filedemo.txt","r")or exit("Unable to open file!");  //读取文档
	echo fread($filedemo,filesize("filedemo.txt"));
	fclose($filedemo);		
}
?>
</ul>
<script>
	var oUl1=document.getElementById("show");   //删除单条记录,实则隐藏,刷新之后依旧
	var aLi1=oUl1.getElementsByTagName("li");
	var aBtn1=oUl1.getElementsByTagName("button");
	for(var i=0;i<aBtn1.length;i++){
		aBtn1[i].onclick=function(){
			this.parentNode.parentNode.style.display="none";
		}
	}
</script>

<div id="funcTest">
<?php
	if(file_exists("filedemo.txt")){
		clearstatcache();    //清除文件状态缓存
		echo "<p>用is_file判断filedemo.txt是否为正常文件： <mark>".is_file("filedemo.txt")."</mark></p>";
		echo "<p>用filesize判断文件大小： <mark>".filesize("filedemo.txt")."</mark></p>";
		echo "<p>用realpath()返回绝对路径： <mark>".realpath("filedemo.txt")."</mark></p>";		
		echo "<p>用dirname('path')返回路径中目录名称： <mark>".dirname("filedemo.txt")."</mark></p>";
		echo "<p>用basename('path','扩展名')返回路径中文件名称： <mark>".basename("filedemo.txt")."</mark></p>";
		echo "<p>用fileperms读取filedemo.txt文件的权限： <mark>".fileperms("filedemo.txt")."</mark></p>"; 
		echo "<p>用is_readable判断文件是否可读： <mark>".is_readable("filedemo.txt")."</mark></p>"; 
		echo "<p>用is_writable判断文件是否可写： <mark>".is_writable("filedemo.txt")."</mark></p>";
		echo "<p>用fileatime上次访问文件时间： <mark>".fileatime("filedemo.txt")."</mark></p>";
		echo "<p>用filectime上次改变文件时间： <mark>".filectime("filedemo.txt")."</mark></p>";
		echo "<p>用filemtime上次修改文件时间： <mark>".filemtime("filedemo.txt")."</mark></p>";
		echo "<p>用fileowner返回文件user ID： <mark>".fileowner("filedemo.txt")."</mark></p>";
		echo "<p>用filegroup返回文件组ID： <mark>".filegroup("filedemo.txt")."</mark></p>";
		echo "<p>用fileinode返回文件inode： <mark>".fileinode("filedemo.txt")."</mark></p>";
		//echo "<p>用chmod改变文件模式权限： <mark>".chmod("filedemo.txt",0600)."</mark></p>";
	}
?>
</div>

<ul id="view">

</ul>
<script>
	var oUl2=document.getElementById("view");
	var titl=document.getElementById("title");
	var conten=document.getElementById("content");
	var submi=document.getElementById("submit");
	submi.onclick=function(){
		var oLi2=document.createElement("li");
		//var oh=document.createElement("h2");
		var op=document.createElement("p");
		//oh.innerHTML=titl.value;
		op.innerHTML=conten.value;
		//oLi2.appendChild(oh);
		oLi2.appendChild(op);
		oUl2.appendChild(oLi2);		
	}
</script>
</body>
</html>








