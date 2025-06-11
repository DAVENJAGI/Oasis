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
-- Table structure for table `agent_sessions`
--

DROP TABLE IF EXISTS `agent_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agent_sessions` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `agent_id` varchar(64) NOT NULL,
  `session_token` varchar(128) NOT NULL,
  `authorization_token` varchar(128) NOT NULL,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `agent_id` (`agent_id`),
  CONSTRAINT `agent_sessions_ibfk_1` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent_sessions`
--

LOCK TABLES `agent_sessions` WRITE;
/*!40000 ALTER TABLE `agent_sessions` DISABLE KEYS */;
INSERT INTO `agent_sessions` VALUES
('3518ece2-de5c-4ba3-907f-f5977cdd5602','2025-05-14 22:59:16','2025-05-14 22:59:16','agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','84dc2814eeb0f7fc9fc5060269ab027027c9e1393885e55e5f92bce249973d72','6e9329c066e03536345a15a5252747ff8594274922a93fb52d26621d79244930','2025-05-14 23:59:16'),
('818c871f-c4f7-47d5-8c9a-751d9dd1ea84','2025-05-14 22:59:28','2025-05-14 22:59:28','agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','d68c114fdaf9bc8d72b2b7e3eba4229b8a798d8cef47889a5140b054c043da94','0906971081d8fce3859bed8e4274ec875720fbb63f004568a41ac73bd45d54b5','2025-05-14 23:59:28'),
('ags_81b90b5f-8ad5-4a0c-84e2-22f32ad0b5d0','2025-05-18 13:56:41','2025-05-18 13:56:41','agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','9b26e87094c622aed5d0665255b7960ad6892cf82f8f8313fa63f8b9408272b6','7e0626d70b81192dba9328bf9e18a7f1953b64a82b75d923f3f6ed0326e5260c','2025-05-18 14:56:41'),
('ags_efcd5201-4689-464b-a71e-2b21803fb29f','2025-05-16 13:45:07','2025-05-16 13:45:07','agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','6e79a081c9352dc5d2b694b9cebefb1de46e16af1b12484247b01bd31e77ce0b','cce4e8edcecaa8bf6ee81d3ad9f98e4718063ac2ee2cc3001aa240e0bce3ff6e','2025-05-16 14:45:07');
/*!40000 ALTER TABLE `agent_sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11 11:56:23
