-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: 39.103.135.71    Database: yifang
-- ------------------------------------------------------
-- Server version	5.6.49-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `company_user`
--

DROP TABLE IF EXISTS `company_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) DEFAULT '' COMMENT '员工姓名',
  `svn_username` varchar(50) DEFAULT '' COMMENT '员工账号',
  `svn_password` varchar(32) DEFAULT '' COMMENT '员工密码',
  `svn_authorize` varchar(255) DEFAULT '' COMMENT '权限授权',
  `user_type` varchar(20) DEFAULT '' COMMENT '员工身份',
  `entry_date` varchar(30) DEFAULT '' COMMENT '入职日期',
  `leave_date` varchar(30) DEFAULT '' COMMENT '离职日期',
  `become_date` varchar(30) DEFAULT '' COMMENT '转正日期',
  `contact_qq` varchar(16) DEFAULT '' COMMENT '联系QQ',
  `contact_mail` varchar(32) DEFAULT '' COMMENT '联系邮箱',
  `contact_phone` varchar(16) DEFAULT '' COMMENT '联系手机',
  `mobile_macs` text COMMENT '打卡手机',
  `status` tinyint(1) unsigned DEFAULT '1' COMMENT '状态(0禁用,1正常,2离职)',
  `sort` bigint(20) unsigned DEFAULT '0' COMMENT '排序权重',
  `is_deleted` tinyint(1) unsigned DEFAULT '0' COMMENT '删除(1删除,0未删)',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_company_user_nickname` (`nickname`) USING BTREE,
  KEY `idx_company_user_svn_username` (`svn_username`) USING BTREE,
  KEY `idx_company_user_deleted` (`is_deleted`) USING BTREE,
  KEY `idx_company_user_status` (`status`) USING BTREE,
  KEY `idx_company_user_type` (`user_type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='企业-员工信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_user`
--

LOCK TABLES `company_user` WRITE;
/*!40000 ALTER TABLE `company_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_user` ENABLE KEYS */;
UNLOCK TABLES;
