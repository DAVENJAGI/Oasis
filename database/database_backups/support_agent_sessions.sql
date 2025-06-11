-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: oasis
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `support_agent_sessions`
--

DROP TABLE IF EXISTS `support_agent_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `support_agent_sessions` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `support_agent_id` varchar(64) NOT NULL,
  `session_token` varchar(128) NOT NULL,
  `authorization_token` varchar(128) NOT NULL,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `support_agent_id` (`support_agent_id`),
  CONSTRAINT `support_agent_sessions_ibfk_1` FOREIGN KEY (`support_agent_id`) REFERENCES `support_agents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support_agent_sessions`
--

LOCK TABLES `support_agent_sessions` WRITE;
/*!40000 ALTER TABLE `support_agent_sessions` DISABLE KEYS */;
INSERT INTO `support_agent_sessions` VALUES
('1f4d174d-2174-42fa-bc03-991b81e5b48c','2025-05-14 23:31:19','2025-05-14 23:31:19','428f969d-b5b4-45aa-a701-d5e4a541775b','91f0e1f377a84bee8eaaea1cec037595ff8d13288e9c6b05c80541204de15e47','ad6f7a874a314b25c001c7c44885b2b5148c7da005db7dcb5f76b8f75b1faccd','2025-05-15 00:31:19'),
('sas_e2af9972-d7e9-4fac-9f71-7ef30b14dc3b','2025-05-18 14:03:30','2025-05-18 14:03:30','428f969d-b5b4-45aa-a701-d5e4a541775b','b3c230948bde91fb48be980ef45c50e9412994a14492bfb988095e14b3ccfdab','e57a7d1b3552c032d4777e77be55359546c8026b0ddf8b2814c1961378c10803','2025-05-18 15:03:30');
/*!40000 ALTER TABLE `support_agent_sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11 11:56:39
