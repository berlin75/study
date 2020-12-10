<?php
header("Content-Type:application/json;charset=utf-8");

// 方法一：按照js转换
/*
get_bianma(substr($enc_str, $i, 1))
等同于js代码
enc_str.charCodeAt(i)
*/
function get_bianma($str){  //等同于js的charCodeAt()
    $result = array();  
    for($i = 0, $l = mb_strlen($str, 'utf-8');$i < $l;++$i){  
        $result[] = uniord(mb_substr($str, $i, 1, 'utf-8'));  
    }  
    return join(",", $result);
}  
function uniord($str, $from_encoding = false){  
    $from_encoding = $from_encoding ? $from_encoding : 'UTF-8';  
    if (strlen($str) == 1) return ord($str);  
    $str = mb_convert_encoding($str, 'UCS-4BE', $from_encoding);  
    $tmp = unpack('N', $str);  
    return $tmp[1];  
}  

function n($keyword){
  $e = [];
  $keyword = preg_split('/(?<!^)(?!$)/u', $keyword );
  for ($i=0; $i < count($keyword); $i++) { 
    $e[] = "00" . substr(base_convert(get_bianma($keyword[$i]),10,16), -4);
  }
  return "\\u" . implode("\\u" , $e);
}

function encodeUnicode($str){
  $s1 = n($str);
  $s3 = str_replace('\u00', "", $s1);
  $a1 = str_split($s3);
  $a2 = array_reverse($a1);
  return implode($a2);
}

// 方法二：利用json_encode中文字符转为unicode编码
function encodeUnicode1($keyword){
  $e = [];
  $keyword = preg_split('/(?<!^)(?!$)/u', $keyword );
  for ($i=0; $i < count($keyword); $i++) { 
    $e[] = strrev(str_replace("\\u", "", str_replace("\"", "", json_encode($keyword[$i]))));
  }
  $a = array_reverse($e);
  return implode($a);
}

function curlGet(string $url, int $timeout = 5, array $header = []): string {
  $ssl = substr($url, 0, 8) == "https://";
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
  if ($ssl) {
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 信任任何证书
      curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2); // 检查证书中是否设置域名
  }
  curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $header);//模拟的header头
  $result = curl_exec($ch);
  curl_close($ch);
  return $result;
}
$url = 'https://ci.5118.com/'. encodeUnicode1($_GET['keyword']) .'/';  // 天猫精灵 -> 5707ebc7b2379295

$header[] = "User-Agent:Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12";
$header[] = "Accept:text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
$header[] = "Accept-language: zh-cn,zh;q=0.5";
$header[] = "Accept-Charset: GB2312,utf-8;q=0.7,*;q=0.7";
$header[] = "Cookie: ASP.NET_SessionId=kfmziej01viawegutkbexq1w; Hm_lvt_f3b3086e3d9a7a0a65c711de523251a6=1592358482,1592359396; Sign=0a519c59-f871-4178-aea8-048882daa7ba; .AspNet.ApplicationCookie=Nrqj_3UkYeljT2pdb-gAM0OfXSjONjSV9_DAm3zb2cWo0cUx2n4fvFI9VcVNRb1gDGuEs39M2YppatUmBAowejdgGmvP_ZOqJ4BNy5gaN8PivqKwljCDDScui2taXc07v5mPrJ-eM2r__7zmgyDHhJ8-BYEjYzGpvGqAevyC0d5SReXZEaBdJ8KMbrgpVj5V3u47yrAPtkDrpsOj3Nmz3hLFyW8VofMZAiG0WMnfcpqsI-cpmwMGnR6zKbChFEadDCIYftAnBDwVB1foscHfiEJT-UZbfpIta5RG0E3aZBQMWKjMYevA_cRJKaf9nXvFZQlnbfvUDy8dmXdfC-wSkPCivXbFUl7jgrbWty1_kFQ98qIVD41pYU2BCgaeTSAdJSR7iAyrXYElZ9Epvjarex-YWuI5K5RZDuHSTzUH_XM; Hm_lpvt_f3b3086e3d9a7a0a65c711de523251a6=1592363661";

$outPageTxt = curlGet($url, 5, $header);
$dom = new DOMDocument();
@$dom->loadHTML($outPageTxt);
$dom->normalize();
$xpath = new DOMXPath($dom);
$data = $xpath->query('//*[@id="waci-wrap"]/div[4]/table/tbody/tr/td[1]/a');
$res = [];
for ($i = 0; $i < $data->length; $i++) {
    $items = $data->item($i);
    $text = $items->nodeValue;
    $res[] = $text;
}
echo json_encode($res);