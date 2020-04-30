<?php
$str='';  
$str.='<span style="color:rgb('.mt_rand(0,255).','.mt_rand(0,255).','.mt_rand(0,255).')">'.mt_rand(0,9).'</span>';
$str.='<span style="color:rgb('.mt_rand(0,255).','.mt_rand(0,255).','.mt_rand(0,255).')">'.mt_rand(0,9).'</span>';
$str.='<span style="color:rgb('.mt_rand(0,255).','.mt_rand(0,255).','.mt_rand(0,255).')">'.mt_rand(0,9).'</span>';
$str.='<span style="color:rgb('.mt_rand(0,255).','.mt_rand(0,255).','.mt_rand(0,255).')">'.mt_rand(0,9).'</span>';
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="shortcut icon" href=../../../favicon.ico />
<title>login</title>
<style>
	span{ font-size:25px;font-weight:bold;}
	input[name="username"]{ background:url(form.png) no-repeat; background-position:top left; background-size:18px 65px;}
	input[name="password"]{ background:url(form.png) no-repeat; background-position:0 -46px; background-size:18px 65px;}
</style>
</head>

<body>
<p><a href="reg.html">注册</a></p>
<fieldset>
<legend>用户登录</legend>
<form action="login.php" method="post" name="loginform" autocomplete="on">
  <p>
    <label for="username">用户名：</label>
    <input type="text" name="username" value=""  required title="用户名为6-12个字符" maxlength="12" autofocus>
    <font color="red"></font>
  </p>
  <p>
    <label for="password" >密&nbsp;&nbsp;码：</label>
    <input type="password" name="password" value="" required title="密码为6-12个字符" maxlength="12">
    <font color="red"></font>
  </p>
  <p>
	 <label for="yanzhengma" >验证码：</label>
	 <input type="text"  name="yanzhengma" id="yanzhengma" required title="请输入验证码" maxlength="4"><?php echo $str; ?>
	 <div id="hidden" style="display:none;"><?php echo $str; ?></div>
	 <font color="red" id="font_yanzhengma"></font>
  </p>
  <p>
	 <input type="checkbox" name="longtime" value="7">一周内自动登录
  </p>
     <input type="submit" name="submit" id="submit" value="登录">
</form>
</fieldset>

<script>
//js验证验证码
var yanzhengma=document.getElementById("yanzhengma");
var hidden=document.getElementById("hidden");
var font_yanzhengma=document.getElementById("font_yanzhengma");
yanzhengma.onblur=function(){
	if(yanzhengma.value!=hidden.innerText){
		font_yanzhengma.innerHTML="验证码有误，请重试！";
		alert(hidden.innerText);
	}else{
		font_yanzhengma.innerHTML="验证码通过！";
	}
};

</script>
</body>
</html>
