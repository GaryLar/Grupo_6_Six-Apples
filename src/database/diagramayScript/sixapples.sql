-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: sixapples
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Frutas'),(2,'Verduras'),(3,'Conservas');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_order`
--

DROP TABLE IF EXISTS `items_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items_order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quantity` int(10) unsigned NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `orderId` int(10) unsigned DEFAULT NULL,
  `productId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `items_order_FK` (`productId`),
  KEY `items_order_FK_1` (`orderId`),
  CONSTRAINT `items_order_FK` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `items_order_FK_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_order`
--

LOCK TABLES `items_order` WRITE;
/*!40000 ALTER TABLE `items_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `items_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `typesOffersId` int(10) unsigned DEFAULT NULL,
  `categoryName` varchar(45) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `view` tinyint(4) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `offers_FK` (`typesOffersId`),
  CONSTRAINT `offers_FK` FOREIGN KEY (`typesOffersId`) REFERENCES `types_offers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (1,1,'Ofertas','',1600,1,'oferta1.jpeg',NULL,NULL),(2,2,'Ofertas','',2000,1,'oferta2.jpeg',NULL,NULL),(3,2,'Ofertas','',1560,1,'oferta3.jpeg',NULL,NULL),(4,1,'Ofertas','',2000,0,'oferta4.jpeg',NULL,NULL),(5,2,'Ofertas','',2000,0,'oferta1.jpeg',NULL,NULL),(6,2,'Ofertas','',2000,0,'oferta1.jpeg',NULL,NULL);
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers_products`
--

DROP TABLE IF EXISTS `offers_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offers_products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `offersId` int(10) unsigned DEFAULT NULL,
  `productsId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `offers_products_FK` (`productsId`),
  KEY `offers_products_FK_1` (`offersId`),
  CONSTRAINT `offers_products_FK` FOREIGN KEY (`productsId`) REFERENCES `products` (`id`),
  CONSTRAINT `offers_products_FK_1` FOREIGN KEY (`offersId`) REFERENCES `offers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers_products`
--

LOCK TABLES `offers_products` WRITE;
/*!40000 ALTER TABLE `offers_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `offers_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `state` tinyint(1) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_FK` (`userId`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `origin` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `view` tinyint(1) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `categoryId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_FK` (`categoryId`),
  CONSTRAINT `products_FK` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Manzana','Red Delicious','Neuquén',200,0,'Manzana.png',NULL,'2022-07-27 18:10:57',1),(2,'Naranja Comun','Red Navel','Nacional',210,0,'Naranja.png',NULL,NULL,1),(3,'Banana','Baya Tropical','India',280,0,'Banana.png',NULL,NULL,1),(4,'Durazno','Scarlet Pearl','Mendoza',290,1,'Durazno.png',NULL,NULL,1),(5,'Anana','Hawai','Hawai',390,0,'Anana.png',NULL,NULL,1),(6,'Uva','Malbec','Mendoza',330,1,'Uva.png',NULL,NULL,1),(7,'Pera','Williams','Inglaterra',220,0,'Pera.png',NULL,NULL,1),(8,'Kiwi','Hayward','Buenos Aires',749,0,'Kiwi.png',NULL,NULL,1),(9,'Kiwi','Summer','Italia',800,1,'Kiwi2.png',NULL,NULL,1),(10,'Mango','Tommy Atkins','Salta',460,0,'Mango.png',NULL,NULL,1),(11,'Frutilla','Duoglas','California',480,0,'Frutilla.png',NULL,NULL,1),(12,'Sandia','Charleston Grey','Formosa',390,0,'Sandia.png',NULL,NULL,1),(13,'Lechuga','Romana','China',240,1,'Lechuga.png',NULL,NULL,2),(14,'Tomate','Raf','San Juan',390,0,'Tomate.png',NULL,NULL,2),(15,'Repollo','Durham Early','China',480,0,'Repollo.png',NULL,NULL,2),(16,'Acelga','Lyon','Neuquen',200,0,'Acelga.png',NULL,NULL,2),(17,'Zapallo','Anco','Buenos Aires',230,0,'Zapallo.png',NULL,NULL,2),(18,'Zanahoria','Danvers','Francia',250,0,'Zanahoria.png',NULL,NULL,2),(19,'Cebolla','Blanca','Rio Negro',130,0,'Cebolla.png',NULL,NULL,2),(20,'Limon','Verna','México',250,0,'producto-1658433329914.png',NULL,'2022-07-21 19:55:29',2),(21,'Papa','Spunta','Buenos Aires',120,0,'Papa.png',NULL,'2022-07-28 03:19:40',2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Admin'),(2,'User'),(3,'Prueba');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types_offers`
--

DROP TABLE IF EXISTS `types_offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types_offers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types_offers`
--

LOCK TABLES `types_offers` WRITE;
/*!40000 ALTER TABLE `types_offers` DISABLE KEYS */;
INSERT INTO `types_offers` VALUES (1,'Bolson Individual'),(2,'Bolson Familiar ');
/*!40000 ALTER TABLE `types_offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(70) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `dni` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `postCode` int(11) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `direction` varchar(100) DEFAULT NULL,
  `rolId` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `social_id` varchar(60) DEFAULT NULL,
  `social_provider` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_FK` (`rolId`),
  CONSTRAINT `users_FK` FOREIGN KEY (`rolId`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Andrea Chacon','andrev@mail.com','$2a$10$gCAbe/v7rLNPGsAyMYZA/OLWS0Rkzy1UhrN2chnocYataPmhEG8VK','avatar-1658948712795.jpg',234234,4324,2147483647,1233,'San Luis','LUJAN','Doctor ramon',1,'2022-06-07 18:23:31','2022-07-27 22:48:57',NULL,NULL),(4,'gary rodriguez','gary@mail.com','$2a$10$Q1.3DUe43IGbIOC6kG36seblae.Qn5vNAzaJEZIc0rQFLagby5djW','default-image.png',67,87654321,1123232349,1377,'capitalFederal','Liniers','Doctor ramon',2,'2022-06-07 18:25:03','2022-06-29 18:47:48',NULL,NULL),(7,'joaquin galvan','joaquin@mail.com','$2a$10$NnfVS4s1KBbIgc9jkXFdKeHD7ALw3R/1q3AEDwwa9cesuyDmh18su','default-image.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'2022-07-28 02:23:40','2022-07-28 02:23:40',NULL,NULL),(8,'Karen calisaya','karen@mail.com','$2a$10$2h/ZDY.n5EJGDzvNXTcz.OCNp2OWOX0jKz8hZmIRV3MeNygJs8bYi','default-image.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'2022-07-28 02:24:06','2022-07-28 02:24:06',NULL,NULL),(11,'Karen','karenmcalisaya@gmail.com',NULL,'default-image.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'2022-07-29 13:22:19','2022-07-29 13:22:19','100263138525320768447','google'),(12,'Six Apples','sixapplesstore@gmail.com',NULL,'avatar-1659126196896.png',1234,34123123,2147483647,8300,'Santiago del Estero','CASARES','calle falsa',1,'2022-07-29 20:12:14','2022-07-29 20:24:17','100820819488349837426','google');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sixapples'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-29 18:50:22
