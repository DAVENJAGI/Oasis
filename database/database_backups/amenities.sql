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
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
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
set autocommit=0;
INSERT INTO `amenities` VALUES
('amn_04c8c925-b025-46f0-9893-cdac5ead4ace','2025-06-13 02:04:04','2025-06-13 02:04:04','Rooftop'),
('amn_092e33ab-862d-427c-bb94-58fb2867122a','2025-06-17 17:37:04','2025-06-17 17:37:04','Solar panels'),
('amn_0b9dc52b-694c-4c49-8132-0be3dc1dd758','2025-06-17 05:57:04','2025-06-17 05:57:04','Water purifier'),
('amn_138c58c2-fb20-4f63-b2ff-d7758914c2e1','2025-06-14 02:13:04','2025-06-14 02:13:04','Parking lot'),
('amn_19afab2a-a739-4105-add3-e2e6752adf19','2025-06-14 22:41:04','2025-06-14 22:41:04','Cameras'),
('amn_1a2d276d-005c-47ff-873e-5bb3965ba8d0','2025-06-13 10:39:04','2025-06-13 10:39:04','Fireplace'),
('amn_1e44e46c-b754-4267-9711-4f5e54743598','2025-05-16 13:30:21','2025-05-16 13:30:21','Closet'),
('amn_2265ab5b-6f26-4ef2-bc60-17a78f39a85f','2025-06-16 17:41:04','2025-06-16 17:41:04','Cameras'),
('amn_3722fe25-4fee-4ade-8d49-bc368f5b830e','2025-06-14 05:06:04','2025-06-14 05:06:04','Spa'),
('amn_37a5856e-7cd9-4ada-9481-6435dcc6841c','2025-06-17 06:00:04','2025-06-17 06:00:04','Air conditioning'),
('amn_3f2e6f24-f685-40f2-9de1-2ce6a2fe9627','2025-06-16 09:04:04','2025-06-16 09:04:04','Laundry room'),
('amn_3f7e947c-8f31-4ad2-81d3-6ecf32d2054a','2025-06-17 06:42:04','2025-06-17 06:42:04','Security guard'),
('amn_40ff9259-1250-4d21-916c-51d2d1ca94e3','2025-05-16 13:40:06','2025-05-16 13:40:06','Wide hallways'),
('amn_445fb221-ccfc-465a-a6f5-6e7f8728a44f','2025-06-15 01:38:04','2025-06-15 01:38:04','Solar panels'),
('amn_465cde06-28f7-4428-a930-baebf0263ec3','2025-06-17 17:50:04','2025-06-17 17:50:04','Elevator'),
('amn_4761de53-f79a-4a12-8214-56d61a47cbb1','2025-06-11 09:38:04','2025-06-11 09:38:04','Security guard'),
('amn_53c14a74-edfe-4cfb-8abd-c08e60b2d320','2025-06-15 23:19:04','2025-06-15 23:19:04','Smart lock'),
('amn_54853a63-1489-4990-96d9-0ca9d7aac206','2025-05-09 17:58:31','2025-05-09 17:58:31','Kitchen'),
('amn_55cbd820-f5af-4795-8c9c-f4f1803f7ae6','2025-06-12 08:36:04','2025-06-12 08:36:04','BBQ area'),
('amn_56747a7e-c75e-4bfd-86c9-024ddfaf1a43','2025-05-09 18:00:15','2025-05-09 18:00:15','Sauna'),
('amn_5784ac98-044a-4553-8846-601b8bd1e3b0','2025-06-17 18:36:04','2025-06-17 18:36:04','Pet friendly'),
('amn_58b6160a-1fa3-443a-b157-be56c8c4f78c','2025-06-12 23:17:04','2025-06-12 23:17:04','Storage'),
('amn_58e3a899-51ba-417f-9ec6-0d343e9ca62e','2025-06-17 08:35:04','2025-06-17 08:35:04','Cinema'),
('amn_5cda1860-8d9a-4048-844f-dc8394a4f72a','2025-06-13 14:59:04','2025-06-13 14:59:04','Rooftop'),
('amn_61b50ac7-22df-4d89-949c-e72508f9e7f2','2025-05-09 18:00:19','2025-05-09 18:00:19','Spa'),
('amn_709ca3ff-d178-42a3-a30d-cdc94e9fd13e','2025-06-14 10:00:04','2025-06-14 10:00:04','Smart lock'),
('amn_727a5cb9-d240-4511-971d-991cefe585d0','2025-06-16 23:18:04','2025-06-16 23:18:04','Closet'),
('amn_7485b30a-3d5c-47c3-b3e1-49ce306c78d6','2025-06-16 22:23:04','2025-06-16 22:23:04','Gym'),
('amn_77e8f194-da66-4398-acd8-aba7c766e50a','2025-06-11 18:02:04','2025-06-11 18:02:04','Gym'),
('amn_7997cf7a-384f-41ef-b546-4cb3531705bb','2025-06-16 07:42:04','2025-06-16 07:42:04','Wi-Fi'),
('amn_7abf7f21-2515-43b2-9dfa-57632763851a','2025-06-16 23:34:04','2025-06-16 23:34:04','Garden'),
('amn_7eb6ad95-78ca-49f4-b8a9-e1f0cf62b41c','2025-06-15 19:22:04','2025-06-15 19:22:04','Kitchen'),
('amn_7ed9449d-8f0b-4c8a-9e6d-8626fcb6011b','2025-05-09 17:59:23','2025-05-09 17:59:23','Cinema'),
('amn_823f2b20-5060-47c7-af22-39b9fb186cda','2025-06-17 05:15:04','2025-06-17 05:15:04','Wide hallways'),
('amn_8409d3dd-39c6-4d33-96b6-2e6863d684bf','2025-06-13 10:17:04','2025-06-13 10:17:04','Water purifier'),
('amn_8aab2061-85d8-4b64-83c0-bf3e21e8fd91','2025-06-16 11:17:04','2025-06-16 11:17:04','Garden'),
('amn_8c5fc251-d0cd-4952-b1ff-c26b55d0cc6f','2025-06-16 02:03:04','2025-06-16 02:03:04','Pet friendly'),
('amn_8cb353cd-b3b7-4b69-96c3-4c80d2820597','2025-06-16 21:16:04','2025-06-16 21:16:04','Storage'),
('amn_8e5d97e6-6e5d-4f71-a3bc-fc39764fadea','2025-06-15 04:52:04','2025-06-15 04:52:04','Wheelchair accessible'),
('amn_8e7db3f9-1b53-4a89-bb5c-bcf3993f6d08','2025-06-13 16:28:04','2025-06-13 16:28:04','Air conditioning'),
('amn_8f8746a4-aca4-4124-b7a7-7d21b89171e5','2025-06-15 14:32:04','2025-06-15 14:32:04','Balcony'),
('amn_90245c1e-f17f-4b27-a8e8-b89df6580c35','2025-06-13 22:25:04','2025-06-13 22:25:04','Heater'),
('amn_91ba17e2-7c91-4e99-958b-8970d6cc6f68','2025-06-14 08:37:04','2025-06-14 08:37:04','Pool'),
('amn_9ff334f0-aad1-466f-bf92-b20e0e2401e0','2025-05-16 13:39:53','2025-05-16 13:39:53','Wheelchair accessible'),
('amn_a504af8a-0538-4df8-b6b7-cef861d31749','2025-06-15 16:40:04','2025-06-15 16:40:04','Wi-Fi'),
('amn_a61f7d49-6ebf-49c1-a3e7-2d21a92a91cb','2025-06-16 10:53:04','2025-06-16 10:53:04','Balcony'),
('amn_abf0d794-0b82-4f83-bd49-233ac2c36d27','2025-06-15 04:23:04','2025-06-15 04:23:04','Laundry room'),
('amn_b4cd9632-9c25-4a07-b229-484f8e75c12d','2025-06-16 05:18:04','2025-06-16 05:18:04','Children\'s play area'),
('amn_c58cfa16-de8c-441e-9d32-ed180e6068e8','2025-06-13 11:25:04','2025-06-13 11:25:04','Heater'),
('amn_d12ac9ff-4786-40d1-b255-4102f8925ed7','2025-05-09 17:59:18','2025-05-09 17:59:18','Pool'),
('amn_d22b8d5f-eac8-4b42-b270-87cf72d4e1e3','2025-06-17 01:44:04','2025-06-17 01:44:04','BBQ area'),
('amn_d2953bb6-0d38-4e6a-8171-d8a510d7f0e2','2025-06-17 01:57:04','2025-06-17 01:57:04','Pool'),
('amn_d4949ef0-a624-4ee7-a821-5a6b335b0e93','2025-05-09 17:59:43','2025-05-09 17:59:43','Parking lot'),
('amn_d5ca92a3-f7d1-46d0-8ccc-e91391f21f2f','2025-06-13 23:00:04','2025-06-13 23:00:04','Sauna'),
('amn_d77d2291-74d7-4b19-a0ec-9e6a28077941','2025-06-15 13:59:04','2025-06-15 13:59:04','Backup generator'),
('amn_db519a1b-6585-4363-8f84-b7c4ed378c26','2025-06-16 18:54:04','2025-06-16 18:54:04','Parking lot'),
('amn_dbec96c1-31ed-48c1-8acc-a50c38fab188','2025-05-09 17:59:33','2025-05-09 17:59:33','Cameras'),
('amn_e021de11-94c5-4d4f-9927-71b1cb4d7d69','2025-06-16 08:01:04','2025-06-16 08:01:04','Elevator'),
('amn_e4401fd1-5c71-4200-b240-5fc72bc769ed','2025-06-17 11:23:04','2025-06-17 11:23:04','Wheelchair accessible'),
('amn_f2f90cf2-3b8f-4a47-899e-dc98e837bb6e','2025-06-13 17:34:04','2025-06-13 17:34:04','Fireplace'),
('amn_fff0446d-42b9-4f11-a114-bea698767bac','2025-06-16 21:32:04','2025-06-16 21:32:04','Backup generator');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
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

-- Dump completed on 2025-07-08 23:35:48
