<?php 
if (isset($_GET["page"])&&!$_GET["page"]) {
    $_GET["page"]=1;
}; 
include("function.php");
?> 
<!DOCTYPE html>
<html> 
<head>
<meta charset=“utf-8" /> 
<title>超长文本的分页显示</title> 
</head> 
<style type="text/css">
 <!-- body { margin-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; } a:link { text-decoration: none; } a:visited { text-decoration: none; } a:hover { text-decoration: none; } a:active { text-decoration: none; } .STYLE3 {color: #333333; font-size: 13px; } --> 
</style> 
<body> 
<table width="876" height="638" border="0" align="center" cellpadding="0" cellspacing="0"> 
    <tr> 
        <td width="343" height="159">&nbsp;</td> 
        <td width="489">&nbsp;</td> 
        <td width="44">&nbsp;</td> 
    </tr> 
    <tr> 
        <td height="245">&nbsp;</td> 
        <td align="center" valign="top">
            <table width="480" border="0" cellspacing="0" cellpadding="0"> 
                <tr> 
                    <td height="22" colspan="2"> 
                        <span class="STYLE3"> 
                        <?php //读取超长文本中的数据，实现超长文本中数据的分页显示 
                        if(isset($_GET["page"])&&$_GET["page"]){ 
                            $counter=file_get_contents("fy.txt"); 
                            $length=strlen($counter); 
                            $page_count=ceil($length/950); 
                            $c=msubstr($counter,0,($_GET["page"]-1)*950); 
                            $c1=msubstr($counter,0,$_GET["page"]*950); 
                            echo substr($c1,strlen($c),strlen($c1)-strlen($c)); 
                        } 
                        ?> 
                        </span> 
                    </td> 
                </tr> 
                <tr> 
                    <td width="202" height="22">
                    <span class="STYLE3">页次：
                    <?php echo $_GET["page"];?> / <?php echo $page_count;?> 页 
                    </span>
                    </td> 
                    <td width="278"><span class="STYLE3">分页： 
                    <?php 
                        if($_GET["page"]!=1){ 
                            echo "<a href=index.php?page=1>首页</a>&nbsp;"; 
                            echo "<a href=index.php?page=".($_GET["page"]-1).">上一页</a>&nbsp;"; 
                        } 
                        if($_GET["page"]<$page_count){ 
                            echo "<a href=index.php?page=".($_GET["page"]+1).">下一页</a>&nbsp;"; 
                            echo "<a href=index.php?page=".$page_count.">尾页</a>"; 
                        } 
                    ?> 
                    </span>
                    </td> 
                </tr> 
             </table> 
         </td> 
         <td>&nbsp;</td> 
      </tr> 
      <tr> 
        <td height="234">&nbsp;</td> 
        <td>&nbsp;</td> 
        <td>&nbsp;</td> 
     </tr> 
</table> 
</body> 
</html>