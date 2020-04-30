<?php
/*
资源控制器
curl http://localhost/resource.php -d 'access_token=YOUR_TOKEN'
*/
// include our OAuth2 Server object
require_once __DIR__.'/server.php';
 
// Handle a request for an OAuth2.0 Access Token and send the response to the client
if(!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
    $server->getResponse()->send();
    die;
}

echo json_encode(['success'=> true, 'message'=> 'You accessed my APIs!']);

$token = $server->getAccessTokenData(OAuth2\Request::createFromGlobals());
echo "User ID associated with this token is {$token['user_id']}";