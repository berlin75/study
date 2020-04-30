<?php
$data = 'theCityCode=娄底&theUserID=';
$url = 'http://www.webxml.com.cn/WebServices/WeatherWS.asmx/getWeather';
$useragent = "user-agent:Mozilla/5.0 (Windows NT 5.1; rv:24.0) Gecko/20100101 Firefox/24.0";
$curlobj = curl_init();
$opt = [
	CURLOPT_URL => $url,
	CURLOPT_HEADER => false,             // 不显示header
	CURLOPT_RETURNTRANSFER => true,      // 执行之后不直接显示打印出来
	CURLOPT_POST => true,                // 采用POST方法
	CURLOPT_POSTFIELDS => $data,         // 传递post参数
	CURLOPT_USERAGENT => $useragent,     // 浏览器头信息 
	CURLOPT_HTTPHEADER => array(         // 设置http头
		"application/x-www-form-urlencoded; charset=utf-8",
		"Content-Length: ".strlen($data)
	)
];
curl_setopt_array($curlobj, $opt);
$res = curl_exec($curlobj);
echo !curl_errno($curlobj) ? $res : 'curl error: '.curl_error($curlobj); // 错误处理
curl_close($curlobj);

// E:\wamp64\www\study\d\php\curl>php curl_webserver_weather.php > weather.html