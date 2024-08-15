CREATE DATABASE  IF NOT EXISTS `petbridge` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `petbridge`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: i11b106.p.ssafy.io    Database: petbridge
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animals`
--

DROP TABLE IF EXISTS `animals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `species` varchar(20) NOT NULL,
  `kind_cd` varchar(50) NOT NULL,
  `color_cd` varchar(50) NOT NULL,
  `age` int NOT NULL,
  `weight` int NOT NULL,
  `sex_cd` char(1) NOT NULL,
  `neuter_yn` char(1) NOT NULL,
  `special_mark` varchar(255) DEFAULT NULL,
  `care_addr` varchar(100) NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `animals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animals`
--

LOCK TABLES `animals` WRITE;
/*!40000 ALTER TABLE `animals` DISABLE KEYS */;
INSERT INTO `animals` VALUES (1,7,'흰둥이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/1a429450-9.jfif','개','믹스','White',2020,2,'M','N','귀여워요','정부청사',0),(2,7,'예빈냥이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/f859463e-1.jpg','개','포메라니안','Black',1999,4,'F','Y','집사를 찾고 있어요','유성온천',0),(3,7,'꽁냥','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/ec4f5855-2.jfif','고양이','랙돌','BrownWhite',2021,2,'M','N','집사를 찾고 있어요','정부청사',0),(4,8,'깜디','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/3767a91a-9.jpg','개','시츄','Black',2019,2,'Q','N','귀엽다','유성온천',0),(5,8,'승질이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/df071ae6-2.jfif','개','포메라니안','BrownWhite',2021,2,'Q','Y','무서워요','유성온천',0),(6,8,'회색이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/cb4484a7-c.jfif','고양이','한국고양이','회색',2021,3,'F','Y','날쎈돌이임','대전광역시 동구',0),(7,1,'하양이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/6bd070cc-b.jfif','개','믹스','White',2023,1,'M','N','물개를 닮앗어요','대전광역시 서구',0),(8,4,'식빵이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/e5c3a4ea-d.JPG','개','웰시코기','노랑',2023,3,'F','N','털이 보드라워요','대전광역시 유성구',0),(9,3,'승냥이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/de47bbd7-0.jfif','고양이','한국 고양이','고등어',2021,1,'F','Y','승냥이입니다','유성온천',0),(10,3,'꼬질이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/030d0032-b.jpg','개','믹스','하얀색',2023,3,'F','N','씻는걸 좋아해요','한밭대',0),(11,8,'보리','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/ae695ae8-f.jfif','개','포메라니안','보리색',2016,55,'Q','N','잘 놀아줘야함','정부청사',0),(12,8,'허스허스','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/e867ed15-c.jfif','개','허스키','brown',1999,23,'M','N','잠와요','유성온천',0),(13,1,'숨냥이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/15df9086-4.jfif','고양이','고양이','white',2001,2,'F','Y','숨냥숨냥숨냥숨냥','한밭대',0),(14,4,'치즈 고영희','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/ca4d4eea-2.jpg','고양이','한국 고양이','노랑',2023,3,'Q','Y','귀여운 고영희씨','가정',1),(15,4,'치즈 고영희','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/9f6a4ed8-c.jpg','고양이','한국 고양이','노랑',2016,3,'Q','Y','귀여운 고영희씨','가정',0),(16,17,'얌금이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/66fc2aa7-c.jpeg','고양이','페르시안','흰색',2024,2,'M','N','커엽커엽','대전 유성구',0),(17,4,'누렁이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/cdf63209-8.png','개','누렁이','까맘',1996,90,'Q','Y','수염이 나있어요 잘먹어요','대전광역시 유성구 덕명동 ',1),(18,22,'우래기','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/2d0bb0ec-d.jpg','기타','최고','원더풀',1919,60,'M','N','최고쿵야','내맘속',1),(19,18,'제리','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/24a32b33-e.jpeg','고양이','믹스','회색',2010,4,'F','Y','귀엽습니다 아주요','대전 만년동',0),(20,17,'재훈냥이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/adccb65d-3.jpeg','고양이','페르시안','노란색',2010,6,'M','Y','우리 뚱땡이 톰','대전광역시 서구',0);
/*!40000 ALTER TABLE `animals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_comments`
--

DROP TABLE IF EXISTS `board_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(200) NOT NULL,
  `regist_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `board_id` (`board_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `board_comments_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `boards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `board_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_comments`
--

LOCK TABLES `board_comments` WRITE;
/*!40000 ALTER TABLE `board_comments` DISABLE KEYS */;
INSERT INTO `board_comments` VALUES (1,5,1,'저랑 개발하실래요??','2024-08-12 02:13:51',0),(3,7,4,'저 입양 원합니다. 연락 주세요','2024-08-12 02:15:13',0),(4,1,2,'멋있네요 경치....','2024-08-12 02:15:32',0),(5,1,2,'꼭 가보고 싶어요','2024-08-12 02:15:37',0),(6,4,2,'승질머리 드럽나요','2024-08-12 02:15:47',0),(7,4,2,'얼마ㅏ나 말 안듣나요','2024-08-12 02:15:54',0),(8,11,8,'마이 춥겠노','2024-08-12 02:22:24',0),(9,2,4,'얼마 인가요?','2024-08-12 02:27:55',0),(10,8,4,'저랑도,, 산책하시죠,,','2024-08-12 02:28:17',0),(11,10,4,'다들 그러고 살아요 힘내세요 경곤님','2024-08-12 02:28:58',0),(12,16,7,'헉','2024-08-12 20:31:24',0),(13,4,7,'승철이요?','2024-08-12 20:32:55',0),(14,13,7,'','2024-08-14 14:20:57',1),(15,13,7,'','2024-08-14 14:21:02',1),(16,13,7,'','2024-08-14 14:21:02',1),(17,13,7,'','2024-08-14 14:21:04',1),(18,13,7,'','2024-08-14 14:21:05',1),(19,10,24,'그래도 옆집 곤냥이보단 착해보여요! 화이팅!!','2024-08-14 17:48:49',0),(20,16,7,'adas','2024-08-15 16:07:22',0),(21,13,19,'저희집 고양이에요. 덕분에 찾았습니다!','2024-08-15 16:35:20',0),(22,21,4,'eotrmf','2024-08-15 17:34:28',0),(23,21,4,'댓글','2024-08-15 17:37:16',0);
/*!40000 ALTER TABLE `board_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_files`
--

DROP TABLE IF EXISTS `board_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `folder` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `board_id` (`board_id`),
  CONSTRAINT `board_files_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `boards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_files`
--

LOCK TABLES `board_files` WRITE;
/*!40000 ALTER TABLE `board_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `board_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `animal_id` int DEFAULT NULL,
  `type` varchar(20) NOT NULL,
  `thumbnail` varchar(255) DEFAULT 'defaultThumbanil.jpg',
  `title` varchar(100) NOT NULL,
  `content` mediumtext NOT NULL,
  `regist_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lat` decimal(20,17) DEFAULT NULL,
  `lon` decimal(20,17) DEFAULT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `boards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `boards_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
INSERT INTO `boards` VALUES (1,1,NULL,'FREE','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/34ab662b-4.avif','경치 구경하세요','경치 멋있지 않나요','2024-08-12 02:03:49',NULL,NULL,0),(2,1,NULL,'PROMOTION','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/d4f368da-c.jfif','제 강아지 구경하세요','빨리 데려가','2024-08-12 02:04:46',NULL,NULL,0),(3,8,6,'REVIEW','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/f1a3e3e1-9.jfif','ㅎㅇㅎㅇ','<p>고양이 입양했는데 너무 좋아요</p>','2024-08-12 02:06:21',NULL,NULL,0),(4,24,5,'PROMOTION','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/0959f8d7-6.jfif','승질이 데려가실분','<p>제 승질이 데려가실 분 있을까요?</p>','2024-08-12 02:08:11',NULL,NULL,0),(5,8,NULL,'FREE','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/b18f10cf-8.jfif','개발 재밌다','<p>이런데서 개발하고싶다</p>','2024-08-12 02:09:18',NULL,NULL,0),(7,7,2,'PROMOTION','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/08e1823f-b.jfif','예빈냥이 입양하실 분???','<p>제 예빈냥이 입양하실분 있으실까요? 말 잘 듣습니다</p>','2024-08-12 02:11:15',NULL,NULL,0),(8,7,1,'REVIEW','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/3053a5ed-6.jfif','시츄와 산책','<p>오늘 시츄와 야무지게 산책했어요. 즐거운 하루였습니다.</p>','2024-08-12 02:12:33',NULL,NULL,1),(9,4,8,'REVIEW','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/76c9b1a7-6.JPG','식빵이 데려가세요','<p>가족을 찾고 있어요</p>','2024-08-12 02:17:26',NULL,NULL,0),(10,3,9,'REVIEW','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/45715580-4.jfif','입양 후기 올립니다.','<p>승냥이 입양했는데 말 안들어서 좀 힘드네요...</p>','2024-08-12 02:18:32',NULL,NULL,0),(11,4,NULL,'LOST','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/d394e8b9-0.JPG','여기 강아지 데려가세요','<p>추운데 혼자있어용</p>','2024-08-12 02:20:29',36.35428850302502500,127.30320147019422000,1),(12,8,NULL,'NOTICE','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/d6b99c64-f.jfif','견우와 직묘 서비스를 시작합니다!','<p>견우와 직묘 서비스를 시작합니다! 많은 관심 부탁드립니다.</p>','2024-08-12 02:24:07',NULL,NULL,0),(13,4,NULL,'LOST','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/3accd092-c.jpg','고양이 데려가세요','<p>의자에 고양이있어요</p>','2024-08-12 02:25:49',36.35771134017323000,127.30384423585762000,0),(14,1,7,'NOTICE','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/bc0da859-e.jfif','입양 후기 이벤트','<p>입양 후기 이벤트를 진행합니다. 입양 후기를 많이 올려주신 분께 소정의 선물을 드립니다.</p>','2024-08-12 02:37:08',NULL,NULL,0),(15,9,NULL,'LOST','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/e56c7fd4-1.jpg','골든 리트리버 주인 있으신가요?','<p>해맑게 웃고 있어요</p>','2024-08-12 08:43:22',36.35533651620621500,127.29857084203894000,0),(16,9,NULL,'LOST','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/3d1ea1a9-5.jpg','시바견이 공원에 있어요','<p>주인 있으신가요? 목줄을 차고 있어요</p>','2024-08-12 08:48:17',36.35960340821021000,127.30400200313487000,0),(17,4,NULL,'LOST','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/95175e8a-7.jpg','강아지 주인 찾아가세요','<p>귀여운 옷을 입고 있어요</p>','2024-08-12 09:00:35',36.36132387260292400,127.29350184327397000,0),(18,11,NULL,'LOST','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/2cfcb87b-0.jfif','실종동물 제보합니다.','<p>싸피 입구에서 예빈냥이 일굼</p>','2024-08-12 09:54:51',36.35493647256198000,127.29997865475103000,0),(19,18,NULL,'FREE','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/98c036ae-c.jpg','멍멍 크르르으릉.. 월월!!','<p>커엽</p>','2024-08-12 17:02:42',NULL,NULL,0),(20,1,NULL,'LOST','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/aeea9ec7-9.jfif','숨냥이 일굼','<p>ㅠㅠ</p>','2024-08-12 19:31:13',36.35360345431339000,127.34008611563960000,0),(21,17,NULL,'REVIEW','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/362c682c-7.jpg','우리 강아지 보고가세요','<p>복돌이는 온순하고 다정한 성격으로 누구에게나 사랑받는 강아지입니다. 특히 아이들과 잘 어울리고, 다른 동물들과도 좋은 관계를 유지합니다. 건강 상태도 매우 양호하며, 매일 아침 산책을 즐깁니다.\r \r 복돌이와 함께 행복한 추억을 만들어갈 새로운 가족을 기다리고 있습니다. 관심 있으신 분은 꼭 연락 주세요!<br/>? 입양 문의:  채팅</p>','2024-08-13 15:19:18',NULL,NULL,0),(22,17,20,'PROMOTION','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/5a488cf2-d.jpeg','톰 입양 홍보','<br><br><p>\"톰\"을 소개합니다! ?</p><p><br></p><p>톰은 유기보호소에서 새로운 가족을 기다리고 있는 특별한 고양이입니다. 나이는 약 3살이며, 중성화 수술을 마친 건강한 남자아이입니다. 그의 매력적인 회색 털과 깊고 따뜻한 눈은 한 번 보면 절대 잊을 수 없을 거예요.</p><p><br></p><p>톰은 차분하고 온순한 성격을 가지고 있으며, 사람을 좋아하고 애교도 많습니다. 처음에는 조금 낯을 가리지만, 마음을 열면 그 누구보다도 애정을 주는 친구가 될 것입니다. 다른 고양이와도 잘 어울리며, 혼자 있을 때도 문제 없이 시간을 보낼 수 있어 바쁜 일상 속에서도 함께 하기 좋은 동반자가 될 거예요.</p><p><br></p><p>톰은 새로운 가족을 만나 행복한 집에서 살 수 있기를 간절히 바라고 있습니다. 사랑이 가득한 가정을 찾아주는 것이 톰의 새로운 인생을 여는 첫걸음이 될 것입니다. 당신의 따뜻한 마음과 손길을 기다리고 있는 톰에게 새 삶을 선물해 주세요.</p><p><br></p><p>입양 문의는 <strong>채팅</strong>으로 부탁드립니다. 톰과 함께할 행복한 미래를 기대하며, 새로운 가족이 되어주실 분을 기다립니다!</p>','2024-08-16 19:40:41',NULL,NULL,0),(23,17,20,'PROMOTION','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/8ed319ca-1.webp','톰 입양 홍보','<p>\"톰\"을 소개합니다! ?</p><p><br></p><p>톰은 유기보호소에서 새로운 가족을 기다리고 있는 특별한 고양이입니다. 나이는 약 3살이며, 중성화 수술을 마친 건강한 남자아이입니다. 그의 매력적인 회색 털과 깊고 따뜻한 눈은 한 번 보면 절대 잊을 수 없을 거예요.</p><p><br></p><p>톰은 차분하고 온순한 성격을 가지고 있으며, 사람을 좋아하고 애교도 많습니다. 처음에는 조금 낯을 가리지만, 마음을 열면 그 누구보다도 애정을 주는 친구가 될 것입니다. 다른 고양이와도 잘 어울리며, 혼자 있을 때도 문제 없이 시간을 보낼 수 있어 바쁜 일상 속에서도 함께 하기 좋은 동반자가 될 거예요.</p><p><br></p><p>톰은 새로운 가족을 만나 행복한 집에서 살 수 있기를 간절히 바라고 있습니다. 사랑이 가득한 가정을 찾아주는 것이 톰의 새로운 인생을 여는 첫걸음이 될 것입니다. 당신의 따뜻한 마음과 손길을 기다리고 있는 톰에게 새 삶을 선물해 주세요.</p><p><br></p><p>입양 문의는 <strong>채팅</strong>으로 부탁드립니다. 톰과 함께할 행복한 미래를 기대하며, 새로운 가족이 되어주실 분을 기다립니다!</p>','2024-08-15 20:03:46',NULL,NULL,1);
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_rooms`
--

DROP TABLE IF EXISTS `chat_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_chat_room` (`sender_id`,`receiver_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `chat_rooms_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chat_rooms_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_rooms`
--

LOCK TABLES `chat_rooms` WRITE;
/*!40000 ALTER TABLE `chat_rooms` DISABLE KEYS */;
INSERT INTO `chat_rooms` VALUES (11,1,7),(8,1,8),(31,1,19),(23,2,7),(32,2,19),(10,3,7),(14,4,7),(13,4,17),(33,4,19),(21,6,7),(16,6,17),(22,6,18),(17,7,17),(18,8,17),(19,17,18),(34,17,19);
/*!40000 ALTER TABLE `chat_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_checks`
--

DROP TABLE IF EXISTS `contract_checks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_checks` (
  `contract_id` int NOT NULL AUTO_INCREMENT,
  `month1` date DEFAULT NULL,
  `month2` date DEFAULT NULL,
  `month3` date DEFAULT NULL,
  `month4` date DEFAULT NULL,
  `month5` date DEFAULT NULL,
  `month6` date DEFAULT NULL,
  `month7` date DEFAULT NULL,
  `month8` date DEFAULT NULL,
  `month9` date DEFAULT NULL,
  `month10` date DEFAULT NULL,
  `month11` date DEFAULT NULL,
  `month12` date DEFAULT NULL,
  PRIMARY KEY (`contract_id`),
  CONSTRAINT `contract_checks_ibfk_1` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_checks`
--

LOCK TABLES `contract_checks` WRITE;
/*!40000 ALTER TABLE `contract_checks` DISABLE KEYS */;
INSERT INTO `contract_checks` VALUES (1,'2023-08-12','2023-09-12','2023-10-12','2023-11-12','2023-12-12','2024-01-12',NULL,NULL,NULL,NULL,NULL,NULL),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'2024-08-13',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'2024-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'2024-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'2024-05-13','2024-06-09','2024-07-16',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `contract_checks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contracts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contractor_id` int NOT NULL,
  `contractee_id` int NOT NULL,
  `animal_id` int NOT NULL,
  `month` int NOT NULL,
  `payment` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `contract_date` date NOT NULL,
  `expiration_date` date NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT '계약전',
  PRIMARY KEY (`id`),
  UNIQUE KEY `animal_id` (`animal_id`),
  KEY `contractor_id` (`contractor_id`),
  KEY `contractee_id` (`contractee_id`),
  CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`contractor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`contractee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_3` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (1,17,19,3,6,30000,'하루 한 시간 이상 산책시키기','2024-08-12','2024-10-12','환급대기'),(2,8,4,6,5,90000,'특약 내용입니다이','2024-08-12','2024-10-12','계약전'),(3,7,17,16,12,12222,'매일 1회 이상 산책 시킬 것.','2024-08-13','2024-10-13','계약완료'),(4,7,17,1,8,79996,'잘 키워주세요','2024-08-14','2024-10-14','계약완료'),(5,7,2,2,4,30000,'테스트','2024-08-14','2024-10-14','계약완료'),(9,19,17,19,6,80000,'사랑으로 키워주세요','2024-08-15','2024-10-15','계약완료');
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `animal_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES (6,1,8),(90,17,15),(111,18,15),(114,6,15),(116,24,9),(119,2,15),(120,2,8),(127,19,15),(128,4,8),(138,4,20);
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petpick_comments`
--

DROP TABLE IF EXISTS `petpick_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `petpick_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `petpick_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(200) NOT NULL,
  `regist_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `petpick_id` (`petpick_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `petpick_comments_ibfk_1` FOREIGN KEY (`petpick_id`) REFERENCES `petpicks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `petpick_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `petpick_comments`
