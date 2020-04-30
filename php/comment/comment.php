<!doctype html>
<head>
<meta charset="utf-8" />
<title>comment</title>
<style>
	*{ margin:0; padding:0; }
	li{ border-bottom:1px dashed #000; width:80%; margin-left:50px;  padding:10px;}
	li p{ padding:10px; }
	#page-infor{ width:80%; margin-left:50px;  padding:10px;}
	main h2{ border-bottom:5px solid blue;}
	small{ color:#666; }
</style>
</head>
<body>
<?php
$con=mysqli_connect("localhost","root",""); 
if(!$con){die('can not connect:'.mysqli_error($con));}
mysqli_query($con,'SET NAMES utf8');
mysqli_select_db($con,'my_db01');
$sql="CREATE TABLE IF NOT EXISTS comments(
    ID int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(ID),
	Title varchar(30),
	Author varchar(20),
	Content longtext,
	Time datetime NULL DEFAULT CURRENT_TIMESTAMP
)";  
if(mysqli_query($con,$sql)){ 
	echo"Table comments created! -> ";
  }else{
	die("Table comments not created,错误代码:".mysqli_errno($con).',错误信息：'.mysqli_error($con).'<br>');
  }
if(!empty($_POST['title'])&&!empty($_POST['author'])&&!empty($_POST['txt'])){
	$sql="INSERT INTO comments(Title,Author,Content) VALUE('$_POST[title]','$_POST[author]','$_POST[txt]')";
	if(!mysqli_query($con,$sql)){
		die("Not insert,错误代码:".mysqli_errno($con).'错误信息：'.mysqli_error($con).'<br>');
	  }
	echo"Comment sucessed!<hr><br>";
}echo "Comment empty!<hr><br>";

echo "<main><h2>文章列表:</h2><ul>";
$sql="SELECT * FROM comments";
$result=mysqli_query($con,$sql);
$count=mysqli_num_rows($result);
$page_size=10;                       //每页数据10条
$page_count=ceil($count/$page_size); //总计多少页
$init=1;
$page_len=7;        //页码个数
$max_p=$page_count;
$pages=$page_count;
//判断当前页码,url
if(empty($_GET["page"])||$_GET["page"]<0){
	$page=1;
}else{
	$page=$_GET["page"];
}
$offset=($page-1)*$page_size;
$sql="select * from comments limit $offset,$page_size";
$result=mysqli_query($con,$sql);
while($row=mysqli_fetch_assoc($result)){
	echo "<li><h3>".$row['ID'].".".$row['Title']."</h3><p><small>".$row['Author']." ".$row['Time']."</small></p>".$row['Content']."</li>";
}
echo "</ul>";

/*******************************分页信息*************************************************************/
$page_infor="<div id='page-infor'><a href='comment.php?page=1'>首页</a> ";
if($page>1){ //第一页不显示
	$page_infor.="<a href='comment.php?page=".($page-1)."'><上一页</a> <span>";
}
//数字页码开始
if($page_count<=7 ){ //小于等于7个页码时全部显示
	for($page=1;$page<=$page_count;$page++){
		$page_infor.="<a href='comment.php?page=".$page."'>[".$page."]</a> ";
	}
}else{              //大于7个页码时只部分显示，其余省略号表示
	if(isset($_GET["page"])&&$_GET["page"]+3<=$page_count){
		$max_page=$_GET["page"]+3;
	}else{
		$max_page=$page_count;
	}
	if(isset($_GET["page"])&&$_GET["page"]>3&&$_GET["page"]<=$page_count-3){  //7个页码，中间为当前页，确保左三右三
		for($page=$_GET["page"]-3;$page<=$max_page;$page++){
			$page_infor.="<a href='comment.php?page=".$page."'>[".$page."]</a> ";
		}	
	}else if(isset($_GET["page"])&&$_GET["page"]>$page_count-3){
		for($page=$page_count-6;$page<=$page_count;$page++){
			$page_infor.="<a href='comment.php?page=".$page."'>[".$page."]</a> ";
		}
	}else{
		for($page=1;$page<=7;$page++){
			$page_infor.="<a href='comment.php?page=".$page."'>[".$page."]</a> ";
		}
	}
}
echo "</span>";
//数字页码结束
if((isset($_GET["page"])?$_GET["page"]:1)<$page_count){ //最后一页不显示
	$page_infor.="<a href='comment.php?page=".($page+1)."'>下一页></a> ";
}
$page_infor.="<a href='comment.php?page=".$page_count."'>末页</a> 跳到第<select onchange='javascript:location=this.value'>";

for($selec=1;$selec<=$page_count;$selec++){    //跳转选项select
	$page_infor.="<option value='/study/d/comment/comment.php?page=".$selec."'>".$selec."</a></option>";
}
$page_infor.="</select>页 当前为第".(isset($_GET["page"])?$_GET["page"]:1)."页,共 ".$page_count."页,".$count."条数据</div>";
echo $page_infor;
echo "</main>";
mysqli_close($con);
?>
<p><a href="comment.html">继续添加记录</a></p>
<p><a href="drop.php">删除数据库comments</a></p>
<script>

</script>
</body>
</html>