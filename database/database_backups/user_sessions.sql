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
-- Table structure for table `user_sessions`
--

DROP TABLE IF EXISTS `user_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_sessions` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` varchar(64) NOT NULL,
  `session_token` varchar(128) NOT NULL,
  `authorization_token` varchar(128) NOT NULL,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sessions`
--

LOCK TABLES `user_sessions` WRITE;
/*!40000 ALTER TABLE `user_sessions` DISABLE KEYS */;
INSERT INTO `user_sessions` VALUES
('24695369-ff12-42d0-adb8-ee422fe80fe5','2025-05-14 22:50:20','2025-05-14 22:50:20','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a','5bdf64a1c3e2b7cf9b6c8f7b5e76b7145443bf30d7d6d27282fa26be4757bf0f','3ffcf3861c782e5b1a0a2bcf655068f762d737582812f5761477dfa53b8a8d14','2025-05-14 23:50:20'),
('uss_52c80496-377c-4436-b2af-0c8b9290a1ad','2025-05-18 13:27:12','2025-05-18 13:27:12','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a','5583784ba9fdac90c7ca61c2cbc32a0c6e0958b542525dbd2f326bfe366d995b','29137fcf2b81276ef524e7d722070070d98eeca48af30eb758abbfbdc91f4a1b','2025-05-18 14:27:12'),
('uss_780c2cd4-60a6-418e-a68c-9cfb1e74f3a9','2025-05-18 12:25:46','2025-05-18 12:25:46','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a','4e66769873a5f23aa8e44583abc0dde3f958a1dc860123f2d7ebc1584f89e249','f6f50a2fc9004e1c6ed891f64a21554e5a782c8f9056dc058c870c9aab9f56fd','2025-05-18 13:25:46');
/*!40000 ALTER TABLE `user_sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11 11:56:45
