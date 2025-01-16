-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2025 at 01:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `concertweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `concertId` int(11) NOT NULL,
  `bookingDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `totalTickets` int(11) NOT NULL,
  `totalAmount` double NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Pending',
  `scheduleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `userId`, `concertId`, `bookingDate`, `totalTickets`, `totalAmount`, `status`, `scheduleId`) VALUES
(8, 1, 2, '2024-12-30 05:23:59.143', 1, 899, 'Pending', 9),
(9, 1, 1, '2024-12-30 05:25:44.564', 1, 900, 'Pending', 12),
(10, 1, 4, '2024-12-30 05:30:41.582', 1, 120, 'Pending', 18),
(11, 1, 3, '2024-12-30 05:41:59.085', 1, 600, 'Pending', 13),
(12, 1, 2, '2024-12-30 05:43:58.193', 1, 899, 'Pending', 9),
(13, 1, 2, '2024-12-31 04:22:21.329', 1, 899, 'Pending', 9),
(14, 1, 2, '2024-12-31 04:22:46.541', 1, 899, 'Pending', 9),
(15, 1, 2, '2024-12-31 04:23:07.014', 1, 899, 'Pending', 9),
(16, 1, 2, '2024-12-31 08:41:13.776', 1, 899, 'Pending', 9),
(17, 1, 2, '2024-12-31 09:24:42.415', 1, 899, 'Pending', 9),
(18, 1, 2, '2025-01-01 15:04:53.728', 1, 899, 'Pending', 9),
(19, 2, 2, '2025-01-01 15:37:36.003', 1, 899, 'Pending', 9),
(20, 2, 4, '2025-01-04 15:27:40.841', 1, 120, 'Pending', 19),
(21, 2, 4, '2025-01-04 15:33:04.645', 1, 120, 'Pending', 17),
(22, 2, 3, '2025-01-04 15:52:07.442', 1, 600, 'Pending', 13),
(23, 4, 6, '2025-01-04 16:55:04.775', 1, 299, 'Pending', 11);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `concert`
--

CREATE TABLE `concert` (
  `id` int(11) NOT NULL,
  `concertName` varchar(100) NOT NULL,
  `venue` varchar(100) NOT NULL,
  `picture` varchar(191) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `seatsAvailable` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `concert`
--

INSERT INTO `concert` (`id`, `concertName`, `venue`, `picture`, `price`, `createdAt`, `seatsAvailable`) VALUES
(1, 'ไทยประกันชีวิต presents COCKTAIL EVER LIVE', 'สนามราชมังคลากีฬาสถาน', 'picture-1735490655471-504381397.jpg', 900, '2024-12-27 11:59:24.421', 1999),
(2, 'คอนฐมเฟสครั้งที่ 2', 'SWT Landcamp จ.นครปฐม', 'picture-1735490711080-851608036.jpg', 899, '2024-12-27 13:03:05.922', 1991),
(3, 'โฟล์คข้างวัด 5', 'พรพนาค้าไม้ อ.บางบาล จ.พระนครศรีอยุธยา', 'picture-1735304722882-368922501.jpg', 600, '2024-12-27 13:05:22.889', 1998),
(4, 'CENTRAL AYUTTHAYA COUNTDOWN 2025', 'ณ ลานกิจกรรมหน้าศูนย์การค้าเซ็นทรัล อยุธยา', 'picture-1735307561446-483803269.jpg', 120, '2024-12-27 13:52:41.453', 997),
(5, 'Spectacle Concert', 'Phenix Grand Ballroom ชั้น 5 ฟีนิกซ์ ประตูน้ำ', 'picture-1735309019949-772658988.jpg', 1200, '2024-12-27 14:16:59.954', 1500),
(6, 'Rangsit Camp3', 'รังสิตเฟส', 'picture-1735315194954-517695709.jpg', 299, '2024-12-27 15:59:54.957', 999);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `categoryId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `image` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `concertId` int(11) NOT NULL,
  `date` datetime(3) NOT NULL,
  `startTime` varchar(10) NOT NULL,
  `endTime` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `concertId`, `date`, `startTime`, `endTime`) VALUES
