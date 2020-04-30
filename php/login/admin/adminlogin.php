<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>adminlogin</title>
</head>

<body>
<form action="handle_login.php" method="post"/>
<p>用户名：
  <input type="text" name="username"/>
</p>
<p>
  密 码：<input type="password" name="password"/>
</p>
<p>
验证码：<input type="text" name="imgcode"><img src="code.php" width="200px" height="30px"></p>
<p>
  <input type="submit" name="button" value="登陆">
</p>
</form>
</body>
</html>