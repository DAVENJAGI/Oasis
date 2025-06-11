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
-- Table structure for table `listing_amenity`
--

DROP TABLE IF EXISTS `listing_amenity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listing_amenity` (
  `listing_id` varchar(60) NOT NULL,
  `amenity_id` varchar(60) NOT NULL,
  PRIMARY KEY (`listing_id`,`amenity_id`),
  KEY `amenity_id` (`amenity_id`),
  CONSTRAINT `listing_amenity_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `listing_amenity_ibfk_2` FOREIGN KEY (`amenity_id`) REFERENCES `amenities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing_amenity`
--

LOCK TABLES `listing_amenity` WRITE;
/*!40000 ALTER TABLE `listing_amenity` DISABLE KEYS */;
INSERT INTO `listing_amenity` VALUES
('lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','amn_54853a63-1489-4990-96d9-0ca9d7aac206'),
('lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','amn_56747a7e-c75e-4bfd-86c9-024ddfaf1a43'),
('lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','amn_61b50ac7-22df-4d89-949c-e72508f9e7f2'),
('lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','amn_d12ac9ff-4786-40d1-b255-4102f8925ed7'),
('lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','amn_dbec96c1-31ed-48c1-8acc-a50c38fab188'),
('lst_b306dc56-e52f-47a0-bb55-935740fa1323','amn_54853a63-1489-4990-96d9-0ca9d7aac206'),
('lst_b306dc56-e52f-47a0-bb55-935740fa1323','amn_56747a7e-c75e-4bfd-86c9-024ddfaf1a43'),
('lst_b306dc56-e52f-47a0-bb55-935740fa1323','amn_61b50ac7-22df-4d89-949c-e72508f9e7f2'),
('lst_b306dc56-e52f-47a0-bb55-935740fa1323','amn_d12ac9ff-4786-40d1-b255-4102f8925ed7'),
('lst_b306dc56-e52f-47a0-bb55-935740fa1323','amn_dbec96c1-31ed-48c1-8acc-a50c38fab188');
/*!40000 ALTER TABLE `listing_amenity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11 11:56:31
