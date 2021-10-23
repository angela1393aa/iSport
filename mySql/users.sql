-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-10-10 21:41:57
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
-- 資料庫: `isport`
--

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int(6) UNSIGNED NOT NULL,
  `name` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `account` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `about` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `googleid` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `facebookid` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `name`, `account`, `password`, `email`, `phone`, `address`, `birthday`, `about`, `gender`, `photo`, `create_time`, `googleid`, `facebookid`) VALUES
(1, '王老五', 'test01', '$2b$10$vNF/.Ul3q4LwdTuufswhS.tPRQHJs2qYGDC.MVrmW3uHvTlvvjIrO', 'test01@test01.com', '0911222333', '台北市大安區復興南路一段一號', '2009-01-01 00:00:00', '我是王老五', 'male', '', NULL, '', ''),
(2, '黃阿花', 'admin1', '$2b$10$eJwgY7m7h4EmlgLz59jVIeLlZbaHOpD.EaTzGQcg6MxSaNVFHFRJq', 'admin1@test.com', '0912345678', '台北市中山區羅斯福路一段一號', '1997-06-25 00:00:00', '我是黃阿花', 'female', '', NULL, '', ''),
(3, '李曉明', 'test02', '$2b$10$8A02iVbxiJ7Rq.ol4S8pluZwEDGjo7.WooCQkKT6dqBdvlJF5ejEG', 'test02@test.com', '0922111222', '台北市萬華區萬大路11號', NULL, NULL, 'reserve', '', NULL, '', '');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
