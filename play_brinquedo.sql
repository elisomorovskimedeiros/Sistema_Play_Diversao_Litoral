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
-- Table structure for table `brinquedo`
--

DROP TABLE IF EXISTS `brinquedo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brinquedo` (
  `id_brinquedo` int(11) NOT NULL AUTO_INCREMENT,
  `nome_brinquedo` varchar(45) DEFAULT NULL,
  `valor_brinquedo` float NOT NULL DEFAULT '0',
  `quantidade` int(11) NOT NULL DEFAULT '0',
  `caracteristicas` varchar(45) DEFAULT NULL,
  `foto_brinquedo` varchar(100) DEFAULT NULL,
  `observacao` varchar(200) DEFAULT NULL,
  `esta_disponivel` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_brinquedo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brinquedo`
--

LOCK TABLES `brinquedo` WRITE;
/*!40000 ALTER TABLE `brinquedo` DISABLE KEYS */;
INSERT INTO `brinquedo` VALUES (3,'Cama Elástica',150,2,'3m','imagens/aluguel-de-cama-elástica-sem_fundo.png','Mola enferrujada',NULL),(4,'Castelo com Tourinho',170,1,'Tourinho, escorrega e pula pula','imagens/castelo_com_piscina_de_bolinhas.png','Nenhuma',NULL),(5,'Castelo com Tourinho',170,1,'Tourinho, escorrega e pula pula','imagens/castelo_com_piscina_de_bolinhas.png','Nenhuma',NULL),(6,'Tobogã Jacaré',300,1,'4,5m de altura x 7 de comprimento','imagens/castelo_piscina_touro.png','nenhuma',NULL),(7,'Tobogã Jacaré',300,1,'4,5m de altura x 7 de comprimento','imagens/castelo_piscina_touro.png','nenhuma',NULL),(8,'tubarao',250,1,'legal','imagens/escorrega.png','nenhuma',NULL),(9,'tubarao',250,1,'legal','imagens/escorrega.png','nenhuma',NULL),(10,'Castelo',170,1,'legal','imagens/castelo_com_piscina_de_bolinhas.png','daslkjfalsfj',NULL);
/*!40000 ALTER TABLE `brinquedo` ENABLE KEYS */;
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
