-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 09 月 25 日 09:01
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
-- 資料表結構 `user_order_detail`
--

CREATE TABLE `user_order_detail` (
  `id` int(11) UNSIGNED NOT NULL,
  `order_id` int(11) UNSIGNED NOT NULL,
  `sku_id` int(6) UNSIGNED NOT NULL,
  `qty` int(3) UNSIGNED NOT NULL,
  `price` int(5) UNSIGNED NOT NULL,
  `product_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `user_order_detail`
--

INSERT INTO `user_order_detail` (`id`, `order_id`, `sku_id`, `qty`, `price`, `product_name`) VALUES
(1, 1, 43, 2, 572, '【NIKE 耐吉】上衣 男款 短袖上衣 緊身 快乾 健身 運動 AS M NP TOP SS TIGHT 黑 BV5632-010\r\n'),
(2, 1, 80, 1, 1760, '【NIKE 耐吉】MC TRAINER 男慢跑鞋-健身 訓練 運動 丈青黑白(CU3580400)\r\n'),
(3, 1, 84, 1, 4383, '【adidas官方旗艦館】ULTRABOOST 21 跑鞋 運動鞋 男(FY0377)\r\n'),
(4, 2, 129, 1, 3303, '【adidas 愛迪達】ULTRABOOST 20 女 慢跑鞋 多款任選(FX7816 FX7811 EG0770 EG0716)\r\n'),
(5, 2, 174, 3, 615, '【米森】有機無麩質大燕麥片x4盒組(450g/盒)\r\n'),
(6, 3, 15, 2, 476, '【MIZUNO 美津濃】女款路跑背心 J2TA1201XX（任選）(T恤)'),
(7, 4, 98, 1, 4080, '【adidas 愛迪達】慢跑鞋 Ultraboost 20 襪套式 女鞋 愛迪達 三線 緩震 運動休閒 CNY 新年 黑紅(H04408)\r\n'),
(8, 4, 72, 2, 2090, '【PUMA官方旗艦】Hybrid NX 慢跑運動鞋 男性 19225902\r\n'),
(9, 5, 46, 2, 572, '【NIKE 耐吉】上衣 男款 短袖上衣 緊身 快乾 健身 運動 AS M NP TOP SS TIGHT 黑 BV5632-010\r\n'),
(10, 6, 126, 3, 3303, '【adidas 愛迪達】ULTRABOOST 20 女 慢跑鞋 多款任選(FX7816 FX7811 EG0770 EG0716)\r\n'),
(11, 7, 102, 2, 4080, '【adidas 愛迪達】慢跑鞋 Ultraboost 20 襪套式 女鞋 愛迪達 三線 緩震 運動休閒 CNY 新年 黑紅(H04408)\r\n'),
(12, 7, 44, 1, 572, '【NIKE 耐吉】上衣 男款 短袖上衣 緊身 快乾 健身 運動 AS M NP TOP SS TIGHT 黑 BV5632-010\r\n'),
(13, 8, 62, 3, 616, '【PUMA官方旗艦】訓練系列麻花短袖T恤 男性 51455102\r\n'),
(14, 9, 173, 2, 175, '【米森】有機無麩質大燕麥片x4盒組(450g/盒)\r\n'),
(15, 9, 102, 4, 4080, '【adidas 愛迪達】慢跑鞋 Ultraboost 20 襪套式 女鞋 愛迪達 三線 緩震 運動休閒 CNY 新年 黑紅(H04408)\r\n'),
(16, 10, 163, 2, 1999, '【ON 歐恩】金牌乳清蛋白5磅'),
(17, 10, 134, 1, 864, '【adidas 愛迪達】Adidas Strength 六角訓練啞鈴(4kg)\r\n'),
(18, 11, 65, 2, 1080, '【PUMA官方旗艦】瑜珈系列Studio扭結短版短袖T恤 女性 52022801'),
(19, 11, 177, 1, 285, '【米森】洋車前子殼纖維粉(180g)\r\n'),
(20, 12, 4, 1, 476, '【MIZUNO 美津濃】女款路跑背心 J2TA1201XX（任選）(T恤)'),
(21, 13, 83, 2, 4383, '【adidas官方旗艦館】ULTRABOOST 21 跑鞋 運動鞋 男(FY0377)\r\n'),
(22, 13, 110, 1, 2208, '【MIZUNO 美津濃】WAVE RIDER 24 一般型女款慢跑鞋 ENERZY中底材質 J1GD200301(慢跑鞋)\r\n'),
(23, 14, 80, 2, 1760, '【NIKE 耐吉】MC TRAINER 男慢跑鞋-健身 訓練 運動 丈青黑白(CU3580400)\r\n'),
(24, 15, 77, 1, 2090, '【PUMA官方旗艦】Hybrid NX 慢跑運動鞋 男性 19225902\r\n'),
(25, 15, 28, 2, 1599, '【adidas官方旗艦館】Alphabounce 跑鞋 運動鞋 男/女 共三款\r\n'),
(26, 16, 111, 2, 2208, '【MIZUNO 美津濃】WAVE RIDER 24 一般型女款慢跑鞋 ENERZY中底材質 J1GD200301(慢跑鞋)\r\n'),
(27, 17, 122, 1, 3303, '【adidas 愛迪達】ULTRABOOST 20 女 慢跑鞋 多款任選(FX7816 FX7811 EG0770 EG0716)\r\n'),
(28, 18, 155, 2, 599, '【Comefree】瑜珈防爆抗力球65cm(兩色任選)'),
(29, 19, 72, 1, 2090, '【PUMA官方旗艦】Hybrid NX 慢跑運動鞋 男性 19225902\r\n'),
(30, 20, 83, 2, 4383, '【adidas官方旗艦館】ULTRABOOST 21 跑鞋 運動鞋 男(FY0377)\r\n'),
(31, 21, 21, 3, 870, 'S.G ADIDAS ORIGINALS ADICOLOR 短袖 女款 休閒 運動 透氣 純棉 天空藍'),
(32, 22, 53, 1, 599, '【adidas官方旗艦館】D.O.N. Issue #2 短袖上衣 男(GP2235)'),
(33, 23, 58, 5, 616, '【PUMA官方旗艦】訓練系列麻花短袖T恤 男性 51455102\r\n'),
(34, 24, 78, 1, 1760, '【NIKE 耐吉】MC TRAINER 男慢跑鞋-健身 訓練 運動 丈青黑白(CU3580400)\r\n'),
(35, 25, 87, 1, 4383, '【adidas官方旗艦館】ULTRABOOST 21 跑鞋 運動鞋 男(FY0377)\r\n');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `user_order_detail`
--
ALTER TABLE `user_order_detail`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_order_detail`
--
ALTER TABLE `user_order_detail`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;