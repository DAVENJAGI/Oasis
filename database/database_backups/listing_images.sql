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
-- Table structure for table `listing_images`
--

DROP TABLE IF EXISTS `listing_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing_images` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `listing_id` varchar(64) NOT NULL,
  `file_path` varchar(512) NOT NULL,
  `caption` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listing_id` (`listing_id`),
  CONSTRAINT `listing_images_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing_images`
--

LOCK TABLES `listing_images` WRITE;
/*!40000 ALTER TABLE `listing_images` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `listing_images` VALUES
('limg_2ae665b3-ece5-43d3-8f0e-8e98d950983f','2025-06-17 21:34:22','2025-06-17 21:34:22','lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','static/images/listings/lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8_spacejoy-umAXneH4GhA-unsplash.jpg',NULL),
('limg_59f8bcb8-9a66-4aa6-8965-5685be798687','2025-06-17 21:44:18','2025-06-17 21:44:18','lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','static/images/listings/lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8_pexels-pixabay-275484.jpg',NULL),
('limg_60f2e229-7d4d-4f26-b253-ac883078c0f9','2025-06-17 21:35:42','2025-06-17 21:35:42','lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','static/images/listings/lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8_point3d-commercial-imaging-ltd-n7KC0g1MFLk-unsplash.jpg',NULL),
('limg_66e69ed3-dd0d-478f-8eac-65a26fe7f3a8','2025-06-17 21:34:50','2025-06-17 21:34:50','lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','static/images/listings/lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8_collov-home-design-n9CzpBTNElo-unsplash.jpg',NULL),
('limg_7144f618-9ebb-4a19-9f8e-1e19ffa9424b','2025-06-17 21:35:21','2025-06-17 21:35:21','lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','static/images/listings/lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8_point3d-commercial-imaging-ltd-5BV56SdvLmo-unsplash.jpg',NULL),
('limg_a3b3c891-3cb7-41dd-a9e0-6a619e73b5e8','2025-06-17 21:35:06','2025-06-17 21:35:06','lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','static/images/listings/lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8_mk-s-TD_iJAFo_80-unsplash.jpg',NULL),
('limg_c97e4ef4-f423-4150-aaf8-1868e436924e','2025-06-17 21:36:00','2025-06-17 21:36:00','lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','static/images/listings/lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8_point3d-commercial-imaging-ltd-oxeCZrodz78-unsplash.jpg',NULL),
('limg_e6d8de02-85a6-4dac-b9a4-dddb383e601a','2025-06-17 21:44:02','2025-06-17 21:44:02','lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','static/images/listings/lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8_pexels-pixabay-276554.jpg',NULL);
/*!40000 ALTER TABLE `listing_images` ENABLE KEYS */;
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

-- Dump completed on 2025-07-08 23:35:58
