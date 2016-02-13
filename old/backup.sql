-- MySQL dump 10.14  Distrib 5.5.41-MariaDB, for Linux (x86_64)
--
-- Host: tourney2015.db.11244479.hostedresource.com    Database: tourney2015
-- ------------------------------------------------------
-- Server version	5.5.40-36.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `best_scores`
--

DROP TABLE IF EXISTS `best_scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `best_scores` (
  `id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT '',
  `score` double NOT NULL DEFAULT '0',
  `scoring_type` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`scoring_type`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `best_scores`
--

LOCK TABLES `best_scores` WRITE;
/*!40000 ALTER TABLE `best_scores` DISABLE KEYS */;
INSERT INTO `best_scores` VALUES (1,'THE First Bracket',673,'main'),(2,'Bull Moose',1068,'main'),(3,'DUUUUUUUKE',694,'main'),(1,'THE First Bracket',192,'geometric'),(2,'Bull Moose',192,'geometric'),(3,'DUUUUUUUKE',192,'geometric'),(1,'THE First Bracket',1680,'espn'),(2,'Bull Moose',1680,'espn'),(3,'DUUUUUUUKE',1680,'espn');
/*!40000 ALTER TABLE `best_scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` tinytext NOT NULL,
  `subtitle` tinytext NOT NULL,
  `content` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brackets`
--

DROP TABLE IF EXISTS `brackets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brackets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person` text NOT NULL,
  `name` varchar(128) NOT NULL DEFAULT '',
  `email` text NOT NULL,
  `tiebreaker` int(3) NOT NULL DEFAULT '0',
  `paid` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=paid,0=unpaid,2=exempted',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'time bracket was submitted',
  `1` varchar(32) NOT NULL DEFAULT '',
  `2` varchar(32) NOT NULL DEFAULT '',
  `3` varchar(32) NOT NULL DEFAULT '',
  `4` varchar(32) NOT NULL DEFAULT '',
  `5` varchar(32) NOT NULL DEFAULT '',
  `6` varchar(32) NOT NULL DEFAULT '',
  `7` varchar(32) NOT NULL DEFAULT '',
  `8` varchar(32) NOT NULL DEFAULT '',
  `9` varchar(32) NOT NULL DEFAULT '',
  `10` varchar(32) NOT NULL DEFAULT '',
  `11` varchar(32) NOT NULL DEFAULT '',
  `12` varchar(32) NOT NULL DEFAULT '',
  `13` varchar(32) NOT NULL DEFAULT '',
  `14` varchar(32) NOT NULL DEFAULT '',
  `15` varchar(32) NOT NULL DEFAULT '',
  `16` varchar(32) NOT NULL DEFAULT '',
  `17` varchar(32) NOT NULL DEFAULT '',
  `18` varchar(32) NOT NULL DEFAULT '',
  `19` varchar(32) NOT NULL DEFAULT '',
  `20` varchar(32) NOT NULL DEFAULT '',
  `21` varchar(32) NOT NULL DEFAULT '',
  `22` varchar(32) NOT NULL DEFAULT '',
  `23` varchar(32) NOT NULL DEFAULT '',
  `24` varchar(32) NOT NULL DEFAULT '',
  `25` varchar(32) NOT NULL DEFAULT '',
  `26` varchar(32) NOT NULL DEFAULT '',
  `27` varchar(32) NOT NULL DEFAULT '',
  `28` varchar(32) NOT NULL DEFAULT '',
  `29` varchar(32) NOT NULL DEFAULT '',
  `30` varchar(32) NOT NULL DEFAULT '',
  `31` varchar(32) NOT NULL DEFAULT '',
  `32` varchar(32) NOT NULL DEFAULT '',
  `33` varchar(32) NOT NULL DEFAULT '',
  `34` varchar(32) NOT NULL DEFAULT '',
  `35` varchar(32) NOT NULL DEFAULT '',
  `36` varchar(32) NOT NULL DEFAULT '',
  `37` varchar(32) NOT NULL DEFAULT '',
  `38` varchar(32) NOT NULL DEFAULT '',
  `39` varchar(32) NOT NULL DEFAULT '',
  `40` varchar(32) NOT NULL DEFAULT '',
  `41` varchar(32) NOT NULL DEFAULT '',
  `42` varchar(32) NOT NULL DEFAULT '',
  `43` varchar(32) NOT NULL DEFAULT '',
  `44` varchar(32) NOT NULL DEFAULT '',
  `45` varchar(32) NOT NULL DEFAULT '',
  `46` varchar(32) NOT NULL DEFAULT '',
  `47` varchar(32) NOT NULL DEFAULT '',
  `48` varchar(32) NOT NULL DEFAULT '',
  `49` varchar(32) NOT NULL DEFAULT '',
  `50` varchar(32) NOT NULL DEFAULT '',
  `51` varchar(32) NOT NULL DEFAULT '',
  `52` varchar(32) NOT NULL DEFAULT '',
  `53` varchar(32) NOT NULL DEFAULT '',
  `54` varchar(32) NOT NULL DEFAULT '',
  `55` varchar(32) NOT NULL DEFAULT '',
  `56` varchar(32) NOT NULL DEFAULT '',
  `57` varchar(32) NOT NULL DEFAULT '',
  `58` varchar(32) NOT NULL DEFAULT '',
  `59` varchar(32) NOT NULL DEFAULT '',
  `60` varchar(32) NOT NULL DEFAULT '',
  `61` varchar(32) NOT NULL DEFAULT '',
  `62` varchar(32) NOT NULL DEFAULT '',
  `63` varchar(32) NOT NULL DEFAULT '',
  `eliminated` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Equals 1 when eliminated',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brackets`
--

LOCK TABLES `brackets` WRITE;
/*!40000 ALTER TABLE `brackets` DISABLE KEYS */;
INSERT INTO `brackets` VALUES (1,'Sam Rang','THE First Bracket','srang2010@gmail.com',123,2,'2015-03-16 00:22:11','Kentucky','Cincinatti','West Virginia','Maryland','Butler','Notre Dame','Wichita St','Kansas','Wisconsin','Oregon','Arkansas','UNC','Xavier','Baylor','Ohio State','Arizona','Villanova','NC State','Northern Iowa','Louisville','Providence','Oklahoma','Georgia','Virginia','Duke','San Diego St','Utah','Georgetown','SMU','Iowa State','Iowa','Gonzaga','Kentucky','Maryland','Notre Dame','Kansas','Wisconsin','Arkansas','Xavier','Arizona','Villanova','Louisville','Oklahoma','Virginia','Duke','Georgetown','SMU','Gonzaga','Kentucky','Notre Dame','Wisconsin','Arizona','Louisville','Virginia','Duke','SMU','Kentucky','Wisconsin','Louisville','Duke','Kentucky','Duke','Kentucky',0),(2,'Sam Rang','Bull Moose','srang2010@gmail.com',100,2,'2015-03-16 00:27:10','Kentucky','Cincinatti','West Virginia','Maryland','Texas','Notre Dame','Indiana','New Mexico St','Wisconsin','Oregon','Wofford','Harvard','Xavier','Baylor','Ohio State','Arizona','Villanova','NC State','Northern Iowa','Louisville','Boise St/Dayton','Oklahoma','Michigan St','Belmont','Duke','San Diego St','Utah','Georgetown','SMU','Iowa State','Davidson','North Dakota St','Kentucky','West Virginia','Notre Dame','Indiana','Wisconsin','Harvard','Baylor','Arizona','Villanova','Louisville','Boise St/Dayton','Michigan St','Duke','Utah','SMU','Davidson','Kentucky','Notre Dame','Harvard','Arizona','Louisville','Boise St/Dayton','Duke','Davidson','Kentucky','Harvard','Louisville','Duke','Harvard','Duke','Harvard',0),(3,'Kelly','DUUUUUUUKE','kandrejko@luc.edu',142,2,'2015-03-16 00:46:22','Kentucky','Purdue','West Virginia','Maryland','Butler','Notre Dame','Indiana','Kansas','Wisconsin','Oregon','Arkansas','UNC','Xavier','Baylor','Ohio State','Arizona','Villanova','NC State','Wyoming','Louisville','Providence','Oklahoma','Michigan St','Virginia','Duke','St. Johns','Utah','Georgetown','SMU','Iowa State','Davidson','Gonzaga','Kentucky','West Virginia','Notre Dame','Kansas','Wisconsin','UNC','Baylor','Arizona','Villanova','Louisville','Oklahoma','Michigan St','Duke','Georgetown','Iowa State','Gonzaga','Kentucky','Notre Dame','UNC','Baylor','Louisville','Oklahoma','Duke','Gonzaga','Kentucky','UNC','Oklahoma','Duke','Kentucky','Duke','Kentucky',0),(4,'Upset City','DUUUUUUUKE','srang2010@gmail.com',87,2,'2015-03-16 01:39:24','Kentucky','Cincinatti','Buffalo','Valpariso','Butler','Notre Dame','Indiana','Kansas','Wisconsin','Oregon','Wofford','Harvard','Xavier','Baylor','VCU','Texas Southern','Villanova','NC State','Northern Iowa','Louisville','Providence','Alabama','Michigan St','Virginia','Duke','San Diego St','Stephen F. Austin','Georgetown','SMU','Iowa State','Davidson','North Dakota St','Cincinatti','Buffalo','Notre Dame','Indiana','Wisconsin','Wofford','Baylor','Texas Southern','NC State','Northern Iowa','Providence','Michigan St','Duke','Stephen F. Austin','SMU','North Dakota St','Buffalo','Indiana','Wofford','Baylor','NC State','Michigan St','Duke','North Dakota St','Buffalo','Wofford','NC State','Duke','Buffalo','Duke','Duke',0),(5,'Kelly','Kelly take 2','kma32@duke.edu',145,2,'2015-03-17 00:31:19','Kentucky','Purdue','Buffalo','Maryland','Butler','Notre Dame','Indiana','Kansas','Wisconsin','Oklahoma St','Arkansas','UNC','BYU/Mississippi','Baylor','VCU','Arizona','Villanova','NC State','Northern Iowa','Louisville','Providence','Oklahoma','Michigan St','Virginia','Duke','St. Johns','Stephen F. Austin','Georgetown','SMU','Iowa State','Davidson','Gonzaga','Kentucky','Buffalo','Notre Dame','Kansas','Wisconsin','UNC','Baylor','Arizona','Villanova','Louisville','Oklahoma','Michigan St','Duke','Georgetown','Iowa State','Gonzaga','Kentucky','Notre Dame','UNC','Baylor','Villanova','Oklahoma','Duke','Iowa State','Kentucky','UNC','Villanova','Duke','Kentucky','Duke','Kentucky',0),(6,'Mary Rang','Maaa','mprang@cfl.rr.com',97,2,'2015-03-17 01:51:21','Kentucky','Cincinatti','West Virginia','Valpariso','Texas','Notre Dame','Wichita St','New Mexico St','Wisconsin','Oregon','Wofford','UNC','BYU/Mississippi','Baylor','Ohio State','Arizona','Villanova','NC State','Northern Iowa','Louisville','Boise St/Dayton','Oklahoma','Michigan St','Virginia','Duke','St. Johns','Utah','Georgetown','SMU','Iowa State','Iowa','Gonzaga','Kentucky','Valpariso','Notre Dame','Wichita St','Wisconsin','UNC','Baylor','Ohio State','NC State','Louisville','Boise St/Dayton','Virginia','Duke','Georgetown','Iowa State','Iowa','Kentucky','Notre Dame','Wisconsin','Baylor','Louisville','Virginia','Duke','Iowa State','Notre Dame','Wisconsin','Virginia','Duke','Notre Dame','Duke','Duke',0),(7,'Paul Rang','Dad','prang@cfl.rr.com',120,2,'2015-03-17 02:02:17','Kentucky','Cincinatti','West Virginia','Maryland','Texas','Notre Dame','Indiana','Kansas','Wisconsin','Oklahoma St','Arkansas','UNC','Xavier','Baylor','Ohio State','Arizona','Villanova','NC State','Northern Iowa','Louisville','Providence','Oklahoma','Georgia','Virginia','Duke','San Diego St','Utah','Georgetown','SMU','Iowa State','Iowa','Gonzaga','Kentucky','Maryland','Notre Dame','Kansas','Wisconsin','UNC','Xavier','Arizona','Villanova','Louisville','Oklahoma','Virginia','Duke','Utah','Iowa State','Gonzaga','Kentucky','Notre Dame','UNC','Arizona','Villanova','Oklahoma','Duke','Iowa State','Kentucky','UNC','Villanova','Duke','Kentucky','Duke','Kentucky',0),(8,'Bill Friedman','friedmoose','friedmoose@hotmail.com',144,2,'2015-03-17 03:17:37','Kentucky','Purdue','West Virginia','Maryland','Butler','Notre Dame','Wichita St','Kansas','Wisconsin','Oregon','Arkansas','UNC','Xavier','Baylor','Ohio State','Arizona','Villanova','NC State','Northern Iowa','Louisville','Providence','Oklahoma','Michigan St','Virginia','Duke','St. Johns','Utah','Eastern Washington','SMU','Iowa State','Davidson','Gonzaga','Kentucky','West Virginia','Notre Dame','Kansas','Wisconsin','UNC','Baylor','Arizona','Villanova','Northern Iowa','Oklahoma','Michigan St','Duke','Utah','Iowa State','Gonzaga','Kentucky','Notre Dame','Wisconsin','Arizona','Villanova','Oklahoma','Duke','Gonzaga','Kentucky','Wisconsin','Villanova','Gonzaga','Kentucky','Gonzaga','Kentucky',0),(9,'Kristin Andrejko','Kristin\\\'s Killer bracket (ND is in the final four lol)','kristin_andrejko@caryacademy.org',170,2,'2015-03-17 22:04:47','Kentucky','Cincinatti','West Virginia','Maryland','Texas','Notre Dame','Indiana','Kansas','Wisconsin','Oklahoma St','Arkansas','UNC','Xavier','Baylor','Ohio State','Arizona','Villanova','NC State','Wyoming','Louisville','Providence','Oklahoma','Michigan St','Virginia','Duke','San Diego St','Utah','Georgetown','UCLA','Iowa State','Iowa','Gonzaga','Kentucky','West Virginia','Notre Dame','Kansas','Wisconsin','UNC','Baylor','Arizona','Villanova','Louisville','Oklahoma','Virginia','Duke','Georgetown','Iowa State','Iowa','Kentucky','Notre Dame','Wisconsin','Baylor','Villanova','Oklahoma','Georgetown','Iowa State','Notre Dame','Wisconsin','Villanova','Iowa State','Wisconsin','Villanova','Wisconsin',0);
/*!40000 ALTER TABLE `brackets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bracket` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `from` tinytext NOT NULL,
  `subject` tinytext NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `end_games`
--

DROP TABLE IF EXISTS `end_games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `end_games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `49` varchar(32) DEFAULT NULL,
  `50` varchar(32) DEFAULT NULL,
  `51` varchar(32) DEFAULT NULL,
  `52` varchar(32) DEFAULT NULL,
  `53` varchar(32) DEFAULT NULL,
  `54` varchar(32) DEFAULT NULL,
  `55` varchar(32) DEFAULT NULL,
  `56` varchar(32) DEFAULT NULL,
  `57` varchar(32) DEFAULT NULL,
  `58` varchar(32) DEFAULT NULL,
  `59` varchar(32) DEFAULT NULL,
  `60` varchar(32) DEFAULT NULL,
  `61` varchar(32) DEFAULT NULL,
  `62` varchar(32) DEFAULT NULL,
  `63` varchar(32) DEFAULT NULL,
  `round` int(11) DEFAULT NULL,
  `eliminated` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `end_games`
--

LOCK TABLES `end_games` WRITE;
/*!40000 ALTER TABLE `end_games` DISABLE KEYS */;
/*!40000 ALTER TABLE `end_games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master`
--

DROP TABLE IF EXISTS `master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `1` varchar(32) NOT NULL DEFAULT '',
  `2` varchar(32) NOT NULL DEFAULT '',
  `3` varchar(32) NOT NULL DEFAULT '',
  `4` varchar(32) NOT NULL DEFAULT '',
  `5` varchar(32) NOT NULL DEFAULT '',
  `6` varchar(32) NOT NULL DEFAULT '',
  `7` varchar(32) NOT NULL DEFAULT '',
  `8` varchar(32) NOT NULL DEFAULT '',
  `9` varchar(32) NOT NULL DEFAULT '',
  `10` varchar(32) NOT NULL DEFAULT '',
  `11` varchar(32) NOT NULL DEFAULT '',
  `12` varchar(32) NOT NULL DEFAULT '',
  `13` varchar(32) NOT NULL DEFAULT '',
  `14` varchar(32) NOT NULL DEFAULT '',
  `15` varchar(32) NOT NULL DEFAULT '',
  `16` varchar(32) NOT NULL DEFAULT '',
  `17` varchar(32) NOT NULL DEFAULT '',
  `18` varchar(32) NOT NULL DEFAULT '',
  `19` varchar(32) NOT NULL DEFAULT '',
  `20` varchar(32) NOT NULL DEFAULT '',
  `21` varchar(32) NOT NULL DEFAULT '',
  `22` varchar(32) NOT NULL DEFAULT '',
  `23` varchar(32) NOT NULL DEFAULT '',
  `24` varchar(32) NOT NULL DEFAULT '',
  `25` varchar(32) NOT NULL DEFAULT '',
  `26` varchar(32) NOT NULL DEFAULT '',
  `27` varchar(32) NOT NULL DEFAULT '',
  `28` varchar(32) NOT NULL DEFAULT '',
  `29` varchar(32) NOT NULL DEFAULT '',
  `30` varchar(32) NOT NULL DEFAULT '',
  `31` varchar(32) NOT NULL DEFAULT '',
  `32` varchar(32) NOT NULL DEFAULT '',
  `33` varchar(32) NOT NULL DEFAULT '',
  `34` varchar(32) NOT NULL DEFAULT '',
  `35` varchar(32) NOT NULL DEFAULT '',
  `36` varchar(32) NOT NULL DEFAULT '',
  `37` varchar(32) NOT NULL DEFAULT '',
  `38` varchar(32) NOT NULL DEFAULT '',
  `39` varchar(32) NOT NULL DEFAULT '',
  `40` varchar(32) NOT NULL DEFAULT '',
  `41` varchar(32) NOT NULL DEFAULT '',
  `42` varchar(32) NOT NULL DEFAULT '',
  `43` varchar(32) NOT NULL DEFAULT '',
  `44` varchar(32) NOT NULL DEFAULT '',
  `45` varchar(32) NOT NULL DEFAULT '',
  `46` varchar(32) NOT NULL DEFAULT '',
  `47` varchar(32) NOT NULL DEFAULT '',
  `48` varchar(32) NOT NULL DEFAULT '',
  `49` varchar(32) NOT NULL DEFAULT '',
  `50` varchar(32) NOT NULL DEFAULT '',
  `51` varchar(32) NOT NULL DEFAULT '',
  `52` varchar(32) NOT NULL DEFAULT '',
  `53` varchar(32) NOT NULL DEFAULT '',
  `54` varchar(32) NOT NULL DEFAULT '',
  `55` varchar(32) NOT NULL DEFAULT '',
  `56` varchar(32) NOT NULL DEFAULT '',
  `57` varchar(32) NOT NULL DEFAULT '',
  `58` varchar(32) NOT NULL DEFAULT '',
  `59` varchar(32) NOT NULL DEFAULT '',
  `60` varchar(32) NOT NULL DEFAULT '',
  `61` varchar(32) NOT NULL DEFAULT '',
  `62` varchar(32) NOT NULL DEFAULT '',
  `63` varchar(32) NOT NULL DEFAULT '',
  `64` varchar(32) NOT NULL DEFAULT '',
  `type` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master`
--

LOCK TABLES `master` WRITE;
/*!40000 ALTER TABLE `master` DISABLE KEYS */;
INSERT INTO `master` VALUES (4,'1','16','8','9','5','12','4','13','6','11','3','14','7','10','2','15','1','16','8','9','5','12','4','13','6','11','3','14','7','10','2','15','1','16','8','9','5','12','4','13','6','11','3','14','7','10','2','15','1','16','8','9','5','12','4','13','6','11','3','14','7','10','2','15','seeds'),(1,'Kentucky','Hampton/Manhattan','Cincinatti','Purdue','West Virginia','Buffalo','Maryland','Valpariso','Butler','Texas','Notre Dame','North Eastern','Wichita St','Indiana','Kansas','New Mexico St','Wisconsin','Coastal Carolina','Oregon','Oklahoma St','Arkansas','Wofford','UNC','Harvard','Xavier','BYU/Mississippi','Baylor','Georgia St','VCU','Ohio State','Arizona','Texas Southern','Villanova','LaFayette','NC State','LSU','Northern Iowa','Wyoming','Louisville','UC Irvine','Providence','Boise St/Dayton','Oklahoma','Alabama','Michigan St','Georgia','Virginia','Belmont','Duke','North Florida/Robert Morris','San Diego St','St. Johns','Utah','Stephen F. Austin','Georgetown','Eastern Washington','SMU','UCLA','Iowa State','UAB','Iowa','Davidson','Gonzaga','North Dakota St',NULL);
/*!40000 ALTER TABLE `master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meta`
--

DROP TABLE IF EXISTS `meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  `subtitle` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `cost` double NOT NULL,
  `cut` double NOT NULL,
  `cutType` int(1) NOT NULL COMMENT '1=percent, 0=dollars',
  `closed` tinyint(1) NOT NULL COMMENT '1=submission is closed',
  `sweet16` tinyint(1) NOT NULL COMMENT '1=sweet 16 has started',
  `rules` text NOT NULL,
  `mail` int(1) NOT NULL,
  `tiebreaker` int(3) DEFAULT NULL,
  `sweet16Competition` tinyint(1) NOT NULL COMMENT '1=this is a sweet 16 tourney',
  `region1` varchar(64) NOT NULL,
  `region2` varchar(64) NOT NULL,
  `region3` varchar(64) NOT NULL,
  `region4` varchar(64) NOT NULL,
  `db_version` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meta`
--

LOCK TABLES `meta` WRITE;
/*!40000 ALTER TABLE `meta` DISABLE KEYS */;
INSERT INTO `meta` VALUES (1,'March Madness','Friedman Bracket Challenge','srang','srang2010@gmail.com',0,0,0,0,0,'<p>No additional rules have been set.</p>',0,NULL,0,'Midwest','West','East','South','ver 1.5.2'),(2,'March Madness','Friedman Bracket Challenge','srang','srang2010@gmail.com',0,0,0,0,0,'<p>No additional rules have been set.</p>',0,NULL,0,'Midwest','East','West','South','ver 1.5.2');
/*!40000 ALTER TABLE `meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwords`
--

DROP TABLE IF EXISTS `passwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `passwords` (
  `label` varchar(255) NOT NULL,
  `value` varchar(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`label`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Used for user login validation';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwords`
--

LOCK TABLES `passwords` WRITE;
/*!40000 ALTER TABLE `passwords` DISABLE KEYS */;
INSERT INTO `passwords` VALUES ('admin_password','cf367698f65e5038c6b0cfcf33edd8f4');
/*!40000 ALTER TABLE `passwords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `possible_scores`
--

DROP TABLE IF EXISTS `possible_scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `possible_scores` (
  `outcome_id` int(11) DEFAULT NULL,
  `bracket_id` int(11) DEFAULT NULL,
  `score` double DEFAULT NULL,
  `type` char(32) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `eliminated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `possible_scores`
--

LOCK TABLES `possible_scores` WRITE;
/*!40000 ALTER TABLE `possible_scores` DISABLE KEYS */;
/*!40000 ALTER TABLE `possible_scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `possible_scores_eliminated`
--

DROP TABLE IF EXISTS `possible_scores_eliminated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `possible_scores_eliminated` (
  `outcome_id` int(11) DEFAULT NULL,
  `bracket_id` int(11) DEFAULT NULL,
  `score` double DEFAULT NULL,
  `type` char(32) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `eliminated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `possible_scores_eliminated`
--

LOCK TABLES `possible_scores_eliminated` WRITE;
/*!40000 ALTER TABLE `possible_scores_eliminated` DISABLE KEYS */;
/*!40000 ALTER TABLE `possible_scores_eliminated` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `probability_of_winning`
--

DROP TABLE IF EXISTS `probability_of_winning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `probability_of_winning` (
  `id` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `probability_win` double DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `probability_of_winning`
--

LOCK TABLES `probability_of_winning` WRITE;
/*!40000 ALTER TABLE `probability_of_winning` DISABLE KEYS */;
/*!40000 ALTER TABLE `probability_of_winning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scores` (
  `id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT '',
  `score` double NOT NULL DEFAULT '0',
  `scoring_type` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`scoring_type`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES (1,'THE First Bracket',0,'main'),(2,'Bull Moose',0,'main'),(3,'DUUUUUUUKE',0,'main'),(1,'THE First Bracket',0,'geometric'),(2,'Bull Moose',0,'geometric'),(3,'DUUUUUUUKE',0,'geometric'),(1,'THE First Bracket',0,'espn'),(2,'Bull Moose',0,'espn'),(3,'DUUUUUUUKE',0,'espn');
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scoring`
--

DROP TABLE IF EXISTS `scoring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scoring` (
  `seed` int(11) NOT NULL DEFAULT '0',
  `1` double DEFAULT NULL,
  `2` double DEFAULT NULL,
  `3` double DEFAULT NULL,
  `4` double DEFAULT NULL,
  `5` double DEFAULT NULL,
  `6` double DEFAULT NULL,
  `type` char(255) DEFAULT NULL,
  KEY `system` (`type`,`seed`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scoring`
--

LOCK TABLES `scoring` WRITE;
/*!40000 ALTER TABLE `scoring` DISABLE KEYS */;
INSERT INTO `scoring` VALUES (2,1,2,4,8,16,32,'geometric'),(3,1,2,4,8,16,32,'geometric'),(4,1,2,4,8,16,32,'geometric'),(5,1,2,4,8,16,32,'geometric'),(6,1,2,4,8,16,32,'geometric'),(7,1,2,4,8,16,32,'geometric'),(8,1,2,4,8,16,32,'geometric'),(9,1,2,4,8,16,32,'geometric'),(10,1,2,4,8,16,32,'geometric'),(11,1,2,4,8,16,32,'geometric'),(12,1,2,4,8,16,32,'geometric'),(13,1,2,4,8,16,32,'geometric'),(14,1,2,4,8,16,32,'geometric'),(15,1,2,4,8,16,32,'geometric'),(16,1,2,4,8,16,32,'geometric'),(1,1,2,4,8,16,32,'geometric'),(16,10,20,40,80,120,160,'espn'),(15,10,20,40,80,120,160,'espn'),(14,10,20,40,80,120,160,'espn'),(13,10,20,40,80,120,160,'espn'),(12,10,20,40,80,120,160,'espn'),(11,10,20,40,80,120,160,'espn'),(10,10,20,40,80,120,160,'espn'),(9,10,20,40,80,120,160,'espn'),(8,10,20,40,80,120,160,'espn'),(7,10,20,40,80,120,160,'espn'),(6,10,20,40,80,120,160,'espn'),(5,10,20,40,80,120,160,'espn'),(4,10,20,40,80,120,160,'espn'),(3,10,20,40,80,120,160,'espn'),(2,10,20,40,80,120,160,'espn'),(1,10,20,40,80,120,160,'espn'),(1,2,3,5,8,13,21,'fibonacci'),(2,2,3,5,8,13,21,'fibonacci'),(3,2,3,5,8,13,21,'fibonacci'),(4,2,3,5,8,13,21,'fibonacci'),(5,2,3,5,8,13,21,'fibonacci'),(6,2,3,5,8,13,21,'fibonacci'),(7,2,3,5,8,13,21,'fibonacci'),(8,2,3,5,8,13,21,'fibonacci'),(9,2,3,5,8,13,21,'fibonacci'),(10,2,3,5,8,13,21,'fibonacci'),(11,2,3,5,8,13,21,'fibonacci'),(12,2,3,5,8,13,21,'fibonacci'),(13,2,3,5,8,13,21,'fibonacci'),(14,2,3,5,8,13,21,'fibonacci'),(15,2,3,5,8,13,21,'fibonacci'),(16,2,3,5,8,13,21,'fibonacci'),(16,16,32,58,89,120,161,'main'),(15,15,30,55,85,115,155,'main'),(14,14,28,52,81,110,149,'main'),(13,13,26,49,77,105,143,'main'),(12,12,24,46,73,100,137,'main'),(11,11,22,43,69,95,131,'main'),(10,10,20,40,65,90,125,'main'),(9,9,18,37,61,85,119,'main'),(8,8,16,34,57,80,113,'main'),(7,7,14,31,53,75,107,'main'),(6,6,12,28,49,70,101,'main'),(5,5,10,25,45,65,95,'main'),(4,4,8,22,41,60,89,'main'),(3,3,6,19,37,55,83,'main'),(2,2,4,16,33,50,77,'main'),(1,1,2,13,29,45,71,'main');
/*!40000 ALTER TABLE `scoring` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scoring_info`
--

DROP TABLE IF EXISTS `scoring_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scoring_info` (
  `type` varchar(255) NOT NULL DEFAULT '',
  `display_name` varchar(255) DEFAULT NULL,
  `description` blob,
  PRIMARY KEY (`type`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scoring_info`
--

LOCK TABLES `scoring_info` WRITE;
/*!40000 ALTER TABLE `scoring_info` DISABLE KEYS */;
INSERT INTO `scoring_info` VALUES ('espn','ESPN','<table border=\'1\'><tr align=\'center\'><td colspan=\'7\'>ESPN</td></tr><tr align=\'center\'><td>Seeds</td><td colspan=\'6\'>Rounds</td></tr><tr><td>&nbsp;</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr><tr><td>1</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>2</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>3</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>4</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>5</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>6</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>7</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>8</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>9</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>10</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>11</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>12</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>13</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>14</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>15</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr><tr><td>16</td><td>10</td><td>20</td><td>40</td><td>80</td><td>120</td><td>160</td><tr></table>'),('geometric','Geometric','<table border=\'1\'><tr align=\'center\'><td colspan=\'7\'>Geometric</td></tr><tr align=\'center\'><td>Seeds</td><td colspan=\'6\'>Rounds</td></tr><tr><td>&nbsp;</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr><tr><td>1</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>2</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>3</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>4</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>5</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>6</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>7</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>8</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>9</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>10</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>11</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>12</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>13</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>14</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>15</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr><tr><td>16</td><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td><tr></table>'),('main','Actual','<table border=\'1\' align=\'center\'><tr><td colspan=\'8\'>Value of a win by a seed in a particular round</td></tr><tr><td>Seed #</td><td>R1</td><td>R2</td><td>R3</td><td>R4</td><td>R5</td><td>R6</td></tr><tr><td>1</td><td>1</td><td>2</td><td>13</td><td>29</td><td>45</td><td>71</td></tr><tr><td>2</td><td>2</td><td>4</td><td>16</td><td>33</td><td>50</td><td>77</td></tr><tr><td>3</td><td>3</td><td>6</td><td>19</td><td>37</td><td>55</td><td>83</td></tr><tr><td>4</td><td>4</td><td>8</td><td>22</td><td>41</td><td>60</td><td>89</td></tr><tr><td>5</td><td>5</td><td>10</td><td>25</td><td>45</td><td>65</td><td>95</td></tr><tr><td>6</td><td>6</td><td>12</td><td>28</td><td>49</td><td>70</td><td>101</td></tr><tr><td>7</td><td>7</td><td>14</td><td>31</td><td>53</td><td>75</td><td>107</td></tr><tr><td>8</td><td>8</td><td>16</td><td>34</td><td>57</td><td>80</td><td>113</td></tr><tr><td>9</td><td>9</td><td>18</td><td>37</td><td>61</td><td>85</td><td>119</td></tr><tr><td>10</td><td>10</td><td>20</td><td>40</td><td>65</td><td>90</td><td>125</td></tr><tr><td>11</td><td>11</td><td>22</td><td>43</td><td>69</td><td>95</td><td>131</td></tr><tr><td>12</td><td>12</td><td>24</td><td>46</td><td>73</td><td>100</td><td>137</td></tr><tr><td>13</td><td>13</td><td>26</td><td>49</td><td>77</td><td>105</td><td>143</td></tr><tr><td>14</td><td>14</td><td>28</td><td>52</td><td>81</td><td>110</td><td>149</td></tr><tr><td>15</td><td>15</td><td>30</td><td>55</td><td>85</td><td>115</td><td>155</td></tr><tr><td>16</td><td>16</td><td>32</td><td>58</td><td>89</td><td>120</td><td>161</td></tr></table>');
/*!40000 ALTER TABLE `scoring_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-03-17 18:52:52