--

LOCK TABLES `petpick_comments` WRITE;
/*!40000 ALTER TABLE `petpick_comments` DISABLE KEYS */;
INSERT INTO `petpick_comments` VALUES (1,1,1,'와우 웰시코기 개꿀귀','2024-08-12 02:29:14',0),(2,1,1,'팔로우 박고 감','2024-08-12 02:29:23',0),(3,4,1,'크 털이 멋있어요','2024-08-12 02:29:44',0),(4,4,1,'좋아요 누른적이 없는데 빨간하트가 떠있네요','2024-08-12 02:29:58',0),(5,4,8,'댓글','2024-08-12 02:31:07',0),(6,4,8,'댓글이 왜 위로 달려 이거','2024-08-12 02:31:18',0),(7,2,8,'애기야 목줄 안 불편하니','2024-08-12 02:31:37',0),(8,3,8,'그거 묵는거 아이대이','2024-08-12 02:31:51',0),(9,3,2,'얘 입양하고 싶어요','2024-08-12 02:32:18',0),(10,3,7,'안됨. 제가 입양해야됨','2024-08-12 02:32:48',0),(11,1,7,'식빵아 나랑 놀자','2024-08-12 02:33:34',0),(12,3,1,'ㅎㅇㅎㅇ','2024-08-12 19:27:08',0),(13,4,4,'댓글이 ','2024-08-12 20:42:07',1),(14,4,4,'댓글','2024-08-12 20:43:49',1),(15,4,4,'댓글이 위로 ','2024-08-12 20:44:02',1),(16,1,4,'식빵이','2024-08-12 20:45:41',1),(17,1,4,'댓글이 이제 밑으로 ','2024-08-12 20:46:51',1),(18,12,4,'귀엽다 ','2024-08-14 09:57:57',0),(19,12,4,'사랑스럽다','2024-08-14 10:00:16',1),(20,1,6,'멍멍이 안녕','2024-08-14 10:00:23',0),(21,1,5,'우리집으로 가자','2024-08-14 10:02:05',0),(22,3,4,'댓글 ','2024-08-14 10:02:32',1),(23,3,4,'','2024-08-14 10:02:33',1),(24,4,4,'우리집으로 올래?','2024-08-14 10:18:56',0),(25,2,18,'강아지가 참 귀여워요','2024-08-14 12:25:38',0),(27,12,2,'ㅋㅋㅋ 왤케 웃겨','2024-08-15 12:36:02',0),(28,10,7,'헐','2024-08-15 16:07:33',0),(29,12,19,'너무 귀엽다 ','2024-08-15 23:38:33',0),(30,12,22,'물 시원하니??','2024-08-15 23:38:44',0),(31,12,4,'배 빵빵한거봐','2024-08-15 23:41:08',0);
/*!40000 ALTER TABLE `petpick_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petpick_likes`
--

DROP TABLE IF EXISTS `petpick_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `petpick_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `petpick_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `petpick_id` (`petpick_id`),
  CONSTRAINT `petpick_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `petpick_likes_ibfk_2` FOREIGN KEY (`petpick_id`) REFERENCES `petpicks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `petpick_likes`
--

LOCK TABLES `petpick_likes` WRITE;
/*!40000 ALTER TABLE `petpick_likes` DISABLE KEYS */;
INSERT INTO `petpick_likes` VALUES (1,1,1),(19,17,1),(20,17,3),(21,17,2),(22,4,1),(26,6,9),(31,6,1),(33,19,11),(34,19,10),(35,4,9),(36,19,2),(37,19,4),(38,19,12),(40,4,7),(41,4,2),(42,4,10),(43,4,4);
/*!40000 ALTER TABLE `petpick_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petpicks`
--

DROP TABLE IF EXISTS `petpicks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `petpicks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `board_id` int DEFAULT NULL,
  `animal_id` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` varchar(100) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `video` varchar(255) NOT NULL,
  `regist_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `board_id` (`board_id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `petpicks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `petpicks_ibfk_2` FOREIGN KEY (`board_id`) REFERENCES `boards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `petpicks_ibfk_3` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `petpicks`
--

LOCK TABLES `petpicks` WRITE;
/*!40000 ALTER TABLE `petpicks` DISABLE KEYS */;
INSERT INTO `petpicks` VALUES (1,4,NULL,8,'우리집 식빵이','식빵이이','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/87a30225-a.JPG','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/44511de7-7.mp4','2024-08-12 02:04:24',0),(2,4,NULL,8,'산책 나왔어요','룰루랄라','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/87e88e9a-9.JPG','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/40762e44-0.mp4','2024-08-12 02:11:33',0),(3,4,NULL,8,'나무뜯는 강아지','냠','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/beb9d11e-1.JPG','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/0f246dcd-2.mp4','2024-08-12 02:12:01',0),(4,4,13,8,'사모에두','흰 털 귀엽죠','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/c60ff3b0-a.JPG','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/8ae26961-7.mp4','2024-08-12 02:13:37',0),(5,4,13,15,'귀여운 고영희씨 보세요','넘 귀엽지 않나요?','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/df10e4f4-3.jpg','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/afc48828-d.mp4','2024-08-13 21:07:58',1),(6,4,13,15,'귀여운 고영희씨 보세요','넘 귀엽지 않나요?','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/561ba72a-2.jpg','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/0f805e6c-d.mp4','2024-08-13 21:08:00',1),(7,4,13,15,'귀여운 고영희씨 보세요','넘 귀엽지 않나요?','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/340ecb80-7.jpg','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/90b2d5df-0.mp4','2024-08-13 21:08:09',0),(8,4,13,15,'귀여운 고영희씨 보세요','넘 귀엽지 않나요?','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/0ac1e474-0.jpg','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/a1d3f0ab-3.mp4','2024-08-13 21:08:39',1),(9,4,17,15,'애기 고영희씨','냐옹','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/e3e1fda5-6.jpg','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/2ae5c5fe-4.mp4','2024-08-13 21:15:34',0),(10,4,13,15,'쬐끄만 고양이','귀여워어엉어어어','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/b6a652b6-7.jpg','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/77a88d27-0.mp4','2024-08-13 21:20:20',0),(11,4,9,15,'귀여운 고양이들 모음집','심장마비 주의','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/9d318c7e-c.jpg','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/e303aea7-1.mp4','2024-08-13 21:26:25',0),(12,4,9,15,'갱얼쥐','물마시는 갱얼쥐','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/26a43938-6.png','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/videos/f1bf0abf-5.mp4','2024-08-13 21:32:44',0);
/*!40000 ALTER TABLE `petpicks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `report_type` varchar(100) NOT NULL,
  `report_id` int NOT NULL,
  `reason` varchar(255) NOT NULL,
  `report_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,1,'BOARD',5,'페이지와 상관 없는 글로 신고합니다.','2024-08-12 02:14:13',0),(2,4,'BOARD',6,'예빈님 말이 저급해요','2024-08-12 02:14:38',0),(3,4,'BOARD',1,'경치가 안멋있어요','2024-08-12 02:14:55',0),(4,7,'USER',4,'강아지를 돈으로 사려합니다.','2024-08-12 20:33:29',0),(5,18,'USER',8,'기분나빠요','2024-08-14 12:25:58',0),(6,17,'BOARD',4,'ㅁㅋㅋ','2024-08-15 13:22:40',0),(7,4,'PETPICK',2,'khvgh.','2024-08-15 15:34:08',0),(8,4,'PETPICK',2,'ㅁㄴㅇㄻㄴ','2024-08-15 15:37:22',0),(9,17,'USER',4,'asd','2024-08-15 17:18:29',0);
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(20) NOT NULL,
  `birth` date DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `role` varchar(20) NOT NULL,
  `social_type` varchar(20) DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'KAKAO3d2d08cd-719c-486d-bd00-3',NULL,'이경곤카카오','2024-08-12','01022856264','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/9b3db064-8.jfif','ADMIN','KAKAO','3637728029','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5NDI2Mzh9.zw3CrCjc3ErOTXwPICFdFANRwGmtWpgjWD1fXbB63zxu-Nw3PWgB6zXCcQvvaCnDtwZNQlXyh_53_VFUuCKgWQ',0),(2,'GOOGLEd1a08e11-9151-4945-80b1-',NULL,'이경곤 구글','2024-08-12','01022856264','https://lh3.googleusercontent.com/a/ACg8ocK7mbHC1QudTqe8NZBUoWy5alIO2oVC4c7v-UP5Yw-HLIDL9Q=s96-c','USER','GOOGLE','113438942706077407096','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5MjY3MzZ9.4qIt-TnOX47V5QK0uSDzdp1fqkoClJVMwzOcRdQcByZ5OxFxPCR0lI64OCFrSynJbMknKFOfij3xlT78ZqG20Q',0),(3,'NAVERbb399af7-aceb-4876-96ee-9',NULL,'이경곤네이버','2024-08-12','01022856264','https://ssl.pstatic.net/static/pwe/address/img_profile.png','USER','NAVER','GjdLBa7AozAuPy5pCkRHD7MIyJrPP9IHJjqKPrhmmaw','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5NDI2NTJ9.VIULvx4OZtotuQDPUlmDJLn2JSigGGE5gJCILfh_8a-N83qqUeVPW1UaAkWB5gRBZcyBwR3V8qKEThpXnJNgSw',0),(4,'email@naver.com','{bcrypt}$2a$10$He1se2fVUKARayEbjl1dFOoX16oBtLOL683o9qs.lOFCHRxF6K2XK','고영희','2000-12-20',NULL,NULL,'USER',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5NDkxODJ9.WWwE-6QS_KvNuVpo_EY7LPNWL8JB-pK9JunvjArAN_rDNBTFPpGJPBu6alcRvmS-78twrU-OrLo7dsgRkcVlUA',0),(5,'email2@naver.com','{bcrypt}$2a$10$g3quNmxtnDQWRhh7qiib2u687t3yYVe4n7SkvW/wsOA7W1oEBt6Fa','감아지','2000-12-20',NULL,NULL,'ADMIN',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5NDkwNTR9.wL565qWu0EuNdSvbMmYX0vEZ2s9omoRMXr8CUxMBCFGnvXB-fxzRfTklZrXptuLt3av_QoMA2dMuluAPiPJ0pw',0),(6,'leeggon1213@naver.com','{bcrypt}$2a$10$nZGENemS7qvcz9EdsRzHQ.1d8gto36WMkAmShPYAJJyuLro3d7Yle','마이클','2024-08-12','01022221111',NULL,'ADMIN',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5NDI2MjR9.XorGl_y-Z-QJbDS-UBCcBaDuKOPwqjKGnomEPxZp00LnwcF2OTlyKxf3ofCtS8UTSjl4sZeMBTRTroEmg_Bxaw',0),(7,'testyb@naver.com','{bcrypt}$2a$10$Hkh9H743ObrhN9jl0dSPd.tLPnXjsqKOChu4tuC1P1U0g2yzos2PO','예비니','1999-09-18','01089388136',NULL,'USER',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5NDgzODJ9.wQq_TdcV95KWo2tFIVMFAlZRlIUTA5cVGthx2rAmfhA0FYZVwiXIwupefvP0Bm-IRHh9zbV3D306z2Ur3fFMCA',0),(8,'testjh@naver.com','{bcrypt}$2a$10$g3quNmxtnDQWRhh7qiib2u687t3yYVe4n7SkvW/wsOA7W1oEBt6Fa','관리자','2024-08-14','','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/ed9add90-b.jpeg','USER','NAVER',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5MTcwNjN9.1Kfx6K3_GIv06Re9t1j0L0vav8zGl_UMuohQEsPUVEM7sXNuesrr_SXCvar0r44WdVgfO9AybHrb8ylQI-LcpQ',0),(9,'w2227@naver.com','{bcrypt}$2a$10$Pc3661L7zcb5VwKdoRWSFOaVq72wrfyeX0dR1tJAVKEZeTpcy/h9q','욘세','1997-03-20','01093338603','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/7a382382-d.png','USER',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5MjYzMTZ9.scJ0aAcvBZ-Pgdd_bphhTjBT03iAQGER1Tea13mEHRQmc95MTTeSOm9NUy7j2xfv0y78M3aFN3wAd1-SHjB5VQ',0),(11,'leeggon6264@gmail.com','{bcrypt}$2a$10$JFRB4Q3mETklTOvFAdWvYu7LrrAmfGVU.vEL3R0EJvVqpzFkbzi0W','구글곤','2024-08-12',NULL,NULL,'USER',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ2MzUyOTN9.XTCVTlnVvFa3o5ucO0_HRLOOAe6itRXHPXELosXOVO3mEt82oA-GsZllmcrgjoopSVEtBrX8ihjruPkmeU6LpA',0),(15,'cavalier7@naver.com','{bcrypt}$2a$10$EtVP1BDkP1xamdc1hs6I.OxZOpRUHMLCQsfOgvBebY1fr1LH0JJBS','B100','1976-10-09',NULL,NULL,'USER',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ4OTQ4MDd9.Ld9hnMmTARXUIQLb7pab8xYt6MM-aaZPkEYSFgoPMFfnDO3KEMAjPxTxBDAB8oeDCpRD1dLDE8vAXXOVa7mqJw',0),(17,'kgarry@naver.com','{bcrypt}$2a$10$4ptxwF6JbEcITemdZfsQtervTwWP32lBxbtpSM7dyqx.r.rjcd3e6','찐김재훈','1995-05-29','01029594735','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/3c99a22b-f.jpeg','USER',NULL,NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5NTAwOTB9.SUwg2DUa-xIRleOZNw4_lcU12tLcMAW6QqoguVikzn8jlUv6BCyw8I73ATRJMR0dScWPdhWD_JlqzMfcfuOJMg',0),(18,'NAVER62a0f4a0-82ad-46a4-a6ef-6',NULL,'김재훈','1995-05-29','01029594735','https://pet-bridge.s3.ap-northeast-2.amazonaws.com/images/863ef3db-b.jpg','USER','NAVER','8wguDO9uk9FZyrpNnYtnjv-jTN53131fyojWjOKeOTw','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5MTI0NDN9.8LXWIDZCrNuR2nyfCgn5nA9AhRPRzkclv3iBE9Pv4V47JpU-yX6W05JKs7a10U2UsYDIPzuBsBrGCpMPyCaWVw',0),(19,'KAKAO76baed04-9f61-4df8-9345-f',NULL,'곽카오','1999-09-18','01089388136','http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R110x110','USER','KAKAO','3637926309','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5NTAyMzd9.kNYubFRNAuZ9fC2XnJ_YZjPsYFXb3PewdF9BVN_V0MdaNZqMkOC2YS4_srCH1GeCU0MFXRMtC6ZzRBdxs7JsDA',0),(20,'GOOGLE2e1717d5-b197-47b1-9ad4-',NULL,'김재훈3ffdf76f-22b5-4a0',NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocIJjz8JlFnCBP7-05pCfi4E_xxsZCV0ntw11NDoIuNwp3GYyQ=s96-c','USER','GOOGLE','117431604045691637759','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ3NzUyOTh9.GBxAjXhTkK1efGpWhh-pJ9eZynt89HYUNWxVDDrUEEJQhOnO78BmoxrF6SY2Oct5-1UDYeJI3MT3DlRgZV9THA',0),(21,'KAKAO20fb644e-b1d1-4f25-b83e-a',NULL,'정규영6d4b0a7a-ece7-4b8',NULL,NULL,'http://k.kakaocdn.net/dn/cJLecQ/btsH9pQGCtQ/86Eu97D5JmruZONmpkq4lK/img_110x110.jpg','USER','KAKAO','3663825417','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ4MTc5MzZ9.62phYNAUYVvphmOMFD_4yWQ0bwFho8bCR3S6I_YEl3UgY7wMyU8gU0urElzQzizGlLUOUGtQdDxCAhysUIM_Pg',0),(22,'GOOGLEb88965fc-48c2-45ce-9e81-',NULL,'알망디','2024-05-08','01086259046','https://lh3.googleusercontent.com/a/ACg8ocKqr7teuOL9LdHp0L33bOzLVNHPXOFvV5v1zw7MHIineseiyA=s96-c','USER','GOOGLE','107556953163324129655','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ4MzI0MDl9.osV1eHi2t78KKDwJq8yv_iQbClRxDTd7LdsvhKg0_rlTZk6_mJmwMxkRyNaaHzM1r6Rn6cjErzIAy0cL6jtiiQ',0),(23,'GOOGLE06b6f34c-080c-4d5a-b572-',NULL,'안해찬','2024-08-13','01012341234','https://lh3.googleusercontent.com/a/ACg8ocIyjLkzVHeyYRCZb7doqz_hDcKuKvuShhE9fegVj66dNg-sghnR=s96-c','USER','GOOGLE','111788487854934083081','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ4MzQ0Mzl9.bx7rBrDH11QIby1HZgdbe8kL9OvFmlPUv-cu1uLbtlUaRLGQLH-9AlqPA4RSHfg_9NO7l05J4nHvZE9DtyZysA',0),(24,'KAKAOc7e22a27-42b2-4794-a50c-c',NULL,'투명드래곤','2024-08-14','01033745429','http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R110x110','USER','KAKAO','3637912308','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ5MTg4Njh9.C0Cp916PGMWV63x1KXKp49YNft1NgdyLp6qoSLGbhrWUo5gI_FxZp5almaaP8jtL4YrfMpjb_O4uN4q5uo0yyg',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'petbridge'
--

--
-- Dumping routines for database 'petbridge'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  3:18:30
