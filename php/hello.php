<?php

$http = new swoole_http_server('0.0.0.0', 80, SWOOLE_BASE);
$http->db->dbh = new PDO('mysql:host=mysql;dbname=mysql','admin','123456');

$http->on('request', function(swoole_http_request $req, swoole_http_response $res) use($http) {
    $id = 1;
    $stmt = $http->db->dbh->prepare('SELECT * FROM  `user` WHERE `id`=:id');
    $stmt ->bindValue(':id', 1);
    $user = $stmt->fetch();

    $res->end(var_export($user, true));
    unset($stmt);
});
$http->start();