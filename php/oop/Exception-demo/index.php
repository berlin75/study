<?php
session_start();   //开启session,保存错误
$validata_un=isset($_SESSION["validata_un"])?$_SESSION["validata_un"]:"";
$validata_pw=isset($_SESSION["validata_pw"])?$_SESSION["validata_pw"]:"";
$wun=isset($_SESSION["un"])?$_SESSION["un"]:"";
$wpw=isset($_SESSION["pw"])?$_SESSION["pw"]:"";
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Exception-demo用户登录</title>
</head>
<body>
<h1>uncompleted</h1>
<fieldset>
<legend>用户登录</legend>
<form action="login.php" method="post">
	  <p>
      <label for="username">用户名：</label>
      <input type="text" name="username" value="<?php echo $wun;  ?>" >
      <font color="red">*
        <?php echo $validata_un;  ?> 
      </font>
    </p>
    <p> 
      <label for="password">密 码：</label>
      <input type="password" name="password"  value="<?php echo $wpw;  ?>">
      <font color="red">*
        <?php echo $validata_pw;  ?>
      </font>
     </p>
     <p><input type="checkbox" name="choose" value="choose">一周免登录</p>
     <p><input type="submit"  name="submit" value="登录"></p>
</form>
</fieldset>
</body>
</html>