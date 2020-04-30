-- ----------------------------
-- 日期：2017-07-23 20:15:24
-- 仅用于测试和学习,本程序不适合处理超大量数据
-- ----------------------------

-- ----------------------------
-- Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(30) DEFAULT NULL,
  `Author` varchar(20) DEFAULT NULL,
  `Content` longtext,
  `Time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `importexcell`
-- ----------------------------
DROP TABLE IF EXISTS `importexcell`;
CREATE TABLE `importexcell` (
  `shopid` int(11) NOT NULL,
  `shopname` varchar(255) NOT NULL,
  `shopimg` varchar(255) NOT NULL,
  `shopdetail` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `nickname` varchar(20) NOT NULL DEFAULT '',
  `time` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `persons`
-- ----------------------------
DROP TABLE IF EXISTS `persons`;
CREATE TABLE `persons` (
  `personID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(15) DEFAULT NULL,
  `LastName` varchar(15) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  PRIMARY KEY (`personID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `sex` varchar(6) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `regdate` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` varchar(20) DEFAULT NULL COMMENT '用户名',
  `password` varchar(20) DEFAULT NULL COMMENT '密码',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records for `comments`
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '忆秦娥·娄山关', '毛泽东', '西风烈，长空雁叫霜晨月。<br/>霜晨月，马蹄声碎，喇叭声咽。<br/>雄关漫道真如铁，而今迈步从头越。<br/>从头越，苍山如海，残阳如血。', '2017-03-29 23:33:13');
INSERT INTO `comments` VALUES ('2', '七律·人民解放军占领南京', '毛泽东', '钟山风雨起苍黄，百万雄师过大江。<br/>虎距龙盘今胜昔，天翻地覆慨而慷<br/>宜将剩勇追穷寇，不可沽名学霸王。<br/>天若有情天亦老，人间正道是沧桑。<br/><br/>注释：<br/>人 间  正   道    是  沧   桑', '2017-03-29 23:35:08');
INSERT INTO `comments` VALUES ('3', '牢骚太盛防肠断，风物长宜放眼量', '毛泽东', '牢骚太盛防肠断，风物长宜放眼量<br/><br/>牢骚太盛防肠断，风物长宜放眼量<br/><br/>牢骚太盛防肠断，风物长宜放眼量<br/><br/>注释：<br/>风&nbsp物&nbsp&nbsp长&nbsp&nbsp宜&nbsp&nbsp&nbsp放&nbsp&nbsp&nbsp&nbsp&nbsp眼&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp量', '2017-03-29 23:36:46');
INSERT INTO `comments` VALUES ('4', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:00:37');
INSERT INTO `comments` VALUES ('5', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:05:29');
INSERT INTO `comments` VALUES ('6', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:06:31');
INSERT INTO `comments` VALUES ('7', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:07:23');
INSERT INTO `comments` VALUES ('8', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:08:49');
INSERT INTO `comments` VALUES ('9', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:11:29');
INSERT INTO `comments` VALUES ('10', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:11:56');
INSERT INTO `comments` VALUES ('11', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:12:46');
INSERT INTO `comments` VALUES ('12', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:13:00');
INSERT INTO `comments` VALUES ('13', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:13:10');
INSERT INTO `comments` VALUES ('14', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:13:31');
INSERT INTO `comments` VALUES ('15', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:13:42');
INSERT INTO `comments` VALUES ('16', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:14:42');
INSERT INTO `comments` VALUES ('17', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:15:02');
INSERT INTO `comments` VALUES ('18', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:18:51');
INSERT INTO `comments` VALUES ('19', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:19:20');
INSERT INTO `comments` VALUES ('20', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:19:38');
INSERT INTO `comments` VALUES ('21', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:20:48');
INSERT INTO `comments` VALUES ('22', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:26:09');
INSERT INTO `comments` VALUES ('23', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:29:55');
INSERT INTO `comments` VALUES ('24', '如何按照输入格式原样输出', 'bl', '数据表创建data、datatime、time字段样式，怎么插入记录<br/>数据表创建data、datatime、time<br/>字段样式，怎么插入记录', '2017-03-30 00:35:30');
INSERT INTO `comments` VALUES ('39', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:44');
INSERT INTO `comments` VALUES ('40', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:47');
INSERT INTO `comments` VALUES ('41', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:51');
INSERT INTO `comments` VALUES ('42', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:52');
INSERT INTO `comments` VALUES ('43', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:53');
INSERT INTO `comments` VALUES ('44', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:54');
INSERT INTO `comments` VALUES ('45', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:55');
INSERT INTO `comments` VALUES ('46', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:56');
INSERT INTO `comments` VALUES ('47', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:56');
INSERT INTO `comments` VALUES ('48', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:57');
INSERT INTO `comments` VALUES ('49', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:58');
INSERT INTO `comments` VALUES ('50', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:16:59');
INSERT INTO `comments` VALUES ('51', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:00');
INSERT INTO `comments` VALUES ('52', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:00');
INSERT INTO `comments` VALUES ('53', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:01');
INSERT INTO `comments` VALUES ('54', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:02');
INSERT INTO `comments` VALUES ('55', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:02');
INSERT INTO `comments` VALUES ('56', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:03');
INSERT INTO `comments` VALUES ('57', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:03');
INSERT INTO `comments` VALUES ('58', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:04');
INSERT INTO `comments` VALUES ('59', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:04');
INSERT INTO `comments` VALUES ('60', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:05');
INSERT INTO `comments` VALUES ('61', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:06');
INSERT INTO `comments` VALUES ('62', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:06');
INSERT INTO `comments` VALUES ('63', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:07');
INSERT INTO `comments` VALUES ('64', '点击进入社区', '点击进入社区', '如对本文有疑问，请提交到交流社区，广大热心网友会为你解答！！&nbsp点击进入社区', '2017-03-30 16:17:15');
INSERT INTO `comments` VALUES ('65', 'ThinkPHP使用心得分享-分页类Page的用法', 'ThinkPHP使用心得分享-分页类Pa', 'ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法', '2017-03-30 16:21:06');
INSERT INTO `comments` VALUES ('66', 'ThinkPHP使用心得分享-分页类Page的用法', 'ThinkPHP使用心得分享-分页类Pa', 'ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法', '2017-03-30 16:21:09');
INSERT INTO `comments` VALUES ('67', 'ThinkPHP使用心得分享-分页类Page的用法', 'ThinkPHP使用心得分享-分页类Pa', 'ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法ThinkPHP使用心得分享-分页类Page的用法', '2017-03-30 16:21:16');
INSERT INTO `comments` VALUES ('68', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期如何实现给定日期的若干天以后的日期', '2017-03-30 16:29:06');
INSERT INTO `comments` VALUES ('69', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期如何实现给定日期的若干天以后的日期', '2017-03-30 16:29:10');
INSERT INTO `comments` VALUES ('70', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期如何实现给定日期的若干天以后的日期', '2017-03-30 16:30:30');
INSERT INTO `comments` VALUES ('71', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期如何实现给定日期的若干天以后的日期', '2017-03-30 16:30:36');
INSERT INTO `comments` VALUES ('72', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期如何实现给定日期的若干天以后的日期', '2017-03-30 16:30:39');
INSERT INTO `comments` VALUES ('73', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期如何实现给定日期的若干天以后的日期', '2017-03-30 16:30:42');
INSERT INTO `comments` VALUES ('74', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期如何实现给定日期的若干天以后的日期', '2017-03-30 16:30:45');
INSERT INTO `comments` VALUES ('75', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期如何实现给定日期的若干天以后的日期', '2017-03-30 16:30:47');
INSERT INTO `comments` VALUES ('76', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期', '如何实现给定日期的若干天以后的日期如何实现给定日期的若干天以后的日期', '2017-03-30 16:30:51');
INSERT INTO `comments` VALUES ('77', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:16');
INSERT INTO `comments` VALUES ('78', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:26');
INSERT INTO `comments` VALUES ('79', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:27');
INSERT INTO `comments` VALUES ('80', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:28');
INSERT INTO `comments` VALUES ('81', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:29');
INSERT INTO `comments` VALUES ('82', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:30');
INSERT INTO `comments` VALUES ('83', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:31');
INSERT INTO `comments` VALUES ('84', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:32');
INSERT INTO `comments` VALUES ('85', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:33');
INSERT INTO `comments` VALUES ('86', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:34');
INSERT INTO `comments` VALUES ('87', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:35');
INSERT INTO `comments` VALUES ('88', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:36');
INSERT INTO `comments` VALUES ('89', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:37');
INSERT INTO `comments` VALUES ('90', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:38');
INSERT INTO `comments` VALUES ('91', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:39');
INSERT INTO `comments` VALUES ('92', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:40');
INSERT INTO `comments` VALUES ('93', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:41');
INSERT INTO `comments` VALUES ('94', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:41');
INSERT INTO `comments` VALUES ('95', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:42');
INSERT INTO `comments` VALUES ('96', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:43');
INSERT INTO `comments` VALUES ('97', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:44');
INSERT INTO `comments` VALUES ('98', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:44');
INSERT INTO `comments` VALUES ('99', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:45');
INSERT INTO `comments` VALUES ('100', 'cakephp2.X多表联合查询join及使用分页查询的方法', 'cakephp2.X多表联合查询join', 'cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法cakephp2.X多表联合查询join及使用分页查询的方法', '2017-03-30 17:14:46');

-- ----------------------------
-- Records for `importexcell`
-- ----------------------------
INSERT INTO `importexcell` VALUES ('1', 'name1', 'img1', 'detail1');
INSERT INTO `importexcell` VALUES ('2', 'name2', 'img2', 'detail2');

-- ----------------------------
-- Records for `message`
-- ----------------------------
INSERT INTO `message` VALUES ('1', '我是360', '360', '1494079895');
INSERT INTO `message` VALUES ('2', '我是FF', 'FF', '1494079903');
INSERT INTO `message` VALUES ('3', '我是google', 'google', '1494079911');
INSERT INTO `message` VALUES ('4', '好热闹啊', 'google', '1494079921');
INSERT INTO `message` VALUES ('5', '你们好闲啊', 'FF', '1494079933');
INSERT INTO `message` VALUES ('6', '你还不是一样', '360', '1494079942');
INSERT INTO `message` VALUES ('7', '哈哈，太无聊了，我们', 'FF', '1494079959');
INSERT INTO `message` VALUES ('8', '~~~~(>_<)~~~~', '360', '1494080009');
INSERT INTO `message` VALUES ('9', '斗表情吗？', '360', '1494080050');
INSERT INTO `message` VALUES ('10', 'who 怕 who   O(∩_∩)O哈哈~', 'google', '1494080076');
INSERT INTO `message` VALUES ('11', '我也要玩，:-D', 'FF', '1494080094');
INSERT INTO `message` VALUES ('12', '好了，不玩了，真无聊', 'FF', '1494080143');
INSERT INTO `message` VALUES ('13', 'biu biu biu，走也', '360', '1494080199');

-- ----------------------------
-- Records for `persons`
-- ----------------------------
INSERT INTO `persons` VALUES ('1', '艺珍', '孙', '34');
INSERT INTO `persons` VALUES ('2', 'Angelina', 'Jolie', '41');
INSERT INTO `persons` VALUES ('3', 'Ruby', 'Lin', '40');
INSERT INTO `persons` VALUES ('4', 'Taylor', 'Swift', '26');
INSERT INTO `persons` VALUES ('5', '冰冰', '李', '43');
INSERT INTO `persons` VALUES ('6', '圆圆', '高', '37');
INSERT INTO `persons` VALUES ('7', 'Scarlett', 'Johansson', '32');
INSERT INTO `persons` VALUES ('8', '冰冰', '范', '35');

-- ----------------------------
-- Records for `user`
-- ----------------------------
INSERT INTO `user` VALUES ('1', '张三', '21232f297a57a5a743894a0e4a801fc3', '女', '22', '娄底', '465137869@qq.com', '2017.01.20');
INSERT INTO `user` VALUES ('2', '刘六', '21232f297a57a5a743894a0e4a801fc3', '女', '22', '娄底', '465137869', '2017.01.21');

-- ----------------------------
-- Records for `users`
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'wangwu', '123456', '22');
INSERT INTO `users` VALUES ('2', 'wangwu', '123456', '22');
INSERT INTO `users` VALUES ('3', 'wangwu', '123456', '22');
INSERT INTO `users` VALUES ('4', 'wangwu', '123456', '22');
INSERT INTO `users` VALUES ('5', 'wangwu', '123456', '22');
INSERT INTO `users` VALUES ('6', 'lisi', '123456', '22');
INSERT INTO `users` VALUES ('7', 'zhangsan', '123456', '31');
INSERT INTO `users` VALUES ('8', 'wangwu', '123456', '22');

