<?php

// 迅雷thunder://地址与普通url地址转换
// 其实迅雷的thunder://地址就是将普通url地址加前缀‘AA’、后缀‘ZZ’，再base64编码后得到的字符串

function Thunder($url) {
	// if($type =='en'){
	// 	//普通网址转迅雷网址
	// 	return "thunder://".base64_encode("AA".$url."ZZ");
	// }else if($type =='de'){
		//迅雷网址转普通网址
		$result = substr(base64_decode(substr(trim($url),10)),2,-2);
		echo $result.'\n';
		return $result;
	// }
}

$url = 'thunder://QUFmdHA6Ly9keTpkeUB4bGouMnR1LmNjOjQxMDk4L7Syyc+52M+1Mi5IRDEyODCzrMflufrT79bQ19Zb0bjA18/C1Nh3d3cuMnR1LmNjXS5ta3ZaWg==
';

// ftp://dy:dy@xlj.2tu.cc:41098/床上关系2.HD1280超清国语中字[迅雷下载www.2tu.cc].mkv

$curlobj = curl_init();
curl_setopt($curlobj, CURLOPT_URL, Thunder($url));
curl_setopt($curlobj, CURLOPT_HEADER, 0);                       // 不显示header
curl_setopt($curlobj, CURLOPT_RETURNTRANSFER, 1);
// curl_setopt($curlobj, CURLOPT_TIMEOUT, 300);                    // 超时300秒
curl_setopt($curlobj, CURLOPT_USERPWD, "dy:dy");    // 登录，用户名：密码
$outfile = fopen('new.mkv', 'wb');                             // 保存到本地的文件名
curl_setopt($curlobj, CURLOPT_FILE, $outfile);    
$res = curl_exec($curlobj);
fclose($outfile);
if(!curl_errno($curlobj)){                                      // 错误处理
    echo $res;
}else{
    echo 'curl error: '.curl_error($curlobj);
}
curl_close($curlobj);
?>

