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

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `logradouro` varchar(45) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `observacao_endereco` varchar(45) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `telefone_recado` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `observacao_cliente` varchar(100) DEFAULT NULL,
  `cliente_evento` int(11) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COMMENT='Tabela com dados dos clientes';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Eli','000.000.000-25','rua Equador',165,'esq. av. Brasil','','Capão da Canoa','51993101122','51991625582','eli.sm@hotmail.com','cara chato pra caramba',NULL),(2,'Silvia','000.000.000-00','Rua Itália',11,NULL,NULL,'Caxias do Sul','54654646434343',NULL,'siliva@silvia.com.br',NULL,NULL),(3,'Silvia','000.000.000-00','Rua Itália',11,NULL,NULL,'Caxias do Sul','54654646434343',NULL,'siliva@silvia.com.br',NULL,NULL),(4,'Silvia','000.000.000-00','Rua Itália',11,NULL,NULL,'Caxias do Sul','54654646434343',NULL,'siliva@silvia.com.br',NULL,NULL),(5,'maue','131232131231','lkfjsafçsajl',34543543,NULL,NULL,'asldkflçajsfjç','213234242342',NULL,'maue@hotmail',NULL,NULL),(6,'maue','131232131231','lkfjsafçsajl',34543543,'çlkfjajfaç','fgsfgsd','sdfgsdfgdsgs','213234242342','','maue@hotmail','Chata pra caramba',NULL),(7,'maue','131232131231','lkfjsafçsajl',34543543,'çlkfjajfaç','fgsfgsd','sdfgsdfgdsgs','213234242342','','maue@hotmail','Chata pra caramba',NULL),(8,'maue','131232131231','lkfjsafçsajl',34543543,'çlkfjajfaç','fgsfgsd','sdfgsdfgdsgs','213234242342',NULL,'maue@hotmail','Chata pra caramba',NULL),(9,'maue','131232131231','lkfjsafçsajl',34543543,'çlkfjajfaç','fgsfgsd','sdfgsdfgdsgs','213234242342','adsfasfs','maue@hotmail','Chata pra caramba',NULL),(10,'maue','131232131231','lkfjsafçsajl',34543543,'çlkfjajfaç','fgsfgsd','sdfgsdfgdsgs','213234242342','adsfasfs','maue@hotmail','Chata pra caramba',NULL),(11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(33,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(35,'Leona Fagundes Medeiros','0000000000','Rua Itália',165,'','','Capão','asfafasfa','asdfsaffass','leona@fagundes.com','',NULL);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evento` (
  `id_evento` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `logradouro` varchar(45) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `observacao` varchar(45) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `valor_total` varchar(45) DEFAULT NULL,
  `valor_desconto` float DEFAULT NULL,
  `valor_sinal` float DEFAULT NULL,
  `observacao_evento` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_evento`),
  KEY `id_cliente_idx` (`id_cliente`),
  CONSTRAINT `id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (1,1,'2019-06-19 23:39:30','Rua Ubatuba de Farias',165,NULL,'chegar cedo','Capão da Canoa','330',0,30,NULL),(2,1,'2019-05-22 00:00:00','asdfasf',243,'','','dfsa','34242',0,0,NULL),(3,5,'2019-05-22 00:00:00','asdfasf',243,'','','dfsa','34242',0,0,NULL),(4,5,'2019-05-22 00:00:00','asdfasf',243,'','','dfsa','34242',0,0,NULL),(5,2,'2019-05-30 00:00:00','equador',165,'','','Capão','500',0,0,NULL),(6,2,'2019-05-30 00:00:00','equador',165,'','','Capão','500',0,0,NULL),(7,2,'2019-05-09 00:00:00','fsaf',342,'','','rearew','342432',0,0,NULL),(8,2,'2019-05-09 00:00:00','fsaf',342,'','','rearew','342432',0,0,NULL),(9,2,'2019-05-09 00:00:00','fsaf',342,'','','rearew','342432',0,0,NULL),(10,2,'2019-05-09 00:00:00','fsaf',342,'','','rearew','342432',0,0,NULL),(11,3,'2019-05-09 00:00:00','fsaf',342,'','','rearew','342432',0,0,NULL),(12,4,'2019-05-09 00:00:00','fsaf',342,'','','rearew','342432',0,0,NULL),(13,3,'2019-05-09 00:00:00','fsaf',342,'','','rearew','342432',0,0,NULL),(14,2,'2019-05-09 00:00:00','fsa',342,'','','rearew','342432',0,0,NULL),(15,2,'2019-05-09 00:00:00','fsa',342,'','','rearew','342432',0,0,NULL),(16,2,'2019-05-09 00:00:00','fsa',342,'','','rearew','342432',0,0,NULL),(17,7,'2019-05-09 00:00:00','fsa',342,'','','rearew','342432',0,0,NULL),(18,6,'2019-05-09 00:00:00','fsa',342,'','','rearew','342432',0,0,NULL),(19,3,'2019-05-30 00:00:00','Rua Arapuã',171,'Ligadona em você','affsdfsaf','Caxias do Sul','3430',54,29,NULL);
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento_brinquedo`
--

LOCK TABLES `evento_brinquedo` WRITE;
/*!40000 ALTER TABLE `evento_brinquedo` DISABLE KEYS */;
INSERT INTO `evento_brinquedo` VALUES (1,3,19),(2,4,19),(3,5,19),(4,7,19),(5,9,19);
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

-- Dump completed on 2019-05-31 15:56:18
