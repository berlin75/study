<?php

$pdo = new PDO('mysql:host=localhost;dbname=restful', 'root', '');
$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
return $pdo;

/*
create database restful default character set utf8 collate utf8_general_ci

drop table if exists `user`;
create table if not exists `restful`.`user`(
	user_id int(10) unsigned not null auto_increment,
	username varchar(20) not null default '',
	password varchar(32) not null default '',
	create_time datetime not null default current_timestamp,
	primary key(`user_id`),
	unique key `uniq_username`(`username`),
	key `idx_create_time`(`create_time`)
)engine = innodb default charset = utf8mb4;

drop table if exists `article`;
create table if not exists `restful`.`article`(
	article_id int(10) unsigned not null auto_increment,
	title varchar(40) not null default '',
	content text,
	create_time datetime not null default current_timestamp,
	user_id int(10) unsigned not null,
	primary key(`article_id`),
	UNIQUE (`title`),
	INDEX (`create_time`), 
	foreign key (`user_id`) references `user` (`user_id`) on delete cascade on update cascade
)engine = innodb default charset = utf8mb4;

*/
