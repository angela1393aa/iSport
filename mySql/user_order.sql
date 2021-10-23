-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 10 月 12 日 08:31
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
-- 資料庫: `iSport`
--

-- --------------------------------------------------------

--
-- 資料表結構 `user_order`
--

CREATE TABLE `user_order` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(6) UNSIGNED NOT NULL,
  `recipient` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_no` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp(),
  `order_no` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paytype` enum('ATM匯款','線上刷卡','貨到付款','') COLLATE utf8mb4_unicode_ci NOT NULL,
  `delivery` enum('郵寄','宅急便','超商取貨','') COLLATE utf8mb4_unicode_ci NOT NULL,
  `delivery_date` datetime DEFAULT current_timestamp(),
  `subtotal` int(6) UNSIGNED NOT NULL,
  `delivery_fee` int(3) UNSIGNED NOT NULL,
  `total_amount` int(6) UNSIGNED NOT NULL,
  `order_status` int(2) UNSIGNED NOT NULL,
  `valid` int(2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `user_order`
--

INSERT INTO `user_order` (`id`, `user_id`, `recipient`, `phone`, `email`, `address`, `invoice_no`, `order_date`, `order_no`, `paytype`, `delivery`, `delivery_date`, `subtotal`, `delivery_fee`, `total_amount`, `order_status`, `valid`) VALUES
(1, 2, 'Tony', '0988745124', 'test01@test01.com', '台北市和平東路一段一號一樓', 'HQ34877546', '2021-05-02 23:15:20', '2105ORD0201', '線上刷卡', '郵寄', '2021-05-07 23:15:20', 0, 60, 7287, 2, 1),
(2, 2, 'Brook', '0988777444', 'admin1@test.com', '桃園市中正路一段一號一樓', 'XU46183280', '2021-05-05 05:16:37', '2105ORD0502', '線上刷卡', '宅急便', '2021-05-10 05:16:37', 0, 80, 5148, 2, 1),
(3, 12, 'Zona', '0955442134', '0', '雲林縣中正路一段一號', 'PH87841994', '2021-05-08 05:16:37', '2108ORD0803', 'ATM匯款', '宅急便', '2021-05-11 05:16:37', 0, 80, 952, 2, 1),
(4, 1, 'Page', '0988777441', '0', '新北市連城路一號一樓', 'MN20935305', '2021-05-09 05:18:26', '2105ORD0904', '線上刷卡', '郵寄', '2021-05-12 05:18:26', 0, 60, 8260, 2, 1),
(5, 5, 'Debby', '0988777888', '0', '台北市基隆路一段一號一樓', 'NE75492620', '2021-05-11 05:18:26', '2105ORD1105', '線上刷卡', '郵寄', '2021-05-14 05:18:26', 0, 60, 1144, 3, 1),
(6, 17, 'Wayne', '0957575757', '0', '台北市信義路一段一號一樓', 'XO32958959', '2021-05-17 23:16:37', '2105ORD1706', '線上刷卡', '宅急便', '2021-05-20 23:16:37', 0, 80, 9909, 2, 1),
(7, 2, 'Zona', '0955442134', '0', '雲林縣中正路一段一號', 'EM44735889', '2021-05-21 10:17:15', '2105ORD2107', '線上刷卡', '郵寄', '2021-05-24 10:17:15', 0, 60, 8732, 3, 1),
(8, 6, 'Eden', '0944555661', '0', '新北市永和路一段一號', 'XC42052682', '2021-05-21 15:17:15', '2105ORD2108', '線上刷卡', '宅急便', '2021-05-26 15:17:15', 0, 80, 1848, 2, 1),
(9, 2, 'Sammy', '0922575412', '0', '台中市市府路一段一號一樓', 'ZO48417614', '2021-05-21 12:19:53', '2105ORD2109', 'ATM匯款', '宅急便', '2021-05-25 12:19:53', 0, 80, 16670, 2, 1),
(10, 7, 'Emma', '0965555664', '0', '台北市南港路一段一號一樓', 'FY12193099', '2021-05-23 00:17:15', '2105ORD2310', 'ATM匯款', '郵寄', '2021-05-26 00:17:15', 0, 60, 4862, 3, 1),
(11, 13, 'Gavin', '0922111445', '0', '桃園市文化路一段一號一樓', 'EL60087395', '2021-06-02 11:14:10', '2106ORD0211', '貨到付款', '郵寄', '2021-06-05 11:14:10', 0, 60, 2636, 2, 1),
(12, 1, 'Freda', '0977888415', '0', '新竹市中正路二段二號二樓', 'DH86702032', '2021-06-14 12:25:32', '2106ORD1412', '貨到付款', '郵寄', '2021-06-18 12:25:32', 0, 60, 476, 2, 1),
(13, 4, 'Clara', '0977884442', '0', '台中市台灣大道87號', 'LB24234639', '2021-06-17 12:22:18', '2106ORD1413', 'ATM匯款', '宅急便', '2021-06-21 12:22:18', 0, 80, 10974, 2, 1),
(14, 2, 'Sinclair', '0924578424', '0', '南投縣仁愛路一段一號', 'PB49048777', '2021-06-21 09:25:30', '2106ORD2114', '貨到付款', '超商取貨', NULL, 0, 60, 3520, 3, 0),
(15, 1, 'Aaliyah', '0922222222', 'test01@test01.com', '台北市中山路一段一號一樓', 'IB36655935', '2021-06-21 05:12:31', '2106ORD2115', 'ATM匯款', '宅急便', NULL, 0, 80, 5288, 2, 1),
(16, 1, 'Steve', '988774124', '0', '台北市松江路一段一號一樓', 'QL26821065', '2021-06-24 05:04:22', '2106ORD2416', '線上刷卡', '宅急便', '2021-06-29 05:04:22', 0, 80, 4416, 2, 1),
(17, 2, 'Sammy', '0922575412', '0', '台中市市府路一段一號一樓', 'IE96732841', '2021-06-24 08:42:22', '2106ORD2417', '線上刷卡', '宅急便', NULL, 0, 80, 3303, 2, 1),
(18, 6, 'Eden', '0944555661', '0', '新北市永和路一段一號', 'UX91579676', '2021-06-27 03:16:11', '2106ORD2718', 'ATM匯款', '宅急便', NULL, 0, 80, 1198, 2, 1),
(19, 1, 'Patrick', '0988774214', '0', '彰化縣軍功路一段一號', 'YZ70060738', '2021-06-27 06:39:11', '2106ORD2719', '貨到付款', '宅急便', NULL, 0, 80, 2090, 3, 0),
(20, 2, 'Alice', '0922222555', 'admin1@test.com', '台北市南港路一段一號一樓', 'KE74899692', '2021-06-23 13:25:22', '2106ORD2720', '貨到付款', '郵寄', '2021-06-27 13:25:22', 0, 60, 8766, 2, 1),
(21, 1, 'Clara', '0977884442', '0', '台中市台灣大道87號', 'IC88943484', '2021-07-02 05:30:22', '2107ORD0221', '線上刷卡', '超商取貨', NULL, 0, 60, 2610, 2, 1),
(22, 1, 'Wayne', '0957575757', '0', '台北市信義路一段一號一樓', 'VW61843081', '2021-07-02 08:46:22', '2107ORD0222', '貨到付款', '宅急便', NULL, 0, 80, 599, 1, 1),
(23, 2, 'Grace', '0955444621', '0', '高雄市七賢一路45號', 'AA85078484', '2021-07-02 20:32:53', '2107ORD0223', '貨到付款', '宅急便', NULL, 0, 80, 3080, 2, 1),
(24, 2, 'Debby', '0988777888', '0', '台北市基隆路一段一號一樓', 'UT54606118', '2021-07-05 09:15:22', '2107ORD0524', '線上刷卡', '超商取貨', NULL, 0, 60, 1760, 1, 1),
(25, 2, 'Aaliyah', '0922222222', 'test01@test01.com', '台北市中山路一段一號一樓', 'EU18754631', '2021-07-14 08:54:56', '2107ORD1425', '貨到付款', '郵寄', NULL, 0, 60, 4383, 1, 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `user_order`
--
ALTER TABLE `user_order`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_order`
--
ALTER TABLE `user_order`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
