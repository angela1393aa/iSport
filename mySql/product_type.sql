-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-07-07 15:24:53
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
-- 資料表結構 `product_type`
--

CREATE TABLE `product_type` (
  `id` int(3) UNSIGNED NOT NULL,
  `name_frontend` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_backend` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `product_type`
--

INSERT INTO `product_type` (`id`, `name_frontend`, `name_backend`) VALUES
(1, '顏色', 'color'),
(2, '尺寸', 'size'),
(3, '規格', 'specification'),
(4, '重量', 'weight'),
(5, '口味', 'flavor');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_type`
--
ALTER TABLE `product_type`
  MODIFY `id` int(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
