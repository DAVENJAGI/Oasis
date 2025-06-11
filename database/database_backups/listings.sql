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
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listings` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `town_id` varchar(64) NOT NULL,
  `agent_id` varchar(64) NOT NULL,
  `property_name` varchar(128) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `number_rooms` int(11) NOT NULL,
  `number_bathrooms` int(11) NOT NULL,
  `max_guest` int(11) NOT NULL,
  `price_by_night` int(11) NOT NULL,
  `address` varchar(64) NOT NULL,
  `rental_status` varchar(64) DEFAULT NULL,
  `property_type` enum('Apartment','Bungalow','Maisonette','Bedsitter','Single Room','Studio','Villa','Townhouse','Mansion','Duplex','Penthouse','Office','Shop','Warehouse') DEFAULT 'Apartment',
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `cover_image` varchar(256) DEFAULT NULL,
  `total_area` varchar(256) DEFAULT NULL,
  `listing_tag` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listings_ibfk_1` (`town_id`),
  KEY `listings_ibfk_2` (`agent_id`),
  CONSTRAINT `listings_ibfk_1` FOREIGN KEY (`town_id`) REFERENCES `towns` (`id`),
  CONSTRAINT `listings_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES
('lst_01a4fda0-b5f3-4e77-b75d-014d8f9f1f01','2025-05-20 09:15:30','2025-05-20 09:15:30','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_7aa1e839-2b6f-4f90-98d3-8e83a3129e12','Palmview Studio Apartments','A serene and modern studio apartment near town. Ideal for students and working professionals.',1,1,2,1800,'Nairobi West','available','Studio',-1.3031,36.8172,'https://example.com/images/listing1.jpg','30 sqm','Modern'),
('lst_02bb8d2e-362e-43d4-8cc7-8c803c5bde78','2025-05-21 11:45:20','2025-05-21 11:45:20','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_2f6a6b9d-df5e-4c53-8a43-f95fdcae7b2a','Greenleaf Mansion','Luxurious 6-bedroom mansion with a swimming pool, garden, and top-class security.',6,5,10,25000,'Karen Estate','available','Mansion',-1.3215,36.7511,'https://example.com/images/listing2.jpg','600 sqm','Luxury'),
('lst_03f0d198-49ae-4e2c-9f10-1460f7a2ea11','2025-05-22 08:12:40','2025-05-22 08:12:40','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_55cbfd97-d9f7-4903-a4b2-9f77a7b3a1ef','Town Centre Bedsitter','Compact bedsitter close to shopping malls and bus stops. Affordable and convenient.',1,1,1,1200,'CBD','available','Bedsitter',-1.2864,36.8172,'https://example.com/images/listing3.jpg','20 sqm','Budget'),
('lst_04dfe3e5-1f09-4c8c-96b6-132d894207f0','2025-05-22 14:20:00','2025-05-22 14:20:00','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_d1a742ab-8fc1-4ea1-a1b4-9d3c6c7b0ff1','Silverline Maisonette','Spacious 3-bedroom maisonette with a private parking space and backyard. Perfect for families.',3,2,5,6500,'South B','available','Maisonette',-1.3134,36.8561,'https://example.com/images/listing4.jpg','180 sqm','Family'),
('lst_05c472df-8e9b-4fa4-a787-f083e711a3bc','2025-05-23 10:30:45','2025-05-23 10:30:45','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_7aa1e839-2b6f-4f90-98d3-8e83a3129e12','Business Front Office Space','Commercial office space suitable for start-ups and small teams. Located near the business district.',2,1,6,9500,'Upper Hill','available','Office',-1.2975,36.8167,'https://example.com/images/listing5.jpg','75 sqm','Commercial'),
('lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','2025-05-06 13:54:20','2025-05-13 22:12:52','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','Little Heaven',NULL,2,0,4,700,'01000, 458-Thika','Available','Apartment',-1.3321,36.7128,'static/images/listings/cover_photos/lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8_listing.jpeg','200 Square Meter','budget friendly'),
('lst_5503be87-e645-4682-9bba-94e022e83def','2025-05-13 21:43:43','2025-05-13 21:43:43','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','Morning Sunset',NULL,3,2,6,900,'01000, 4215-Nakuru','Available','Apartment',NULL,NULL,'static/images/listings/cover_photos/lst_5503be87-e645-4682-9bba-94e022e83def_efficiency_1593620.png',NULL,NULL),
('lst_b306dc56-e52f-47a0-bb55-935740fa1323','2025-05-10 21:37:29','2025-05-10 21:37:29','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','Peak of Solace',NULL,2,2,3,100,'01000, 4215-Nakuru','Available','Apartment',-1.45,37.3,NULL,NULL,NULL);
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11 11:56:34
