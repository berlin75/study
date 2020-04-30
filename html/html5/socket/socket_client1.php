<?php
header("Content_type:text/html;charset=utf-8");
date_default_timezone_set("PRC");
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>socket client demo</title>
<style>
pre{border-bottom: 1px dotted;padding-bottom: 1rem;}
#wrap{width: 70%;min-height: 20rem;overflow-y: scroll;margin: 1rem 0;padding: 1rem;border: 1px solid #ccc;}
.msg{margin-bottom: 1rem;}
.time{text-align: center;font-size: .8rem;}
.server{text-align:right}
.cpic,.spic{
	width: 50px;height: 50px;
	background: no-repeat;
	background-position: center center;
	background-size: 100% 100%;
	display: inline-block;border-radius: 50%;
}
.cpic{background-image: url(../../../image/l1.jpg);}
.spic{background-image: url(../../../image/user.png);}
</style>
</head>
<body>
<div id="wrap">

<?php
$address = '127.0.0.1';
$service_port = 10006;

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP) or die("socket failed:".socket_strerror(socket_last_error()));
echo "Attempting to connect to '$address' on port '$service_port'...<br/>";
socket_connect($socket, $address, $service_port) or die("socket failed:".socket_strerror(socket_last_error($socket)));
echo "Connect success. <br/><br/>";

$input = $_SERVER['REQUEST_METHOD'] === 'POST' ? trim($_POST['chat']) : "This is a message from client \n";

socket_write($socket, $input, strlen($input));
echo '<div class="msg"><div class="time">'.date('Y-m-d H:i:s')."</div><div><div class='spic'></div>" . $input . "</div></div>";

echo '<div class="msg"><div class="time">'.date('Y-m-d H:i:s')."</div><div class='server'>";
// 读取socket服务器发送的消息
echo(socket_read($socket, 8192));
echo '<div class="cpic"></div></div></div>';

socket_close($socket); // 关闭socket连接

?>

</div>
<form action="" method="post">
	<input type="text" name="chat" id="chat" style="width: 70%;">
	<input type="button" id="sendbtn" value="发送">
</form>

<script src="../../../vendors/jquery-3.1.1.js"></script>
<script>
	$("#sendbtn").click(function(){
		$.post(location.href, $("#chat").val(), function(data){
			console.log(data);
		});
	});
</script>
</body>
</html>