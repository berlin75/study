<?php

header("Content-type: text/xml");

if(!isset($_GET['PhoneNumbers'])){
    $_GET = array ( 'Version' => '2017-05-25', 'Action' => 'SendSms', 'Format' => 'XML', 'PhoneNumbers' => '0971732040', 'SignName' => '钿京科技', 'TemplateCode' => 'SMS_211494936', 'TemplateParam' => '{"code":"204503"}', 'Timestamp' => '2021-02-27T07:10:49Z', 'SignatureMethod' => 'HMAC-SHA1', 'SignatureVersion' => '1.0', 'SignatureNonce' => '244afe73-b492-4b9c-9f6d-1451e9522ca0', 'AccessKeyId' => 'LTAI4FkdxJBbKKgoNRFs1x5d', 'RegionId' => 'cn-hangzhou', 'Signature' => 'hvIb2DO2CRFa4AufGCoyDd/IrCs=', );
}

$PhoneNumbers = '84' . substr($_GET['PhoneNumbers'], 1);
$code = json_decode($_GET['TemplateParam'], true)['code'];
$secret = '49gkZWwOdysFKjEIFKJiXqplO088ar';
$_GET['AccessKeyId'] = 'LTAI4FkdxJBbKKgoNRFs1x5d';
$content = Sendsms::loginSMS($PhoneNumbers, $code, $_GET['TemplateCode'], $_GET['SignName'], $_GET['AccessKeyId'], $secret, $_GET['Format']);
echo $content;

class Sendsms
{
    public static $accessKeyId     = "********";
    public static $accessKeySecret = "*********************";
    public static $SignName        = "*****";
 
    // 发送短信
    public static function loginSMS($mobile, $code, $TemplateCode = 'SMS_62660080', $SignName = '', $accessKeyId = '', $accessKeySecret = '', $Format = 'json')
    {
        $params = array();
        $params["PhoneNumbers"]  = $mobile;
        $params["SignName"]      = $SignName ?: self::$SignName;  //签名
        $params["TemplateCode"]  = $TemplateCode;  //登陆注册模板
        $params['TemplateParam'] = ["code" => $code];  //设置模板参数, 假如模板中存在变量需要替换则为必填项
 
        if (!empty($params["TemplateParam"]) && is_array($params["TemplateParam"])) {
            $params["TemplateParam"] = json_encode($params["TemplateParam"], JSON_UNESCAPED_UNICODE);
        }
        $paramsArr = ["RegionId" => "cn-hangzhou", "Action" => "SendSms", "Version" => "2017-05-25",];
        $content   = self::request("dysmsapi.aliyuncs.com", array_merge($params, $paramsArr), false, $accessKeySecret, $accessKeyId, $Format);
        return $content;
    }
 
    public static function request($domain, $params, $security = false, $accessKeySecret = '', $accessKeyId = '', $Format = 'json')
    {
        $accessKeyId     = $accessKeyId ?: self::$accessKeyId;
        $accessKeySecret = $accessKeySecret ?: self::$accessKeySecret;
 
        $apiParams = array_merge(array(
            "SignatureMethod"  => "HMAC-SHA1",
            "SignatureNonce"   => uniqid(mt_rand(0, 0xffff), true),
            "SignatureVersion" => "1.0",
            "AccessKeyId"      => $accessKeyId,
            "Timestamp"        => gmdate("Y-m-d\TH:i:s\Z"),
            "Format"           => $Format,
        ), $params);
        ksort($apiParams);
 
        $sortedQueryStringTmp = "";
        foreach ($apiParams as $key => $value) {
            $sortedQueryStringTmp .= "&" . self::encode($key) . "=" . self::encode($value);
        }
 
        $stringToSign = "GET&%2F&" . self::encode(substr($sortedQueryStringTmp, 1));
 
        $sign = base64_encode(hash_hmac("sha1", $stringToSign, $accessKeySecret . "&", true));
 
        $signature = self::encode($sign);
 
        $url = ($security ? 'https' : 'http') . "://{$domain}/?Signature={$signature}{$sortedQueryStringTmp}";
 
        try {
            $content = self::fetchContent($url);
            if($Format == 'XML'){
                return $content;
            }
            return json_decode($content, true);
        } catch (\Exception $e) {
            return false;
        }
    }
 
    private static function encode($str)
    {
        $res = urlencode($str);
        $res = preg_replace("/\+/", "%20", $res);
        $res = preg_replace("/\*/", "%2A", $res);
        $res = preg_replace("/%7E/", "~", $res);
        return $res;
    }
 
    private static function fetchContent($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "x-sdk-client" => "php/2.0.0",
        ));
 
        if (substr($url, 0, 5) == 'https') {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        }
 
        $rtn = curl_exec($ch);
 
        if ($rtn === false) {
            trigger_error("[CURL_" . curl_errno($ch) . "]: " . curl_error($ch), E_USER_ERROR);
        }
        curl_close($ch);
 
        return $rtn;
    }
 
    private static function random($length = 6, $numeric = 0)
    {
        PHP_VERSION < '4.2.0' && mt_srand((double) microtime() * 1000000);
        if ($numeric) {
            $hash = sprintf('%0' . $length . 'd', mt_rand(0, pow(10, $length) - 1));
        } else {
            $hash  = '';
            $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789abcdefghjkmnpqrstuvwxyz';
            $max   = strlen($chars) - 1;
            for ($i = 0; $i < $length; $i++) {
                $hash .= $chars[mt_rand(0, $max)];
            }
        }
        return $hash;
    }
 
}
