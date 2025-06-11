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
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amenities` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES
('amn_1e44e46c-b754-4267-9711-4f5e54743598','2025-05-16 13:30:21','2025-05-16 13:30:21','Closet'),
('amn_40ff9259-1250-4d21-916c-51d2d1ca94e3','2025-05-16 13:40:06','2025-05-16 13:40:06','Wide hallways'),
('amn_54853a63-1489-4990-96d9-0ca9d7aac206','2025-05-09 17:58:31','2025-05-09 17:58:31','Kitchen'),
('amn_56747a7e-c75e-4bfd-86c9-024ddfaf1a43','2025-05-09 18:00:15','2025-05-09 18:00:15','Sauna'),
('amn_61b50ac7-22df-4d89-949c-e72508f9e7f2','2025-05-09 18:00:19','2025-05-09 18:00:19','Spa'),
('amn_7ed9449d-8f0b-4c8a-9e6d-8626fcb6011b','2025-05-09 17:59:23','2025-05-09 17:59:23','Cinema'),
('amn_9ff334f0-aad1-466f-bf92-b20e0e2401e0','2025-05-16 13:39:53','2025-05-16 13:39:53','Wheelchair accessible'),
('amn_d12ac9ff-4786-40d1-b255-4102f8925ed7','2025-05-09 17:59:18','2025-05-09 17:59:18','Pool'),
('amn_d4949ef0-a624-4ee7-a821-5a6b335b0e93','2025-05-09 17:59:43','2025-05-09 17:59:43','Parking lot'),
('amn_dbec96c1-31ed-48c1-8acc-a50c38fab188','2025-05-09 17:59:33','2025-05-09 17:59:33','Cameras');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11 11:56:25
