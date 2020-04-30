<?php
/*
认证控制器
http://localhost:8880/authorize.php?response_type=code&client_id=testclient&state=xyz
SUCCESS! Authorization Code: 4e23e28c4f262a18b87be2c02be6a87186564859
E:\wnmp\nginx>curl -u testclient:testpass http://localhost:8880/token.php -d "grant_type=authorization_code&code=4e23e28c4f262a18b87be2c02be6a87186564859"  #双引号
{"access_token":"10ebe5cfa2c69ec914044f381fbab94ba7af7972","expires_in":3600,"token_type":"Bearer","scope":null,"refresh_token":"25948737c39e9a387b4cd0efebbcf87fbef15193"}
*/

// include our OAuth2 Server object
require_once __DIR__.'/server.php';

$request = OAuth2\Request::createFromGlobals();
$response = new OAuth2\Response();

// validate the authorize request
if(!$server->validateAuthorizeRequest($request, $response)) {
    $response->send();
    die;
}

// display an authorization form
if(empty($_POST)) {
  exit('
<form method="post">
  <label>Do You Authorize TestClient?</label><br />
  <input type="submit" name="authorized" value="yes">
  <input type="submit" name="authorized" value="no">
</form>');
}

// print the authorization code if the user has authorized your client
$is_authorized = ($_POST['authorized'] === 'yes');
$userid = 1234; // A value on your server that identifies the user
$server->handleAuthorizeRequest($request, $response, $is_authorized, $userid);
if($is_authorized) {
  // this is only here so that you get to see your code in the cURL request. Otherwise, we'd redirect back to the client
  $code = substr($response->getHttpHeader('Location'), strpos($response->getHttpHeader('Location'), 'code=')+5, 40);
  exit("SUCCESS! Authorization Code: $code");
}

$response->send();