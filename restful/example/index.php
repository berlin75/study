<?php
require __DIR__.'/lib/User.php';
require __DIR__.'/lib/Article.php';
$pdo = require __DIR__.'/lib/db.php';
$user = new User($pdo);
$article = new Article($pdo);
var_dump($user->login('admin','admin'));
// print_r($article->create('title2','content2', 2));
// print_r($article->view(5));
// print_r($article->edit(5, 'title2', '', 2));
// var_dump($article->delete(5, 2));
var_dump($article->getList(2));

