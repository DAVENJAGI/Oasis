/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.1-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: oasis
-- ------------------------------------------------------
-- Server version	11.8.1-MariaDB-2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `agents`
--

DROP TABLE IF EXISTS `agents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `agents` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `first_name` varchar(128) DEFAULT NULL,
  `last_name` varchar(128) DEFAULT NULL,
  `telephone_no` varchar(64) NOT NULL,
  `sex` varchar(64) NOT NULL,
  `bio` varchar(1024) NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `town_id` varchar(255) DEFAULT NULL,
  `facebook_link` varchar(256) DEFAULT NULL,
  `twitter_link` varchar(256) DEFAULT NULL,
  `linkedin_link` varchar(256) DEFAULT NULL,
  `tiktok_link` varchar(256) DEFAULT NULL,
  `whatsapp_number` varchar(64) DEFAULT NULL,
  `public_email` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_agents_town` (`town_id`),
  CONSTRAINT `fk_agents_town` FOREIGN KEY (`town_id`) REFERENCES `towns` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agents`
--

LOCK TABLES `agents` WRITE;
/*!40000 ALTER TABLE `agents` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `agents` VALUES
('agt_2f6a6b9d-df5e-4c53-8a43-f95fdcae7b2a','2025-04-28 09:00:12','2025-04-28 09:00:12','mary.wanjiku@oasisapp.com','pbkdf2:sha256:600000$k2EfP1QYKMslhOSe$1d15e8d3f3a9f9b7c003b7f7a63d816f3146f3b4e8e3d0b649de929541b36ef4','Mary','Wanjiku','+254721998877','Female','Mary is an expert in short-term rentals and long-term leasing. Focused on customer care and flexibility.',1,NULL,'000f81ae-1f94-44b0-811b-681ed4e8a552',NULL,NULL,NULL,NULL,NULL,NULL),
('agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','2025-05-05 14:23:56','2025-05-05 14:23:56','janedoe22@gmail.com','pbkdf2:sha256:600000$e1JG87JcXyriPMTl$553a685a2b1886b45d0a22234b21e9c43990cc6fcdff21db695e9878b09c4c1f','Mbote','Njogu','+254789452635','Female','With a deep understanding of the local housing market and a passion for helping clients find their perfect home, As an agent I stands out for professionalism, integrity, and results-driven service. Whether you\'re buying, selling, or renting, this agent offers personalized support, expert negotiation skills, and a commitment to making every transaction smooth and stress-free. Known for clear communication, market insight, and dedication to client satisfaction, this agent is your ideal partner in real estate success.\n',0,'static/images/agents/profile_images/agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb_agent.jpg','000f81ae-1f94-44b0-811b-681ed4e8a552',NULL,NULL,NULL,NULL,NULL,NULL),
('agt_55cbfd97-d9f7-4903-a4b2-9f77a7b3a1ef','2025-05-02 12:34:22','2025-05-02 12:34:22','kevin.omboko@oasisapp.com','pbkdf2:sha256:600000$UR98aLhKFrEY3e9D$90e99e3b4e012c3c02cf2ccda7ac07a9df058a60f9ea3889aa4b2d5356e98998','Kevin','Omboko','+254734456712','Male','Specialized in high-end apartments and digital house tours. Fast response time and client-first attitude.',0,NULL,'000f81ae-1f94-44b0-811b-681ed4e8a552',NULL,NULL,NULL,NULL,NULL,NULL),
('agt_7aa1e839-2b6f-4f90-98d3-8e83a3129e12','2025-05-01 10:15:45','2025-05-01 10:15:45','brian.mutua@oasisapp.com','pbkdf2:sha256:600000$8dI3KvWsOgh5SnZz$7aa03e1b21791362f3e2b9b73a4aa4d9e68fcdd38d8b9a2d3b7dbb1b6ec1f2d3','Brian','Mutua','+254712345678','Male','Passionate about connecting people to the right homes. Trusted by hundreds for fast and reliable house booking services.',1,NULL,'000f81ae-1f94-44b0-811b-681ed4e8a552',NULL,NULL,NULL,NULL,NULL,NULL),
('agt_d1a742ab-8fc1-4ea1-a1b4-9d3c6c7b0ff1','2025-05-03 16:48:10','2025-05-03 16:48:10','mercy.nyambura@oasisapp.com','pbkdf2:sha256:600000$t1LzJXbBaYfV7fJr$3b63ac3b0dc8f8425a531eb28c72ee03f93bb9f5cb2b5408d5f4b34a2b38f78a','Mercy','Nyambura','+254700112233','Female','Mercy handles all your property queries with warmth and efficiency. Dedicated to helping tenants settle faster.',1,NULL,'000f81ae-1f94-44b0-811b-681ed4e8a552',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `agents` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-07-08 23:35:47
