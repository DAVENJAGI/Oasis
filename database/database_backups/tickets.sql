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
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `title` varchar(128) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `category` varchar(64) NOT NULL,
  `admin_id` varchar(64) DEFAULT NULL,
  `user_id` varchar(64) DEFAULT NULL,
  `agent_id` varchar(64) DEFAULT NULL,
  `ticket_status` varchar(64) DEFAULT NULL,
  `priority` varchar(64) DEFAULT NULL,
  `support_agent_id` varchar(64) DEFAULT NULL,
  `support_agent_comment` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `user_id` (`user_id`),
  KEY `agent_id` (`agent_id`),
  KEY `fk_support_agent` (`support_agent_id`),
  CONSTRAINT `fk_support_agent` FOREIGN KEY (`support_agent_id`) REFERENCES `support_agents` (`id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `tickets` VALUES
('tic_1','2025-05-07 22:35:45','2025-05-07 22:35:45','App Support Issue','Sample description for app support','App & Account Support',NULL,'usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'Open','Low',NULL,NULL),
('tic_2','2025-05-07 22:35:45','2025-05-07 22:35:45','Lease & Rent Issue','Sample description for lease & rent','Lease & Rent',NULL,'usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'Closed','Medium',NULL,NULL),
('tic_3','2025-05-07 22:35:45','2025-05-07 22:35:45','Move-In & Move-Out Issue','Sample description for move-in & move-out','Move-In & Move-Out',NULL,'usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'Pending','High',NULL,NULL),
('tic_3cac83d1-88b1-4915-b5fc-9618a0426a4a','2025-05-07 22:35:45','2025-05-07 22:35:45','App Support','Unable to log in','App & Account Support',NULL,'usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'On-hold','Low',NULL,NULL),
('tic_4','2025-05-07 22:35:45','2025-05-07 22:35:45','Complains Issue','Sample description for complains','Complains',NULL,'usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'Awaiting-response','Low',NULL,NULL),
('tic_5','2025-05-07 22:35:45','2025-05-07 22:35:45','Emergencies Issue','Sample description for emergencies','Emergencies',NULL,'usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'Solved','Medium',NULL,NULL),
('tic_6','2025-05-07 22:35:45','2025-05-07 22:35:45','Property Issues','Sample description for property issues','Property Issues',NULL,'usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'Open','High',NULL,NULL),
('tic_7','2025-05-07 22:35:45','2025-05-07 22:35:45','Maintenance & Repairs Issue','Sample description for maintenance & repairs','Maintenance & Repairs',NULL,'usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'Closed','Low',NULL,NULL),
('tic_await_response_001','2025-05-07 22:35:45','2025-05-07 22:35:45','Awaiting Support Response','Still waiting for feedback from support team regarding login failure.','App & Account Support',NULL,'usr_cc88be0d-2186-457f-b119-7bfeb21eb17a',NULL,'Pending','Medium',NULL,NULL);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
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

-- Dump completed on 2025-07-08 23:36:06
