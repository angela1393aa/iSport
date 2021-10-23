-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-08-22 15:21:21
-- 伺服器版本： 10.4.19-MariaDB
-- PHP 版本： 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `my_test_db`
--

-- --------------------------------------------------------

--
-- 資料表結構 `customer_service_data`
--

CREATE TABLE `customer_service_data` (
  `id` int(6) UNSIGNED NOT NULL,
  `account` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `customer_service_data`
--

INSERT INTO `customer_service_data` (`id`, `account`, `email`, `type`, `content`) VALUES
(1, 'Brook', 'Brook@test.com', 'other', '這是一筆測試的資料');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `customer_service_data`
--
ALTER TABLE `customer_service_data`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `customer_service_data`
--
ALTER TABLE `customer_service_data`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
