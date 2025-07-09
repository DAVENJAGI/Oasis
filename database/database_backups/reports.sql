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
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` varchar(64) DEFAULT NULL,
  `agent_id` varchar(64) DEFAULT NULL,
  `listing_id` varchar(64) NOT NULL,
  `reason` varchar(1024) NOT NULL,
  `report_category` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `agent_id` (`agent_id`),
  KEY `listing_id` (`listing_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`id`),
  CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `reports` VALUES
('600840f0-6ac4-413d-ac24-e6c451727f86','2025-05-08 22:55:49','2025-05-08 22:55:49','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','Very rude agent',NULL),
('rpt_0c24b3e5-1620-4e8e-961e-8e7d4d2ed636','2025-06-29 20:38:38','2025-06-29 20:38:38','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'lst_02bb8d2e-362e-43d4-8cc7-8c803c5bde78','It\'s a spam. Always appearing on my feeds yet there seems to be no credible information about it','Listing is a Spam'),
('rpt_97000ff5-64df-4b4f-ac48-a4b16b3e6491','2025-06-29 20:41:11','2025-06-29 20:41:11','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'lst_02bb8d2e-362e-43d4-8cc7-8c803c5bde78','This listing appears to be spam. The information is misleading and seems automated or fake.','Listing is a Spam');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
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

-- Dump completed on 2025-07-08 23:36:01