(9, 2, '2025-01-11 00:00:00.000', '18:00', '00:00'),
(10, 6, '2025-02-22 00:00:00.000', '16:00', '22:00'),
(11, 6, '2025-02-23 00:00:00.000', '16:00', '10:00'),
(12, 1, '2025-03-30 00:00:00.000', '18:00', '22:00'),
(13, 3, '2025-02-08 00:00:00.000', '14:00', '23:59'),
(14, 5, '2025-02-16 00:00:00.000', '19:00', '22:30'),
(15, 4, '2024-12-27 00:00:00.000', '14:00', '23:59'),
(16, 4, '2024-12-28 00:00:00.000', '14:00', '23:59'),
(17, 4, '2024-12-29 00:00:00.000', '14:00', '23:59'),
(18, 4, '2024-12-30 00:00:00.000', '14:00', '23:59'),
(19, 4, '2024-12-31 00:00:00.000', '14:00', '23:59');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phoneNumber` varchar(10) DEFAULT NULL,
  `picture` varchar(191) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `phoneNumber`, `picture`, `enabled`, `role`, `createdAt`) VALUES
(1, 'adminnaja', 'test001@gmail.com', '$2a$10$ZvU3cMz9PK1prbBzCZhX3uEiLdpDfmmSbLgYrpG9BHNRUyfSAdlzq', '0989029999', 'picture-1735314943577-151118400.jpg', 1, 'admin', '2024-12-27 11:54:45.957'),
(2, 'test', 'test002@gmail.com', '$2a$10$nMvWmMKspGYDSjtc0Qg/3eG9FB56XDFFJQuFcAuPV6.nRS2Kd8Tg6', '0009099900', 'picture-1736008493397-940849047.jpg', 1, 'user', '2024-12-27 13:09:15.775'),
(4, 'test2', 'test003@gmail.com', '$2a$10$5Lcoe0ZOMsDGfU1FtZ4kZ.Fg/pIJ/ZemJjhzTRa/ZpjtVzYfO2A/K', NULL, NULL, 1, 'user', '2024-12-27 15:47:50.424');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('2ba8c493-abd0-4cc1-9e14-cf73d495d80f', 'c38e132f58c0810a34f0ffaf1aa94e2b2dc6116fe58649c6d7d07195c2e82464', '2024-12-27 11:51:33.379', '20241226055334_update', NULL, NULL, '2024-12-27 11:51:33.369', 1),
('32504ff1-ea85-4f57-967a-669055cb425d', '3ee20e64a4a3cbe9ac52d97ea48d0affd8ecf17ae759edad13434bf3965ba082', '2024-12-27 11:51:33.333', '20241226050645_update', NULL, NULL, '2024-12-27 11:51:33.320', 1),
('432b24bc-de88-4067-ad10-593be567d625', '755eab986754a7edb99513955f89ce4c99eb9712b17f03add7579568cdf5e4b5', '2024-12-27 11:51:33.405', '20241227031830_update_user', NULL, NULL, '2024-12-27 11:51:33.397', 1),
('53d1dd6c-a661-469a-b9ab-e414f7ffac0d', '915750068570584a07f4f4a526fa55f6e8dc26e786786de75625ae328686dd35', '2024-12-27 11:51:33.019', '20241221130202_init', NULL, NULL, '2024-12-27 11:51:32.455', 1),
('5e49b7d6-ebb9-4914-a68d-84ed6bf76fb2', '997ac785be1a2bb91b69301306177eb71001ffa00f35fa206cef01601d547b1e', '2024-12-27 11:51:33.265', '20241221130433_update', NULL, NULL, '2024-12-27 11:51:33.021', 1),
('78b03431-24d1-41da-a123-de39959efaa1', '056a7e7336f8b45b41cf8f912edeb4d8578206614fb132604ede2988fbc718e5', '2024-12-30 05:16:54.427', '20241230051654_update_booking', NULL, NULL, '2024-12-30 05:16:54.365', 1),
('82e996c8-3cd0-41dd-a791-9cb3484e1f8a', '034e1f42b9af9ec0926431a302ee301f11c84da539983c57a1ae03d2fcae0c26', '2024-12-29 18:12:56.932', '20241229181256_update_concert', NULL, NULL, '2024-12-29 18:12:56.859', 1),
('85f76524-fb92-4d47-96b8-b8243ad39fea', '5ee140872aed42da7df286c996297bd1bb7ce0a9054d33b3dafd940b2eb70011', '2024-12-27 11:51:33.318', '20241226044926_update', NULL, NULL, '2024-12-27 11:51:33.267', 1),
('9ce5aca3-6c78-468c-91c4-1fff7759cf55', '6d32d6bd679f7d7cfc1e45e381a419240d4e083f6fc28927b3936d5ca1362338', '2024-12-27 11:51:33.396', '20241227031200_update', NULL, NULL, '2024-12-27 11:51:33.382', 1),
('f17ee9da-b6c2-4fc8-9a70-61469a9a2f00', '1bf273af8d3a3c265dd7e10e361af68641ce3c0df5a81174ad47dcc34a566b11', '2024-12-27 11:51:33.367', '20241226054154_update', NULL, NULL, '2024-12-27 11:51:33.334', 1),
('f78aeea9-473c-451e-9391-4418465adf9b', 'c507c121526fb6c8455553dc010f0ccfb120f16cad6f143c20901d3043361795', '2024-12-29 14:08:19.879', '20241229140819_add_schedule_model', NULL, NULL, '2024-12-29 14:08:19.815', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Booking_userId_fkey` (`userId`),
  ADD KEY `Booking_concertId_fkey` (`concertId`),
  ADD KEY `Booking_scheduleId_fkey` (`scheduleId`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Cart_userId_fkey` (`userId`),
  ADD KEY `Cart_productId_fkey` (`productId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_name_key` (`name`);

--
-- Indexes for table `concert`
--
ALTER TABLE `concert`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Order_userId_fkey` (`userId`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderItem_orderId_fkey` (`orderId`),
  ADD KEY `OrderItem_productId_fkey` (`productId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Product_categoryId_fkey` (`categoryId`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Schedule_concertId_fkey` (`concertId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `concert`
--
ALTER TABLE `concert`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `Booking_concertId_fkey` FOREIGN KEY (`concertId`) REFERENCES `concert` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Booking_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `schedule` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `Cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `Schedule_concertId_fkey` FOREIGN KEY (`concertId`) REFERENCES `concert` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
