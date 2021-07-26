-- MySQL dump 10.13  Distrib 5.6.40, for Linux (x86_64)
--
-- Host: mysql14-farm10.kinghost.net    Database: solevento04
-- ------------------------------------------------------
-- Server version	5.6.49-log
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brinquedo`
--

LOCK TABLES `brinquedo` WRITE;
/*!40000 ALTER TABLE `brinquedo` DISABLE KEYS */;
INSERT INTO `brinquedo` VALUES (1,'cama elastica',100,2,'2,5m','IMG-20170516-WA0002.jpg','pequena',NULL),(2,'toboga',150,1,'pequeno','20200702_114209.jpg','pequeno',NULL),(3,'Jacaré',300,1,'Altura 4,5m','jacare.png','nenhuma',NULL),(4,'Tubarão',250,1,'Comprimento 7m x Largura 4m','tubarao.png','Bem pesado',NULL),(5,'cama elastica 2,5m',120,3,'até 100kg','20190718_132517.jpg','Cabe dentro de casa',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=398 DEFAULT CHARSET=utf8 COMMENT='Tabela com dados dos clientes';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (353,'Maue Daniele Medeiros Fagundes','002.689.930-25','Rua Equador',165,'Esq. Av Brasil',NULL,'Capão da Canoa','(51)9.9310.1122','(51)9.9162.5582','maue.daniele@gmail.com',NULL,NULL,'Zona Norte',NULL),(354,'Jan Urban Neto','972.540.100-04','Avenida Central ',197,'Apto 904',NULL,'CAPÃO DA CANOA','(51)9.9297.2763','(51)9.9433.8181','jan.urbanneto@gmail.com',NULL,NULL,'ZONA NOVA',NULL),(355,'Eva Green','000.000.000-00','Rua das Almofadas',477,'bem pertinho',NULL,'Capão da Canoa','(00)0.0000.0000','(00)0.0000.0000','eli.sm@hotmail.com',NULL,NULL,'Zona Baixa',NULL),(356,'James Brow','000.000.000-00','Em Algum Lugar Além da Imaginação',477,'bem pertinho',NULL,'Xangri-lá','(00)0.0000.0000','(00)0.0000.0000','eli.sm@hotmail.com',NULL,NULL,'partenon',NULL),(357,'Mario Eustáquio da Silva','000.000.000-00','Rua dos Trombadinhas',435,'local de risco',NULL,'Indaial','(00)0.0000.0000','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Suvaco da Cobra',NULL),(358,'José da Silva','000.000.000-00','Rua das Melancias',12,'longe',NULL,'Arroio do Sal','(00)0.0000.0000','(00)0.0000.0000','eli.sm@hotmail.com',NULL,NULL,'Zona Franca',NULL),(359,'Roberto Magalhães','000.000.000-00','Rua da Saracura',2122,'bem pertinho',NULL,'Capão da Canoa','(00)0.0000.0000','(00)0.0000.0000','eli.sm@hotmail.com',NULL,NULL,'Zona Franca',NULL),(360,'Soraia Solange','000.000.000-00','Rua dos Trombadinhas',122,'longe',NULL,'Xangri-lá','(00)0000-0000','(00)0.0000.0000','eli.sm@hotmail.com',NULL,NULL,'Antúrias',NULL),(361,'Élio dos Passos','000000000','Rua do Angu',56,'esq da rua augusta','centro do puteiro da jurema','Capão da Canoa','519999999999','5199999999','eli.sm@hotmail.com','',NULL,'Centro',NULL),(362,'Hanna Conrado Boff','002.689.930-25','Rua das Candongas',0,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','(51)9.8406.4282','','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(363,'Teste de cadastro','002.689.930-25','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Xangri-lá','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(364,'Hanna Conrado Boff','002.689.930-25','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Xangri-lá','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(365,'Teste de cadastro','002.689.930-25','Condomínio Ensada',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','(00)0.0000.0000','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(366,'Hanna Conrado Boff','013.550.700-66','Condomínio Enseada',22,'C146',NULL,'Xangri-lá','(51)9.8406.4282','','eli.sm@hotmail.com',NULL,NULL,'Enseada',NULL),(367,'Hanna Conrado Boff','013.550.700-66','Condomínio Enseada',44,'C146',NULL,'Xangri-lá','(51)9.8406.4282','','eli.sm@hotmail.com',NULL,NULL,'Enseada',NULL),(368,'Teste de cadastro','002.689.930-25','Condomínio Ensada',0,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(369,'Bruno Fernandes','032.062.144-83','Av acacias',534,'',NULL,'Osorio','(51)9.8144.5858','','brunofer@gmail.com',NULL,NULL,'Interlagos ',NULL),(370,'Teste de cadastro','002.689.930-25','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Xangri-lá','51984064','000000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(371,'Teste de cadastro','002.689.930-25','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Xangri-lá','(00)0.0000.0000','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(372,'Julinho Play','012.808.320-45','jose araq',254,'',NULL,'araquari','(47)9.9723.8663','','',NULL,NULL,'floresta',NULL),(373,'Teste de cadastro','002.689.930-25','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Xangri-lá','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(374,'Teste de cadastro','002.689.930-25','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(375,'Teste de cadastro','000.000.000-00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Xangri-lá','000000','000000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(376,'Teste de cadastro','002.689.930-25','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(377,'Teste de cadastro','002.689.930-25','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(378,'Nadir calos','000.000.000-00','Rua Equador',25,'',NULL,'Capao','(00)0.0000.0000','','',NULL,NULL,'Jardim da paz',NULL),(379,'Eli Medeiros','003.939.210-42','Rua das Hortencias',618,'Gourmet 3',NULL,'Imbé','(54)9.9913.0778','(55)9.9901.5355','',NULL,NULL,'Zona Nova',NULL),(380,'Teste de cadastro','002.689.930-25','Rua das Candongas',0,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(381,'Hanna Conrado Boff','002.689.930-25','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Xangri-lá','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Ensada',NULL),(382,'Eli Medeiros','710.524.880-72','Rua das Hortencias',618,'Bar do Gil',NULL,'Capão Novo','(53)9.8423.6379','(51)9.9928.5767','eli.sm@hotmail.com',NULL,NULL,'Centro',NULL),(383,'Teste de cadastro','002.689.930-25','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(384,'Teste de cadastro','002.689.930-25','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Xangri-lá','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(385,'Teste de cadastro','002.689.930-25','Rua das Candongas',11,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','(51)9.8406.4282','(00)0000-0000','eli.sm@hotmail.com',NULL,NULL,'Zona',NULL),(386,'Mauê Daniele Medeiros Fagundes ','004.408.248-66','Rua Equador ',165,'Esq. Av.Brasil',NULL,'Capão da canoa','(51)9.9162.6682','(53)9.8123.6379','maue.fagundes@hotmail.com.br',NULL,NULL,'Zona Norte',NULL),(387,'Amilcar Somorovski Medeiros','078.395.856-04',NULL,NULL,NULL,NULL,NULL,'4797238663','','amilcar.engenheiro@gmail.com',NULL,NULL,NULL,NULL),(388,'Amilcar Somorovski Medeiros','078.395.856-04','Rua José Cabral',258,'',NULL,'Novo Hamburgo','4797238663','','amilcar.engenheiro@gmail.com',NULL,NULL,'25 DE JULHO',NULL),(389,'Eli Medeiros','002.689.930-25','Condomínio Enseada dos Lagos',533,'Na estofados do Ivan',NULL,'CAPAO DA CANOA','(53)9.8423.6379','(51)9.9928.5767','eli.sm@hotmail.com',NULL,NULL,'Girassol',NULL),(390,'Hanna Conrado Boff','002.689.930-25','Condomínio Ensada',349,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','5193101122','(51)9.9310.1122','eli.sm@hotmail.com',NULL,NULL,'Nova Brasília',NULL),(391,'Eli Somorovski Medeiros','000.000.000-00','Rua das Candongas',323,'C146',NULL,'Capão da Canoa','5193101122','5193101122','contato.solevento@gmail.com',NULL,NULL,'Nova Brasília',NULL),(392,'Silvia Maria Villar Somorovski ','002.689.930-25','Condomínio Ensada',245,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','(51)9.9310.1122','(51)9.9310.1122','contato.solevento@gmail.com',NULL,NULL,'Ensada',NULL),(393,'Associação Brasileira Arautos do Evangelho','002.689.930-25','Condomínio Ensada',466,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Xangri-lá','5193101122','','contato.solevento@gmail.com',NULL,NULL,'Nova Brasília',NULL),(394,'Teste de cadastro','002.689.930-25','Condomínio Ensada',466,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Joinville','(51)9.9310.1122','5193101122','contato.solevento@gmail.com',NULL,NULL,'Ensada',NULL),(395,'Silvia Maria Villar Somorovski ','000.000.000-00','Condomínio Ensada',466,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Joinville','5193101122','5193101122','contato.solevento@gmail.com',NULL,NULL,'Nova Brasília',NULL),(396,'Hanna Conrado Boff','002.689.930-25','Condomínio Ensada',349,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Joinville','5193101122','(51)9.9310.1122','contato.solevento@gmail.com',NULL,NULL,'Nova Brasília',NULL),(397,'Hanna Conrado Boff','002.689.930-25','Rua das Candongas',349,'Condomínio Pateo Marbella, casa 2 quadra 7',NULL,'Capão da Canoa','5193101122','5193101122','contato.solevento@gmail.com',NULL,NULL,'Zona Norte',NULL);
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
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id_evento`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=447 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (380,353,'2020-08-03 00:00:00','Rua Equador',165,'Esq. Av Brasil',' ','Capão da Canoa','0',0,0,'',' ','',1),(381,354,'2020-08-01 00:00:00','Avenida Central ',197,'Apto 904',' ','CAPÃO DA CANOA','0',0,0,'',' ','',1),(382,355,'2020-07-08 00:00:00','Rua das Almofadas',477,'bem pertinho',' ','Capão da Canoa','200',0,0,'','Zona Baixa','',1),(383,356,'2020-07-02 00:00:00','Em Algum Lugar Além da Imaginação',477,'bem pertinho',' ','Xangri-lá','250',0,0,'','partenon','',1),(384,357,'2020-06-30 00:00:00','Rua dos Trombadinhas',435,'local de risco',' ','Indaial','300',0,0,'','Suvaco da Cobra','',1),(385,358,'2020-07-08 00:00:00','Rua das Melancias',12,'longe',' ','Arroio do Sal','100',0,0,'','Zona Franca','',2),(386,359,'2020-07-05 00:00:00','Rua da Saracura',2122,'bem pertinho',' ','Capão da Canoa','250',0,0,'','Zona Franca','',NULL),(387,NULL,'2020-06-25 16:57:37','cliente preencherá',0,' ',' ',' ','0',0,0,NULL,' ',NULL,NULL),(388,360,'2020-07-02 00:00:00','Rua dos Trombadinhas',122,'longe',' ','Xangri-lá','250',0,0,'','Antúrias','',0),(389,361,'2020-09-27 05:13:00','Av. Rio Jacuí',566,'','','Capão da Canoa ','190',0,0,NULL,'Zona Norte',NULL,0),(390,362,'2020-10-15 00:00:00','Rua das Candongas',0,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,'','Zona','',1),(391,363,'2020-10-15 04:47:00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Xangri-lá','0',0,0,NULL,'Zona',NULL,1),(392,364,'2020-10-15 05:03:00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Xangri-lá','0',0,0,NULL,'Zona',NULL,1),(393,365,'2020-10-13 01:00:00','Condomínio Ensada',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,NULL,'Zona',NULL,0),(394,366,'2020-10-15 23:02:00','Condomínio Enseada',22,'C146',' ','Xangri-lá','0',0,0,NULL,'Enseada',NULL,0),(395,367,'2020-12-10 11:22:00','Condomínio Enseada',44,'C146',' ','Xangri-lá','0',0,0,NULL,'Enseada',NULL,0),(396,368,'2020-10-15 05:46:00','Condomínio Ensada',0,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,NULL,'Zona',NULL,0),(397,NULL,'2020-10-14 16:02:29','cliente preencherá',0,' ',' ',' ','0',0,0,NULL,' ',NULL,0),(398,NULL,'2020-10-14 16:07:16','cliente preencherá',0,' ',' ',' ','0',0,0,NULL,' ',NULL,0),(399,369,'2020-10-14 18:00:00','Av acacias',534,'',' ','Osorio','0',0,0,NULL,'Interlagos ',NULL,2),(400,370,'2020-10-15 04:36:00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Xangri-lá','0',0,0,NULL,'Zona',NULL,0),(401,371,'2020-10-15 16:56:00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Xangri-lá','0',0,0,NULL,'Zona',NULL,0),(402,NULL,'2020-10-14 16:57:24','cliente preencherá',0,' ',' ',' ','0',0,0,NULL,' ',NULL,0),(403,372,'2020-11-15 19:00:00','jose araq',254,'',' ','araquari','0',0,0,'sdafasfdsasaf','floresta','',0),(404,NULL,'2020-10-14 17:00:40','cliente preencherá',0,' ',' ',' ','0',0,0,NULL,' ',NULL,0),(405,373,'2020-10-15 17:11:00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Xangri-lá','0',0,0,NULL,'Zona',NULL,0),(406,374,'2020-10-15 19:51:00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,NULL,'Zona',NULL,0),(407,375,'2020-10-17 07:56:00','Rua das Candongas',0,'C146',' ','Xangri-lá','0',0,0,NULL,'Ensada',NULL,0),(408,376,'2020-10-15 20:03:00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,NULL,'Zona',NULL,0),(409,NULL,'2020-10-14 20:04:27','cliente preencherá',0,' ',' ',' ','0',0,0,NULL,' ',NULL,0),(410,377,'2020-10-15 20:20:00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,NULL,'Zona',NULL,0),(411,378,'2020-10-15 08:23:00','Rua Equador',25,'',' ','Capao','0',0,0,NULL,'Jardim da paz',NULL,0),(412,379,'2020-10-22 14:00:00','Rua das Hortencias',618,'Gourmet 3',' ','Imbé','0',0,0,'','Zona Nova','',1),(413,380,'2020-10-24 15:00:00','Rua das Candongas',0,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,'','Zona','',1),(414,381,'2020-10-26 20:42:00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Xangri-lá','0',0,0,'','Ensada','',0),(415,382,'2020-10-30 05:45:00','Rua das Hortencias',618,'Bar do Gil',' ','Capão Novo','0',0,0,'','Centro','',0),(416,NULL,'2020-10-14 20:45:43','cliente preencherá',0,' ',' ',' ','0',0,0,NULL,' ',NULL,0),(417,383,'2020-10-29 08:53:00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,'','Zona','',0),(418,NULL,'2020-10-14 20:51:09','cliente preencherá',0,' ',' ',' ','0',0,0,NULL,' ',NULL,0),(419,384,'2020-11-16 15:00:00','Rua das Candongas',467,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Xangri-lá','0',0,0,'','Zona','',0),(420,385,'2020-10-21 21:36:00','Rua das Candongas',11,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,'obs','Zona','',1),(421,386,'2020-10-29 12:00:00','Rua Equador ',165,'Esq. Av.Brasil',' ','Capão da canoa','0',0,0,'','Zona Norte','',1),(422,388,'2020-10-29 23:55:00','Rua José Cabral',258,'',' ','Novo Hamburgo','0',0,0,'','25 DE JULHO','',1),(423,384,'2020-11-15 14:00:00','Rua das Candongas',467,NULL,' ','Xangri-lá','0',0,0,'','Zona',NULL,1),(424,389,'2021-02-11 13:52:00','Condomínio Enseada dos Lagos',533,'Na estofados do Ivan',' ','CAPAO DA CANOA','0',0,0,'','Girassol','',1),(425,379,'2021-02-24 02:05:00','Rua Equador',349,'','','Capão da Canoa','250',30,30,NULL,'Zona Norte',NULL,1),(426,379,'2021-03-25 12:59:00','Rua Equador',349,'','','Capão da Canoa','200',20,20,NULL,'Zona Norte',NULL,1),(427,NULL,'2021-03-26 18:53:00','cliente preencherá',0,' ',' ',' ','0',0,0,NULL,' ',NULL,0),(428,390,'2021-04-22 02:08:00','Condomínio Ensada',349,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,NULL,'Nova Brasília',NULL,0),(429,391,'2021-04-23 23:21:00','Rua das Candongas',323,'C146',' ','Capão da Canoa','0',0,0,NULL,'Nova Brasília',NULL,0),(430,392,'2021-04-21 00:26:00','Condomínio Ensada',245,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,NULL,'Ensada',NULL,0),(431,393,'2021-04-24 23:26:00','Condomínio Ensada',466,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Xangri-lá','0',0,0,NULL,'Nova Brasília',NULL,0),(432,394,'2021-04-21 22:27:00','Condomínio Ensada',466,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Joinville','0',0,0,NULL,'Ensada',NULL,0),(433,NULL,'2021-04-20 21:28:36','cliente preencherá',0,' ',' ',' ','0',0,0,NULL,' ',NULL,0),(434,NULL,'2021-04-20 21:29:50','cliente preencherá',0,' ',' ',' ','0',0,0,NULL,' ',NULL,0),(435,395,'2021-04-21 23:33:00','Condomínio Ensada',466,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Joinville','0',0,0,NULL,'Nova Brasília',NULL,0),(436,396,'2021-04-21 00:37:00','Condomínio Ensada',349,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Joinville','0',0,0,NULL,'Nova Brasília',NULL,0),(437,397,'2021-04-21 23:47:00','Rua das Candongas',349,'Condomínio Pateo Marbella, casa 2 quadra 7',' ','Capão da Canoa','0',0,0,NULL,'Zona Norte',NULL,0),(438,361,'2021-06-03 12:00:00','Rua da Tamburelo',696,'Condomínio Pateo Marbella, casa 2 quadra 7','fasfasfasfsafas','Capão da Canoa','232',22,21,'','Zona Norte','',1),(439,361,'2021-06-04 12:00:00','Rua da Tamburelo',696,NULL,'fasfasfasfsafas','Capão da Canoa','232',22,21,'','Zona Norte',NULL,0),(440,361,'2021-06-05 12:00:00','Rua da Tamburelo',696,NULL,'fasfasfasfsafas','Capão da Canoa','232',22,21,'','Zona Norte',NULL,0),(441,361,'2021-06-07 12:00:00','Rua da Tamburelo',696,NULL,'fasfasfasfsafas','Capão da Canoa','232',22,21,'','Zona Norte',NULL,0),(442,361,'2021-06-11 12:00:00','Rua da Tamburelo',696,NULL,'fasfasfasfsafas','Capão da Canoa','232',22,21,'','Zona Norte',NULL,0),(443,361,'2021-06-12 12:00:00','Rua da Tamburelo',696,'Condomínio Pateo Marbella, casa 2 quadra 7','fasfasfasfsafas','Capão da Canoa','232',22,21,'','Zona Norte',NULL,0),(444,361,'2021-06-10 22:33:00','Rua do Angu',56,'esq da rua augusta','','Capão da Canoa','112',2,2,NULL,'Centro',NULL,1),(445,361,'2021-06-30 12:00:00','Rua da Tamburelo',696,'Condomínio Pateo Marbella, casa 2 quadra 7','fasfasfasfsafas','Capão da Canoa','232',22,21,'','Zona Norte',NULL,0),(446,392,'2021-06-05 12:45:00','Condomínio Ensada',245,'Condomínio Pateo Marbella, casa 2 quadra 7','','Capão da Canoa','145',5,5,NULL,'Ensada',NULL,0);
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
  CONSTRAINT `evento_brinquedo_ibfk_2` FOREIGN KEY (`brinquedo`) REFERENCES `brinquedo` (`id_brinquedo`),
  CONSTRAINT `evento_brinquedo_ibfk_3` FOREIGN KEY (`evento`) REFERENCES `evento` (`id_evento`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento_brinquedo`
--

LOCK TABLES `evento_brinquedo` WRITE;
/*!40000 ALTER TABLE `evento_brinquedo` DISABLE KEYS */;
INSERT INTO `evento_brinquedo` VALUES (1,1,384),(2,2,384),(3,1,383),(4,2,383),(5,1,382),(6,2,382),(7,1,388),(8,1,386),(9,2,386),(10,1,385),(11,4,388),(12,3,384),(13,3,389),(14,4,389),(15,2,421),(17,4,403),(18,5,403),(19,1,413),(20,3,413),(21,2,412),(22,5,412),(23,3,414),(24,5,414),(25,1,415),(26,3,415),(27,3,417),(29,2,420),(31,4,419),(32,3,424),(33,3,425),(34,1,426),(35,4,426),(36,5,426),(37,4,438),(38,4,439),(39,4,440),(40,4,441),(41,4,442),(42,4,443),(43,2,444),(44,5,444),(45,4,445),(46,3,446);
/*!40000 ALTER TABLE `evento_brinquedo` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessao`
--

LOCK TABLES `sessao` WRITE;
/*!40000 ALTER TABLE `sessao` DISABLE KEYS */;
INSERT INTO `sessao` VALUES (6,NULL,387,'db_teste','2020-06-25 16:57:37'),(14,NULL,397,'db_teste','2020-10-14 16:02:28'),(15,NULL,398,'db_teste','2020-10-14 16:07:16'),(19,NULL,402,'db_teste','2020-10-14 16:57:24'),(21,NULL,404,'db_teste','2020-10-14 17:00:39'),(26,NULL,409,'db_teste','2020-10-14 20:04:27'),(33,NULL,416,'db_teste','2020-10-14 20:45:42'),(35,NULL,418,'db_teste','2020-10-14 20:51:09'),(36,NULL,427,'db_teste','2021-03-26 18:52:59'),(42,NULL,433,'db_teste','2021-04-20 21:28:36'),(43,NULL,434,'db_teste','2021-04-20 21:29:50');
/*!40000 ALTER TABLE `sessao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'solevento04'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-26 14:02:10
