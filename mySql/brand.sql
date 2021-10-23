-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-07-10 10:12:30
-- 伺服器版本： 10.4.18-MariaDB
-- PHP 版本： 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `mfee17_4_db`
--

-- --------------------------------------------------------

--
-- 資料表結構 `brand`
--

CREATE TABLE `brand` (
  `id` int(5) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valid` tinyint(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `brand`
--

INSERT INTO `brand` (`id`, `name`, `valid`) VALUES
(1, 'MIZUNO 美津濃', 1),
(2, 'Molybeka 魔力貝卡', 1),
(3, 'adidas 愛迪達', 1),
(4, 'PUMA', 1),
(5, 'NIKE 耐吉', 1),
(6, 'CHANSON 強生', 1),
(7, 'Fun Sport', 1),
(8, 'Comefree', 1),
(9, 'ON 歐恩', 1),
(10, 'Spark Protein', 1),
(11, 'MYPROTEIN', 1),
(12, 'Vilson 米森', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
