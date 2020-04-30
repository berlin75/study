<?php
/*
 *爬虫程序 --原型
 *从给定的url获取html内容
*/

function _getUrlContent($url){
	$handle = fopen($url,'r');
	if($handle){
		$content = stream_get_contents($handle, 1024*1024);  //return string
		return $content;
	}
	return false;
}

//从html中筛选链接
function _filterUrl($wen_content){
	$reg_tag_a = '/<[a|A].*?href=[\'\"]{0,1}([^>\'\"\ ]*).*?>/';
	$result=preg_match_all($reg_tag_a, $wen_content, $match_result);
	if($result){
		return $match_result[1];
	}
}

//修正相对路径 //http://username:password@hostname/path?arg=value#anchor
function _reviseUrl($base_url,$url_list){
	$url_info = parse_url($base_url);
	$base_url = $url_info['scheme'].'://';
	if(isset($url_info['user'])&&isset($url_info['pass'])){
		$base_url .= $url_info['user'].':'.$url_info['pass'].'@';
	}
	$base_url .= $url_info['host'];
	if(isset($url_info['port'])){
		$base_url .= $url_info['port'];
	}
	$base_url .= $url_info['path'];

	if(is_array($url_list)){
		foreach ($url_list as $url_item) {
			if(preg_match('/^http/', $url_item)){
				$result[] = $url_item;
			}else{
				// $real_url = $base_url.'/'.$url_item;  //源代码
				//问题：$base_url以斜杠结尾，$url_list以斜杠开头
				$real_url = $base_url.'/'.$url_item;
				$real_url = str_replace('///','/',$real_url);
				$result[] = $real_url;
			}
		}
		return $result;
	}else{
		return;
	}
}

//爬虫
function crawler($url){
	$content = _getUrlContent($url);
	if($content){
		$url_list = _reviseUrl($url,_filterUrl($content));
		if($url_list){
			return $url_list;
		}else{
			return;
		}
	}else{
		return;
	}
}

//测试用主程序
function main($current_url,$savefile){
	$fp_puts = fopen($savefile, 'ab');
	$fp_gets = fopen($savefile, 'r');
	do{
		$result_url_arr = crawler($current_url);
		if($result_url_arr){
			foreach ($result_url_arr as $url) {
				fputs($fp_puts,$url.PHP_EOL);
			}
		}
	}while($current_url = fgets($fp_gets,1024));  //不断获得url
}

main('http://www.toutiao.com/','toutiao.txt');