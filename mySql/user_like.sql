-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 10 月 01 日 18:43
-- 伺服器版本： 10.4.19-MariaDB
-- PHP 版本： 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `iSport`
--

-- --------------------------------------------------------

--
-- 資料表結構 `user_like`
--

CREATE TABLE `user_like` (
  `id` int(6) UNSIGNED NOT NULL,
  `user_account` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_id` int(6) DEFAULT NULL,
  `video_id` int(6) UNSIGNED DEFAULT NULL,
  `product_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `article_id` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `user_like`
--

INSERT INTO `user_like` (`id`, `user_account`, `comment_id`, `video_id`, `product_id`, `article_id`) VALUES
(33, 'test01', NULL, 18, NULL, NULL);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `user_like`
--
ALTER TABLE `user_like`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_like`
--
ALTER TABLE `user_like`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
