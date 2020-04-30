<?php

$ip_list_str = file_get_contents(__DIR__."/ip_list_tmp.txt");  
$ip_list = explode(PHP_EOL, $ip_list_str);  
var_dump($ip_list);

$time1=time();
$mh = curl_multi_init();  
  

foreach($ip_list as $ip){  
    $url = "http://www.geoplugin.net/json.gp?ip=".$ip;  
    $conn[$ip] = curl_init();  
    curl_setopt ( $conn[$ip] , CURLOPT_URL, $url);    
    curl_setopt ( $conn[$ip] , CURLOPT_HEADER , 0 ) ;  
    curl_setopt ( $conn[$ip], CURLOPT_CONNECTTIMEOUT,60);     
    curl_setopt ( $conn[$ip], CURLOPT_RETURNTRANSFER,true);   
    curl_multi_add_handle ($mh, $conn[$ip]);   
}  
  
do {    
	usleep(1000);
	// 运行当前cURL句柄的子连接 
    curl_multi_exec($mh, $active);     
} while ($active);  
  
foreach($ip_list as $ip){  
	// 如果设置了CURLOPT_RETURNTRANSFER则返回获取的输出的文本流
    $data = curl_multi_getcontent($conn[$ip]);  
    $country_info = json_decode($data, true);  
    echo($country_info['geoplugin_request'].': '.$country_info['geoplugin_countryName'].'<br/>');  
}  
  
foreach($ip_list as $ip){  
    curl_multi_remove_handle($mh,$conn[$ip]);     
    curl_close($conn[$ip]);   
}  
  
curl_multi_close($mh);  
var_dump(time() - $time1);

$time2=time();
foreach ($ip_list as $ip) {
	$url = "http://www.geoplugin.net/json.gp?ip=".$ip;
	$opt = [
		CURLOPT_URL => $url,
		CURLOPT_HEADER => false,
		CURLOPT_RETURNTRANSFER => true
	];
	$conn[$ip] = curl_init();  
    curl_setopt_array ( $conn[$ip], $opt);    
    $ouput = curl_exec($conn[$ip]);
    $ouput = json_decode($ouput, true);
    echo($ouput['geoplugin_request'].': '.$ouput['geoplugin_countryName'].'<br/>');
	curl_close($conn[$ip]);
}

var_dump(time() - $time2);