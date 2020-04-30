<?php

$curlobj = curl_init();
curl_setopt($curlobj, CURLOPT_URL, 'ftp://bxu2359690171.my3w.com/README.md');
curl_setopt($curlobj, CURLOPT_HEADER, 0);                       // 不显示header
curl_setopt($curlobj, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curlobj, CURLOPT_TIMEOUT, 300);                    // 超时300秒
curl_setopt($curlobj, CURLOPT_USERPWD, "bxu2359690171:aliyun6958");    // 登录，用户名：密码
$outfile = fopen('README.md', 'wb');                             // 保存到本地的文件名
curl_setopt($curlobj, CURLOPT_FILE, $outfile);     
$res = curl_exec($curlobj);
fclose($outfile);
if(!curl_errno($curlobj)){                                      // 错误处理
	echo $res;
}else{
	echo 'curl error: '.curl_error($curlobj);
}
curl_close($curlobj);

// E:\wamp64\www\study\d\php\curl>php curl_ftp_file.php