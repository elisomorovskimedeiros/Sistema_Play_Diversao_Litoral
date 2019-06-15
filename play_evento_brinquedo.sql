-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: play
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

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
-- Table structure for table `evento_brinquedo`
--

DROP TABLE IF EXISTS `evento_brinquedo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evento_brinquedo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brinquedo` int(11) DEFAULT NULL,
  `evento` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `brinquedo` (`brinquedo`),
  KEY `evento` (`evento`),
  CONSTRAINT `evento_brinquedo_ibfk_1` FOREIGN KEY (`brinquedo`) REFERENCES `brinquedo` (`id_brinquedo`),
  CONSTRAINT `evento_brinquedo_ibfk_2` FOREIGN KEY (`evento`) REFERENCES `evento` (`id_evento`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento_brinquedo`
--

LOCK TABLES `evento_brinquedo` WRITE;
/*!40000 ALTER TABLE `evento_brinquedo` DISABLE KEYS */;
INSERT INTO `evento_brinquedo` VALUES (1,3,19),(2,4,19),(3,5,19),(4,7,19),(5,9,19),(6,3,20),(7,4,20),(8,6,20),(9,3,21),(10,4,21),(11,9,21),(12,3,22),(13,4,22),(14,3,23),(15,4,23),(16,5,23),(17,3,24),(18,4,24),(19,5,24),(20,3,25),(21,4,25),(22,5,25),(23,3,26),(24,4,26),(25,5,26);
/*!40000 ALTER TABLE `evento_brinquedo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-15  1:48:14
