-- Adminer 4.7.6 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `valid` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `product_category` (`id`, `name`, `valid`) VALUES
(1,	'運動服飾',	1),
(2,	'運動鞋類',	1),
(3,	'健身器材',	1),
(4,	'營養補給',	1);

-- 2021-09-26 17:42:56