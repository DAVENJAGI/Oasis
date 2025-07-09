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
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
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
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
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
set autocommit=0;
INSERT INTO `listings` VALUES
('lst_01a4fda0-b5f3-4e77-b75d-014d8f9f1f01','2025-05-20 09:15:30','2025-06-11 23:14:06','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_7aa1e839-2b6f-4f90-98d3-8e83a3129e12','Palmview Studio Apartments','Nestled just minutes from the heart of the city, this serene and modern studio apartment is the perfect haven for students and working professionals alike. Designed with a minimalist yet stylish approach, the space maximizes functionality and comfort. Enjoy natural lighting through wide windows, a compact kitchenette, a sleek bathroom, and a versatile living area that doubles as your workspace. The apartment is located in a secure neighborhood with 24/7 surveillance and easy access to public transport, shopping centers, cafes, and universities. Whether you\'re looking to study, work remotely, or simply enjoy your own cozy space, this studio delivers the ideal mix of tranquility and convenience. With water and Wi-Fi included, and optional weekly cleaning services, this property is tailored for modern urban living. Book your viewing today and experience practical comfort in one of the city’s most accessible areas.',1,1,2,1800,'Nairobi West','Available','Studio',-1.3031,36.8172,'static/images/listings/cover_photos/lst_01a4fda0-b5f3-4e77-b75d-014d8f9f1f01_point3d-commercial-imaging-ltd-n7KC0g1MFLk-unsplash.jpg','30 sqm','Modern',1),
('lst_02bb8d2e-362e-43d4-8cc7-8c803c5bde78','2025-05-21 11:45:20','2025-06-11 23:15:05','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_2f6a6b9d-df5e-4c53-8a43-f95fdcae7b2a','Greenleaf Mansion','Welcome to this stunning 6-bedroom mansion, a true embodiment of luxury and elegance. Set on expansive grounds, the property boasts a private swimming pool, a beautifully landscaped garden, and top-tier security systems including CCTV surveillance and electric fencing. Inside, the mansion features spacious en-suite bedrooms, a grand living room with a fireplace, a gourmet kitchen with modern appliances, and a formal dining area perfect for entertaining. The master suite offers a walk-in closet, private balcony, and spa-like bathroom. A fully equipped gym, entertainment lounge, and separate guest wing add to the charm. Located in a high-end gated community just minutes from top schools and shopping centers, this home promises privacy, security, and unparalleled comfort. Whether you\'re hosting guests or enjoying peaceful family life, this mansion is your perfect retreat. Indulge in high-end living—schedule your private tour today.',6,5,10,25000,'Karen Estate','Pending','Mansion',-1.3215,36.7511,'static/images/listings/cover_photos/lst_02bb8d2e-362e-43d4-8cc7-8c803c5bde78_mk-s-TD_iJAFo_80-unsplash.jpg','600 sqm','Luxury',1),
('lst_03f0d198-49ae-4e2c-9f10-1460f7a2ea11','2025-05-22 08:12:40','2025-06-11 23:12:53','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_55cbfd97-d9f7-4903-a4b2-9f77a7b3a1ef','Town Centre Bedsitter','This compact yet thoughtfully designed bedsitter offers everything you need for affordable, modern living. Ideal for students or young professionals, it’s situated just a short walk away from major shopping malls, public transport hubs, and essential amenities. The unit includes a multi-purpose living and sleeping area, a kitchenette with storage cabinets and a sink, and a private bathroom with instant hot water. Large windows ensure natural light and ventilation throughout the day. The building is secure and well-maintained, with on-site caretakers and water supply included. This apartment makes city living not only accessible but also enjoyable for those on a budget. If you’re looking for an affordable home base that keeps you connected to urban life while offering comfort and privacy, this bedsitter is a smart choice. Book your viewing today and discover a cozy, cost-effective living space in a prime location.',1,1,1,1200,'CBD','Available','Bedsitter',-1.2864,36.8172,'static/images/listings/cover_photos/lst_03f0d198-49ae-4e2c-9f10-1460f7a2ea11_point3d-commercial-imaging-ltd-5BV56SdvLmo-unsplash.jpg','20 sqm','Budget',0),
('lst_04dfe3e5-1f09-4c8c-96b6-132d894207f0','2025-05-22 14:20:00','2025-06-11 23:16:13','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_d1a742ab-8fc1-4ea1-a1b4-9d3c6c7b0ff1','Silverline Maisonette','This spacious 3-bedroom maisonette is the ideal family home, offering comfort, space, and convenience in one delightful package. Located in a peaceful residential neighborhood, the property features a private parking space, a secure gate, and a lovely backyard perfect for kids or outdoor dining. Inside, you\'ll find a generous living room, a modern kitchen with built-in cabinets, and a separate dining area. All three bedrooms are upstairs, including a large master with en-suite bathroom and built-in wardrobes. Natural light floods every room, creating a warm and inviting atmosphere. The maisonette is close to schools, supermarkets, and healthcare facilities, making daily errands quick and easy. Whether you’re a growing family or looking for more room to spread out, this home offers the space and tranquility you need. Move into a house that feels like home—schedule your viewing now and experience the charm firsthand.',3,2,5,6500,'South B','Available','Maisonette',-1.3134,36.8561,'static/images/listings/cover_photos/lst_04dfe3e5-1f09-4c8c-96b6-132d894207f0_point3d-commercial-imaging-ltd-oxeCZrodz78-unsplash.jpg','180 sqm','Family',1),
('lst_05c472df-8e9b-4fa4-a787-f083e711a3bc','2025-05-23 10:30:45','2025-06-11 23:17:00','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_7aa1e839-2b6f-4f90-98d3-8e83a3129e12','Business Front Office Space','This modern commercial office space is tailor-made for start-ups, freelancers, and small teams seeking an affordable yet professional environment. Strategically located near the central business district, the office provides easy access to major roads, banks, restaurants, and essential services. The space includes a large open-plan work area, a meeting room, a kitchenette, and a clean, shared restroom. High-speed internet connectivity, ample natural lighting, and ergonomic desk arrangements make it ideal for boosting productivity. The building offers 24-hour security, elevator access, and ample parking for staff and clients. Whether you\'re launching a new venture or scaling up your operations, this office offers flexibility and prestige in a business-friendly location. Take the next step in your entrepreneurial journey—book a tour today and see how this space can power your team\'s success.',2,1,6,9500,'Upper Hill','Available','Office',-1.2975,36.8167,'static/images/listings/cover_photos/lst_05c472df-8e9b-4fa4-a787-f083e711a3bc_collov-home-design-n9CzpBTNElo-unsplash.jpg','75 sqm','Commercial',1),
('lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8','2025-05-06 13:54:20','2025-05-13 22:12:52','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','Little Heaven','Experience the perfect blend of comfort and tranquility in this elegant 2-bedroom apartment nestled in a quiet suburban neighborhood. Designed for modern living, this unit features a spacious living room, an open kitchen with granite countertops, and two well-lit bedrooms with ample closet space. The master bedroom has an en-suite bathroom, while the second bathroom is accessible for guests or roommates. Enjoy fresh air and scenic views from the private balcony, or relax in the shared green courtyard. With secure gated access, reliable water supply, and nearby public transport options, this apartment caters to both convenience and peace of mind. Ideal for small families, professionals, or roommates looking for affordable comfort without sacrificing quality. Schools, supermarkets, and health centers are just a short walk away. Don’t miss the chance to make this peaceful suburban haven your new home.',2,0,4,700,'01000, 458-Thika','Available','Apartment',-1.3321,36.7128,'static/images/listings/cover_photos/lst_20dfbf89-8dec-45b2-a3ec-59b4c3e64fe8_listing.jpeg','200 Square Meter','budget friendly',0),
('lst_5503be87-e645-4682-9bba-94e022e83def','2025-05-13 21:43:43','2025-06-11 23:17:35','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','Morning Sunset','This beautifully furnished one-bedroom apartment offers a stylish and practical living space, perfect for working professionals or couples seeking comfort close to the city. The apartment features a cozy living area with modern decor, a fully equipped kitchen, and a spacious bedroom complete with a queen-sized bed and built-in wardrobe. Enjoy high-speed internet, smart TV, a washing machine, and a private balcony with a city view. Located in a secure complex with 24/7 security and an elevator, the property also provides easy access to major office hubs, restaurants, gyms, and supermarkets. With everything you need already in place, just bring your suitcase and settle right in. Whether you’re in town for work or long-term stay, this furnished unit offers comfort, style, and unbeatable convenience. Book a tour today and secure this charming space before it’s gone!',3,2,6,900,'01000, 4215-Nakuru','Pending','Apartment',NULL,NULL,'static/images/listings/cover_photos/lst_5503be87-e645-4682-9bba-94e022e83def_spacejoy-umAXneH4GhA-unsplash.jpg',NULL,NULL,0),
('lst_b306dc56-e52f-47a0-bb55-935740fa1323','2025-05-10 21:37:29','2025-05-10 21:37:29','000f81ae-1f94-44b0-811b-681ed4e8a552','agt_3ff957b2-fa2b-4277-b8bf-76351aef66cb','Peak of Solace','Compact yet functional, this 1-bedroom guest wing is ideal for solo tenants, domestic staff, or students seeking an independent and budget-friendly living space. Tucked behind a main residence in a gated compound, the unit offers privacy, safety, and essential amenities. It features a single bedroom, a kitchenette with basic storage, a tiled bathroom with instant hot water, and a small porch area for outdoor relaxation. The rent includes water and waste management services, with optional Wi-Fi and cleaning available. Located within walking distance to local shops, public transport, and places of worship, it’s a perfect solution for those who value simplicity and security. This unit is move-in ready and suits short- or long-term stays. Don’t miss out on this great deal—schedule your visit and make it yours today.',2,2,3,100,'01000, 4215-Nakuru','Occupied','Apartment',-1.45,37.3,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
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

-- Dump completed on 2025-07-08 23:36:00
