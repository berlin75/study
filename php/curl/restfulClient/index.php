<?php
/*
tp5/api模块restfull测试
*/

require_once './Api.php';
 
$param = [
  'title' => '房价又涨了',
  'content' => '据新华社消息：上海均价环比上涨5%'
];

$base_url = 'http://localhost/tp5/';

$api_url = $base_url.'news/4'; 
$rest = new restClient($api_url, $param, 'get');
$info = $rest->doRequest();
//$status = $rest->status;//获取curl中的状态信息
var_dump($info);
 
$api_url = $base_url.'news/4'; 
$rest = new restClient($api_url, $param, 'put');
$info = $rest->doRequest();
var_dump($info); 
 
$api_url = $base_url.'news/4'; 
$rest = new restClient($api_url, $param, 'delete');
$info = $rest->doRequest();
var_dump($info); 

$api_url = $base_url.'news'; 
$rest = new restClient($api_url, $param, 'post');
$info = $rest->doRequest();
var_dump($info); 
