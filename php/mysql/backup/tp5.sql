-- ----------------------------
-- 日期：2017-07-27 18:21:51
-- 仅用于测试和学习,本程序不适合处理超大量数据
-- ----------------------------

-- ----------------------------
-- Table structure for `blog`
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `bid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL DEFAULT '',
  `stitle` char(30) NOT NULL DEFAULT '',
  `cateid` int(11) NOT NULL,
  `blogkeywords` varchar(150) NOT NULL DEFAULT '',
  `blogdesc` varchar(255) NOT NULL DEFAULT '',
  `pic` varchar(150) NOT NULL DEFAULT '',
  `picdesc` char(30) NOT NULL DEFAULT '',
  `content` text,
  `click` int(10) unsigned DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`bid`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `cate`
-- ----------------------------
DROP TABLE IF EXISTS `cate`;
CREATE TABLE `cate` (
  `cid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catename` varchar(30) NOT NULL DEFAULT '',
  `catekeywords` varchar(150) NOT NULL DEFAULT '',
  `catedesc` text NOT NULL,
  `sort` smallint(6) NOT NULL DEFAULT '1',
  `catetype` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flink`
-- ----------------------------
DROP TABLE IF EXISTS `flink`;
CREATE TABLE `flink` (
  `fid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL DEFAULT '',
  `urldesc` varchar(255) NOT NULL DEFAULT '',
  `urlpath` varchar(60) NOT NULL DEFAULT '',
  PRIMARY KEY (`fid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `implode`
-- ----------------------------
DROP TABLE IF EXISTS `implode`;
CREATE TABLE `implode` (
  `cid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catename` varchar(30) NOT NULL DEFAULT '',
  `catekeywords` varchar(150) NOT NULL DEFAULT '',
  `catedesc` text NOT NULL,
  `sort` smallint(6) NOT NULL DEFAULT '1',
  `catetype` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `members_blog`
-- ----------------------------
DROP TABLE IF EXISTS `members_blog`;
CREATE TABLE `members_blog` (
  `uid` int(10) unsigned NOT NULL,
  `bid` int(10) unsigned NOT NULL,
  `updown` tinyint(1) DEFAULT '-1',
  `star` tinyint(1) DEFAULT '0',
  `comment` text,
  KEY `uid` (`uid`),
  KEY `bid` (`bid`),
  KEY `uid_2` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `testbackup`
-- ----------------------------
DROP TABLE IF EXISTS `testbackup`;
CREATE TABLE `testbackup` (
  `bid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL DEFAULT '',
  `stitle` char(30) NOT NULL DEFAULT '',
  `cateid` int(11) NOT NULL,
  `blogkeywords` varchar(150) NOT NULL DEFAULT '',
  `blogdesc` varchar(255) NOT NULL DEFAULT '',
  `pic` varchar(150) NOT NULL DEFAULT '',
  `picdesc` char(30) NOT NULL DEFAULT '',
  `content` text,
  `click` int(10) unsigned DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`bid`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `think_auth_group`
-- ----------------------------
DROP TABLE IF EXISTS `think_auth_group`;
CREATE TABLE `think_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` char(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `think_auth_group_access`
-- ----------------------------
DROP TABLE IF EXISTS `think_auth_group_access`;
CREATE TABLE `think_auth_group_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `think_auth_rule`
-- ----------------------------
DROP TABLE IF EXISTS `think_auth_rule`;
CREATE TABLE `think_auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(80) NOT NULL DEFAULT '',
  `title` char(20) NOT NULL DEFAULT '',
  `pid` smallint(6) NOT NULL DEFAULT '0',
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `sort` smallint(6) NOT NULL DEFAULT '0',
  `condition` char(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `think_members`
-- ----------------------------
DROP TABLE IF EXISTS `think_members`;
CREATE TABLE `think_members` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '',
  `password` char(32) NOT NULL DEFAULT '',
  `tel` varchar(11) NOT NULL DEFAULT '',
  `gender` char(10) NOT NULL DEFAULT '',
  `birthday` char(15) NOT NULL DEFAULT '',
  `email` char(20) NOT NULL DEFAULT '',
  `logintime` int(10) unsigned DEFAULT NULL,
  `loginip` varchar(30) DEFAULT '',
  `score` int(10) unsigned NOT NULL DEFAULT '10',
  `regtime` int(10) NOT NULL,
  `typeof` tinyint(1) NOT NULL DEFAULT '0',
  `locked` tinyint(1) NOT NULL DEFAULT '0',
  `storeart` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `webuploader`
-- ----------------------------
DROP TABLE IF EXISTS `webuploader`;
CREATE TABLE `webuploader` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `img` char(60) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records for `blog`
-- ----------------------------
INSERT INTO `blog` VALUES ('1', '人生何处不相逢', '人生何处不相逢', '1', '人生 相逢', '随浪随风飘荡,随着一生里的浪,你我在重叠那一刹,顷刻各在一方.随浪随风飘荡,随着一生里的浪,你我在重叠那一刹,顷刻各在一方', '20170621/4a8f9239ab7ac1c70377433aa7a9332e.jpg 20170621/thumb4a8f9239ab7ac1c70377433aa7a9332e.jpg', '文章缩略图', '<pre style="margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;随浪随风飘荡
		随着一生里的浪
		你我在重叠那一刹
		顷刻各在一方
		缘份随风飘荡
		缘尽此生也守望
		你我在凝望那一刹
		心中有泪飘降
		纵是告别也交出真心意
		默默承受际遇
		某月某日也许再可跟你
		共聚重拾往事
		无奈重遇那天存在永远
		他方的晚空更是遥远
		谁在黄金海岸
		谁在烽烟彼岸
		你我在回望那一刹
		彼此慰问境况
		
		随浪随风飘荡
		人生何处不相逢
		人生何处不相逢
		随著一生里的浪
		你我在重叠那一刹
		顷刻各在一方
		缘份随风飘荡
		缘尽此生也守望
		你我在凝望那一刹
		心中有泪飘降
		纵是告别也交出真心意
		默默承受际遇
		某月某日也许再可跟你
		共聚重拾往事
		无奈重遇那天存在永远
		他方的晚空更是遥远
		谁在黄金海岸
		谁在烽烟彼岸
		你我在回望那一刹
		彼此慰问境况</pre><p><img src="http://img.baidu.com/hi/jx2/j_0002.gif"/></p>', '65', '1498050875');
INSERT INTO `blog` VALUES ('2', '千千阙歌', '千千阙歌', '1', '人生 感悟', '千千阙歌', '20170621/087d055f244bcd1ffd82c3ed62b5f4e4.jpg 20170621/thumb087d055f244bcd1ffd82c3ed62b5f4e4.jpg', '文章缩略图', '<p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;作词：<a target="_blank" href="http://baike.baidu.com/item/%E6%9E%97%E6%8C%AF%E5%BC%BA/8699290" style="color: rgb(19, 110, 194); text-decoration: none;">林振强</a></p><p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;作曲：Kohji Makanio</p><p style="text-align: justify;"><br/>　　徐徐回望 曾属於彼此的晚上</p><p style="text-align: justify;">　　如流傻泪 祈望可体恤兼见谅<br/>　　明晨离别你 路也许孤单得漫长<br/>　　一瞬间 太多东西要讲<br/>　　可惜即将在各一方<br/>　　只好深深把这刻尽凝望<br/>　　来日纵使<em>千千阕歌</em>飘於远方我路上<br/>　　来日纵使<em>千千</em>晚星 亮过今晚月亮<br/>　　都比不起这宵美丽<br/>　　亦绝不可使我更欣赏<br/>　　ah....因你今晚伴我唱</p><p style="text-align: justify;"><br/>　　临行临别 才顿感哀伤的漂亮<br/>　　原来全是你 令我的思忆漫长<br/>　　何年何月 才又可今宵一样<br/>　　停留凝望里 让眼睛讲彼此立场<br/>　　当某天 雨点轻敲你窗<br/>　　当风声吹乱你构想<br/>　　可否抽空 想这张旧模样<br/>　　来日纵使<em>千千阕歌</em>飘於远方我路上<br/>　　来日纵使<em>千千</em>晚星 亮过今晚月亮<br/>　　都比不起这宵美丽<br/>　　亦绝不可使我更欣赏<br/>　　ah....因你今晚伴我唱<br/>　　ah...怎都比不起这宵美丽<br/>　　亦绝不可使我更欣赏<br/>　　因今宵的我可共你唱</p><p><br/></p>', '89', '1498050899');
INSERT INTO `blog` VALUES ('4', '月半小夜曲', '月半小夜曲', '1', '人生 感悟', '月半小夜曲', '20170621/d626ecf6703c3f439e21bf043b9abf5e.jpg 20170621/thumbd626ecf6703c3f439e21bf043b9abf5e.jpg', '文章缩略图', '<p>仍然倚在失眠夜 望天边星宿</p><p><br/></p><p>仍然听见小提琴如泣似诉再挑逗</p><p>为何只剩一弯月 留在我的天空</p><p>这晚以后音讯隔绝</p><p>人如天上的明月 是不可拥有</p><p>情如曲过只遗留 无可挽救再分别</p><p>为何只是失望 填密我的空虚</p><p>这晚夜没有吻别</p><p>仍在说永久 想不到是借口</p><p>从未意会要分手</p><p>但我的心每分每刻 仍然被她占有　　</p><p><br/></p><p>她似这月儿 仍然是不开口</p><p>提琴独奏独奏着 明月半倚深秋</p><p>我的牵挂 我的渴望 直至以后</p><p>仍然倚在失眠夜 望天边星宿</p><p>仍然听见小提琴 如泣似诉再挑逗</p><p>为何只剩一弯月 留在我的天空</p><p>这晚以后音讯隔绝</p><p>人如天上的明月 是不可拥有</p><p>情如曲过只遗留 无可挽救再分别</p><p>为何只是失望 填密我的空虚</p><p>这晚夜没有吻别</p><p>仍在说永久 想不到是借口</p><p>从未意会要分手</p><p>但我的心每分每刻 仍然被她占有</p><p>她似这月儿 仍然是不开口</p><p>提琴独奏独奏着 明月半倚深秋</p><p>我的牵挂 我的渴望 直至以后</p><p>仍在说永久 想不到是借口</p><p>从未意会要分手</p><p>但我的心每分每刻 仍然被她占有</p><p>她似这月儿 仍然是不开口</p><p>提琴独奏独奏着 明月半倚深秋</p><p>我的牵挂 我的渴望 直至以后<span style="font-size: 12px; line-height: 0; position: relative; vertical-align: baseline; top: -0.5em; margin-left: 2px; color: rgb(51, 102, 204); cursor: default; padding: 0px 2px;">[1]</span><a class="sup-anchor" style="color: rgb(19, 110, 194); position: relative; top: -50px; font-size: 0px; line-height: 0;">&nbsp;</a></p><p><br/></p>', '490', '1498050572');
INSERT INTO `blog` VALUES ('15', '流年-王菲', '流年-王菲', '2', '王菲', '《流年》是王菲演唱的一首歌曲，由林夕作词，陈晓娟作曲，收录于王菲专辑《王菲2001》中，是王菲2010~2012年亚洲巡唱的固定曲目', '20170621/033871f87eac4e69933f690f7d5023cb.jpg 20170621/thumb033871f87eac4e69933f690f7d5023cb.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">爱上一个天使的缺点
用一种魔鬼的语言
上帝在云端只眨了一眨眼
最后眉一皱头一点

爱上一个认真的消遣
用一朵花开的时间
你在我旁边只打了个照面
五月的晴天闪了电

有生之年狭路相逢终不能幸免
手心忽然长出纠缠的曲线
懂事之前情动以后长不过一天
留不住算不出流年

遇见一场烟火的表演
用一场轮回的时间
紫微星流过
已经远离我一光年

有生之年狭路相逢终不能幸免
手心忽然长出纠缠的曲线
懂事之前情动以后长不过一天
留不住算不出流年

有生之年狭路相逢终不能幸免
手心忽然长出纠缠的曲线
懂事之前情动以后长不过一天</pre><p><img src="/tp509/public/static/uploads/image/20170620/1497889992132206.jpg" title="1497889992132206.jpg" alt="95eef01f3a292df50d8d31e5be315c6035a873f0.jpg"/></p>', '30', '1498049284');
INSERT INTO `blog` VALUES ('5', '飘雪', '飘雪', '2', '生活 感悟', '飘雪', '', '文章缩略图', '<p style="text-align: center;">歌名：飘雪
　　</p><p style="text-align: center;">作曲：K.Kuwata
　　</p><p style="text-align: center;">又见雪飘过
　　</p><p style="text-align: center;">飘于伤心记忆中
　　</p><p style="text-align: center;">让我再想你
　　</p><p style="text-align: center;">却掀起我心痛
　　</p><p style="text-align: center;">早经分了手
　　</p><p style="text-align: center;">为何热爱尚情重
　　</p><p style="text-align: center;">独过追忆岁月
　　</p><p style="text-align: center;">或许此生不会懂
　　</p><p style="text-align: center;">又再想起你
　　</p><p style="text-align: center;">抱拥飘飘白雪中
　　</p><p style="text-align: center;">让你心中暖
　　</p><p style="text-align: center;">去驱走我冰冻
　　</p><p style="text-align: center;">冷风催我醒
　　</p><p style="text-align: center;">原来共你是场梦
　　</p><p style="text-align: center;">像那飘飘雪泪下
　　</p><p style="text-align: center;">弄湿冷清的晚空
　　</p><p style="text-align: center;">原来是那么深爱你
　　</p><p style="text-align: center;">此际伴着我追忆的心痛</p><p><br/></p>', '161', '1501090089');
INSERT INTO `blog` VALUES ('6', '想起', '想起', '2', '人生 相逢', '想起', '20170621/60186fa415c2059f5c5fe3ccaf88c7e0.jpg 20170621/thumb60186fa415c2059f5c5fe3ccaf88c7e0.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">发行时间：2001年
歌词：
刚刚风无意吹起
花瓣随着风落地
我看见多么美的一场樱花雨
闻一闻茶的香气
哼一段旧时旋律
要是你一定欢天喜地
你曾经坐在这里
谈吐得那么阔气
就像是所有幸福都能被预期
你打开我的手心
一切都突然安静
你要我承接你的真心
花季虽然会过去
今年明年
有一样的风情
相爱以为是你给的美丽
让我惊喜让我庆幸
我有一生的风景
命运插手得太急
我来不及
全都要还回去
从此是一段长长的距离
偶尔想起总是唏嘘
如果当初懂珍惜
我知道眼泪多余
笑变得好不容易
特别是只能面对回忆和空气
多半的自言自语
是用来安慰自己
也许你字字句句倾听</pre><p><br/></p>', '32', '1500194683');
INSERT INTO `blog` VALUES ('7', '大悲咒', '大悲咒', '4', '大悲咒', '大悲咒', '20170621/a1837626a42fdd6acf34d2962d57722a.jpg 20170621/thumba1837626a42fdd6acf34d2962d57722a.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">Na&nbsp;Mo&nbsp;He&nbsp;Na&nbsp;Da&nbsp;Na&nbsp;Duo&nbsp;Na&nbsp;Ye&nbsp;Ye&nbsp;Na&nbsp;Mo
南&nbsp;无、喝&nbsp;罗&nbsp;怛&nbsp;那、哆&nbsp;罗&nbsp;夜&nbsp;耶.&nbsp;南&nbsp;无
AO&nbsp;Li&nbsp;Ye&nbsp;Po&nbsp;Lu&nbsp;Jie&nbsp;Di&nbsp;Shuo&nbsp;Bo&nbsp;Na&nbsp;Ye
阿&nbsp;唎&nbsp;耶.&nbsp;婆&nbsp;卢&nbsp;羯&nbsp;帝、烁&nbsp;钵&nbsp;罗&nbsp;耶.
Pu&nbsp;Ti&nbsp;Sa&nbsp;Duo&nbsp;Po&nbsp;Ye&nbsp;Mo&nbsp;He&nbsp;Sa&nbsp;Duo&nbsp;Po&nbsp;Ye
菩&nbsp;提&nbsp;萨&nbsp;埵&nbsp;婆&nbsp;耶,&nbsp;摩&nbsp;诃&nbsp;萨&nbsp;埵&nbsp;婆&nbsp;耶.
Mo&nbsp;He&nbsp;Jia&nbsp;Lu&nbsp;Ni&nbsp;Jia&nbsp;Ye&nbsp;An&nbsp;Sa&nbsp;Bo&nbsp;Na&nbsp;Fa&nbsp;Yi
摩&nbsp;诃、迦&nbsp;卢&nbsp;尼&nbsp;迦&nbsp;耶.&nbsp;唵，萨&nbsp;皤&nbsp;罗&nbsp;罚&nbsp;曳,
Su&nbsp;Da&nbsp;Na&nbsp;Da&nbsp;Xia&nbsp;Na&nbsp;Mo&nbsp;Xi&nbsp;Ji&nbsp;Lie&nbsp;Duo&nbsp;Yi&nbsp;Mong&nbsp;AO&nbsp;Li&nbsp;Ye
数&nbsp;怛&nbsp;那&nbsp;怛&nbsp;写.&nbsp;南&nbsp;无、悉&nbsp;吉&nbsp;栗&nbsp;埵、&nbsp;伊&nbsp;蒙&nbsp;阿&nbsp;唎&nbsp;耶.
Po&nbsp;Lu&nbsp;Jie&nbsp;Di&nbsp;Shi&nbsp;Fu&nbsp;Na&nbsp;Leng&nbsp;Tuo&nbsp;Po
婆&nbsp;卢&nbsp;吉&nbsp;帝、室&nbsp;佛&nbsp;罗&nbsp;愣&nbsp;驮&nbsp;婆.
Na&nbsp;Mo&nbsp;No&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Shi&nbsp;Li&nbsp;Mo&nbsp;He&nbsp;Ba&nbsp;Duo&nbsp;Suo&nbsp;Mi
南&nbsp;无、那&nbsp;罗&nbsp;谨&nbsp;墀.&nbsp;醯&nbsp;利&nbsp;摩&nbsp;诃、皤&nbsp;哆&nbsp;沙&nbsp;咩.
Sa&nbsp;Po&nbsp;AO&nbsp;Ta&nbsp;Dou&nbsp;Shu&nbsp;Peng&nbsp;AO&nbsp;Shi&nbsp;Yun&nbsp;Sa&nbsp;Po&nbsp;Sa&nbsp;Duo&nbsp;Na&nbsp;Mo&nbsp;Po&nbsp;Sa&nbsp;Duo
萨&nbsp;婆&nbsp;阿&nbsp;他、豆&nbsp;输&nbsp;朋、&nbsp;阿&nbsp;逝&nbsp;孕.&nbsp;萨&nbsp;婆&nbsp;萨&nbsp;哆、那&nbsp;摩&nbsp;婆&nbsp;萨&nbsp;哆,
Na&nbsp;Mo&nbsp;Po&nbsp;Qie&nbsp;Mo&nbsp;Fa&nbsp;Te&nbsp;Dou
那&nbsp;摩&nbsp;婆&nbsp;伽，摩&nbsp;罚&nbsp;特&nbsp;豆.
Da&nbsp;Zhi&nbsp;Ta&nbsp;An&nbsp;AO&nbsp;Po&nbsp;Lu&nbsp;Xi&nbsp;Lu&nbsp;Jia&nbsp;Di&nbsp;Jia&nbsp;Lu&nbsp;Di&nbsp;Yi&nbsp;Xi&nbsp;Li
怛&nbsp;侄&nbsp;他,&nbsp;唵，阿&nbsp;婆&nbsp;卢&nbsp;醯．卢&nbsp;迦&nbsp;帝,&nbsp;迦&nbsp;罗&nbsp;帝．夷&nbsp;醯&nbsp;唎.
Mo&nbsp;He&nbsp;Pu&nbsp;Ti&nbsp;Sa&nbsp;Duo&nbsp;Sa&nbsp;Po&nbsp;Sa&nbsp;Po
摩&nbsp;诃&nbsp;菩&nbsp;提&nbsp;萨&nbsp;埵.&nbsp;萨&nbsp;婆&nbsp;萨&nbsp;婆,
Mo&nbsp;Na&nbsp;Mo&nbsp;Na&nbsp;Mo&nbsp;Xi&nbsp;Mo&nbsp;Xi&nbsp;Lie&nbsp;Tuo&nbsp;Yun&nbsp;Ju&nbsp;Lu&nbsp;Ju&nbsp;Lu&nbsp;Jie&nbsp;Mong
摩&nbsp;罗&nbsp;摩&nbsp;罗,&nbsp;摩&nbsp;醯&nbsp;摩&nbsp;醯、唎&nbsp;驮&nbsp;孕.&nbsp;俱&nbsp;卢&nbsp;俱&nbsp;卢、羯&nbsp;蒙.
Du&nbsp;Lu&nbsp;Du&nbsp;Lu&nbsp;Fa&nbsp;She&nbsp;Ye&nbsp;Di&nbsp;Mo&nbsp;He&nbsp;Fa&nbsp;She&nbsp;Ye&nbsp;Di
度&nbsp;卢&nbsp;度&nbsp;卢、罚&nbsp;闍&nbsp;耶&nbsp;帝.&nbsp;摩&nbsp;诃、罚&nbsp;闍&nbsp;耶&nbsp;帝.
Tuo&nbsp;Na&nbsp;Tuo&nbsp;Na&nbsp;Di&nbsp;Li&nbsp;Ni&nbsp;Shi&nbsp;Fu&nbsp;Na&nbsp;Ye
陀&nbsp;罗&nbsp;陀&nbsp;罗,&nbsp;地&nbsp;唎&nbsp;尼,&nbsp;室&nbsp;佛&nbsp;罗&nbsp;耶.
Zhe&nbsp;Na&nbsp;Zhe&nbsp;Na&nbsp;Mo&nbsp;Mo&nbsp;Fa&nbsp;Mo&nbsp;Na&nbsp;Mo&nbsp;Die&nbsp;Lie
遮&nbsp;罗&nbsp;遮&nbsp;罗,&nbsp;摩&nbsp;麼&nbsp;罚&nbsp;摩&nbsp;罗,&nbsp;穆&nbsp;帝&nbsp;隶.
Yi&nbsp;Xi&nbsp;Yi&nbsp;Xi&nbsp;Shi&nbsp;Na&nbsp;Shi&nbsp;Na&nbsp;Ou&nbsp;Na&nbsp;Sen&nbsp;Fu&nbsp;Na&nbsp;She&nbsp;Li
伊&nbsp;醯&nbsp;伊&nbsp;醯,&nbsp;室&nbsp;那&nbsp;室&nbsp;那,&nbsp;阿&nbsp;罗&nbsp;参、佛&nbsp;罗&nbsp;舍&nbsp;利.
Fa&nbsp;Sa&nbsp;Fa&nbsp;Seng&nbsp;Fu&nbsp;Na&nbsp;She&nbsp;Ye
罚&nbsp;沙&nbsp;罚&nbsp;参.&nbsp;佛&nbsp;罗&nbsp;舍&nbsp;耶.
Hu&nbsp;Lu&nbsp;Hu&nbsp;Lu&nbsp;Mo&nbsp;Na&nbsp;Hu&nbsp;Lu&nbsp;Hu&nbsp;Lu&nbsp;Xi&nbsp;Li&nbsp;Suo&nbsp;Na&nbsp;Suo&nbsp;Na
呼&nbsp;嚧&nbsp;呼&nbsp;嚧&nbsp;摩&nbsp;罗,&nbsp;呼&nbsp;嚧&nbsp;呼&nbsp;嚧&nbsp;醯&nbsp;利.&nbsp;娑&nbsp;罗&nbsp;娑&nbsp;罗,
Xi&nbsp;Li&nbsp;Xi&nbsp;Li&nbsp;Su&nbsp;Lu&nbsp;Su&nbsp;Lu&nbsp;Pu&nbsp;Ti&nbsp;Ye&nbsp;Pu&nbsp;Ti&nbsp;Ye
悉&nbsp;唎&nbsp;悉&nbsp;唎,&nbsp;苏&nbsp;嚧&nbsp;苏&nbsp;嚧.&nbsp;菩&nbsp;提&nbsp;夜、菩&nbsp;提&nbsp;夜.
Pu&nbsp;Tuo&nbsp;Ye&nbsp;Pu&nbsp;Tuo&nbsp;Ye&nbsp;Mi&nbsp;Di&nbsp;Li&nbsp;Ye
菩&nbsp;驮&nbsp;夜、菩&nbsp;驮&nbsp;夜.&nbsp;弥&nbsp;帝&nbsp;唎&nbsp;夜,
Nuo&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Di&nbsp;Li&nbsp;Se&nbsp;Ni&nbsp;Na&nbsp;Po&nbsp;Ye&nbsp;Mo&nbsp;Na
那&nbsp;罗&nbsp;谨&nbsp;墀.&nbsp;地&nbsp;利&nbsp;瑟&nbsp;尼&nbsp;那,&nbsp;波&nbsp;夜&nbsp;摩&nbsp;那,
Suo&nbsp;Po&nbsp;He&nbsp;Xi&nbsp;Tuo&nbsp;Ye&nbsp;Suo&nbsp;Po&nbsp;He&nbsp;Mo&nbsp;He&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;悉&nbsp;陀&nbsp;夜,&nbsp;娑&nbsp;婆&nbsp;诃.&nbsp;摩&nbsp;诃&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Xi&nbsp;Tuo&nbsp;Yu&nbsp;Yi&nbsp;Shi&nbsp;Bo&nbsp;Na&nbsp;Ya
娑&nbsp;婆&nbsp;诃.&nbsp;悉&nbsp;陀&nbsp;喻&nbsp;艺,&nbsp;室&nbsp;皤&nbsp;罗&nbsp;耶,
Suo&nbsp;Po&nbsp;He&nbsp;Nuo&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Suo&nbsp;Po&nbsp;He
娑&nbsp;婆&nbsp;诃.&nbsp;那&nbsp;罗&nbsp;谨&nbsp;墀,&nbsp;娑&nbsp;婆&nbsp;诃.
Mo&nbsp;Na&nbsp;Nuo&nbsp;Na&nbsp;Suo&nbsp;Po&nbsp;He&nbsp;Xi&nbsp;Na&nbsp;Sen&nbsp;AO&nbsp;Mu&nbsp;Qie&nbsp;Ye
摩&nbsp;罗&nbsp;那&nbsp;罗,&nbsp;娑&nbsp;婆&nbsp;诃.&nbsp;悉&nbsp;罗&nbsp;僧、阿&nbsp;穆&nbsp;佉&nbsp;耶,
Suo&nbsp;Po&nbsp;He&nbsp;Suo&nbsp;Po&nbsp;Mo&nbsp;He&nbsp;AO&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;娑&nbsp;婆&nbsp;摩&nbsp;诃、阿&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Zhe&nbsp;Ji&nbsp;Na&nbsp;AO&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;者&nbsp;吉&nbsp;罗、阿&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;he&nbsp;Bo&nbsp;Tuo&nbsp;Mo&nbsp;Ji&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;波&nbsp;陀&nbsp;摩、羯&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Nuo&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Bu&nbsp;Qie&nbsp;Na&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;那&nbsp;罗&nbsp;谨&nbsp;墀、&nbsp;皤&nbsp;伽&nbsp;罗&nbsp;耶,
Suo&nbsp;Po&nbsp;He&nbsp;Mo&nbsp;Po&nbsp;Li&nbsp;Sen&nbsp;Ji&nbsp;Na&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;摩&nbsp;婆&nbsp;利、胜&nbsp;羯&nbsp;罗&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Na&nbsp;Mo&nbsp;He&nbsp;Na&nbsp;Da&nbsp;Na&nbsp;Duo&nbsp;Na&nbsp;Ye&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;南&nbsp;无&nbsp;喝&nbsp;罗&nbsp;怛&nbsp;那、哆&nbsp;罗&nbsp;夜&nbsp;耶.
Na&nbsp;Mo&nbsp;AO&nbsp;Li&nbsp;Ye&nbsp;Po&nbsp;Lu&nbsp;Jie&nbsp;Di
南&nbsp;无&nbsp;阿&nbsp;唎&nbsp;耶.&nbsp;婆&nbsp;嚧&nbsp;吉&nbsp;帝,
Suo&nbsp;Bo&nbsp;Na&nbsp;Ye&nbsp;Suo&nbsp;Po&nbsp;He&nbsp;An&nbsp;Xi&nbsp;Dian&nbsp;Du
烁&nbsp;皤&nbsp;罗&nbsp;夜,&nbsp;娑&nbsp;婆&nbsp;诃.&nbsp;唵，悉&nbsp;殿&nbsp;都,
Man&nbsp;Duo&nbsp;Na&nbsp;Ba&nbsp;Tuo&nbsp;Ye&nbsp;Suo&nbsp;Po&nbsp;He
漫&nbsp;多&nbsp;罗,&nbsp;跋&nbsp;陀&nbsp;耶,&nbsp;娑&nbsp;婆&nbsp;诃.</pre><p><br/></p>', '26', '1498050952');
INSERT INTO `blog` VALUES ('8', '情非得已', '情非得已', '6', '情非得已', '情非得已', '20170621/ee2da7a54489ca372030d89a87ba5d36.jpg 20170621/thumbee2da7a54489ca372030d89a87ba5d36.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">难以忘记初次见你一双迷人的眼睛
在我脑海里你的身影挥散不去
握你的双手感觉你的温柔
真的有点透不过气你的天真我想珍惜
(看到你受委屈我会伤心)
wo----
只怕我自己会爱上你不敢让自己靠的太近
怕我没什么能够给你爱你也需要很大的勇气
只怕我自己会爱上你也许有天会情不自禁
想念只让自己苦了自己爱上你是我
爱上你是我
难以忘记初次见你一双迷人的眼睛
在我脑海里你的身影挥散不去
握你的双手感觉你的温柔
真的有点透不过气你的天真我想珍惜
(看到你受委屈我会伤心)
wo----
只怕我自己会爱上你不敢让自己靠的太近
怕我没什么能够给你爱你也需要很大的勇气
只怕我自己会爱上你也许有天会情不自禁
想念只让自己苦了自己爱上你是我情非得已
爱上你是我情非得已
什么原因我竟然又会遇见你
我真的真的不愿意就这样陷入
只怕我自己会爱上你不敢让自己靠的太近
怕我没什么能够给你爱你也需要很大的勇气
只怕我自己会爱上你也许有天会情不自禁
想念只让自己苦了自己爱上你是我情非得已
爱上你是我情非得已
爱上你是我情非得已</pre><p><br/></p>', '37', '1501072649');
INSERT INTO `blog` VALUES ('9', '独家记忆', '独家记忆', '7', '独家记忆', '独家记忆', '20170621/8b7cd7f0bd5f18288420be90c437d4ea.jpg 20170621/thumb8b7cd7f0bd5f18288420be90c437d4ea.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">忘记分开后的第几天起&nbsp;　　
喜欢一个人&nbsp;看下大雨&nbsp;　　
没联络&nbsp;孤单就像连锁反应&nbsp;　　
想要快乐都没力气&nbsp;　　

雷雨世界像场灾难电影&nbsp;　　
让现在的我&nbsp;可怜到底&nbsp;　　
对不起&nbsp;谁也没有&nbsp;　　
想要结束的&nbsp;没有商量的余地&nbsp;　　

我希望你&nbsp;是我独家的记忆&nbsp;　　
摆在心底&nbsp;　　
不管别人说的多么难听&nbsp;　　
现在我拥有的事情&nbsp;　　
是你&nbsp;是给我一半的爱情&nbsp;　　
我喜欢你&nbsp;是我独家的记忆&nbsp;　　
谁也不行&nbsp;　　
从我这个身体中拿走你&nbsp;　　
在我感情的封锁区&nbsp;　　
有关于你&nbsp;绝口不提&nbsp;没关系&nbsp;　
　
雷雨世界像场灾难电影&nbsp;　　
让现在的我&nbsp;可怜到底&nbsp;　　
对不起&nbsp;谁也没有&nbsp;　　
已经结束的&nbsp;没有商量的余地&nbsp;　　

我希望你&nbsp;是我独家的记忆&nbsp;　　
摆在心底&nbsp;　　
不管别人说的多么难听&nbsp;　　
现在我拥有的事情&nbsp;　　
是你&nbsp;是给我一半的爱情&nbsp;　　
我喜欢你&nbsp;是我独家的记忆&nbsp;　　
谁也不行&nbsp;　　
从我这个身体中拿走你&nbsp;　　
在我感情的封锁区&nbsp;　　
有关于你&nbsp;绝口不提&nbsp;没关系&nbsp;　　

我希望你&nbsp;是我独家的记忆&nbsp;　　
摆在心底&nbsp;　　
不管别人说的多么难听&nbsp;　　
现在我拥有的事情&nbsp;　　
是你&nbsp;是给我一半的爱情&nbsp;　　
我喜欢你&nbsp;是我独家的记忆&nbsp;　　
谁也不行&nbsp;　　
从我这个身体中拿走你&nbsp;　　
在我感情的封锁区&nbsp;　　
有关于你&nbsp;绝口不提&nbsp;没限期</pre><p><br/></p>', '439', '1498050914');
INSERT INTO `blog` VALUES ('10', '半壶纱-刘珂矣', '半壶纱-刘珂矣', '4', '感悟 大悲咒', '墨已入水 渡一池青花  揽五分红霞 采竹回家  悠悠风来 埋一地桑麻  一身袈裟 把相思放下 十里桃花 待嫁的年华', '20170621/333c4b578be51cd920fa826a40924690.jpg 20170621/thumb333c4b578be51cd920fa826a40924690.jpg', '文章缩略图', '<p>墨已入水 渡一池青花</p><p>揽五分红霞 采竹回家</p><p>悠悠风来 埋一地桑麻</p><p>一身袈裟 把相思放下</p><p>十里桃花 待嫁的年华</p><p>凤冠的珍珠 挽进头发</p><p>檀香拂过 玉镯弄轻纱</p><p>空留一盏 芽色的清茶</p><p>倘若我心中的山水 你眼中都看到</p><p>我便一步一莲花祈祷</p><p>怎知那浮生一片草 岁月催人老</p><p><br/></p><p>风月花鸟 一笑尘缘了</p><p>十里桃花 待嫁的年华</p><p>凤冠的珍珠 挽进头发</p><p>檀香拂过 玉镯弄轻纱</p><p>空留一盏 芽色的清茶</p><p>倘若我心中的山水 你眼中都看到</p><p>我便一步一莲花祈祷</p><p>怎知那浮生一片草 岁月催人老</p><p>风月花鸟 一笑尘缘了</p><p>倘若我心中的山水 你眼中都看到</p><p>我便一步一莲花祈祷</p><p>怎知那浮生一片草 岁月催人老</p><p>风月花鸟 一笑尘缘了</p><p>怎知那浮生一片草 岁月催人老</p><p>风月花鸟 一笑尘缘了</p><p><br/></p>', '42', '1498050590');
INSERT INTO `blog` VALUES ('11', '忍别离', '忍别离', '2', '感悟 人生', '《忍别离[1]  》是歌手崔子格演唱的歌曲，袁亮作词，赵佳霖作曲编曲，该歌曲收录在专辑《小美人》中。', '20170621/74ae1f39ab8d8a201b720d4d75801a36.jpg 20170621/thumb74ae1f39ab8d8a201b720d4d75801a36.jpg', '文章缩略图', '<p>西风夜渡寒山雨</p><p>家国依稀残梦里</p><p>思君不见倍思君</p><p>别离难忍忍别离</p><p>狼烟烽火何时休</p><p>成王败寇尽东流</p><p>蜡炬已残泪难干</p><p>江山未老红颜旧</p><p>忍别离</p><p>不忍却要别离</p><p>托鸿雁南去</p><p>不知此心何寄</p><p>红颜旧</p><p>任凭斗转星移</p><p>不变是此情悠悠</p><p>狼烟烽火何时休</p><p>成王败寇尽东流</p><p>蜡炬已残泪难干</p><p>江山未老红颜旧</p><p>忍别离</p><p>不忍却要别离</p><p>托鸿雁南去</p><p>不知此心何寄</p><p>红颜旧</p><p>任凭斗转星移</p><p>不变是此情悠悠</p><p>忍别离</p><p>不忍却要别离</p><p>托鸿雁南去</p><p>不知此心何寄</p><p>红颜旧</p><p>任凭斗转星移</p><p>不变是此情悠悠</p><p>不变是此情悠悠</p><p>不变是此情悠悠</p><p><br/></p>', '4', '1498050602');
INSERT INTO `blog` VALUES ('12', '容易受伤的女人-王菲', '容易受伤的女人-王菲', '2', '王菲 女人', '《容易受伤的女人》是王菲于1992年下半年，从美国返港并重新踏入乐坛而发行的唱片《COMING HOME》中的歌曲。王菲这张唱片一推出即断市，销量迅速冲破白金，碟内的《容易受伤的女人》，横扫全港，更在各电视台的音乐颁奖礼中，勇夺金曲，声势可谓一时无两，令她一举跃入香港一线女歌手的行列', '20170621/5b612877b2556a31ed07a596dc6f3873.jpg 20170621/thumb5b612877b2556a31ed07a596dc6f3873.jpg', '文章缩略图', '<p>人渐醉了夜更深</p><p>在这一刻多么接近</p><p>思想仿似在摇撼</p><p>矛盾也更深</p><p>曾被破碎过的心</p><p>让你今天轻轻贴近</p><p>多少安慰及疑问</p><p>偷偷的再生</p><p>情难自禁</p><p>我却其实属于</p><p>极度容易受伤的女人</p><p>不要　不要 &nbsp;不要骤来骤去</p><p>请珍惜我的心</p><p>如明白我</p><p>继续情愿热恋</p><p>这个容易受伤的女人</p><p>不要等　这一刻</p><p>请热吻</p><p><img src="/ueditor/php/upload/image/20170619/1497879212206423.jpg" alt="1497879212206423.jpg"/></p><p>长夜有你醉也真</p><p>让我终于找到信任</p><p>不管一切是疑问</p><p>快乐是情人</p><p>曾害怕了这一生</p><p>是你始终甘心靠近</p><p>我方知拥有着缘份</p><p>重建我信心</p><p>曾被破碎过的心</p><p>让你今天轻轻贴近</p><p>多少安慰及疑问</p><p>偷偷的再生</p><p>情难自禁</p><p>我却其实属于</p><p>极度容易受伤的女人</p><p>不要　不要</p><p>不要骤来骤去</p><p>请珍惜我的心</p><p>如明白我</p><p>继续情愿热恋</p><p>这个容易受伤的女人</p><p>终此一生</p><p>也火般的热吻</p><p>长夜有你醉也真</p><p>让我终于找到信任</p><p>不管一切是疑问</p><p>快乐是情人</p><p>情难自禁</p><p>我却其实属于</p><p>极度容易受伤的女人</p><p>不要　不要</p><p>不要骤来骤去</p><p>请珍惜我的心</p><p>如明白我</p><p>继续情愿热恋</p><p>这个容易受伤的女人</p><p>不要等　这一刻</p><p>请热吻</p><p>长夜有你醉也真</p><p>让我终于找到信任</p><p>不管一切是疑问</p><p>快乐是情人</p><p><br/></p>', '59', '1498049261');
INSERT INTO `blog` VALUES ('13', '我愿意-王菲', '我愿意-王菲', '2', '王菲 爱情', '《我愿意》是王菲演唱的一首歌曲，由姚谦作词，黄国伦作曲，收录于1994年新艺宝发行的专辑《迷》中，是其早期代表作之一', '20170621/56f04ddf58e6212698e9e2246da517f5.jpg 20170621/thumb56f04ddf58e6212698e9e2246da517f5.jpg', '文章缩略图', '<pre>歌名：我愿意
原唱：王菲（王靖雯）
填词：姚谦
谱曲：黄国伦
编曲：Nathan&nbsp;Wang
专辑：《迷》

歌词：
思念是一种很玄的东西&nbsp;如影随形
无声又无息出没在心底
转眼&nbsp;吞没我在寂默里
我无力抗拒&nbsp;特别是夜里
想你到无法呼吸
恨不能立即&nbsp;朝你狂奔去
大声的告诉你
愿意为你&nbsp;我愿意为你
我愿意为你&nbsp;忘记我姓名
就算多一秒&nbsp;停留在你怀里
失去世界也不可惜
我愿意为你&nbsp;我愿意为你
我愿意为你&nbsp;被放逐天际
只要你真心&nbsp;拿爱与我回应
什么都愿意&nbsp;什么都愿意&nbsp;为你</pre><p><br/></p>', '49', '1498050613');
INSERT INTO `blog` VALUES ('14', '红豆-王菲', '红豆-王菲', '2', '王菲', '《红豆》是王菲演唱的一首歌曲，由林夕作词、柳重言作曲，收录于王菲1998年的专辑《唱游》当中。1999年这首歌曲获得了香港电台十大中文金曲奖以及香港无线电视台十大劲歌金曲奖', '20170621/6c4037445f041f722d0e42db64bc2cd2.jpg 20170621/thumb6c4037445f041f722d0e42db64bc2cd2.jpg', '文章缩略图', '<p>歌曲：红豆&nbsp;</p><p>专辑发行:2007年5月&nbsp;</p><p>●●●&nbsp;</p><p>还没好好的感受&nbsp;</p><p>雪花绽放的气候&nbsp;</p><p>我们一起颤抖&nbsp;</p><p>会更明白什么是温柔&nbsp;</p><p>还没跟你牵着手&nbsp;</p><p>走过荒芜的沙丘&nbsp;</p><p>可能从此以后&nbsp;</p><p>学会珍惜天长和地久&nbsp;</p><p>有时候有时候&nbsp;</p><p>我会相信一切有尽头-&nbsp;</p><p>相聚离开都有时候&nbsp;</p><p>没有什么会永垂不朽&nbsp;</p><p>可是我有时候&nbsp;</p><p>宁愿选择留恋不放手&nbsp;</p><p>等到风景都看透&nbsp;</p><p>也许你会陪我看细水长流--&nbsp;</p><p>-----------</p><p>还没为你把红豆&nbsp;</p><p>熬成缠绵的伤口&nbsp;</p><p>然后一起分享&nbsp;</p><p>会更明白相思的哀愁&nbsp;</p><p>还没好好的感受-&nbsp;</p><p>醒着亲吻的温柔&nbsp;</p><p>可能在我左右&nbsp;</p><p>你才追求孤独的自由&nbsp;</p><p>有时候有时候&nbsp;</p><p>我会相信一切有尽头-&nbsp;</p><p>相聚离开都有时候&nbsp;</p><p>没有什么会永垂不朽&nbsp;</p><p>可是我有时候&nbsp;</p><p>宁愿选择留恋不放手&nbsp;</p><p>等到风景都看透&nbsp;</p><p>也许你会陪我看细水
长流</p><p>--
长流-</p>', '45', '1501150798');
INSERT INTO `blog` VALUES ('16', '匆匆那年-王菲', '匆匆那年-王菲', '2', '王菲', '匆匆那年（电影《匆匆那年》主题曲）', '20170621/26e0d7939ff65a8d4c68a64bd2028c1d.jpg 20170621/thumb26e0d7939ff65a8d4c68a64bd2028c1d.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">匆匆那年（电影主题曲）
作词：
作曲：
演唱：
匆匆那年我们&nbsp;究竟说了几遍&nbsp;再见之后再拖延
可惜谁有没有&nbsp;爱过不是一场&nbsp;的雄辩
匆匆那年我们&nbsp;一时匆忙撂下&nbsp;难以承受的诺言
只有等别人兑现
不怪那吻痕还&nbsp;没积累成茧
拥抱着冬眠也没能&nbsp;羽化再成仙
不怪这一段情&nbsp;没空反复再排练
是岁月宽容恩赐&nbsp;反悔的时间
如果再见不能红着眼&nbsp;是否还能红着脸
就像那年匆促&nbsp;刻下永远一起&nbsp;那样美丽的谣言
如果过去还值得眷恋&nbsp;别太快冰释前嫌
谁甘心就这样&nbsp;彼此无挂也无牵
我们要互相亏欠&nbsp;要不然凭何怀缅
匆匆那年我们&nbsp;见过太少世面&nbsp;只爱看同一张脸
那么莫名其妙&nbsp;那么讨人欢喜&nbsp;闹起来又太讨厌
相爱那年活该&nbsp;匆匆因为我们&nbsp;不懂顽固的诺言
只是分手的前言
不怪那天太冷&nbsp;泪滴水成冰
春风也一样没&nbsp;吹进凝固的照片
不怪每一个人&nbsp;没能完整爱一遍
是岁月善意落下&nbsp;残缺的悬念
如果再见不能红着眼&nbsp;是否还能红着脸
就像那年匆促&nbsp;刻下永远一起&nbsp;那样美丽的谣言
如果过去还值得眷恋&nbsp;别太快冰释前嫌
谁甘心就这样&nbsp;彼此无挂也无牵
如果再见不能红着眼&nbsp;是否还能红着脸
就像那年匆促&nbsp;刻下永远一起&nbsp;那样美丽的谣言
如果过去还值得眷恋&nbsp;别太快冰释前嫌
谁甘心就这样&nbsp;彼此无挂也无牵
我们要互相亏欠
我们要藕断丝连</pre><p><br/></p>', '24', '1498049273');
INSERT INTO `blog` VALUES ('17', '人间-王菲', '人间-王菲', '2', '王菲', '《人间》是王菲演唱歌曲。1997年07月01日发行收录于专辑《王菲》，这首曲子为王菲首唱，是中岛美雪为王菲创作的歌曲，后由中岛美雪演唱并收录于专辑。2015年电影《陪安东尼度过漫长岁月》选用此曲作为电影插曲以及宣传曲目', '20170621/9f704ed08ff326af1a981d2ba46d521e.jpg 20170621/thumb9f704ed08ff326af1a981d2ba46d521e.jpg', '文章缩略图', '<p style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;风雨过后不一定有美好的天空<br/>　　不是天晴就会有彩虹<br/>　　所以你一脸无辜不代表你懵懂<br/>　　不是所有感情都会有始有终<br/>　　孤独尽头不一定惶恐<br/>　　可生命总免不了最初的一阵痛<br/>　　但愿你的眼睛 只看得到笑容<br/>　　但愿你流下每一滴泪都让人感动<br/>　　但愿你以后每一个梦不会一场空<br/>　　天上人间<br/>　　如果真值得歌颂<br/>　　也是因为有你才会变得闹哄哄<br/>　　天大地大<br/>　　世界比你想像中朦胧</p><p style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我不忍心再欺哄但愿你听得懂</p><p style="text-align: left;"><img src="/tp509/public/static/uploads/image/20170620/1497879212206423.jpg" alt="1497879212206423.jpg"/>　　</p><p style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;风雨过后不一定有美好的天空<br/>　　不是天晴就会有彩虹<br/>　　所以你一脸无辜不代表你懵懂<br/>　　不是所有感情都会有始有终<br/>　　孤独尽头不一定惶恐<br/>　　可生命总免不了最初的一阵痛<br/>　　但愿你的眼睛 只看得到笑容<br/>　　但愿你流下每一滴泪都让人感动<br/>　　但愿你以后每一个梦不会一场空<br/>　　天上人间<br/>　　如果真值得歌颂<br/>　　也是因为有你才会变得闹哄哄<br/>　　天大地大<br/>　　世界比你想像中朦胧</p><p style="text-align: left;"><br/></p><p style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我不忍心再欺哄但愿你听得懂<br/>　　天上人间<br/>　　如果真值得歌颂<br/>　　也是因为有你才会变得闹哄哄<br/>　　天大地大世界比你想像中朦胧<br/>　　我不忍心再欺哄但愿你听得懂<br/>　　但愿你会懂该何去何从</p><p><br/></p>', '54', '1498621251');
INSERT INTO `blog` VALUES ('18', '棋子-王菲', '棋子-王菲', '2', '王菲', '《棋子》是王菲（曾用艺名：王靖雯）演唱的歌曲，歌曲收录在第九张专辑，第二张国语大碟《天空》中，为该专辑第二首歌曲，1994年11月10日台湾发行', '20170621/3cbb3836208c7e2e02be9a5f48e558a3.jpg 20170621/thumb3cbb3836208c7e2e02be9a5f48e558a3.jpg', '文章缩略图', '<p>想走出你控制的领域</p><p>却走进你安排的战局</p><p>我没有坚强的防备</p><p>也没有后路可以退</p><p>想逃离你布下的陷阱</p><p>却陷入了另一个困境</p><p>我没有决定输赢的勇气</p><p>也没有逃脱的幸运</p><p>我　像是一颗　棋</p><p>进退任由　你决定</p><p>我不是你眼中唯一　将领</p><p>却是　不起眼的　小兵</p><p>我像是　一颗　棋子</p><p>来去全不由自己</p><p>举手无回　你从不曾犹豫</p><p>我却受控在　你手里</p><p><img src="/tp509/public/static/uploads/image/20170620/1497889992132206.jpg" alt="1497889992132206.jpg"/></p>', '12', '1498049241');
INSERT INTO `blog` VALUES ('24', '又见炊烟', '又见炊烟', '2', '王菲', '《又见炊烟》是海沼实作曲，王菲演唱的歌曲，收录于专辑《菲旧梦》中', '20170624/471fc03606cb43d541aa533c595b41ce.jpg 20170624/thumb471fc03606cb43d541aa533c595b41ce.jpg', '文章缩略图', '<p>又见炊烟</p><p>演唱：王菲</p><p>填词：庄奴</p><p>作曲：海沼实</p><p>又见炊烟升起</p><p>暮色罩大地</p><p>想问阵阵炊烟</p><p>你要去哪里</p><p>夕阳有诗情</p><p>黄昏有画意</p><p>诗情画意虽然美丽</p><p>我心中只有你</p><p>又见炊烟升起</p><p>勾起我回忆</p><p>愿你变作彩霞</p><p>飞到我梦里</p><p>夕阳有诗情</p><p>黄昏有画意</p><p>诗情画意虽然美丽</p><p>我心中只有你</p><p>夕阳有诗情</p><p>黄昏有画意</p><p>诗情画意虽然美丽</p><p>我心中只有你</p><p>诗情画意虽然美丽</p><p>我心中只有你</p><p><br/></p>', '42', '1498303402');
INSERT INTO `blog` VALUES ('25', '李宗盛-鬼迷心窍', '李宗盛-鬼迷心窍', '1', '李宗盛', '歌曲《鬼迷心窍》是1992年黄日华、周海媚主演台湾电视剧《末代皇孙》的主题曲，由李宗盛作词、作曲、演唱，收录于1992年影视剧音乐合辑《滚石九大天王之十二出好戏》当中', '20170716/a75f60047140810c0ff98fbd34ea4e98.jpg 20170716/thumba75f60047140810c0ff98fbd34ea4e98.jpg', '文章缩略图', '<p>鬼迷心窍</p><p><img src="/tp509/public/static/uploads/image/20170716/1500165484395677.jpg" title="1500165484395677.jpg" alt="0dd7912397dda1442cbbbbf9bbb7d0a20df486cf.jpg"/></p><p>曾经真的以为人生就这样了</p><p>平静的心拒绝再有浪潮</p><p>斩了千次的情丝却断不了</p><p>百转千折它将我围绕</p><p>有人问我你究竟是哪里好</p><p>这么多年我还忘不了</p><p>春风再美也比不上你的笑</p><p>没见过你的人不会明了</p><p>是鬼迷了心窍也好</p><p>是前世的因缘也好</p><p>然而这一切已不再重要</p><p>如果你能够重回我怀抱</p><p>是命运的安排也好</p><p>是你存心的捉弄也好</p><p>然而这一切已不再重要</p><p>我愿意随你到天涯海角</p><p>虽然岁月总是匆匆地催人老</p><p>虽然情爱总是让人烦恼</p><p>虽然未来如何不能知道</p><p>现在说再见会不会太早</p><p><br/></p>', '68', '1500166595');
INSERT INTO `blog` VALUES ('26', '罗大佑-恋曲1990', '罗大佑-恋曲1990', '1', '罗大佑', '《恋曲1990》收录于罗大佑个人专辑《爱人同志》中，是其中的第六首歌。词罗大佑，曲罗大佑，为电影《阿郎的故事》的国语版主题曲，粤语版主题曲为许冠杰的《阿郎恋曲》，词许冠杰', '20170716/05097286b853cc86299a66ab95fbd5bd.jpg 20170716/thumb05097286b853cc86299a66ab95fbd5bd.jpg', '文章缩略图', '<p>乌溜溜的黑眼珠和你的笑脸</p><p>怎么也难忘记你容颜的转变</p><p><img class="" src="/tp509/public/static/uploads/image/20170716/1500166121131272.jpg" alt=""/></p><p>轻飘飘的旧时光就这么溜走</p><p>转头回去看看时已匆匆数年</p><p>苍茫茫的天涯路是你的飘泊</p><p>寻寻觅觅长相守是我的脚步</p><p>黑漆漆的孤枕边是你的温柔</p><p>醒来时的清晨里是我的哀愁</p><p>或许明日太阳西下倦鸟已归时</p><p>你将已经踏上旧时的归途</p><p>人生难得再次寻觅相知的伴侣</p><p>生命终究难舍蓝蓝的白云天</p><p><br/>　　</p><p><img class="" src="/tp509/public/static/uploads/image/20170716/1500166121646853.jpg" alt="罗大佑"/><span class="description" style="display: block; color: rgb(85, 85, 85); font-size: 12px; text-indent: 0px; font-family: 宋体; word-wrap: break-word; word-break: break-all; line-height: 15px; padding: 8px 7px; min-height: 12px; border-top-width: 1px; border-top-style: solid; border-top-color: rgb(224, 224, 224);">罗大佑</span></p><p>轰隆隆的雷雨声在我的窗前</p><p>怎么也难忘记你离去的转变</p><p>孤单单的身影后寂寥的心情</p><p>永远无怨的是我的双眼</p><p><br/></p>', '64', '1500166582');
INSERT INTO `blog` VALUES ('27', 'Emilia-big big word', 'Emilia-big big word', '7', 'Emilia', '《Big Big World》是一首1998年的民谣歌曲，由来自瑞典的艾密莉亚·怀得堡（Emilia Rydberg）演唱，拉塞·安德森参与编写。曲风伤感，风靡一时，于1998年年底发布。这首歌一炮打响，在欧洲达到了第一名，在许多国家成名，但在美国表现不佳，它仍然在公告牌百强单曲榜底峰。', '20170716/74ee449b43f15c82df55b11f9390f8be.jpg 20170716/thumb74ee449b43f15c82df55b11f9390f8be.jpg', '文章缩略图', '<p>Big Big World-Emilia　　</p><p>&nbsp;&nbsp;&nbsp;&nbsp;I&#39;m a big big girl</p><p><a class="image-link" href="https://baike.baidu.com/pic/big%20big%20world/1506587/0/b7fd5266d0160924982c3ca8d40735fae6cd3473?fr=lemma&ct=single" target="_blank" title="乐谱" style="color: rgb(19, 110, 194); text-decoration: none; display: block; width: 167px; height: 220px;">&nbsp;&nbsp;<img src="/tp509/public/static/uploads/image/20170716/1500166834101262.jpg" title="1500166834101262.jpg" alt="d52a2834349b033bb9ebb8f117ce36d3d539bdbe.jpg"/></a></p><p>　　In a big big world<br/>　　It&#39;s not a big big thing if you leave me<br/>　　But I do do feel<br/>　　that I too too will miss you much<br/>　　Miss you much.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;I can see the first leaf falling<br/>　　It&#39;s all yellow and nice<br/>　　It&#39;s so very cold outside<br/>　　Like the way I&#39;m feeling inside<br/>　　I&#39;m a big big girl<br/>　　In a big big world<br/>　　It&#39;s not a big big thing if you leave me<br/>　　But I do do feel<br/>　　that I too too will miss you much<br/>　　Miss you much.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;Outside it&#39;s now raining<br/>　　</p><p>&nbsp;&nbsp;&nbsp;&nbsp;And tears are falling from my eyes<br/>　　Why did it have to happen<br/>　　Why did it all have to end<br/>　　I&#39;m a big big girl<br/>　　In a big big world<br/>　　It&#39;s not a big big thing if you leave me<br/>　　But I do do feel<br/>　　that I too too will miss you much<br/>　　Miss you much.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;I have your arms around me ooooh like fire<br/>　　But when I open my eyes<br/>　　You&#39;re gone.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;I&#39;m a big big girl<br/>　　In a big big world<br/>　　It&#39;s not a big big thing if you leave me<br/>　　But I do do feel<br/>　　that I too too will miss you much<br/>　　Miss you much.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;I&#39;m a big big girl<br/>　　In a big big world<br/>　　It&#39;s not a big big thing if you leave me<br/>　　But I do feel that will miss you much<br/>　　Miss you much.</p><p><br/></p>', '201', '1500174189');
INSERT INTO `blog` VALUES ('28', '张国荣-当爱已成往事', '张国荣-当爱已成往事', '1', '张国荣', '《当爱已成往事》是1993年张国荣、张丰毅、巩俐主演电影《霸王别姬》的主题曲、片尾曲，原唱林忆莲、李宗盛，先后收录在《霸王别姬电影原声带》[1]  和林忆莲1993年的粤语专辑《不如重新开始》、国语专辑《不必在乎我是谁》中。影片主演张国荣曾翻唱此歌曲，收录于1995年个人专辑《宠爱》当中。', '20170716/bcac76238258cf27dd36bc48c5946f51.jpg 20170716/thumbbcac76238258cf27dd36bc48c5946f51.jpg', '文章缩略图', '<p>词：李宗盛</p><p>曲：李宗盛</p><p>唱：林忆莲、李宗盛</p><p><span style="font-weight: 700;">女：</span>往事不要再提<br/>　　人生已多风雨<br/>　　纵然记忆抹不去<br/>　　爱与恨都还在心里<br/>　　真的要断了过去<br/>　　让明天好好继续<br/>　　你就不要再苦苦追问我的消息</p><p><img class="" src="/tp509/public/static/uploads/image/20170716/1500167528408285.jpg" alt="电影海报"/></p><p><span style="color: rgb(85, 85, 85); font-family: 宋体; font-size: 12px; line-height: 15px;">&nbsp; &nbsp; &nbsp; &nbsp;电影海报</span></p><p><span style="font-weight: 700;">男：</span>爱情它是个难题<br/>　　让人目眩神迷<br/>　　忘了痛或许可以<br/>　　忘了你却太不容易<br/>　　你不曾真的离去<br/>　　你始终在我心里<br/>　　我对你仍有爱意<br/>　　我对自己无能为力<br/>　　因为我仍有梦<br/>　　依然将你放在我心中<br/>　　总是容易被往事打动<br/>　　总是为了你心痛</p><p><span style="font-weight: 700;">女：</span>别流连岁月中　我无意的柔情万种<br/>　　不要问我是否再相逢<br/>　　不要管我是否言不由衷</p><p><span style="font-weight: 700;">女：</span>为何你不懂（<span style="font-weight: 700;">男：</span>别说我不懂）</p><p><span style="font-weight: 700;">女：</span>只要有爱就有痛（<span style="font-weight: 700;">男：</span>有爱就有痛）</p><p><span style="font-weight: 700;">女：</span>有一天你会知道</p><p><span style="font-weight: 700;">女：</span>人生没有我并不会不同（<span style="font-weight: 700;">男：</span>没有你会不同）</p><p><span style="font-weight: 700;">女：</span>人生已经太匆匆</p><p><span style="font-weight: 700;">女：</span>我好害怕总是泪眼朦胧（<span style="font-weight: 700;">男：</span>你泪眼朦胧）</p><p><span style="font-weight: 700;">女：</span>忘了我就没有痛（<span style="font-weight: 700;">男：</span>忘了你也没有用）</p><p><span style="font-weight: 700;">女：</span>将往事留在风中</p><p><span style="font-weight: 700;">女：</span>往事不要再提<br/>　　人生已多风雨<br/>　　纵然记忆抹不去<br/>　　爱与恨都还在心里<br/>　　真的要断了过去<br/>　　让明天好好继续<br/>　　你就不要再苦苦追问我的消息</p><p><span style="font-weight: 700;">女：</span>为何你不懂（<span style="font-weight: 700;">男：</span>别说我不懂）</p><p><span style="font-weight: 700;">女：</span>只要有爱就有痛（<span style="font-weight: 700;">男：</span>有爱就有痛）</p><p><span style="font-weight: 700;">女：</span>有一天你会知道</p><p><span style="font-weight: 700;">女：</span>人生没有我并不会不同（<span style="font-weight: 700;">男：</span>没有你会不同）</p><p><span style="font-weight: 700;">女：</span>人生已经太匆匆</p><p><span style="font-weight: 700;">女：</span>我好害怕总是泪眼朦胧（<span style="font-weight: 700;">男：</span>你泪眼朦胧）</p><p><span style="font-weight: 700;">女：</span>忘了我就没有痛（<span style="font-weight: 700;">男：</span>忘了你也没有用）</p><p><span style="font-weight: 700;">女：</span>将往事留在风中（<span style="font-weight: 700;">男：</span>将往事留在风中）</p><p><span style="font-weight: 700;">女：</span>为何你不懂（<span style="font-weight: 700;">男：</span>别说我不懂）</p><p><span style="font-weight: 700;">女：</span>只要有爱就有痛（<span style="font-weight: 700;">男：</span>有爱就有痛）</p><p><span style="font-weight: 700;">女：</span>有一天你会知道</p><p><span style="font-weight: 700;">女：</span>人生没有我并不会不同（<span style="font-weight: 700;">男：</span>没有你会不同）</p><p><span style="font-weight: 700;">女：</span>人生已经太匆匆</p><p><span style="font-weight: 700;">女：</span>我好害怕总是泪眼朦胧（<span style="font-weight: 700;">男：</span>你泪眼朦胧）</p><p><span style="font-weight: 700;">女：</span>忘了我就没有痛（<span style="font-weight: 700;">男白：</span>忘了你也没有用）</p><p><span style="font-weight: 700;">女：</span>将往事留在风中</p><p><br/></p>', '35', '1500168796');

-- ----------------------------
-- Records for `cate`
-- ----------------------------
INSERT INTO `cate` VALUES ('1', '大生活', '记录生活', '记录生活', '1', '0');
INSERT INTO `cate` VALUES ('2', '光影斑斓', '光影斑斓', '光影斑斓', '2', '0');
INSERT INTO `cate` VALUES ('4', '如是观', '如是观', '如是观', '3', '0');
INSERT INTO `cate` VALUES ('6', '留言本', '留言本', '留言本', '5', '1');
INSERT INTO `cate` VALUES ('7', '圈圈说', '圈圈说', '圈圈说', '4', '0');

-- ----------------------------
-- Records for `flink`
-- ----------------------------
INSERT INTO `flink` VALUES ('2', '百度', '百度', 'https://www.baidu.com');
INSERT INTO `flink` VALUES ('3', '淘宝', '淘宝', 'http://www.taobao.com');
INSERT INTO `flink` VALUES ('4', '腾讯', '腾讯', 'http://www.qq.com');
INSERT INTO `flink` VALUES ('1', 'thinkphp', 'thinkphp', 'http://www.thinkphp.cn/');
INSERT INTO `flink` VALUES ('5', 'blog', 'tp3.2.3-blog', 'http://localhost/blog');
INSERT INTO `flink` VALUES ('6', '今日头条', '今日头条', 'http://www.toutiao.com/');
INSERT INTO `flink` VALUES ('7', 'thinkall', 'thinkall', 'http://localhost/thinkall');
INSERT INTO `flink` VALUES ('8', 'thinkgroup', 'thinkgroup', 'http://localhost/thinkgroup');
INSERT INTO `flink` VALUES ('9', '站长工具', '站长工具', 'http://tool.chinaz.com/');
INSERT INTO `flink` VALUES ('10', 'bootstrap', 'bootstrap', 'http://v3.bootcss.com/');
INSERT INTO `flink` VALUES ('11', 'layui', 'layui', 'http://www.layui.com/demo/');

-- ----------------------------
-- Records for `implode`
-- ----------------------------
INSERT INTO `implode` VALUES ('1', '大生活', '记录生活', '记录生活', '1', '0');
INSERT INTO `implode` VALUES ('2', '光影斑斓', '光影斑斓', '光影斑斓', '2', '0');
INSERT INTO `implode` VALUES ('4', '如是观', '如是观', '如是观', '3', '0');
INSERT INTO `implode` VALUES ('6', '留言本', '留言本', '留言本', '5', '1');
INSERT INTO `implode` VALUES ('7', '圈圈说', '圈圈说', '圈圈说', '4', '0');

-- ----------------------------
-- Records for `members_blog`
-- ----------------------------
INSERT INTO `members_blog` VALUES ('1', '4', '1', '5', '');
INSERT INTO `members_blog` VALUES ('1', '5', '1', '4', '');

-- ----------------------------
-- Records for `testbackup`
-- ----------------------------
INSERT INTO `testbackup` VALUES ('1', '人生何处不相逢', '人生何处不相逢', '1', '人生 相逢', '随浪随风飘荡,随着一生里的浪,你我在重叠那一刹,顷刻各在一方.随浪随风飘荡,随着一生里的浪,你我在重叠那一刹,顷刻各在一方', '20170621/4a8f9239ab7ac1c70377433aa7a9332e.jpg 20170621/thumb4a8f9239ab7ac1c70377433aa7a9332e.jpg', '文章缩略图', '<pre style="margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;随浪随风飘荡
		随着一生里的浪
		你我在重叠那一刹
		顷刻各在一方
		缘份随风飘荡
		缘尽此生也守望
		你我在凝望那一刹
		心中有泪飘降
		纵是告别也交出真心意
		默默承受际遇
		某月某日也许再可跟你
		共聚重拾往事
		无奈重遇那天存在永远
		他方的晚空更是遥远
		谁在黄金海岸
		谁在烽烟彼岸
		你我在回望那一刹
		彼此慰问境况
		
		随浪随风飘荡
		人生何处不相逢
		人生何处不相逢
		随著一生里的浪
		你我在重叠那一刹
		顷刻各在一方
		缘份随风飘荡
		缘尽此生也守望
		你我在凝望那一刹
		心中有泪飘降
		纵是告别也交出真心意
		默默承受际遇
		某月某日也许再可跟你
		共聚重拾往事
		无奈重遇那天存在永远
		他方的晚空更是遥远
		谁在黄金海岸
		谁在烽烟彼岸
		你我在回望那一刹
		彼此慰问境况</pre><p><img src="http://img.baidu.com/hi/jx2/j_0002.gif"/></p>', '65', '1498050875');
INSERT INTO `testbackup` VALUES ('2', '千千阙歌', '千千阙歌', '1', '人生 感悟', '千千阙歌', '20170621/087d055f244bcd1ffd82c3ed62b5f4e4.jpg 20170621/thumb087d055f244bcd1ffd82c3ed62b5f4e4.jpg', '文章缩略图', '<p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;作词：<a target="_blank" href="http://baike.baidu.com/item/%E6%9E%97%E6%8C%AF%E5%BC%BA/8699290" style="color: rgb(19, 110, 194); text-decoration: none;">林振强</a></p><p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;作曲：Kohji Makanio</p><p style="text-align: justify;"><br/>　　徐徐回望 曾属於彼此的晚上</p><p style="text-align: justify;">　　如流傻泪 祈望可体恤兼见谅<br/>　　明晨离别你 路也许孤单得漫长<br/>　　一瞬间 太多东西要讲<br/>　　可惜即将在各一方<br/>　　只好深深把这刻尽凝望<br/>　　来日纵使<em>千千阕歌</em>飘於远方我路上<br/>　　来日纵使<em>千千</em>晚星 亮过今晚月亮<br/>　　都比不起这宵美丽<br/>　　亦绝不可使我更欣赏<br/>　　ah....因你今晚伴我唱</p><p style="text-align: justify;"><br/>　　临行临别 才顿感哀伤的漂亮<br/>　　原来全是你 令我的思忆漫长<br/>　　何年何月 才又可今宵一样<br/>　　停留凝望里 让眼睛讲彼此立场<br/>　　当某天 雨点轻敲你窗<br/>　　当风声吹乱你构想<br/>　　可否抽空 想这张旧模样<br/>　　来日纵使<em>千千阕歌</em>飘於远方我路上<br/>　　来日纵使<em>千千</em>晚星 亮过今晚月亮<br/>　　都比不起这宵美丽<br/>　　亦绝不可使我更欣赏<br/>　　ah....因你今晚伴我唱<br/>　　ah...怎都比不起这宵美丽<br/>　　亦绝不可使我更欣赏<br/>　　因今宵的我可共你唱</p><p><br/></p>', '89', '1498050899');
INSERT INTO `testbackup` VALUES ('4', '月半小夜曲', '月半小夜曲', '1', '人生 感悟', '月半小夜曲', '20170621/d626ecf6703c3f439e21bf043b9abf5e.jpg 20170621/thumbd626ecf6703c3f439e21bf043b9abf5e.jpg', '文章缩略图', '<p>仍然倚在失眠夜 望天边星宿</p><p><br/></p><p>仍然听见小提琴如泣似诉再挑逗</p><p>为何只剩一弯月 留在我的天空</p><p>这晚以后音讯隔绝</p><p>人如天上的明月 是不可拥有</p><p>情如曲过只遗留 无可挽救再分别</p><p>为何只是失望 填密我的空虚</p><p>这晚夜没有吻别</p><p>仍在说永久 想不到是借口</p><p>从未意会要分手</p><p>但我的心每分每刻 仍然被她占有　　</p><p><br/></p><p>她似这月儿 仍然是不开口</p><p>提琴独奏独奏着 明月半倚深秋</p><p>我的牵挂 我的渴望 直至以后</p><p>仍然倚在失眠夜 望天边星宿</p><p>仍然听见小提琴 如泣似诉再挑逗</p><p>为何只剩一弯月 留在我的天空</p><p>这晚以后音讯隔绝</p><p>人如天上的明月 是不可拥有</p><p>情如曲过只遗留 无可挽救再分别</p><p>为何只是失望 填密我的空虚</p><p>这晚夜没有吻别</p><p>仍在说永久 想不到是借口</p><p>从未意会要分手</p><p>但我的心每分每刻 仍然被她占有</p><p>她似这月儿 仍然是不开口</p><p>提琴独奏独奏着 明月半倚深秋</p><p>我的牵挂 我的渴望 直至以后</p><p>仍在说永久 想不到是借口</p><p>从未意会要分手</p><p>但我的心每分每刻 仍然被她占有</p><p>她似这月儿 仍然是不开口</p><p>提琴独奏独奏着 明月半倚深秋</p><p>我的牵挂 我的渴望 直至以后<span style="font-size: 12px; line-height: 0; position: relative; vertical-align: baseline; top: -0.5em; margin-left: 2px; color: rgb(51, 102, 204); cursor: default; padding: 0px 2px;">[1]</span><a class="sup-anchor" style="color: rgb(19, 110, 194); position: relative; top: -50px; font-size: 0px; line-height: 0;">&nbsp;</a></p><p><br/></p>', '490', '1498050572');
INSERT INTO `testbackup` VALUES ('15', '流年-王菲', '流年-王菲', '2', '王菲', '《流年》是王菲演唱的一首歌曲，由林夕作词，陈晓娟作曲，收录于王菲专辑《王菲2001》中，是王菲2010~2012年亚洲巡唱的固定曲目', '20170621/033871f87eac4e69933f690f7d5023cb.jpg 20170621/thumb033871f87eac4e69933f690f7d5023cb.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">爱上一个天使的缺点
用一种魔鬼的语言
上帝在云端只眨了一眨眼
最后眉一皱头一点

爱上一个认真的消遣
用一朵花开的时间
你在我旁边只打了个照面
五月的晴天闪了电

有生之年狭路相逢终不能幸免
手心忽然长出纠缠的曲线
懂事之前情动以后长不过一天
留不住算不出流年

遇见一场烟火的表演
用一场轮回的时间
紫微星流过
已经远离我一光年

有生之年狭路相逢终不能幸免
手心忽然长出纠缠的曲线
懂事之前情动以后长不过一天
留不住算不出流年

有生之年狭路相逢终不能幸免
手心忽然长出纠缠的曲线
懂事之前情动以后长不过一天</pre><p><img src="/tp509/public/static/uploads/image/20170620/1497889992132206.jpg" title="1497889992132206.jpg" alt="95eef01f3a292df50d8d31e5be315c6035a873f0.jpg"/></p>', '30', '1498049284');
INSERT INTO `testbackup` VALUES ('5', '飘雪', '飘雪', '2', '生活 感悟', '飘雪', '', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">歌名：飘雪
　　作曲：K.Kuwata
　　又见雪飘过
　　飘于伤心记忆中
　　让我再想你
　　却掀起我心痛
　　早经分了手
　　为何热爱尚情重
　　独过追忆岁月
　　或许此生不会懂
　　又再想起你
　　抱拥飘飘白雪中
　　让你心中暖
　　去驱走我冰冻
　　冷风催我醒
　　原来共你是场梦
　　像那飘飘雪泪下
　　弄湿冷清的晚空
　　原来是那么深爱你
　　此际伴着我追忆的心痛</pre><p><br/></p>', '158', '1497597044');
INSERT INTO `testbackup` VALUES ('6', '想起', '想起', '2', '人生 相逢', '想起', '20170621/60186fa415c2059f5c5fe3ccaf88c7e0.jpg 20170621/thumb60186fa415c2059f5c5fe3ccaf88c7e0.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">发行时间：2001年
歌词：
刚刚风无意吹起
花瓣随着风落地
我看见多么美的一场樱花雨
闻一闻茶的香气
哼一段旧时旋律
要是你一定欢天喜地
你曾经坐在这里
谈吐得那么阔气
就像是所有幸福都能被预期
你打开我的手心
一切都突然安静
你要我承接你的真心
花季虽然会过去
今年明年
有一样的风情
相爱以为是你给的美丽
让我惊喜让我庆幸
我有一生的风景
命运插手得太急
我来不及
全都要还回去
从此是一段长长的距离
偶尔想起总是唏嘘
如果当初懂珍惜
我知道眼泪多余
笑变得好不容易
特别是只能面对回忆和空气
多半的自言自语
是用来安慰自己
也许你字字句句倾听</pre><p><br/></p>', '32', '1500194683');
INSERT INTO `testbackup` VALUES ('7', '大悲咒', '大悲咒', '4', '大悲咒', '大悲咒', '20170621/a1837626a42fdd6acf34d2962d57722a.jpg 20170621/thumba1837626a42fdd6acf34d2962d57722a.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">Na&nbsp;Mo&nbsp;He&nbsp;Na&nbsp;Da&nbsp;Na&nbsp;Duo&nbsp;Na&nbsp;Ye&nbsp;Ye&nbsp;Na&nbsp;Mo
南&nbsp;无、喝&nbsp;罗&nbsp;怛&nbsp;那、哆&nbsp;罗&nbsp;夜&nbsp;耶.&nbsp;南&nbsp;无
AO&nbsp;Li&nbsp;Ye&nbsp;Po&nbsp;Lu&nbsp;Jie&nbsp;Di&nbsp;Shuo&nbsp;Bo&nbsp;Na&nbsp;Ye
阿&nbsp;唎&nbsp;耶.&nbsp;婆&nbsp;卢&nbsp;羯&nbsp;帝、烁&nbsp;钵&nbsp;罗&nbsp;耶.
Pu&nbsp;Ti&nbsp;Sa&nbsp;Duo&nbsp;Po&nbsp;Ye&nbsp;Mo&nbsp;He&nbsp;Sa&nbsp;Duo&nbsp;Po&nbsp;Ye
菩&nbsp;提&nbsp;萨&nbsp;埵&nbsp;婆&nbsp;耶,&nbsp;摩&nbsp;诃&nbsp;萨&nbsp;埵&nbsp;婆&nbsp;耶.
Mo&nbsp;He&nbsp;Jia&nbsp;Lu&nbsp;Ni&nbsp;Jia&nbsp;Ye&nbsp;An&nbsp;Sa&nbsp;Bo&nbsp;Na&nbsp;Fa&nbsp;Yi
摩&nbsp;诃、迦&nbsp;卢&nbsp;尼&nbsp;迦&nbsp;耶.&nbsp;唵，萨&nbsp;皤&nbsp;罗&nbsp;罚&nbsp;曳,
Su&nbsp;Da&nbsp;Na&nbsp;Da&nbsp;Xia&nbsp;Na&nbsp;Mo&nbsp;Xi&nbsp;Ji&nbsp;Lie&nbsp;Duo&nbsp;Yi&nbsp;Mong&nbsp;AO&nbsp;Li&nbsp;Ye
数&nbsp;怛&nbsp;那&nbsp;怛&nbsp;写.&nbsp;南&nbsp;无、悉&nbsp;吉&nbsp;栗&nbsp;埵、&nbsp;伊&nbsp;蒙&nbsp;阿&nbsp;唎&nbsp;耶.
Po&nbsp;Lu&nbsp;Jie&nbsp;Di&nbsp;Shi&nbsp;Fu&nbsp;Na&nbsp;Leng&nbsp;Tuo&nbsp;Po
婆&nbsp;卢&nbsp;吉&nbsp;帝、室&nbsp;佛&nbsp;罗&nbsp;愣&nbsp;驮&nbsp;婆.
Na&nbsp;Mo&nbsp;No&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Shi&nbsp;Li&nbsp;Mo&nbsp;He&nbsp;Ba&nbsp;Duo&nbsp;Suo&nbsp;Mi
南&nbsp;无、那&nbsp;罗&nbsp;谨&nbsp;墀.&nbsp;醯&nbsp;利&nbsp;摩&nbsp;诃、皤&nbsp;哆&nbsp;沙&nbsp;咩.
Sa&nbsp;Po&nbsp;AO&nbsp;Ta&nbsp;Dou&nbsp;Shu&nbsp;Peng&nbsp;AO&nbsp;Shi&nbsp;Yun&nbsp;Sa&nbsp;Po&nbsp;Sa&nbsp;Duo&nbsp;Na&nbsp;Mo&nbsp;Po&nbsp;Sa&nbsp;Duo
萨&nbsp;婆&nbsp;阿&nbsp;他、豆&nbsp;输&nbsp;朋、&nbsp;阿&nbsp;逝&nbsp;孕.&nbsp;萨&nbsp;婆&nbsp;萨&nbsp;哆、那&nbsp;摩&nbsp;婆&nbsp;萨&nbsp;哆,
Na&nbsp;Mo&nbsp;Po&nbsp;Qie&nbsp;Mo&nbsp;Fa&nbsp;Te&nbsp;Dou
那&nbsp;摩&nbsp;婆&nbsp;伽，摩&nbsp;罚&nbsp;特&nbsp;豆.
Da&nbsp;Zhi&nbsp;Ta&nbsp;An&nbsp;AO&nbsp;Po&nbsp;Lu&nbsp;Xi&nbsp;Lu&nbsp;Jia&nbsp;Di&nbsp;Jia&nbsp;Lu&nbsp;Di&nbsp;Yi&nbsp;Xi&nbsp;Li
怛&nbsp;侄&nbsp;他,&nbsp;唵，阿&nbsp;婆&nbsp;卢&nbsp;醯．卢&nbsp;迦&nbsp;帝,&nbsp;迦&nbsp;罗&nbsp;帝．夷&nbsp;醯&nbsp;唎.
Mo&nbsp;He&nbsp;Pu&nbsp;Ti&nbsp;Sa&nbsp;Duo&nbsp;Sa&nbsp;Po&nbsp;Sa&nbsp;Po
摩&nbsp;诃&nbsp;菩&nbsp;提&nbsp;萨&nbsp;埵.&nbsp;萨&nbsp;婆&nbsp;萨&nbsp;婆,
Mo&nbsp;Na&nbsp;Mo&nbsp;Na&nbsp;Mo&nbsp;Xi&nbsp;Mo&nbsp;Xi&nbsp;Lie&nbsp;Tuo&nbsp;Yun&nbsp;Ju&nbsp;Lu&nbsp;Ju&nbsp;Lu&nbsp;Jie&nbsp;Mong
摩&nbsp;罗&nbsp;摩&nbsp;罗,&nbsp;摩&nbsp;醯&nbsp;摩&nbsp;醯、唎&nbsp;驮&nbsp;孕.&nbsp;俱&nbsp;卢&nbsp;俱&nbsp;卢、羯&nbsp;蒙.
Du&nbsp;Lu&nbsp;Du&nbsp;Lu&nbsp;Fa&nbsp;She&nbsp;Ye&nbsp;Di&nbsp;Mo&nbsp;He&nbsp;Fa&nbsp;She&nbsp;Ye&nbsp;Di
度&nbsp;卢&nbsp;度&nbsp;卢、罚&nbsp;闍&nbsp;耶&nbsp;帝.&nbsp;摩&nbsp;诃、罚&nbsp;闍&nbsp;耶&nbsp;帝.
Tuo&nbsp;Na&nbsp;Tuo&nbsp;Na&nbsp;Di&nbsp;Li&nbsp;Ni&nbsp;Shi&nbsp;Fu&nbsp;Na&nbsp;Ye
陀&nbsp;罗&nbsp;陀&nbsp;罗,&nbsp;地&nbsp;唎&nbsp;尼,&nbsp;室&nbsp;佛&nbsp;罗&nbsp;耶.
Zhe&nbsp;Na&nbsp;Zhe&nbsp;Na&nbsp;Mo&nbsp;Mo&nbsp;Fa&nbsp;Mo&nbsp;Na&nbsp;Mo&nbsp;Die&nbsp;Lie
遮&nbsp;罗&nbsp;遮&nbsp;罗,&nbsp;摩&nbsp;麼&nbsp;罚&nbsp;摩&nbsp;罗,&nbsp;穆&nbsp;帝&nbsp;隶.
Yi&nbsp;Xi&nbsp;Yi&nbsp;Xi&nbsp;Shi&nbsp;Na&nbsp;Shi&nbsp;Na&nbsp;Ou&nbsp;Na&nbsp;Sen&nbsp;Fu&nbsp;Na&nbsp;She&nbsp;Li
伊&nbsp;醯&nbsp;伊&nbsp;醯,&nbsp;室&nbsp;那&nbsp;室&nbsp;那,&nbsp;阿&nbsp;罗&nbsp;参、佛&nbsp;罗&nbsp;舍&nbsp;利.
Fa&nbsp;Sa&nbsp;Fa&nbsp;Seng&nbsp;Fu&nbsp;Na&nbsp;She&nbsp;Ye
罚&nbsp;沙&nbsp;罚&nbsp;参.&nbsp;佛&nbsp;罗&nbsp;舍&nbsp;耶.
Hu&nbsp;Lu&nbsp;Hu&nbsp;Lu&nbsp;Mo&nbsp;Na&nbsp;Hu&nbsp;Lu&nbsp;Hu&nbsp;Lu&nbsp;Xi&nbsp;Li&nbsp;Suo&nbsp;Na&nbsp;Suo&nbsp;Na
呼&nbsp;嚧&nbsp;呼&nbsp;嚧&nbsp;摩&nbsp;罗,&nbsp;呼&nbsp;嚧&nbsp;呼&nbsp;嚧&nbsp;醯&nbsp;利.&nbsp;娑&nbsp;罗&nbsp;娑&nbsp;罗,
Xi&nbsp;Li&nbsp;Xi&nbsp;Li&nbsp;Su&nbsp;Lu&nbsp;Su&nbsp;Lu&nbsp;Pu&nbsp;Ti&nbsp;Ye&nbsp;Pu&nbsp;Ti&nbsp;Ye
悉&nbsp;唎&nbsp;悉&nbsp;唎,&nbsp;苏&nbsp;嚧&nbsp;苏&nbsp;嚧.&nbsp;菩&nbsp;提&nbsp;夜、菩&nbsp;提&nbsp;夜.
Pu&nbsp;Tuo&nbsp;Ye&nbsp;Pu&nbsp;Tuo&nbsp;Ye&nbsp;Mi&nbsp;Di&nbsp;Li&nbsp;Ye
菩&nbsp;驮&nbsp;夜、菩&nbsp;驮&nbsp;夜.&nbsp;弥&nbsp;帝&nbsp;唎&nbsp;夜,
Nuo&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Di&nbsp;Li&nbsp;Se&nbsp;Ni&nbsp;Na&nbsp;Po&nbsp;Ye&nbsp;Mo&nbsp;Na
那&nbsp;罗&nbsp;谨&nbsp;墀.&nbsp;地&nbsp;利&nbsp;瑟&nbsp;尼&nbsp;那,&nbsp;波&nbsp;夜&nbsp;摩&nbsp;那,
Suo&nbsp;Po&nbsp;He&nbsp;Xi&nbsp;Tuo&nbsp;Ye&nbsp;Suo&nbsp;Po&nbsp;He&nbsp;Mo&nbsp;He&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;悉&nbsp;陀&nbsp;夜,&nbsp;娑&nbsp;婆&nbsp;诃.&nbsp;摩&nbsp;诃&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Xi&nbsp;Tuo&nbsp;Yu&nbsp;Yi&nbsp;Shi&nbsp;Bo&nbsp;Na&nbsp;Ya
娑&nbsp;婆&nbsp;诃.&nbsp;悉&nbsp;陀&nbsp;喻&nbsp;艺,&nbsp;室&nbsp;皤&nbsp;罗&nbsp;耶,
Suo&nbsp;Po&nbsp;He&nbsp;Nuo&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Suo&nbsp;Po&nbsp;He
娑&nbsp;婆&nbsp;诃.&nbsp;那&nbsp;罗&nbsp;谨&nbsp;墀,&nbsp;娑&nbsp;婆&nbsp;诃.
Mo&nbsp;Na&nbsp;Nuo&nbsp;Na&nbsp;Suo&nbsp;Po&nbsp;He&nbsp;Xi&nbsp;Na&nbsp;Sen&nbsp;AO&nbsp;Mu&nbsp;Qie&nbsp;Ye
摩&nbsp;罗&nbsp;那&nbsp;罗,&nbsp;娑&nbsp;婆&nbsp;诃.&nbsp;悉&nbsp;罗&nbsp;僧、阿&nbsp;穆&nbsp;佉&nbsp;耶,
Suo&nbsp;Po&nbsp;He&nbsp;Suo&nbsp;Po&nbsp;Mo&nbsp;He&nbsp;AO&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;娑&nbsp;婆&nbsp;摩&nbsp;诃、阿&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Zhe&nbsp;Ji&nbsp;Na&nbsp;AO&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;者&nbsp;吉&nbsp;罗、阿&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;he&nbsp;Bo&nbsp;Tuo&nbsp;Mo&nbsp;Ji&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;波&nbsp;陀&nbsp;摩、羯&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Nuo&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Bu&nbsp;Qie&nbsp;Na&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;那&nbsp;罗&nbsp;谨&nbsp;墀、&nbsp;皤&nbsp;伽&nbsp;罗&nbsp;耶,
Suo&nbsp;Po&nbsp;He&nbsp;Mo&nbsp;Po&nbsp;Li&nbsp;Sen&nbsp;Ji&nbsp;Na&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;摩&nbsp;婆&nbsp;利、胜&nbsp;羯&nbsp;罗&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Na&nbsp;Mo&nbsp;He&nbsp;Na&nbsp;Da&nbsp;Na&nbsp;Duo&nbsp;Na&nbsp;Ye&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;南&nbsp;无&nbsp;喝&nbsp;罗&nbsp;怛&nbsp;那、哆&nbsp;罗&nbsp;夜&nbsp;耶.
Na&nbsp;Mo&nbsp;AO&nbsp;Li&nbsp;Ye&nbsp;Po&nbsp;Lu&nbsp;Jie&nbsp;Di
南&nbsp;无&nbsp;阿&nbsp;唎&nbsp;耶.&nbsp;婆&nbsp;嚧&nbsp;吉&nbsp;帝,
Suo&nbsp;Bo&nbsp;Na&nbsp;Ye&nbsp;Suo&nbsp;Po&nbsp;He&nbsp;An&nbsp;Xi&nbsp;Dian&nbsp;Du
烁&nbsp;皤&nbsp;罗&nbsp;夜,&nbsp;娑&nbsp;婆&nbsp;诃.&nbsp;唵，悉&nbsp;殿&nbsp;都,
Man&nbsp;Duo&nbsp;Na&nbsp;Ba&nbsp;Tuo&nbsp;Ye&nbsp;Suo&nbsp;Po&nbsp;He
漫&nbsp;多&nbsp;罗,&nbsp;跋&nbsp;陀&nbsp;耶,&nbsp;娑&nbsp;婆&nbsp;诃.</pre><p><br/></p>', '26', '1498050952');
INSERT INTO `testbackup` VALUES ('8', '情非得已', '情非得已', '6', '情非得已', '情非得已', '20170621/ee2da7a54489ca372030d89a87ba5d36.jpg 20170621/thumbee2da7a54489ca372030d89a87ba5d36.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">

难以忘记初次见你一双迷人的眼睛
在我脑海里你的身影挥散不去
握你的双手感觉你的温柔
真的有点透不过气你的天真我想珍惜
(看到你受委屈我会伤心)
wo----
只怕我自己会爱上你不敢让自己靠的太近
怕我没什么能够给你爱你也需要很大的勇气
只怕我自己会爱上你也许有天会情不自禁
想念只让自己苦了自己爱上你是我
爱上你是我
难以忘记初次见你一双迷人的眼睛
在我脑海里你的身影挥散不去
握你的双手感觉你的温柔
真的有点透不过气你的天真我想珍惜
(看到你受委屈我会伤心)
wo----
只怕我自己会爱上你不敢让自己靠的太近
怕我没什么能够给你爱你也需要很大的勇气
只怕我自己会爱上你也许有天会情不自禁
想念只让自己苦了自己爱上你是我情非得已
爱上你是我情非得已
什么原因我竟然又会遇见你
我真的真的不愿意就这样陷入
只怕我自己会爱上你不敢让自己靠的太近
怕我没什么能够给你爱你也需要很大的勇气
只怕我自己会爱上你也许有天会情不自禁
想念只让自己苦了自己爱上你是我情非得已
爱上你是我情非得已
爱上你是我情非得已</pre><p><br/></p>', '34', '1498050934');
INSERT INTO `testbackup` VALUES ('9', '独家记忆', '独家记忆', '7', '独家记忆', '独家记忆', '20170621/8b7cd7f0bd5f18288420be90c437d4ea.jpg 20170621/thumb8b7cd7f0bd5f18288420be90c437d4ea.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">忘记分开后的第几天起&nbsp;　　
喜欢一个人&nbsp;看下大雨&nbsp;　　
没联络&nbsp;孤单就像连锁反应&nbsp;　　
想要快乐都没力气&nbsp;　　

雷雨世界像场灾难电影&nbsp;　　
让现在的我&nbsp;可怜到底&nbsp;　　
对不起&nbsp;谁也没有&nbsp;　　
想要结束的&nbsp;没有商量的余地&nbsp;　　

我希望你&nbsp;是我独家的记忆&nbsp;　　
摆在心底&nbsp;　　
不管别人说的多么难听&nbsp;　　
现在我拥有的事情&nbsp;　　
是你&nbsp;是给我一半的爱情&nbsp;　　
我喜欢你&nbsp;是我独家的记忆&nbsp;　　
谁也不行&nbsp;　　
从我这个身体中拿走你&nbsp;　　
在我感情的封锁区&nbsp;　　
有关于你&nbsp;绝口不提&nbsp;没关系&nbsp;　
　
雷雨世界像场灾难电影&nbsp;　　
让现在的我&nbsp;可怜到底&nbsp;　　
对不起&nbsp;谁也没有&nbsp;　　
已经结束的&nbsp;没有商量的余地&nbsp;　　

我希望你&nbsp;是我独家的记忆&nbsp;　　
摆在心底&nbsp;　　
不管别人说的多么难听&nbsp;　　
现在我拥有的事情&nbsp;　　
是你&nbsp;是给我一半的爱情&nbsp;　　
我喜欢你&nbsp;是我独家的记忆&nbsp;　　
谁也不行&nbsp;　　
从我这个身体中拿走你&nbsp;　　
在我感情的封锁区&nbsp;　　
有关于你&nbsp;绝口不提&nbsp;没关系&nbsp;　　

我希望你&nbsp;是我独家的记忆&nbsp;　　
摆在心底&nbsp;　　
不管别人说的多么难听&nbsp;　　
现在我拥有的事情&nbsp;　　
是你&nbsp;是给我一半的爱情&nbsp;　　
我喜欢你&nbsp;是我独家的记忆&nbsp;　　
谁也不行&nbsp;　　
从我这个身体中拿走你&nbsp;　　
在我感情的封锁区&nbsp;　　
有关于你&nbsp;绝口不提&nbsp;没限期</pre><p><br/></p>', '439', '1498050914');
INSERT INTO `testbackup` VALUES ('10', '半壶纱-刘珂矣', '半壶纱-刘珂矣', '4', '感悟 大悲咒', '墨已入水 渡一池青花  揽五分红霞 采竹回家  悠悠风来 埋一地桑麻  一身袈裟 把相思放下 十里桃花 待嫁的年华', '20170621/333c4b578be51cd920fa826a40924690.jpg 20170621/thumb333c4b578be51cd920fa826a40924690.jpg', '文章缩略图', '<p>墨已入水 渡一池青花</p><p>揽五分红霞 采竹回家</p><p>悠悠风来 埋一地桑麻</p><p>一身袈裟 把相思放下</p><p>十里桃花 待嫁的年华</p><p>凤冠的珍珠 挽进头发</p><p>檀香拂过 玉镯弄轻纱</p><p>空留一盏 芽色的清茶</p><p>倘若我心中的山水 你眼中都看到</p><p>我便一步一莲花祈祷</p><p>怎知那浮生一片草 岁月催人老</p><p><br/></p><p>风月花鸟 一笑尘缘了</p><p>十里桃花 待嫁的年华</p><p>凤冠的珍珠 挽进头发</p><p>檀香拂过 玉镯弄轻纱</p><p>空留一盏 芽色的清茶</p><p>倘若我心中的山水 你眼中都看到</p><p>我便一步一莲花祈祷</p><p>怎知那浮生一片草 岁月催人老</p><p>风月花鸟 一笑尘缘了</p><p>倘若我心中的山水 你眼中都看到</p><p>我便一步一莲花祈祷</p><p>怎知那浮生一片草 岁月催人老</p><p>风月花鸟 一笑尘缘了</p><p>怎知那浮生一片草 岁月催人老</p><p>风月花鸟 一笑尘缘了</p><p><br/></p>', '42', '1498050590');
INSERT INTO `testbackup` VALUES ('11', '忍别离', '忍别离', '2', '感悟 人生', '《忍别离[1]  》是歌手崔子格演唱的歌曲，袁亮作词，赵佳霖作曲编曲，该歌曲收录在专辑《小美人》中。', '20170621/74ae1f39ab8d8a201b720d4d75801a36.jpg 20170621/thumb74ae1f39ab8d8a201b720d4d75801a36.jpg', '文章缩略图', '<p>西风夜渡寒山雨</p><p>家国依稀残梦里</p><p>思君不见倍思君</p><p>别离难忍忍别离</p><p>狼烟烽火何时休</p><p>成王败寇尽东流</p><p>蜡炬已残泪难干</p><p>江山未老红颜旧</p><p>忍别离</p><p>不忍却要别离</p><p>托鸿雁南去</p><p>不知此心何寄</p><p>红颜旧</p><p>任凭斗转星移</p><p>不变是此情悠悠</p><p>狼烟烽火何时休</p><p>成王败寇尽东流</p><p>蜡炬已残泪难干</p><p>江山未老红颜旧</p><p>忍别离</p><p>不忍却要别离</p><p>托鸿雁南去</p><p>不知此心何寄</p><p>红颜旧</p><p>任凭斗转星移</p><p>不变是此情悠悠</p><p>忍别离</p><p>不忍却要别离</p><p>托鸿雁南去</p><p>不知此心何寄</p><p>红颜旧</p><p>任凭斗转星移</p><p>不变是此情悠悠</p><p>不变是此情悠悠</p><p>不变是此情悠悠</p><p><br/></p>', '4', '1498050602');
INSERT INTO `testbackup` VALUES ('12', '容易受伤的女人-王菲', '容易受伤的女人-王菲', '2', '王菲 女人', '《容易受伤的女人》是王菲于1992年下半年，从美国返港并重新踏入乐坛而发行的唱片《COMING HOME》中的歌曲。王菲这张唱片一推出即断市，销量迅速冲破白金，碟内的《容易受伤的女人》，横扫全港，更在各电视台的音乐颁奖礼中，勇夺金曲，声势可谓一时无两，令她一举跃入香港一线女歌手的行列', '20170621/5b612877b2556a31ed07a596dc6f3873.jpg 20170621/thumb5b612877b2556a31ed07a596dc6f3873.jpg', '文章缩略图', '<p>人渐醉了夜更深</p><p>在这一刻多么接近</p><p>思想仿似在摇撼</p><p>矛盾也更深</p><p>曾被破碎过的心</p><p>让你今天轻轻贴近</p><p>多少安慰及疑问</p><p>偷偷的再生</p><p>情难自禁</p><p>我却其实属于</p><p>极度容易受伤的女人</p><p>不要　不要 &nbsp;不要骤来骤去</p><p>请珍惜我的心</p><p>如明白我</p><p>继续情愿热恋</p><p>这个容易受伤的女人</p><p>不要等　这一刻</p><p>请热吻</p><p><img src="/ueditor/php/upload/image/20170619/1497879212206423.jpg" alt="1497879212206423.jpg"/></p><p>长夜有你醉也真</p><p>让我终于找到信任</p><p>不管一切是疑问</p><p>快乐是情人</p><p>曾害怕了这一生</p><p>是你始终甘心靠近</p><p>我方知拥有着缘份</p><p>重建我信心</p><p>曾被破碎过的心</p><p>让你今天轻轻贴近</p><p>多少安慰及疑问</p><p>偷偷的再生</p><p>情难自禁</p><p>我却其实属于</p><p>极度容易受伤的女人</p><p>不要　不要</p><p>不要骤来骤去</p><p>请珍惜我的心</p><p>如明白我</p><p>继续情愿热恋</p><p>这个容易受伤的女人</p><p>终此一生</p><p>也火般的热吻</p><p>长夜有你醉也真</p><p>让我终于找到信任</p><p>不管一切是疑问</p><p>快乐是情人</p><p>情难自禁</p><p>我却其实属于</p><p>极度容易受伤的女人</p><p>不要　不要</p><p>不要骤来骤去</p><p>请珍惜我的心</p><p>如明白我</p><p>继续情愿热恋</p><p>这个容易受伤的女人</p><p>不要等　这一刻</p><p>请热吻</p><p>长夜有你醉也真</p><p>让我终于找到信任</p><p>不管一切是疑问</p><p>快乐是情人</p><p><br/></p>', '59', '1498049261');
INSERT INTO `testbackup` VALUES ('13', '我愿意-王菲', '我愿意-王菲', '2', '王菲 爱情', '《我愿意》是王菲演唱的一首歌曲，由姚谦作词，黄国伦作曲，收录于1994年新艺宝发行的专辑《迷》中，是其早期代表作之一', '20170621/56f04ddf58e6212698e9e2246da517f5.jpg 20170621/thumb56f04ddf58e6212698e9e2246da517f5.jpg', '文章缩略图', '<pre>歌名：我愿意
原唱：王菲（王靖雯）
填词：姚谦
谱曲：黄国伦
编曲：Nathan&nbsp;Wang
专辑：《迷》

歌词：
思念是一种很玄的东西&nbsp;如影随形
无声又无息出没在心底
转眼&nbsp;吞没我在寂默里
我无力抗拒&nbsp;特别是夜里
想你到无法呼吸
恨不能立即&nbsp;朝你狂奔去
大声的告诉你
愿意为你&nbsp;我愿意为你
我愿意为你&nbsp;忘记我姓名
就算多一秒&nbsp;停留在你怀里
失去世界也不可惜
我愿意为你&nbsp;我愿意为你
我愿意为你&nbsp;被放逐天际
只要你真心&nbsp;拿爱与我回应
什么都愿意&nbsp;什么都愿意&nbsp;为你</pre><p><br/></p>', '49', '1498050613');

-- ----------------------------
-- Records for `think_auth_group`
-- ----------------------------
INSERT INTO `think_auth_group` VALUES ('1', '超级管理', '1', '1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25');
INSERT INTO `think_auth_group` VALUES ('2', '普通管理', '1', '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,19,34,35');
INSERT INTO `think_auth_group` VALUES ('3', '编辑', '1', '1,2,3,4,5,19,34,35');
INSERT INTO `think_auth_group` VALUES ('4', '钻石会员', '0', '1,2,7,15,19');
INSERT INTO `think_auth_group` VALUES ('5', '金牌会员', '0', '');
INSERT INTO `think_auth_group` VALUES ('6', '银牌会员', '0', '');
INSERT INTO `think_auth_group` VALUES ('7', '铜牌会员', '0', '');
INSERT INTO `think_auth_group` VALUES ('8', '普通会员', '1', '');
INSERT INTO `think_auth_group` VALUES ('10', '后台测试', '1', '');

-- ----------------------------
-- Records for `think_auth_group_access`
-- ----------------------------
INSERT INTO `think_auth_group_access` VALUES ('1', '1');
INSERT INTO `think_auth_group_access` VALUES ('2', '2');
INSERT INTO `think_auth_group_access` VALUES ('3', '3');
INSERT INTO `think_auth_group_access` VALUES ('8', '8');
INSERT INTO `think_auth_group_access` VALUES ('9', '8');
INSERT INTO `think_auth_group_access` VALUES ('10', '8');
INSERT INTO `think_auth_group_access` VALUES ('12', '10');

-- ----------------------------
-- Records for `think_auth_rule`
-- ----------------------------
INSERT INTO `think_auth_rule` VALUES ('1', 'admin/blog', '博文管理', '0', '1', '1', '1', '');
INSERT INTO `think_auth_rule` VALUES ('2', 'admin/blog/bloglist', '博文列表', '1', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('3', 'admin/blog/addblog', '新增博文', '1', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('4', 'admin/blog/editorblog', '修改博文', '1', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('5', 'admin/blog/deleteblog', '删除博文', '1', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('6', 'admin/cate', '栏目管理', '0', '1', '1', '2', '');
INSERT INTO `think_auth_rule` VALUES ('7', 'admin/cate/catelist', '栏目列表', '6', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('8', 'admin/cate/addcate', '新增栏目', '6', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('9', 'admin/cate/editorcate', '修改栏目', '6', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('10', 'admin/cate/deletecate', '删除栏目', '6', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('11', 'admin/flink', '链接管理', '0', '1', '1', '3', '');
INSERT INTO `think_auth_rule` VALUES ('12', 'admin/flink/addflink', '新增链接', '11', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('13', 'admin/flink/editorflink', '修改链接', '11', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('14', 'admin/flink/deleteflink', '删除链接', '11', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('15', 'admin/flink/flinklist', '链接列表', '11', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('16', 'admin/members', '用户管理', '0', '1', '1', '4', '');
INSERT INTO `think_auth_rule` VALUES ('17', 'admin/members/memberslist', '用户列表', '16', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('18', 'admin/members/addmembers', '新增用户', '16', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('19', 'admin/members/editormembers', '修改用户', '16', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('20', 'admin/members/deletemembers', '删除用户', '16', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('21', 'admin/authrule', '规则管理', '0', '1', '1', '4', '');
INSERT INTO `think_auth_rule` VALUES ('22', 'admin/authrule/authrulelist', '规则列表', '21', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('23', 'admin/authrule/addauthrule', '新增规则', '21', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('24', 'admin/authrule/editorauthrule', '修改规则', '21', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('25', 'admin/authrule/deleteauthrule', '删除规则', '21', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('26', 'admin/authgroup', '用户组管理', '0', '1', '1', '5', '');
INSERT INTO `think_auth_rule` VALUES ('27', 'admin/authgroup/authgrouplist', '用户组列表', '26', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('28', 'admin/authgroup/addauthgroup', '新增用户组', '26', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('29', 'admin/authgroup/editorauthgroup', '修改用户组', '26', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('30', 'admin/authgroup/deleteauthgroup', '删除用户组', '26', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('31', 'index', '前端', '0', '1', '1', '0', '');

-- ----------------------------
-- Records for `think_members`
-- ----------------------------
INSERT INTO `think_members` VALUES ('1', 'admin', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '1501071894', '0.0.0.0', '10', '0', '1', '0', '4,5');
INSERT INTO `think_members` VALUES ('3', 'berlin', 'd35a02eb49149450fb2fffc6e467eb37', '', '', '', '', '0', '', '10', '0', '1', '0', '');
INSERT INTO `think_members` VALUES ('2', 'heiying', '45a527d9abccda821c550f4763a92828', '', '', '', '', '0', '', '10', '0', '1', '0', '');
INSERT INTO `think_members` VALUES ('8', 'zhangsan', '01d7f40760960e7bd9443513f22ab9af', '15107384431', '', '', '', '1498726417', '0.0.0.0', '10', '0', '0', '0', '');
INSERT INTO `think_members` VALUES ('9', 'wangwu', '9f001e4166cf26bfbdd3b4f67d9ef617', '15107384432', '', '', '', '1498668518', '0.0.0.0', '10', '0', '0', '0', '');

-- ----------------------------
-- Records for `webuploader`
-- ----------------------------
INSERT INTO `webuploader` VALUES ('1', '20170626/a66979ef7c76a222bbe8178104403be7.jpg');
INSERT INTO `webuploader` VALUES ('2', '20170626/3bea5d16d5875a5a1b421da027d1e55c.jpg');
INSERT INTO `webuploader` VALUES ('3', '20170626/c3e03d65a0027f343f284a1141ab71e1.jpg');
INSERT INTO `webuploader` VALUES ('4', '20170626/d78e41317481998ae4fd8efdf0acbb85.jpg');
INSERT INTO `webuploader` VALUES ('5', '20170626/4dcdcf7af07d6650956cd38b47d3e55f.jpg');
INSERT INTO `webuploader` VALUES ('6', '20170626/2be6813c7d124f58856b3174d6c09273.jpg');
INSERT INTO `webuploader` VALUES ('7', '20170626/66d6cc4c82c2e229b148b5285b82ff2c.jpg');
INSERT INTO `webuploader` VALUES ('8', '20170626/4d94bfe9fe315784cb0d0bfc139ac275.jpg');
INSERT INTO `webuploader` VALUES ('9', '20170626/34450a9f2b174bcff37262f9677e8462.jpg');
INSERT INTO `webuploader` VALUES ('10', '20170626/ca8a02c1ac0b9e535277f62b7e31c921.jpg');
INSERT INTO `webuploader` VALUES ('11', '20170626/e6b58ae3cc33b007ebaebd6c554b3202.jpg');
INSERT INTO `webuploader` VALUES ('12', '20170626/b9f60e46cff4af2f2cd1631696a7d5b6.jpg');
INSERT INTO `webuploader` VALUES ('13', '20170722/62620e9fa1db83a0e6e56f4c6caac233.jpg');
INSERT INTO `webuploader` VALUES ('14', '20170722/143513533908b43228272007be28df8b.jpg');

-- ----------------------------
-- 日期：2018-03-14 16:55:02
-- 仅用于测试和学习,本程序不适合处理超大量数据
-- ----------------------------

-- ----------------------------
-- Table structure for `blog`
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `bid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL DEFAULT '',
  `stitle` char(30) NOT NULL DEFAULT '',
  `cateid` int(11) NOT NULL,
  `blogkeywords` varchar(150) NOT NULL DEFAULT '',
  `blogdesc` varchar(255) NOT NULL DEFAULT '',
  `pic` varchar(150) NOT NULL DEFAULT '',
  `picdesc` char(30) NOT NULL DEFAULT '',
  `content` text,
  `click` int(10) unsigned DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`bid`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `cate`
-- ----------------------------
DROP TABLE IF EXISTS `cate`;
CREATE TABLE `cate` (
  `cid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catename` varchar(30) NOT NULL DEFAULT '',
  `catekeywords` varchar(150) NOT NULL DEFAULT '',
  `catedesc` text NOT NULL,
  `sort` smallint(6) NOT NULL DEFAULT '1',
  `catetype` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `flink`
-- ----------------------------
DROP TABLE IF EXISTS `flink`;
CREATE TABLE `flink` (
  `fid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL DEFAULT '',
  `urldesc` varchar(255) NOT NULL DEFAULT '',
  `urlpath` varchar(60) NOT NULL DEFAULT '',
  PRIMARY KEY (`fid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `members_blog`
-- ----------------------------
DROP TABLE IF EXISTS `members_blog`;
CREATE TABLE `members_blog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL,
  `bid` int(10) unsigned NOT NULL,
  `updown` tinyint(1) DEFAULT '-1',
  `star` tinyint(1) DEFAULT '0',
  `comment` text,
  `commenttime` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `bid` (`bid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `search`
-- ----------------------------
DROP TABLE IF EXISTS `search`;
CREATE TABLE `search` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `keyword` char(30) NOT NULL DEFAULT '',
  `searchtimes` int(10) unsigned NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `think_auth_group`
-- ----------------------------
DROP TABLE IF EXISTS `think_auth_group`;
CREATE TABLE `think_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` char(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `think_auth_group_access`
-- ----------------------------
DROP TABLE IF EXISTS `think_auth_group_access`;
CREATE TABLE `think_auth_group_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `think_auth_rule`
-- ----------------------------
DROP TABLE IF EXISTS `think_auth_rule`;
CREATE TABLE `think_auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(80) NOT NULL DEFAULT '',
  `title` char(20) NOT NULL DEFAULT '',
  `pid` smallint(6) NOT NULL DEFAULT '0',
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `sort` smallint(6) NOT NULL DEFAULT '0',
  `condition` char(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `think_members`
-- ----------------------------
DROP TABLE IF EXISTS `think_members`;
CREATE TABLE `think_members` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '',
  `password` char(32) NOT NULL DEFAULT '',
  `tel` varchar(11) NOT NULL DEFAULT '',
  `gender` char(10) NOT NULL DEFAULT '',
  `birthday` char(15) NOT NULL DEFAULT '',
  `email` char(20) NOT NULL DEFAULT '',
  `logintime` int(10) unsigned DEFAULT NULL,
  `loginip` varchar(30) DEFAULT '',
  `logincount` int(11) NOT NULL DEFAULT '0',
  `score` int(10) unsigned NOT NULL DEFAULT '10',
  `regtime` int(10) NOT NULL,
  `typeof` tinyint(1) NOT NULL DEFAULT '0',
  `locked` tinyint(1) NOT NULL DEFAULT '0',
  `storeart` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `webuploader`
-- ----------------------------
DROP TABLE IF EXISTS `webuploader`;
CREATE TABLE `webuploader` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `img` char(60) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records for `blog`
-- ----------------------------
INSERT INTO `blog` VALUES ('1', '人生何处不相逢', '人生何处不相逢', '1', '人生 相逢', '随浪随风飘荡,随着一生里的浪,你我在重叠那一刹,顷刻各在一方.随浪随风飘荡,随着一生里的浪,你我在重叠那一刹,顷刻各在一方', '20170621/4a8f9239ab7ac1c70377433aa7a9332e.jpg 20170621/thumb4a8f9239ab7ac1c70377433aa7a9332e.jpg', '文章缩略图', '<pre style="margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;随浪随风飘荡
		随着一生里的浪
		你我在重叠那一刹
		顷刻各在一方
		缘份随风飘荡
		缘尽此生也守望
		你我在凝望那一刹
		心中有泪飘降
		纵是告别也交出真心意
		默默承受际遇
		某月某日也许再可跟你
		共聚重拾往事
		无奈重遇那天存在永远
		他方的晚空更是遥远
		谁在黄金海岸
		谁在烽烟彼岸
		你我在回望那一刹
		彼此慰问境况
		
		随浪随风飘荡
		人生何处不相逢
		人生何处不相逢
		随著一生里的浪
		你我在重叠那一刹
		顷刻各在一方
		缘份随风飘荡
		缘尽此生也守望
		你我在凝望那一刹
		心中有泪飘降
		纵是告别也交出真心意
		默默承受际遇
		某月某日也许再可跟你
		共聚重拾往事
		无奈重遇那天存在永远
		他方的晚空更是遥远
		谁在黄金海岸
		谁在烽烟彼岸
		你我在回望那一刹
		彼此慰问境况</pre><p><img src="http://img.baidu.com/hi/jx2/j_0002.gif"/></p>', '65', '1498050875');
INSERT INTO `blog` VALUES ('2', '千千阙歌', '千千阙歌', '1', '人生 感悟', '千千阙歌', '20170621/087d055f244bcd1ffd82c3ed62b5f4e4.jpg 20170621/thumb087d055f244bcd1ffd82c3ed62b5f4e4.jpg', '文章缩略图', '<p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;作词：<a target="_blank" href="http://baike.baidu.com/item/%E6%9E%97%E6%8C%AF%E5%BC%BA/8699290" style="color: rgb(19, 110, 194); text-decoration: none;">林振强</a></p><p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;作曲：Kohji Makanio</p><p style="text-align: justify;"><br/>　　徐徐回望 曾属於彼此的晚上</p><p style="text-align: justify;">　　如流傻泪 祈望可体恤兼见谅<br/>　　明晨离别你 路也许孤单得漫长<br/>　　一瞬间 太多东西要讲<br/>　　可惜即将在各一方<br/>　　只好深深把这刻尽凝望<br/>　　来日纵使<em>千千阕歌</em>飘於远方我路上<br/>　　来日纵使<em>千千</em>晚星 亮过今晚月亮<br/>　　都比不起这宵美丽<br/>　　亦绝不可使我更欣赏<br/>　　ah....因你今晚伴我唱</p><p style="text-align: justify;"><br/>　　临行临别 才顿感哀伤的漂亮<br/>　　原来全是你 令我的思忆漫长<br/>　　何年何月 才又可今宵一样<br/>　　停留凝望里 让眼睛讲彼此立场<br/>　　当某天 雨点轻敲你窗<br/>　　当风声吹乱你构想<br/>　　可否抽空 想这张旧模样<br/>　　来日纵使<em>千千阕歌</em>飘於远方我路上<br/>　　来日纵使<em>千千</em>晚星 亮过今晚月亮<br/>　　都比不起这宵美丽<br/>　　亦绝不可使我更欣赏<br/>　　ah....因你今晚伴我唱<br/>　　ah...怎都比不起这宵美丽<br/>　　亦绝不可使我更欣赏<br/>　　因今宵的我可共你唱</p><p><br/></p>', '89', '1498050899');
INSERT INTO `blog` VALUES ('4', '月半小夜曲', '月半小夜曲', '1', '人生 感悟', '月半小夜曲', '20170621/d626ecf6703c3f439e21bf043b9abf5e.jpg 20170621/thumbd626ecf6703c3f439e21bf043b9abf5e.jpg', '文章缩略图', '<p>仍然倚在失眠夜 望天边星宿</p><p><br/></p><p>仍然听见小提琴如泣似诉再挑逗</p><p>为何只剩一弯月 留在我的天空</p><p>这晚以后音讯隔绝</p><p>人如天上的明月 是不可拥有</p><p>情如曲过只遗留 无可挽救再分别</p><p>为何只是失望 填密我的空虚</p><p>这晚夜没有吻别</p><p>仍在说永久 想不到是借口</p><p>从未意会要分手</p><p>但我的心每分每刻 仍然被她占有　　</p><p><br/></p><p>她似这月儿 仍然是不开口</p><p>提琴独奏独奏着 明月半倚深秋</p><p>我的牵挂 我的渴望 直至以后</p><p>仍然倚在失眠夜 望天边星宿</p><p>仍然听见小提琴 如泣似诉再挑逗</p><p>为何只剩一弯月 留在我的天空</p><p>这晚以后音讯隔绝</p><p>人如天上的明月 是不可拥有</p><p>情如曲过只遗留 无可挽救再分别</p><p>为何只是失望 填密我的空虚</p><p>这晚夜没有吻别</p><p>仍在说永久 想不到是借口</p><p>从未意会要分手</p><p>但我的心每分每刻 仍然被她占有</p><p>她似这月儿 仍然是不开口</p><p>提琴独奏独奏着 明月半倚深秋</p><p>我的牵挂 我的渴望 直至以后</p><p>仍在说永久 想不到是借口</p><p>从未意会要分手</p><p>但我的心每分每刻 仍然被她占有</p><p>她似这月儿 仍然是不开口</p><p>提琴独奏独奏着 明月半倚深秋</p><p>我的牵挂 我的渴望 直至以后<span style="font-size: 12px; line-height: 0; position: relative; vertical-align: baseline; top: -0.5em; margin-left: 2px; color: rgb(51, 102, 204); cursor: default; padding: 0px 2px;">[1]</span><a class="sup-anchor" style="color: rgb(19, 110, 194); position: relative; top: -50px; font-size: 0px; line-height: 0;">&nbsp;</a></p><p><br/></p>', '508', '1498050572');
INSERT INTO `blog` VALUES ('15', '流年-王菲', '流年-王菲', '2', '王菲', '《流年》是王菲演唱的一首歌曲，由林夕作词，陈晓娟作曲，收录于王菲专辑《王菲2001》中，是王菲2010~2012年亚洲巡唱的固定曲目', '20170621/033871f87eac4e69933f690f7d5023cb.jpg 20170621/thumb033871f87eac4e69933f690f7d5023cb.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">爱上一个天使的缺点
用一种魔鬼的语言
上帝在云端只眨了一眨眼
最后眉一皱头一点

爱上一个认真的消遣
用一朵花开的时间
你在我旁边只打了个照面
五月的晴天闪了电

有生之年狭路相逢终不能幸免
手心忽然长出纠缠的曲线
懂事之前情动以后长不过一天
留不住算不出流年

遇见一场烟火的表演
用一场轮回的时间
紫微星流过
已经远离我一光年

有生之年狭路相逢终不能幸免
手心忽然长出纠缠的曲线
懂事之前情动以后长不过一天
留不住算不出流年

有生之年狭路相逢终不能幸免
手心忽然长出纠缠的曲线
懂事之前情动以后长不过一天</pre><p><img src="/tp509/public/static/uploads/image/20170620/1497889992132206.jpg" title="1497889992132206.jpg" alt="95eef01f3a292df50d8d31e5be315c6035a873f0.jpg"/></p>', '42', '1498049284');
INSERT INTO `blog` VALUES ('5', '飘雪', '飘雪', '2', '生活 感悟', '飘雪', '', '文章缩略图', '<p style="text-align: center;">歌名：飘雪
　　</p><p style="text-align: center;">作曲：K.Kuwata
　　</p><p style="text-align: center;">又见雪飘过
　　</p><p style="text-align: center;">飘于伤心记忆中
　　</p><p style="text-align: center;">让我再想你
　　</p><p style="text-align: center;">却掀起我心痛
　　</p><p style="text-align: center;">早经分了手
　　</p><p style="text-align: center;">为何热爱尚情重
　　</p><p style="text-align: center;">独过追忆岁月
　　</p><p style="text-align: center;">或许此生不会懂
　　</p><p style="text-align: center;">又再想起你
　　</p><p style="text-align: center;">抱拥飘飘白雪中
　　</p><p style="text-align: center;">让你心中暖
　　</p><p style="text-align: center;">去驱走我冰冻
　　</p><p style="text-align: center;">冷风催我醒
　　</p><p style="text-align: center;">原来共你是场梦
　　</p><p style="text-align: center;">像那飘飘雪泪下
　　</p><p style="text-align: center;">弄湿冷清的晚空
　　</p><p style="text-align: center;">原来是那么深爱你
　　</p><p style="text-align: center;">此际伴着我追忆的心痛</p><p><br/></p>', '165', '1501090089');
INSERT INTO `blog` VALUES ('6', '想起', '想起', '2', '人生 相逢', '想起', '20170621/60186fa415c2059f5c5fe3ccaf88c7e0.jpg 20170621/thumb60186fa415c2059f5c5fe3ccaf88c7e0.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">发行时间：2001年
歌词：
刚刚风无意吹起
花瓣随着风落地
我看见多么美的一场樱花雨
闻一闻茶的香气
哼一段旧时旋律
要是你一定欢天喜地
你曾经坐在这里
谈吐得那么阔气
就像是所有幸福都能被预期
你打开我的手心
一切都突然安静
你要我承接你的真心
花季虽然会过去
今年明年
有一样的风情
相爱以为是你给的美丽
让我惊喜让我庆幸
我有一生的风景
命运插手得太急
我来不及
全都要还回去
从此是一段长长的距离
偶尔想起总是唏嘘
如果当初懂珍惜
我知道眼泪多余
笑变得好不容易
特别是只能面对回忆和空气
多半的自言自语
是用来安慰自己
也许你字字句句倾听</pre><p><br/></p>', '33', '1500194683');
INSERT INTO `blog` VALUES ('7', '大悲咒', '大悲咒', '4', '大悲咒', '大悲咒', '20170621/a1837626a42fdd6acf34d2962d57722a.jpg 20170621/thumba1837626a42fdd6acf34d2962d57722a.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">Na&nbsp;Mo&nbsp;He&nbsp;Na&nbsp;Da&nbsp;Na&nbsp;Duo&nbsp;Na&nbsp;Ye&nbsp;Ye&nbsp;Na&nbsp;Mo
南&nbsp;无、喝&nbsp;罗&nbsp;怛&nbsp;那、哆&nbsp;罗&nbsp;夜&nbsp;耶.&nbsp;南&nbsp;无
AO&nbsp;Li&nbsp;Ye&nbsp;Po&nbsp;Lu&nbsp;Jie&nbsp;Di&nbsp;Shuo&nbsp;Bo&nbsp;Na&nbsp;Ye
阿&nbsp;唎&nbsp;耶.&nbsp;婆&nbsp;卢&nbsp;羯&nbsp;帝、烁&nbsp;钵&nbsp;罗&nbsp;耶.
Pu&nbsp;Ti&nbsp;Sa&nbsp;Duo&nbsp;Po&nbsp;Ye&nbsp;Mo&nbsp;He&nbsp;Sa&nbsp;Duo&nbsp;Po&nbsp;Ye
菩&nbsp;提&nbsp;萨&nbsp;埵&nbsp;婆&nbsp;耶,&nbsp;摩&nbsp;诃&nbsp;萨&nbsp;埵&nbsp;婆&nbsp;耶.
Mo&nbsp;He&nbsp;Jia&nbsp;Lu&nbsp;Ni&nbsp;Jia&nbsp;Ye&nbsp;An&nbsp;Sa&nbsp;Bo&nbsp;Na&nbsp;Fa&nbsp;Yi
摩&nbsp;诃、迦&nbsp;卢&nbsp;尼&nbsp;迦&nbsp;耶.&nbsp;唵，萨&nbsp;皤&nbsp;罗&nbsp;罚&nbsp;曳,
Su&nbsp;Da&nbsp;Na&nbsp;Da&nbsp;Xia&nbsp;Na&nbsp;Mo&nbsp;Xi&nbsp;Ji&nbsp;Lie&nbsp;Duo&nbsp;Yi&nbsp;Mong&nbsp;AO&nbsp;Li&nbsp;Ye
数&nbsp;怛&nbsp;那&nbsp;怛&nbsp;写.&nbsp;南&nbsp;无、悉&nbsp;吉&nbsp;栗&nbsp;埵、&nbsp;伊&nbsp;蒙&nbsp;阿&nbsp;唎&nbsp;耶.
Po&nbsp;Lu&nbsp;Jie&nbsp;Di&nbsp;Shi&nbsp;Fu&nbsp;Na&nbsp;Leng&nbsp;Tuo&nbsp;Po
婆&nbsp;卢&nbsp;吉&nbsp;帝、室&nbsp;佛&nbsp;罗&nbsp;愣&nbsp;驮&nbsp;婆.
Na&nbsp;Mo&nbsp;No&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Shi&nbsp;Li&nbsp;Mo&nbsp;He&nbsp;Ba&nbsp;Duo&nbsp;Suo&nbsp;Mi
南&nbsp;无、那&nbsp;罗&nbsp;谨&nbsp;墀.&nbsp;醯&nbsp;利&nbsp;摩&nbsp;诃、皤&nbsp;哆&nbsp;沙&nbsp;咩.
Sa&nbsp;Po&nbsp;AO&nbsp;Ta&nbsp;Dou&nbsp;Shu&nbsp;Peng&nbsp;AO&nbsp;Shi&nbsp;Yun&nbsp;Sa&nbsp;Po&nbsp;Sa&nbsp;Duo&nbsp;Na&nbsp;Mo&nbsp;Po&nbsp;Sa&nbsp;Duo
萨&nbsp;婆&nbsp;阿&nbsp;他、豆&nbsp;输&nbsp;朋、&nbsp;阿&nbsp;逝&nbsp;孕.&nbsp;萨&nbsp;婆&nbsp;萨&nbsp;哆、那&nbsp;摩&nbsp;婆&nbsp;萨&nbsp;哆,
Na&nbsp;Mo&nbsp;Po&nbsp;Qie&nbsp;Mo&nbsp;Fa&nbsp;Te&nbsp;Dou
那&nbsp;摩&nbsp;婆&nbsp;伽，摩&nbsp;罚&nbsp;特&nbsp;豆.
Da&nbsp;Zhi&nbsp;Ta&nbsp;An&nbsp;AO&nbsp;Po&nbsp;Lu&nbsp;Xi&nbsp;Lu&nbsp;Jia&nbsp;Di&nbsp;Jia&nbsp;Lu&nbsp;Di&nbsp;Yi&nbsp;Xi&nbsp;Li
怛&nbsp;侄&nbsp;他,&nbsp;唵，阿&nbsp;婆&nbsp;卢&nbsp;醯．卢&nbsp;迦&nbsp;帝,&nbsp;迦&nbsp;罗&nbsp;帝．夷&nbsp;醯&nbsp;唎.
Mo&nbsp;He&nbsp;Pu&nbsp;Ti&nbsp;Sa&nbsp;Duo&nbsp;Sa&nbsp;Po&nbsp;Sa&nbsp;Po
摩&nbsp;诃&nbsp;菩&nbsp;提&nbsp;萨&nbsp;埵.&nbsp;萨&nbsp;婆&nbsp;萨&nbsp;婆,
Mo&nbsp;Na&nbsp;Mo&nbsp;Na&nbsp;Mo&nbsp;Xi&nbsp;Mo&nbsp;Xi&nbsp;Lie&nbsp;Tuo&nbsp;Yun&nbsp;Ju&nbsp;Lu&nbsp;Ju&nbsp;Lu&nbsp;Jie&nbsp;Mong
摩&nbsp;罗&nbsp;摩&nbsp;罗,&nbsp;摩&nbsp;醯&nbsp;摩&nbsp;醯、唎&nbsp;驮&nbsp;孕.&nbsp;俱&nbsp;卢&nbsp;俱&nbsp;卢、羯&nbsp;蒙.
Du&nbsp;Lu&nbsp;Du&nbsp;Lu&nbsp;Fa&nbsp;She&nbsp;Ye&nbsp;Di&nbsp;Mo&nbsp;He&nbsp;Fa&nbsp;She&nbsp;Ye&nbsp;Di
度&nbsp;卢&nbsp;度&nbsp;卢、罚&nbsp;闍&nbsp;耶&nbsp;帝.&nbsp;摩&nbsp;诃、罚&nbsp;闍&nbsp;耶&nbsp;帝.
Tuo&nbsp;Na&nbsp;Tuo&nbsp;Na&nbsp;Di&nbsp;Li&nbsp;Ni&nbsp;Shi&nbsp;Fu&nbsp;Na&nbsp;Ye
陀&nbsp;罗&nbsp;陀&nbsp;罗,&nbsp;地&nbsp;唎&nbsp;尼,&nbsp;室&nbsp;佛&nbsp;罗&nbsp;耶.
Zhe&nbsp;Na&nbsp;Zhe&nbsp;Na&nbsp;Mo&nbsp;Mo&nbsp;Fa&nbsp;Mo&nbsp;Na&nbsp;Mo&nbsp;Die&nbsp;Lie
遮&nbsp;罗&nbsp;遮&nbsp;罗,&nbsp;摩&nbsp;麼&nbsp;罚&nbsp;摩&nbsp;罗,&nbsp;穆&nbsp;帝&nbsp;隶.
Yi&nbsp;Xi&nbsp;Yi&nbsp;Xi&nbsp;Shi&nbsp;Na&nbsp;Shi&nbsp;Na&nbsp;Ou&nbsp;Na&nbsp;Sen&nbsp;Fu&nbsp;Na&nbsp;She&nbsp;Li
伊&nbsp;醯&nbsp;伊&nbsp;醯,&nbsp;室&nbsp;那&nbsp;室&nbsp;那,&nbsp;阿&nbsp;罗&nbsp;参、佛&nbsp;罗&nbsp;舍&nbsp;利.
Fa&nbsp;Sa&nbsp;Fa&nbsp;Seng&nbsp;Fu&nbsp;Na&nbsp;She&nbsp;Ye
罚&nbsp;沙&nbsp;罚&nbsp;参.&nbsp;佛&nbsp;罗&nbsp;舍&nbsp;耶.
Hu&nbsp;Lu&nbsp;Hu&nbsp;Lu&nbsp;Mo&nbsp;Na&nbsp;Hu&nbsp;Lu&nbsp;Hu&nbsp;Lu&nbsp;Xi&nbsp;Li&nbsp;Suo&nbsp;Na&nbsp;Suo&nbsp;Na
呼&nbsp;嚧&nbsp;呼&nbsp;嚧&nbsp;摩&nbsp;罗,&nbsp;呼&nbsp;嚧&nbsp;呼&nbsp;嚧&nbsp;醯&nbsp;利.&nbsp;娑&nbsp;罗&nbsp;娑&nbsp;罗,
Xi&nbsp;Li&nbsp;Xi&nbsp;Li&nbsp;Su&nbsp;Lu&nbsp;Su&nbsp;Lu&nbsp;Pu&nbsp;Ti&nbsp;Ye&nbsp;Pu&nbsp;Ti&nbsp;Ye
悉&nbsp;唎&nbsp;悉&nbsp;唎,&nbsp;苏&nbsp;嚧&nbsp;苏&nbsp;嚧.&nbsp;菩&nbsp;提&nbsp;夜、菩&nbsp;提&nbsp;夜.
Pu&nbsp;Tuo&nbsp;Ye&nbsp;Pu&nbsp;Tuo&nbsp;Ye&nbsp;Mi&nbsp;Di&nbsp;Li&nbsp;Ye
菩&nbsp;驮&nbsp;夜、菩&nbsp;驮&nbsp;夜.&nbsp;弥&nbsp;帝&nbsp;唎&nbsp;夜,
Nuo&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Di&nbsp;Li&nbsp;Se&nbsp;Ni&nbsp;Na&nbsp;Po&nbsp;Ye&nbsp;Mo&nbsp;Na
那&nbsp;罗&nbsp;谨&nbsp;墀.&nbsp;地&nbsp;利&nbsp;瑟&nbsp;尼&nbsp;那,&nbsp;波&nbsp;夜&nbsp;摩&nbsp;那,
Suo&nbsp;Po&nbsp;He&nbsp;Xi&nbsp;Tuo&nbsp;Ye&nbsp;Suo&nbsp;Po&nbsp;He&nbsp;Mo&nbsp;He&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;悉&nbsp;陀&nbsp;夜,&nbsp;娑&nbsp;婆&nbsp;诃.&nbsp;摩&nbsp;诃&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Xi&nbsp;Tuo&nbsp;Yu&nbsp;Yi&nbsp;Shi&nbsp;Bo&nbsp;Na&nbsp;Ya
娑&nbsp;婆&nbsp;诃.&nbsp;悉&nbsp;陀&nbsp;喻&nbsp;艺,&nbsp;室&nbsp;皤&nbsp;罗&nbsp;耶,
Suo&nbsp;Po&nbsp;He&nbsp;Nuo&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Suo&nbsp;Po&nbsp;He
娑&nbsp;婆&nbsp;诃.&nbsp;那&nbsp;罗&nbsp;谨&nbsp;墀,&nbsp;娑&nbsp;婆&nbsp;诃.
Mo&nbsp;Na&nbsp;Nuo&nbsp;Na&nbsp;Suo&nbsp;Po&nbsp;He&nbsp;Xi&nbsp;Na&nbsp;Sen&nbsp;AO&nbsp;Mu&nbsp;Qie&nbsp;Ye
摩&nbsp;罗&nbsp;那&nbsp;罗,&nbsp;娑&nbsp;婆&nbsp;诃.&nbsp;悉&nbsp;罗&nbsp;僧、阿&nbsp;穆&nbsp;佉&nbsp;耶,
Suo&nbsp;Po&nbsp;He&nbsp;Suo&nbsp;Po&nbsp;Mo&nbsp;He&nbsp;AO&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;娑&nbsp;婆&nbsp;摩&nbsp;诃、阿&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Zhe&nbsp;Ji&nbsp;Na&nbsp;AO&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;者&nbsp;吉&nbsp;罗、阿&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;he&nbsp;Bo&nbsp;Tuo&nbsp;Mo&nbsp;Ji&nbsp;Xi&nbsp;Tuo&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;波&nbsp;陀&nbsp;摩、羯&nbsp;悉&nbsp;陀&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Nuo&nbsp;Na&nbsp;Jin&nbsp;Chi&nbsp;Bu&nbsp;Qie&nbsp;Na&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;那&nbsp;罗&nbsp;谨&nbsp;墀、&nbsp;皤&nbsp;伽&nbsp;罗&nbsp;耶,
Suo&nbsp;Po&nbsp;He&nbsp;Mo&nbsp;Po&nbsp;Li&nbsp;Sen&nbsp;Ji&nbsp;Na&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;摩&nbsp;婆&nbsp;利、胜&nbsp;羯&nbsp;罗&nbsp;夜,
Suo&nbsp;Po&nbsp;He&nbsp;Na&nbsp;Mo&nbsp;He&nbsp;Na&nbsp;Da&nbsp;Na&nbsp;Duo&nbsp;Na&nbsp;Ye&nbsp;Ye
娑&nbsp;婆&nbsp;诃.&nbsp;南&nbsp;无&nbsp;喝&nbsp;罗&nbsp;怛&nbsp;那、哆&nbsp;罗&nbsp;夜&nbsp;耶.
Na&nbsp;Mo&nbsp;AO&nbsp;Li&nbsp;Ye&nbsp;Po&nbsp;Lu&nbsp;Jie&nbsp;Di
南&nbsp;无&nbsp;阿&nbsp;唎&nbsp;耶.&nbsp;婆&nbsp;嚧&nbsp;吉&nbsp;帝,
Suo&nbsp;Bo&nbsp;Na&nbsp;Ye&nbsp;Suo&nbsp;Po&nbsp;He&nbsp;An&nbsp;Xi&nbsp;Dian&nbsp;Du
烁&nbsp;皤&nbsp;罗&nbsp;夜,&nbsp;娑&nbsp;婆&nbsp;诃.&nbsp;唵，悉&nbsp;殿&nbsp;都,
Man&nbsp;Duo&nbsp;Na&nbsp;Ba&nbsp;Tuo&nbsp;Ye&nbsp;Suo&nbsp;Po&nbsp;He
漫&nbsp;多&nbsp;罗,&nbsp;跋&nbsp;陀&nbsp;耶,&nbsp;娑&nbsp;婆&nbsp;诃.</pre><p><br/></p>', '26', '1498050952');
INSERT INTO `blog` VALUES ('8', '情非得已', '情非得已', '6', '情非得已', '情非得已', '20170621/ee2da7a54489ca372030d89a87ba5d36.jpg 20170621/thumbee2da7a54489ca372030d89a87ba5d36.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">难以忘记初次见你一双迷人的眼睛
在我脑海里你的身影挥散不去
握你的双手感觉你的温柔
真的有点透不过气你的天真我想珍惜
(看到你受委屈我会伤心)
wo----
只怕我自己会爱上你不敢让自己靠的太近
怕我没什么能够给你爱你也需要很大的勇气
只怕我自己会爱上你也许有天会情不自禁
想念只让自己苦了自己爱上你是我
爱上你是我
------
难以忘记初次见你一双迷人的眼睛
在我脑海里你的身影挥散不去
握你的双手感觉你的温柔
真的有点透不过气你的天真我想珍惜
(看到你受委屈我会伤心)
wo----
只怕我自己会爱上你不敢让自己靠的太近
怕我没什么能够给你爱你也需要很大的勇气
只怕我自己会爱上你也许有天会情不自禁
想念只让自己苦了自己爱上你是我情非得已
爱上你是我情非得已
------
什么原因我竟然又会遇见你
我真的真的不愿意就这样陷入
只怕我自己会爱上你不敢让自己靠的太近
怕我没什么能够给你爱你也需要很大的勇气
只怕我自己会爱上你也许有天会情不自禁
想念只让自己苦了自己爱上你是我情非得已
爱上你是我情非得已
爱上你是我情非得已</pre><p><br/></p>', '37', '1501072649');
INSERT INTO `blog` VALUES ('9', '独家记忆', '独家记忆', '7', '独家记忆', '独家记忆', '20170621/8b7cd7f0bd5f18288420be90c437d4ea.jpg 20170621/thumb8b7cd7f0bd5f18288420be90c437d4ea.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">忘记分开后的第几天起&nbsp;　　
喜欢一个人&nbsp;看下大雨&nbsp;　　
没联络&nbsp;孤单就像连锁反应&nbsp;　　
想要快乐都没力气&nbsp;　　

雷雨世界像场灾难电影&nbsp;　　
让现在的我&nbsp;可怜到底&nbsp;　　
对不起&nbsp;谁也没有&nbsp;　　
想要结束的&nbsp;没有商量的余地&nbsp;　　

我希望你&nbsp;是我独家的记忆&nbsp;　　
摆在心底&nbsp;　　
不管别人说的多么难听&nbsp;　　
现在我拥有的事情&nbsp;　　
是你&nbsp;是给我一半的爱情&nbsp;　　
我喜欢你&nbsp;是我独家的记忆&nbsp;　　
谁也不行&nbsp;　　
从我这个身体中拿走你&nbsp;　　
在我感情的封锁区&nbsp;　　
有关于你&nbsp;绝口不提&nbsp;没关系&nbsp;　
　
雷雨世界像场灾难电影&nbsp;　　
让现在的我&nbsp;可怜到底&nbsp;　　
对不起&nbsp;谁也没有&nbsp;　　
已经结束的&nbsp;没有商量的余地&nbsp;　　

我希望你&nbsp;是我独家的记忆&nbsp;　　
摆在心底&nbsp;　　
不管别人说的多么难听&nbsp;　　
现在我拥有的事情&nbsp;　　
是你&nbsp;是给我一半的爱情&nbsp;　　
我喜欢你&nbsp;是我独家的记忆&nbsp;　　
谁也不行&nbsp;　　
从我这个身体中拿走你&nbsp;　　
在我感情的封锁区&nbsp;　　
有关于你&nbsp;绝口不提&nbsp;没关系&nbsp;　　

我希望你&nbsp;是我独家的记忆&nbsp;　　
摆在心底&nbsp;　　
不管别人说的多么难听&nbsp;　　
现在我拥有的事情&nbsp;　　
是你&nbsp;是给我一半的爱情&nbsp;　　
我喜欢你&nbsp;是我独家的记忆&nbsp;　　
谁也不行&nbsp;　　
从我这个身体中拿走你&nbsp;　　
在我感情的封锁区&nbsp;　　
有关于你&nbsp;绝口不提&nbsp;没限期</pre><p><br/></p>', '439', '1498050914');
INSERT INTO `blog` VALUES ('10', '半壶纱-刘珂矣', '半壶纱-刘珂矣', '4', '感悟 大悲咒', '墨已入水 渡一池青花  揽五分红霞 采竹回家  悠悠风来 埋一地桑麻  一身袈裟 把相思放下 十里桃花 待嫁的年华', '20170621/333c4b578be51cd920fa826a40924690.jpg 20170621/thumb333c4b578be51cd920fa826a40924690.jpg', '文章缩略图', '<p>墨已入水 渡一池青花</p><p>揽五分红霞 采竹回家</p><p>悠悠风来 埋一地桑麻</p><p>一身袈裟 把相思放下</p><p>十里桃花 待嫁的年华</p><p>凤冠的珍珠 挽进头发</p><p>檀香拂过 玉镯弄轻纱</p><p>空留一盏 芽色的清茶</p><p>倘若我心中的山水 你眼中都看到</p><p>我便一步一莲花祈祷</p><p>怎知那浮生一片草 岁月催人老</p><p><br/></p><p>风月花鸟 一笑尘缘了</p><p>十里桃花 待嫁的年华</p><p>凤冠的珍珠 挽进头发</p><p>檀香拂过 玉镯弄轻纱</p><p>空留一盏 芽色的清茶</p><p>倘若我心中的山水 你眼中都看到</p><p>我便一步一莲花祈祷</p><p>怎知那浮生一片草 岁月催人老</p><p>风月花鸟 一笑尘缘了</p><p>倘若我心中的山水 你眼中都看到</p><p>我便一步一莲花祈祷</p><p>怎知那浮生一片草 岁月催人老</p><p>风月花鸟 一笑尘缘了</p><p>怎知那浮生一片草 岁月催人老</p><p>风月花鸟 一笑尘缘了</p><p><br/></p>', '42', '1498050590');
INSERT INTO `blog` VALUES ('11', '忍别离', '忍别离', '2', '感悟 人生', '《忍别离[1]  》是歌手崔子格演唱的歌曲，袁亮作词，赵佳霖作曲编曲，该歌曲收录在专辑《小美人》中。', '20170621/74ae1f39ab8d8a201b720d4d75801a36.jpg 20170621/thumb74ae1f39ab8d8a201b720d4d75801a36.jpg', '文章缩略图', '<p>西风夜渡寒山雨</p><p>家国依稀残梦里</p><p>思君不见倍思君</p><p>别离难忍忍别离</p><p>狼烟烽火何时休</p><p>成王败寇尽东流</p><p>蜡炬已残泪难干</p><p>江山未老红颜旧</p><p>忍别离</p><p>不忍却要别离</p><p>托鸿雁南去</p><p>不知此心何寄</p><p>红颜旧</p><p>任凭斗转星移</p><p>不变是此情悠悠</p><p>狼烟烽火何时休</p><p>成王败寇尽东流</p><p>蜡炬已残泪难干</p><p>江山未老红颜旧</p><p>忍别离</p><p>不忍却要别离</p><p>托鸿雁南去</p><p>不知此心何寄</p><p>红颜旧</p><p>任凭斗转星移</p><p>不变是此情悠悠</p><p>忍别离</p><p>不忍却要别离</p><p>托鸿雁南去</p><p>不知此心何寄</p><p>红颜旧</p><p>任凭斗转星移</p><p>不变是此情悠悠</p><p>不变是此情悠悠</p><p>不变是此情悠悠</p><p><br/></p>', '4', '1498050602');
INSERT INTO `blog` VALUES ('12', '容易受伤的女人-王菲', '容易受伤的女人-王菲', '2', '王菲 女人', '《容易受伤的女人》是王菲于1992年下半年，从美国返港并重新踏入乐坛而发行的唱片《COMING HOME》中的歌曲。王菲这张唱片一推出即断市，销量迅速冲破白金，碟内的《容易受伤的女人》，横扫全港，更在各电视台的音乐颁奖礼中，勇夺金曲，声势可谓一时无两，令她一举跃入香港一线女歌手的行列', '20170621/5b612877b2556a31ed07a596dc6f3873.jpg 20170621/thumb5b612877b2556a31ed07a596dc6f3873.jpg', '文章缩略图', '<p>人渐醉了夜更深</p><p>在这一刻多么接近</p><p>思想仿似在摇撼</p><p>矛盾也更深</p><p>曾被破碎过的心</p><p>让你今天轻轻贴近</p><p>多少安慰及疑问</p><p>偷偷的再生</p><p>情难自禁</p><p>我却其实属于</p><p>极度容易受伤的女人</p><p>不要　不要 &nbsp;不要骤来骤去</p><p>请珍惜我的心</p><p>如明白我</p><p>继续情愿热恋</p><p>这个容易受伤的女人</p><p>不要等　这一刻</p><p>请热吻</p><p><img src="/ueditor/php/upload/image/20170619/1497879212206423.jpg" alt="1497879212206423.jpg"/></p><p>长夜有你醉也真</p><p>让我终于找到信任</p><p>不管一切是疑问</p><p>快乐是情人</p><p>曾害怕了这一生</p><p>是你始终甘心靠近</p><p>我方知拥有着缘份</p><p>重建我信心</p><p>曾被破碎过的心</p><p>让你今天轻轻贴近</p><p>多少安慰及疑问</p><p>偷偷的再生</p><p>情难自禁</p><p>我却其实属于</p><p>极度容易受伤的女人</p><p>不要　不要</p><p>不要骤来骤去</p><p>请珍惜我的心</p><p>如明白我</p><p>继续情愿热恋</p><p>这个容易受伤的女人</p><p>终此一生</p><p>也火般的热吻</p><p>长夜有你醉也真</p><p>让我终于找到信任</p><p>不管一切是疑问</p><p>快乐是情人</p><p>情难自禁</p><p>我却其实属于</p><p>极度容易受伤的女人</p><p>不要　不要</p><p>不要骤来骤去</p><p>请珍惜我的心</p><p>如明白我</p><p>继续情愿热恋</p><p>这个容易受伤的女人</p><p>不要等　这一刻</p><p>请热吻</p><p>长夜有你醉也真</p><p>让我终于找到信任</p><p>不管一切是疑问</p><p>快乐是情人</p><p><br/></p>', '59', '1498049261');
INSERT INTO `blog` VALUES ('13', '我愿意-王菲', '我愿意-王菲', '2', '王菲 爱情', '《我愿意》是王菲演唱的一首歌曲，由姚谦作词，黄国伦作曲，收录于1994年新艺宝发行的专辑《迷》中，是其早期代表作之一', '20170621/56f04ddf58e6212698e9e2246da517f5.jpg 20170621/thumb56f04ddf58e6212698e9e2246da517f5.jpg', '文章缩略图', '<pre>歌名：我愿意
原唱：王菲（王靖雯）
填词：姚谦
谱曲：黄国伦
编曲：Nathan&nbsp;Wang
专辑：《迷》

歌词：
思念是一种很玄的东西&nbsp;如影随形
无声又无息出没在心底
转眼&nbsp;吞没我在寂默里
我无力抗拒&nbsp;特别是夜里
想你到无法呼吸
恨不能立即&nbsp;朝你狂奔去
大声的告诉你
愿意为你&nbsp;我愿意为你
我愿意为你&nbsp;忘记我姓名
就算多一秒&nbsp;停留在你怀里
失去世界也不可惜
我愿意为你&nbsp;我愿意为你
我愿意为你&nbsp;被放逐天际
只要你真心&nbsp;拿爱与我回应
什么都愿意&nbsp;什么都愿意&nbsp;为你</pre><p><br/></p>', '49', '1498050613');
INSERT INTO `blog` VALUES ('14', '红豆-王菲', '红豆-王菲', '2', '王菲', '《红豆》是王菲演唱的一首歌曲，由林夕作词、柳重言作曲，收录于王菲1998年的专辑《唱游》当中。1999年这首歌曲获得了香港电台十大中文金曲奖以及香港无线电视台十大劲歌金曲奖', '20170621/6c4037445f041f722d0e42db64bc2cd2.jpg 20170621/thumb6c4037445f041f722d0e42db64bc2cd2.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">歌曲：红豆
歌手：&nbsp;专辑：&nbsp;

歌手:
专辑:
专辑发行:2007年5月
作词:

●●●
还没好好的感受
雪花绽放的气候
我们一起颤抖
会更明白什么是温柔
还没跟你牵着手
走过荒芜的沙丘
可能从此以后
学会珍惜天长和地久
有时候有时候
我会相信一切有尽头-
相聚离开都有时候
没有什么会永垂不朽
可是我有时候
宁愿选择留恋不放手
等到风景都看透
也许你会陪我看细水
长流--
-----------
还没为你把红豆
熬成缠绵的伤口
然后一起分享
会更明白相思的哀愁
还没好好的感受-
醒着亲吻的温柔
可能在我左右
你才追求孤独的自由
有时候有时候
我会相信一切有尽头-
相聚离开都有时候
没有什么会永垂不朽
可是我有时候
宁愿选择留恋不放手
等到风景都看透
也许你会陪我看细水
长流--
----------
有时候有时候
我会相信一切有尽头-
相聚离开都有时候
没有什么会永垂不朽
可是我有时候
宁愿选择留恋不放手
等到风景都看透
也许你会陪我看细水
长流-</pre><p><br/></p>', '37', '1498050281');
INSERT INTO `blog` VALUES ('16', '匆匆那年-王菲', '匆匆那年-王菲', '2', '王菲', '匆匆那年（电影《匆匆那年》主题曲）', '20170621/26e0d7939ff65a8d4c68a64bd2028c1d.jpg 20170621/thumb26e0d7939ff65a8d4c68a64bd2028c1d.jpg', '文章缩略图', '<pre class="best-text mb-10" style="margin-top: 10px; margin-bottom: 10px; padding: 0px; font-family: &#39;PingFang SC&#39;, &#39;Lantinghei SC&#39;, &#39;Microsoft YaHei&#39;, arial, 宋体, sans-serif, tahoma; white-space: pre-wrap; word-wrap: break-word; line-height: 29px; color: rgb(51, 51, 51); min-height: 55px; background-color: rgb(255, 255, 255);">匆匆那年（电影主题曲）
作词：
作曲：
演唱：
匆匆那年我们&nbsp;究竟说了几遍&nbsp;再见之后再拖延
可惜谁有没有&nbsp;爱过不是一场&nbsp;的雄辩
匆匆那年我们&nbsp;一时匆忙撂下&nbsp;难以承受的诺言
只有等别人兑现
不怪那吻痕还&nbsp;没积累成茧
拥抱着冬眠也没能&nbsp;羽化再成仙
不怪这一段情&nbsp;没空反复再排练
是岁月宽容恩赐&nbsp;反悔的时间
如果再见不能红着眼&nbsp;是否还能红着脸
就像那年匆促&nbsp;刻下永远一起&nbsp;那样美丽的谣言
如果过去还值得眷恋&nbsp;别太快冰释前嫌
谁甘心就这样&nbsp;彼此无挂也无牵
我们要互相亏欠&nbsp;要不然凭何怀缅
匆匆那年我们&nbsp;见过太少世面&nbsp;只爱看同一张脸
那么莫名其妙&nbsp;那么讨人欢喜&nbsp;闹起来又太讨厌
相爱那年活该&nbsp;匆匆因为我们&nbsp;不懂顽固的诺言
只是分手的前言
不怪那天太冷&nbsp;泪滴水成冰
春风也一样没&nbsp;吹进凝固的照片
不怪每一个人&nbsp;没能完整爱一遍
是岁月善意落下&nbsp;残缺的悬念
如果再见不能红着眼&nbsp;是否还能红着脸
就像那年匆促&nbsp;刻下永远一起&nbsp;那样美丽的谣言
如果过去还值得眷恋&nbsp;别太快冰释前嫌
谁甘心就这样&nbsp;彼此无挂也无牵
如果再见不能红着眼&nbsp;是否还能红着脸
就像那年匆促&nbsp;刻下永远一起&nbsp;那样美丽的谣言
如果过去还值得眷恋&nbsp;别太快冰释前嫌
谁甘心就这样&nbsp;彼此无挂也无牵
我们要互相亏欠
我们要藕断丝连</pre><p><br/></p>', '24', '1498049273');
INSERT INTO `blog` VALUES ('17', '人间-王菲', '人间-王菲', '2', '王菲', '《人间》是王菲演唱歌曲。1997年07月01日发行收录于专辑《王菲》，这首曲子为王菲首唱，是中岛美雪为王菲创作的歌曲，后由中岛美雪演唱并收录于专辑。2015年电影《陪安东尼度过漫长岁月》选用此曲作为电影插曲以及宣传曲目', '20170621/9f704ed08ff326af1a981d2ba46d521e.jpg 20170621/thumb9f704ed08ff326af1a981d2ba46d521e.jpg', '文章缩略图', '<p style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;风雨过后不一定有美好的天空<br/>　　不是天晴就会有彩虹<br/>　　所以你一脸无辜不代表你懵懂<br/>　　不是所有感情都会有始有终<br/>　　孤独尽头不一定惶恐<br/>　　可生命总免不了最初的一阵痛<br/>　　但愿你的眼睛 只看得到笑容<br/>　　但愿你流下每一滴泪都让人感动<br/>　　但愿你以后每一个梦不会一场空<br/>　　天上人间<br/>　　如果真值得歌颂<br/>　　也是因为有你才会变得闹哄哄<br/>　　天大地大<br/>　　世界比你想像中朦胧</p><p style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我不忍心再欺哄但愿你听得懂</p><p style="text-align: left;"><img src="/tp509/public/static/uploads/image/20170620/1497879212206423.jpg" alt="1497879212206423.jpg"/>　　</p><p style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;风雨过后不一定有美好的天空<br/>　　不是天晴就会有彩虹<br/>　　所以你一脸无辜不代表你懵懂<br/>　　不是所有感情都会有始有终<br/>　　孤独尽头不一定惶恐<br/>　　可生命总免不了最初的一阵痛<br/>　　但愿你的眼睛 只看得到笑容<br/>　　但愿你流下每一滴泪都让人感动<br/>　　但愿你以后每一个梦不会一场空<br/>　　天上人间<br/>　　如果真值得歌颂<br/>　　也是因为有你才会变得闹哄哄<br/>　　天大地大<br/>　　世界比你想像中朦胧</p><p style="text-align: left;"><br/></p><p style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我不忍心再欺哄但愿你听得懂<br/>　　天上人间<br/>　　如果真值得歌颂<br/>　　也是因为有你才会变得闹哄哄<br/>　　天大地大世界比你想像中朦胧<br/>　　我不忍心再欺哄但愿你听得懂<br/>　　但愿你会懂该何去何从</p><p><br/></p>', '55', '1498621251');
INSERT INTO `blog` VALUES ('18', '棋子-王菲', '棋子-王菲', '2', '王菲', '《棋子》是王菲（曾用艺名：王靖雯）演唱的歌曲，歌曲收录在第九张专辑，第二张国语大碟《天空》中，为该专辑第二首歌曲，1994年11月10日台湾发行', '20170621/3cbb3836208c7e2e02be9a5f48e558a3.jpg 20170621/thumb3cbb3836208c7e2e02be9a5f48e558a3.jpg', '文章缩略图', '<p>想走出你控制的领域</p><p>却走进你安排的战局</p><p>我没有坚强的防备</p><p>也没有后路可以退</p><p>想逃离你布下的陷阱</p><p>却陷入了另一个困境</p><p>我没有决定输赢的勇气</p><p>也没有逃脱的幸运</p><p>我　像是一颗　棋</p><p>进退任由　你决定</p><p>我不是你眼中唯一　将领</p><p>却是　不起眼的　小兵</p><p>我像是　一颗　棋子</p><p>来去全不由自己</p><p>举手无回　你从不曾犹豫</p><p>我却受控在　你手里</p><p><img src="/tp509/public/static/uploads/image/20170620/1497889992132206.jpg" alt="1497889992132206.jpg"/></p>', '12', '1498049241');
INSERT INTO `blog` VALUES ('24', '又见炊烟', '又见炊烟', '2', '王菲', '《又见炊烟》是海沼实作曲，王菲演唱的歌曲，收录于专辑《菲旧梦》中', '20170624/471fc03606cb43d541aa533c595b41ce.jpg 20170624/thumb471fc03606cb43d541aa533c595b41ce.jpg', '文章缩略图', '<p>又见炊烟</p><p>演唱：王菲</p><p>填词：庄奴</p><p>作曲：海沼实</p><p>又见炊烟升起</p><p>暮色罩大地</p><p>想问阵阵炊烟</p><p>你要去哪里</p><p>夕阳有诗情</p><p>黄昏有画意</p><p>诗情画意虽然美丽</p><p>我心中只有你</p><p>又见炊烟升起</p><p>勾起我回忆</p><p>愿你变作彩霞</p><p>飞到我梦里</p><p>夕阳有诗情</p><p>黄昏有画意</p><p>诗情画意虽然美丽</p><p>我心中只有你</p><p>夕阳有诗情</p><p>黄昏有画意</p><p>诗情画意虽然美丽</p><p>我心中只有你</p><p>诗情画意虽然美丽</p><p>我心中只有你</p><p><br/></p>', '42', '1498303402');
INSERT INTO `blog` VALUES ('25', '李宗盛-鬼迷心窍', '李宗盛-鬼迷心窍', '1', '李宗盛', '歌曲《鬼迷心窍》是1992年黄日华、周海媚主演台湾电视剧《末代皇孙》的主题曲，由李宗盛作词、作曲、演唱，收录于1992年影视剧音乐合辑《滚石九大天王之十二出好戏》当中', '20170716/a75f60047140810c0ff98fbd34ea4e98.jpg 20170716/thumba75f60047140810c0ff98fbd34ea4e98.jpg', '文章缩略图', '<p>鬼迷心窍</p><p><img src="/tp509/public/static/uploads/image/20170716/1500165484395677.jpg" title="1500165484395677.jpg" alt="0dd7912397dda1442cbbbbf9bbb7d0a20df486cf.jpg"/></p><p>曾经真的以为人生就这样了</p><p>平静的心拒绝再有浪潮</p><p>斩了千次的情丝却断不了</p><p>百转千折它将我围绕</p><p>有人问我你究竟是哪里好</p><p>这么多年我还忘不了</p><p>春风再美也比不上你的笑</p><p>没见过你的人不会明了</p><p>是鬼迷了心窍也好</p><p>是前世的因缘也好</p><p>然而这一切已不再重要</p><p>如果你能够重回我怀抱</p><p>是命运的安排也好</p><p>是你存心的捉弄也好</p><p>然而这一切已不再重要</p><p>我愿意随你到天涯海角</p><p>虽然岁月总是匆匆地催人老</p><p>虽然情爱总是让人烦恼</p><p>虽然未来如何不能知道</p><p>现在说再见会不会太早</p><p><br/></p>', '140', '1500166595');
INSERT INTO `blog` VALUES ('26', '罗大佑-恋曲1990', '罗大佑-恋曲1990', '1', '罗大佑', '《恋曲1990》收录于罗大佑个人专辑《爱人同志》中，是其中的第六首歌。词罗大佑，曲罗大佑，为电影《阿郎的故事》的国语版主题曲，粤语版主题曲为许冠杰的《阿郎恋曲》，词许冠杰', '20170716/05097286b853cc86299a66ab95fbd5bd.jpg 20170716/thumb05097286b853cc86299a66ab95fbd5bd.jpg', '文章缩略图', '<p>乌溜溜的黑眼珠和你的笑脸</p><p>怎么也难忘记你容颜的转变</p><p><img class="" src="/tp509/public/static/uploads/image/20170716/1500166121131272.jpg" alt=""/></p><p>轻飘飘的旧时光就这么溜走</p><p>转头回去看看时已匆匆数年</p><p>苍茫茫的天涯路是你的飘泊</p><p>寻寻觅觅长相守是我的脚步</p><p>黑漆漆的孤枕边是你的温柔</p><p>醒来时的清晨里是我的哀愁</p><p>或许明日太阳西下倦鸟已归时</p><p>你将已经踏上旧时的归途</p><p>人生难得再次寻觅相知的伴侣</p><p>生命终究难舍蓝蓝的白云天</p><p><br/>　　</p><p><img class="" src="/tp509/public/static/uploads/image/20170716/1500166121646853.jpg" alt="罗大佑"/><span class="description" style="display: block; color: rgb(85, 85, 85); font-size: 12px; text-indent: 0px; font-family: 宋体; word-wrap: break-word; word-break: break-all; line-height: 15px; padding: 8px 7px; min-height: 12px; border-top-width: 1px; border-top-style: solid; border-top-color: rgb(224, 224, 224);">罗大佑</span></p><p>轰隆隆的雷雨声在我的窗前</p><p>怎么也难忘记你离去的转变</p><p>孤单单的身影后寂寥的心情</p><p>永远无怨的是我的双眼</p><p><br/></p>', '67', '1500166582');
INSERT INTO `blog` VALUES ('27', 'Emilia-big big word', 'Emilia-big big word', '7', 'Emilia', '《Big Big World》是一首1998年的民谣歌曲，由来自瑞典的艾密莉亚·怀得堡（Emilia Rydberg）演唱，拉塞·安德森参与编写。曲风伤感，风靡一时，于1998年年底发布。这首歌一炮打响，在欧洲达到了第一名，在许多国家成名，但在美国表现不佳，它仍然在公告牌百强单曲榜底峰。', '20170716/74ee449b43f15c82df55b11f9390f8be.jpg 20170716/thumb74ee449b43f15c82df55b11f9390f8be.jpg', '文章缩略图', '<p>Big Big World-Emilia　　</p><p>&nbsp;&nbsp;&nbsp;&nbsp;I&#39;m a big big girl</p><p><a class="image-link" href="https://baike.baidu.com/pic/big%20big%20world/1506587/0/b7fd5266d0160924982c3ca8d40735fae6cd3473?fr=lemma&ct=single" target="_blank" title="乐谱" style="color: rgb(19, 110, 194); text-decoration: none; display: block; width: 167px; height: 220px;">&nbsp;&nbsp;<img src="/tp509/public/static/uploads/image/20170716/1500166834101262.jpg" title="1500166834101262.jpg" alt="d52a2834349b033bb9ebb8f117ce36d3d539bdbe.jpg"/></a></p><p>　　In a big big world<br/>　　It&#39;s not a big big thing if you leave me<br/>　　But I do do feel<br/>　　that I too too will miss you much<br/>　　Miss you much.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;I can see the first leaf falling<br/>　　It&#39;s all yellow and nice<br/>　　It&#39;s so very cold outside<br/>　　Like the way I&#39;m feeling inside<br/>　　I&#39;m a big big girl<br/>　　In a big big world<br/>　　It&#39;s not a big big thing if you leave me<br/>　　But I do do feel<br/>　　that I too too will miss you much<br/>　　Miss you much.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;Outside it&#39;s now raining<br/>　　</p><p>&nbsp;&nbsp;&nbsp;&nbsp;And tears are falling from my eyes<br/>　　Why did it have to happen<br/>　　Why did it all have to end<br/>　　I&#39;m a big big girl<br/>　　In a big big world<br/>　　It&#39;s not a big big thing if you leave me<br/>　　But I do do feel<br/>　　that I too too will miss you much<br/>　　Miss you much.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;I have your arms around me ooooh like fire<br/>　　But when I open my eyes<br/>　　You&#39;re gone.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;I&#39;m a big big girl<br/>　　In a big big world<br/>　　It&#39;s not a big big thing if you leave me<br/>　　But I do do feel<br/>　　that I too too will miss you much<br/>　　Miss you much.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;I&#39;m a big big girl<br/>　　In a big big world<br/>　　It&#39;s not a big big thing if you leave me<br/>　　But I do feel that will miss you much<br/>　　Miss you much.</p><p><br/></p>', '211', '1500174189');
INSERT INTO `blog` VALUES ('28', '张国荣-当爱已成往事', '张国荣-当爱已成往事', '1', '张国荣', '《当爱已成往事》是1993年张国荣、张丰毅、巩俐主演电影《霸王别姬》的主题曲、片尾曲，原唱林忆莲、李宗盛，先后收录在《霸王别姬电影原声带》[1]  和林忆莲1993年的粤语专辑《不如重新开始》、国语专辑《不必在乎我是谁》中。影片主演张国荣曾翻唱此歌曲，收录于1995年个人专辑《宠爱》当中。', '20170716/bcac76238258cf27dd36bc48c5946f51.jpg 20170716/thumbbcac76238258cf27dd36bc48c5946f51.jpg', '文章缩略图', '<p>词：李宗盛</p><p>曲：李宗盛</p><p>唱：林忆莲、李宗盛</p><p><span style="font-weight: 700;">女：</span>往事不要再提<br/>　　人生已多风雨<br/>　　纵然记忆抹不去<br/>　　爱与恨都还在心里<br/>　　真的要断了过去<br/>　　让明天好好继续<br/>　　你就不要再苦苦追问我的消息</p><p><img class="" src="/tp509/public/static/uploads/image/20170716/1500167528408285.jpg" alt="电影海报"/></p><p><span style="color: rgb(85, 85, 85); font-family: 宋体; font-size: 12px; line-height: 15px;">&nbsp; &nbsp; &nbsp; &nbsp;电影海报</span></p><p><span style="font-weight: 700;">男：</span>爱情它是个难题<br/>　　让人目眩神迷<br/>　　忘了痛或许可以<br/>　　忘了你却太不容易<br/>　　你不曾真的离去<br/>　　你始终在我心里<br/>　　我对你仍有爱意<br/>　　我对自己无能为力<br/>　　因为我仍有梦<br/>　　依然将你放在我心中<br/>　　总是容易被往事打动<br/>　　总是为了你心痛</p><p><span style="font-weight: 700;">女：</span>别流连岁月中　我无意的柔情万种<br/>　　不要问我是否再相逢<br/>　　不要管我是否言不由衷</p><p><span style="font-weight: 700;">女：</span>为何你不懂（<span style="font-weight: 700;">男：</span>别说我不懂）</p><p><span style="font-weight: 700;">女：</span>只要有爱就有痛（<span style="font-weight: 700;">男：</span>有爱就有痛）</p><p><span style="font-weight: 700;">女：</span>有一天你会知道</p><p><span style="font-weight: 700;">女：</span>人生没有我并不会不同（<span style="font-weight: 700;">男：</span>没有你会不同）</p><p><span style="font-weight: 700;">女：</span>人生已经太匆匆</p><p><span style="font-weight: 700;">女：</span>我好害怕总是泪眼朦胧（<span style="font-weight: 700;">男：</span>你泪眼朦胧）</p><p><span style="font-weight: 700;">女：</span>忘了我就没有痛（<span style="font-weight: 700;">男：</span>忘了你也没有用）</p><p><span style="font-weight: 700;">女：</span>将往事留在风中</p><p><span style="font-weight: 700;">女：</span>往事不要再提<br/>　　人生已多风雨<br/>　　纵然记忆抹不去<br/>　　爱与恨都还在心里<br/>　　真的要断了过去<br/>　　让明天好好继续<br/>　　你就不要再苦苦追问我的消息</p><p><span style="font-weight: 700;">女：</span>为何你不懂（<span style="font-weight: 700;">男：</span>别说我不懂）</p><p><span style="font-weight: 700;">女：</span>只要有爱就有痛（<span style="font-weight: 700;">男：</span>有爱就有痛）</p><p><span style="font-weight: 700;">女：</span>有一天你会知道</p><p><span style="font-weight: 700;">女：</span>人生没有我并不会不同（<span style="font-weight: 700;">男：</span>没有你会不同）</p><p><span style="font-weight: 700;">女：</span>人生已经太匆匆</p><p><span style="font-weight: 700;">女：</span>我好害怕总是泪眼朦胧（<span style="font-weight: 700;">男：</span>你泪眼朦胧）</p><p><span style="font-weight: 700;">女：</span>忘了我就没有痛（<span style="font-weight: 700;">男：</span>忘了你也没有用）</p><p><span style="font-weight: 700;">女：</span>将往事留在风中（<span style="font-weight: 700;">男：</span>将往事留在风中）</p><p><span style="font-weight: 700;">女：</span>为何你不懂（<span style="font-weight: 700;">男：</span>别说我不懂）</p><p><span style="font-weight: 700;">女：</span>只要有爱就有痛（<span style="font-weight: 700;">男：</span>有爱就有痛）</p><p><span style="font-weight: 700;">女：</span>有一天你会知道</p><p><span style="font-weight: 700;">女：</span>人生没有我并不会不同（<span style="font-weight: 700;">男：</span>没有你会不同）</p><p><span style="font-weight: 700;">女：</span>人生已经太匆匆</p><p><span style="font-weight: 700;">女：</span>我好害怕总是泪眼朦胧（<span style="font-weight: 700;">男：</span>你泪眼朦胧）</p><p><span style="font-weight: 700;">女：</span>忘了我就没有痛（<span style="font-weight: 700;">男白：</span>忘了你也没有用）</p><p><span style="font-weight: 700;">女：</span>将往事留在风中</p><p><br/></p>', '601', '1500168796');

-- ----------------------------
-- Records for `cate`
-- ----------------------------
INSERT INTO `cate` VALUES ('1', '大生活', '记录生活', '记录生活', '1', '0');
INSERT INTO `cate` VALUES ('2', '光影斑斓', '光影斑斓', '光影斑斓', '2', '0');
INSERT INTO `cate` VALUES ('4', '如是观', '如是观', '如是观', '3', '0');
INSERT INTO `cate` VALUES ('6', '留言本', '留言本', '留言本', '5', '1');
INSERT INTO `cate` VALUES ('7', '圈圈说', '圈圈说', '圈圈说', '4', '0');

-- ----------------------------
-- Records for `flink`
-- ----------------------------
INSERT INTO `flink` VALUES ('2', '百度', '百度', 'https://www.baidu.com');
INSERT INTO `flink` VALUES ('3', '淘宝', '淘宝', 'http://www.taobao.com');
INSERT INTO `flink` VALUES ('4', '腾讯', '腾讯', 'http://www.qq.com');
INSERT INTO `flink` VALUES ('1', 'thinkphp', 'thinkphp', 'http://www.thinkphp.cn/');
INSERT INTO `flink` VALUES ('5', 'blog', 'tp3.2.3-blog', 'http://localhost/blog');
INSERT INTO `flink` VALUES ('6', '今日头条', '今日头条', 'http://www.toutiao.com/');
INSERT INTO `flink` VALUES ('7', 'thinkall', 'thinkall', 'http://localhost/thinkall');
INSERT INTO `flink` VALUES ('8', 'thinkgroup', 'thinkgroup', 'http://localhost/thinkgroup');
INSERT INTO `flink` VALUES ('9', '站长工具', '站长工具', 'http://tool.chinaz.com/');
INSERT INTO `flink` VALUES ('10', 'bootstrap', 'bootstrap', 'http://v3.bootcss.com/');
INSERT INTO `flink` VALUES ('11', 'layui', 'layui', 'http://www.layui.com/demo/');

-- ----------------------------
-- Records for `members_blog`
-- ----------------------------
INSERT INTO `members_blog` VALUES ('1', '1', '28', '-1', '5', '<p>来自admin的评论</p>', '1502286390');
INSERT INTO `members_blog` VALUES ('2', '3', '28', '-1', '0', '<p>来自berlin的评论</p>', '1502286431');
INSERT INTO `members_blog` VALUES ('3', '2', '28', '-1', '0', '<p>来自heiying的评论</p>', '1502288336');
INSERT INTO `members_blog` VALUES ('4', '1', '25', '1', '4', '', '');

-- ----------------------------
-- Records for `search`
-- ----------------------------
INSERT INTO `search` VALUES ('1', '罗大佑', '15', '1');
INSERT INTO `search` VALUES ('2', '王菲', '12', '1');
INSERT INTO `search` VALUES ('3', '张国荣', '1', '1');
INSERT INTO `search` VALUES ('4', '李宗盛', '2', '1');
INSERT INTO `search` VALUES ('5', 'emilia', '1', '1');

-- ----------------------------
-- Records for `think_auth_group`
-- ----------------------------
INSERT INTO `think_auth_group` VALUES ('1', '超级管理', '1', '1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25');
INSERT INTO `think_auth_group` VALUES ('2', '普通管理', '1', '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,19,34,35');
INSERT INTO `think_auth_group` VALUES ('3', '编辑', '1', '1,2,3,4,5,19,34,35');
INSERT INTO `think_auth_group` VALUES ('4', '钻石会员', '0', '1,2,7,15,19');
INSERT INTO `think_auth_group` VALUES ('5', '金牌会员', '0', '');
INSERT INTO `think_auth_group` VALUES ('6', '银牌会员', '0', '');
INSERT INTO `think_auth_group` VALUES ('7', '铜牌会员', '0', '');
INSERT INTO `think_auth_group` VALUES ('8', '普通会员', '1', '');
INSERT INTO `think_auth_group` VALUES ('10', '后台测试', '1', '');
INSERT INTO `think_auth_group` VALUES ('11', '游客', '1', '');

-- ----------------------------
-- Records for `think_auth_group_access`
-- ----------------------------
INSERT INTO `think_auth_group_access` VALUES ('1', '1');
INSERT INTO `think_auth_group_access` VALUES ('2', '2');
INSERT INTO `think_auth_group_access` VALUES ('3', '3');
INSERT INTO `think_auth_group_access` VALUES ('8', '8');
INSERT INTO `think_auth_group_access` VALUES ('9', '8');
INSERT INTO `think_auth_group_access` VALUES ('10', '8');
INSERT INTO `think_auth_group_access` VALUES ('12', '10');

-- ----------------------------
-- Records for `think_auth_rule`
-- ----------------------------
INSERT INTO `think_auth_rule` VALUES ('1', 'admin/blog', '博文管理', '0', '1', '1', '1', '');
INSERT INTO `think_auth_rule` VALUES ('2', 'admin/blog/bloglist', '博文列表', '1', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('3', 'admin/blog/addblog', '新增博文', '1', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('4', 'admin/blog/editorblog', '修改博文', '1', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('5', 'admin/blog/deleteblog', '删除博文', '1', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('6', 'admin/cate', '栏目管理', '0', '1', '1', '2', '');
INSERT INTO `think_auth_rule` VALUES ('7', 'admin/cate/catelist', '栏目列表', '6', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('8', 'admin/cate/addcate', '新增栏目', '6', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('9', 'admin/cate/editorcate', '修改栏目', '6', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('10', 'admin/cate/deletecate', '删除栏目', '6', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('11', 'admin/flink', '链接管理', '0', '1', '1', '3', '');
INSERT INTO `think_auth_rule` VALUES ('12', 'admin/flink/addflink', '新增链接', '11', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('13', 'admin/flink/editorflink', '修改链接', '11', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('14', 'admin/flink/deleteflink', '删除链接', '11', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('15', 'admin/flink/flinklist', '链接列表', '11', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('16', 'admin/members', '用户管理', '0', '1', '1', '4', '');
INSERT INTO `think_auth_rule` VALUES ('17', 'admin/members/memberslist', '用户列表', '16', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('18', 'admin/members/addmembers', '新增用户', '16', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('19', 'admin/members/editormembers', '修改用户', '16', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('20', 'admin/members/deletemembers', '删除用户', '16', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('21', 'admin/authrule', '规则管理', '0', '1', '1', '4', '');
INSERT INTO `think_auth_rule` VALUES ('22', 'admin/authrule/authrulelist', '规则列表', '21', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('23', 'admin/authrule/addauthrule', '新增规则', '21', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('24', 'admin/authrule/editorauthrule', '修改规则', '21', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('25', 'admin/authrule/deleteauthrule', '删除规则', '21', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('26', 'admin/authgroup', '用户组管理', '0', '1', '1', '5', '');
INSERT INTO `think_auth_rule` VALUES ('27', 'admin/authgroup/authgrouplist', '用户组列表', '26', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('28', 'admin/authgroup/addauthgroup', '新增用户组', '26', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('29', 'admin/authgroup/editorauthgroup', '修改用户组', '26', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('30', 'admin/authgroup/deleteauthgroup', '删除用户组', '26', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('38', 'index/article', '前端内容页', '0', '1', '1', '0', '');
INSERT INTO `think_auth_rule` VALUES ('39', 'index/article/storeart', '收藏文章', '38', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('40', 'index/article/updown', '点赞吐槽', '38', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('41', 'index/article/star', '五星打分', '38', '1', '1', '100', '');
INSERT INTO `think_auth_rule` VALUES ('42', 'index/articlelist', '前端列表页', '0', '1', '1', '0', '');
INSERT INTO `think_auth_rule` VALUES ('43', 'index/articlelist/index', '列表页', '42', '1', '1', '100', '');

-- ----------------------------
-- Records for `think_members`
-- ----------------------------
INSERT INTO `think_members` VALUES ('1', 'admin', '21232f297a57a5a743894a0e4a801fc3', '', '', '', '', '1506690408', '0.0.0.0', '32', '10', '0', '1', '0', '4,5,28,25');
INSERT INTO `think_members` VALUES ('3', 'berlin', 'd35a02eb49149450fb2fffc6e467eb37', '', '', '', '', '1502286409', '0.0.0.0', '3', '10', '0', '1', '0', '');
INSERT INTO `think_members` VALUES ('2', 'heiying', '45a527d9abccda821c550f4763a92828', '', '', '', '', '1502288312', '0.0.0.0', '1', '10', '0', '1', '0', '');
INSERT INTO `think_members` VALUES ('8', 'zhangsan', '01d7f40760960e7bd9443513f22ab9af', '15107384431', '', '', '', '1498726417', '0.0.0.0', '0', '10', '0', '0', '0', '');
INSERT INTO `think_members` VALUES ('9', 'wangwu', '9f001e4166cf26bfbdd3b4f67d9ef617', '15107384432', '', '', '', '1498668518', '0.0.0.0', '0', '10', '0', '0', '0', '');
INSERT INTO `think_members` VALUES ('12', 'test1', '5a105e8b9d40e1329780d62ea2265d8a', '', '', '', '', '', '', '0', '10', '1498999561', '1', '0', '');

-- ----------------------------
-- Records for `webuploader`
-- ----------------------------
INSERT INTO `webuploader` VALUES ('1', '20170626/a66979ef7c76a222bbe8178104403be7.jpg');
INSERT INTO `webuploader` VALUES ('2', '20170626/3bea5d16d5875a5a1b421da027d1e55c.jpg');
INSERT INTO `webuploader` VALUES ('3', '20170626/c3e03d65a0027f343f284a1141ab71e1.jpg');
INSERT INTO `webuploader` VALUES ('4', '20170626/d78e41317481998ae4fd8efdf0acbb85.jpg');
INSERT INTO `webuploader` VALUES ('5', '20170626/4dcdcf7af07d6650956cd38b47d3e55f.jpg');
INSERT INTO `webuploader` VALUES ('6', '20170626/2be6813c7d124f58856b3174d6c09273.jpg');
INSERT INTO `webuploader` VALUES ('7', '20170626/66d6cc4c82c2e229b148b5285b82ff2c.jpg');
INSERT INTO `webuploader` VALUES ('8', '20170626/4d94bfe9fe315784cb0d0bfc139ac275.jpg');
INSERT INTO `webuploader` VALUES ('9', '20170626/34450a9f2b174bcff37262f9677e8462.jpg');
INSERT INTO `webuploader` VALUES ('10', '20170626/ca8a02c1ac0b9e535277f62b7e31c921.jpg');
INSERT INTO `webuploader` VALUES ('11', '20170626/e6b58ae3cc33b007ebaebd6c554b3202.jpg');
INSERT INTO `webuploader` VALUES ('12', '20170626/b9f60e46cff4af2f2cd1631696a7d5b6.jpg');
INSERT INTO `webuploader` VALUES ('13', '20170722/62620e9fa1db83a0e6e56f4c6caac233.jpg');
INSERT INTO `webuploader` VALUES ('14', '20170722/143513533908b43228272007be28df8b.jpg');

