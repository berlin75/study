<!DOCTYPE html>
<html>
<head>
<title>include php</title>
<style>
#nav{ width:80%; margin:0 auto; }
#nav a{ text-decoration:none;font-size:2em; color:red;}
</style>
</head>
<body>
<div id="nav">
<?php include 'nav.php';?>
</div>
<h1>欢迎访问我的首页！</h1>
<p>这是一个段落。</p>
<p>这是另一个段落。</p>
<?php include 'footer.php';?>

</body>
</html>