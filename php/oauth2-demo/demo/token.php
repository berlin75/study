<?php
/*
token控制器
E:\wnmp\nginx>curl -u testclient:testpass http://localhost:8880/token.php -d grant_type=client_credentials #不用引号
{"access_token":"31e5e68481d99ba7ca87b53dd9443cea495b6eb0","expires_in":3600,"token_type":"Bearer","scope":null}
*/

// include our OAuth2 Server object
require_once __DIR__.'/server.php';

// Handle a request for an OAuth2.0 Access Token and send the response to the client
$server->handleTokenRequest(OAuth2\Request::createFromGlobals())->send();
