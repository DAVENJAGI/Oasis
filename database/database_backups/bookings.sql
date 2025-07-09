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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` varchar(64) NOT NULL,
  `listing_id` varchar(64) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('Available','Occupied','Pending') DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `total_price` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `listing_id` (`listing_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `bookings` VALUES
('bkg_1cbccd2f-4657-4e29-8cc7-62000d94eace','2025-06-29 20:18:03','2025-06-29 20:18:03','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a','lst_04dfe3e5-1f09-4c8c-96b6-132d894207f0','2025-07-01','2025-07-06','Pending','Looking for a place away from the hustle of the town. Looking forward to the stay.',32500),
('bkg_29b5065d-3ef5-4478-bf25-32154f4f2c5c','2025-06-28 22:12:32','2025-06-28 22:12:32','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a','lst_b306dc56-e52f-47a0-bb55-935740fa1323','2025-06-28','2025-06-30','Pending','A better place to crash for the weekend',200),
('bkg_2f1153c8-3237-4de9-9ef0-528229dac921','2025-06-28 22:11:51','2025-06-28 22:11:51','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a','lst_b306dc56-e52f-47a0-bb55-935740fa1323','2025-06-28','2025-06-29','Pending','A good getaway listing for my family and I.',100),
('bkg_5e080680-4575-45b2-a9a5-6672c220ddb7','2025-06-29 22:30:46','2025-06-29 22:30:46','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a','lst_03f0d198-49ae-4e2c-9f10-1460f7a2ea11','2025-06-18','2025-06-27','Pending','yES YES ES ',10800),
('bkg_6dad2985-f808-4503-bec6-e84de8f4d15f','2025-06-29 00:04:10','2025-06-29 00:04:10','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a','lst_03f0d198-49ae-4e2c-9f10-1460f7a2ea11','2025-06-29','2025-07-05','Pending','short whole week getaway',7200),
('bkg_84f1208a-f2c5-460d-80a7-7a76675592b1','2025-06-29 19:55:41','2025-06-29 19:55:41','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a','lst_04dfe3e5-1f09-4c8c-96b6-132d894207f0','2025-06-28','2025-06-30','Pending','yes yes yes',13000),
('bkg_f47dbd69-8b74-4b0c-b7b8-05b2ca98cb1c','2025-06-28 22:09:23','2025-06-28 22:09:23','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a','lst_b306dc56-e52f-47a0-bb55-935740fa1323','2025-06-28','2025-06-29','Pending','A nice two days getaway house listing for my family and I.',0);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
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

-- Dump completed on 2025-07-08 23:35:49
