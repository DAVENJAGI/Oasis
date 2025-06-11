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
-- Table structure for table `lease_agreements`
--

DROP TABLE IF EXISTS `lease_agreements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lease_agreements` (
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `listing_id` varchar(64) NOT NULL,
  `lessee_id` varchar(64) NOT NULL,
  `lessor_id` varchar(64) NOT NULL,
  `start_date` date NOT NULL,
  `stop_date` date NOT NULL,
  `payment_per_night` float NOT NULL,
  `status` enum('pending','active','terminated') DEFAULT NULL,
  `terms_and_conditions` varchar(2048) DEFAULT 'This Lease Agreement ("Agreement") is entered into between the Lessor (Landlord) and Lessee (Tenant). The Tenant agrees to lease the premises at the stated address under the following terms: (1) Term: The lease begins on the start date and continues until the end date unless renewed or terminated under these terms. (2) Rent: Tenant shall pay monthly rent on or before the due date. Late payments may incur a fee. (3) Security Deposit: Tenant shall pay a deposit refundable upon lease end, subject to deductions for damages or unpaid amounts. (4) Use: Premises shall be used solely for residential purposes and occupied only by persons named in this agreement. Subletting is prohibited without written consent. (5) Maintenance: Tenant shall keep the premises clean and in good condition. Damage beyond normal wear will be charged. Landlord shall maintain structural components. (6) Utilities: Tenant is responsible for paying all utilities unless otherwise stated. (7) Entry: Landlord may enter with reasonable notice for inspection, repair, or emergencies. (8) Termination: Either party may terminate with required notice as per law. (9) Pets: No pets allowed unless stated otherwise. (10) Governing Law: This agreement shall be governed by local housing laws. (11) Amendments: Changes must be in writing and signed by both parties. By signing, both parties agree to abide by the above terms.',
  `signed_by_lessee` tinyint(1) NOT NULL DEFAULT 0,
  `signed_by_lessor` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `listing_id` (`listing_id`),
  KEY `lessee_id` (`lessee_id`),
  KEY `lessor_id` (`lessor_id`),
  CONSTRAINT `lease_agreements_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`),
  CONSTRAINT `lease_agreements_ibfk_2` FOREIGN KEY (`lessee_id`) REFERENCES `users` (`id`),
  CONSTRAINT `lease_agreements_ibfk_3` FOREIGN KEY (`lessor_id`) REFERENCES `agents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lease_agreements`
--

LOCK TABLES `lease_agreements` WRITE;
/*!40000 ALTER TABLE `lease_agreements` DISABLE KEYS */;
INSERT INTO `lease_agreements` VALUES
('lea_85c86d62-90fe-4dcc-8d53-309072a1951e','2025-05-08 13:01:12','2025-05-08 13:01:12','lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','usr_cc88be0d-2186-457f-b119-7bfeb21eb17a','agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','2025-12-20','2025-12-27',120,'pending','This Lease Agreement (\"Agreement\") is entered into between the Lessor (Landlord) and Lessee (Tenant). The Tenant agrees to lease the premises at the stated address under the following terms: (1) Term: The lease begins on the start date and continues until the end date unless renewed or terminated under these terms. (2) Rent: Tenant shall pay monthly rent on or before the due date. Late payments may incur a fee. (3) Security Deposit: Tenant shall pay a deposit refundable upon lease end, subject to deductions for damages or unpaid amounts. (4) Use: Premises shall be used solely for residential purposes and occupied only by persons named in this agreement. Subletting is prohibited without written consent. (5) Maintenance: Tenant shall keep the premises clean and in good condition. Damage beyond normal wear will be charged. Landlord shall maintain structural components. (6) Utilities: Tenant is responsible for paying all utilities unless otherwise stated. (7) Entry: Landlord may enter with reasonable notice for inspection, repair, or emergencies. (8) Termination: Either party may terminate with required notice as per law. (9) Pets: No pets allowed unless stated otherwise. (10) Governing Law: This agreement shall be governed by local housing laws. (11) Amendments: Changes must be in writing and signed by both parties. By signing, both parties agree to abide by the above terms.',0,0);
/*!40000 ALTER TABLE `lease_agreements` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11 11:56:30
