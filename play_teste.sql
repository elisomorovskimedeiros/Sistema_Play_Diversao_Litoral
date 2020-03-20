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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `logradouro` varchar(200) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `observacao_endereco` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `telefone` varchar(100) DEFAULT NULL,
  `telefone_recado` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `observacao_cliente` varchar(200) DEFAULT NULL,
  `cliente_evento` int(11) unsigned zerofill DEFAULT NULL,
  `bairro` varchar(45) DEFAULT NULL,
  `data_nascimento` datetime DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=353 DEFAULT CHARSET=utf8 COMMENT='Tabela com dados dos clientes';
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `logradouro` varchar(200) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `complemento` varchar(200) DEFAULT NULL,
  `observacao` varchar(100) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `valor_total` varchar(45) DEFAULT NULL,
  `valor_desconto` float DEFAULT NULL,
  `valor_sinal` float DEFAULT NULL,
  `observacao_evento` varchar(45) DEFAULT NULL,
  `bairro` varchar(45) DEFAULT NULL,
  `possui_local_abrigado` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_evento`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=380 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  CONSTRAINT `evento_brinquedo_ibfk_2` FOREIGN KEY (`brinquedo`) REFERENCES `brinquedo` (`id_brinquedo`),
  CONSTRAINT `evento_brinquedo_ibfk_3` FOREIGN KEY (`evento`) REFERENCES `evento` (`id_evento`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sessao`
--

DROP TABLE IF EXISTS `sessao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessao` (
  `id_sessao` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` int(11) DEFAULT NULL,
  `evento` int(11) DEFAULT NULL,
  `perfil` varchar(45) DEFAULT NULL,
  `horaCriacao` datetime DEFAULT NULL,
  PRIMARY KEY (`id_sessao`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-19 21:38:12
