<?php 
/*
用户每次请求都要带上后端签发的token，后端获取请求中的token，PHP中使用$_SERVER['HTTP_X_TOKEN']就可以获取token值。这个X_TOKEN就是在我们前端的请求header头信息中。
然后PHP拿到这个token后，解密分析token值，返回给前端即可
以上就是整个JWT的实战应用，我们可以看到，在用户鉴权的过程中并没有使用Session或者Cookie，服务端无需存储用户会话信息。只用了一个Token串，建立前后端的验证的数据传递，实现了有效的登录鉴权过程
*/

date_default_timezone_set("PRC");   //系统使用北京时间

require 'vendor/autoload.php';

use \Firebase\JWT\JWT;

define('KEY', '1gHuiop975cdashyex9Ud23ldsvm2Xq');

// header('Access-Control-Allow-Origin:*');  
$res['result'] = 'failed';

$action = isset($_GET['action']) ? $_GET['action'] : '';

file_put_contents('log', '<?php return '.var_export($_SERVER, true).';?>');

if ($action == 'login') {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $username = htmlentities($_POST['user']);
        $password = htmlentities($_POST['pass']);

        if ($username == 'demo' && $password == 'demo') { //用户名和密码正确则签发tokon
            $nowtime = time();
            $token = [
                'iss' => 'http://www.xxx.com', //签发者
                'aud' => 'http://www.xxx.com', //jwt所面向的用户
                'iat' => $nowtime,             //签发时间
                'nbf' => $nowtime + 10,        //在什么时间之后该jwt才可用
                'exp' => $nowtime + 600,       //过期时间-10min
                'data' => [
                    'userid' => 1,
                    'username' => $username
                ]
            ];
            $jwt = JWT::encode($token, KEY);
            $res['result'] = 'success';
            $res['jwt'] = $jwt;
        } else {
            $res['msg'] = '用户名或密码错误!';
        }
    }
    echo json_encode($res);

} else {
    $jwt = isset($_SERVER['HTTP_X_TOKEN']) ? $_SERVER['HTTP_X_TOKEN'] : '';
    if (empty($jwt)) {
        $res['msg'] = 'You do not have permission to access.';
        echo json_encode($res);
        exit;
    }

    try {
        JWT::$leeway = 60;
        $decoded = JWT::decode($jwt, KEY, ['HS256']);
        $arr = (array)$decoded;
        if ($arr['exp'] < time()) {
            $res['msg'] = '请重新登录';
        } else {
            $res['result'] = 'success';
            $res['info'] = $arr;
        }
    } catch(Exception $e) {
        $res['msg'] = 'Token验证失败,请重新登录';
    }

    echo json_encode($res);
}
