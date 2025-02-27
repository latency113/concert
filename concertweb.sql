-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2025 at 05:48 AM
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
  `scheduleId` int(11) NOT NULL,
  `bookingDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `totalTickets` int(11) NOT NULL,
  `totalAmount` double NOT NULL,
  `status` enum('Paid','NotPaying','Cancel') NOT NULL DEFAULT 'NotPaying'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `userId`, `concertId`, `scheduleId`, `bookingDate`, `totalTickets`, `totalAmount`, `status`) VALUES
(24, 1, 1, 4, '2025-02-26 13:22:22.833', 1, 699, 'Paid'),
(25, 1, 2, 2, '2025-02-26 13:28:50.395', 2, 700, 'Paid'),
(26, 1, 3, 3, '2025-02-26 13:32:07.348', 1, 950, 'Paid'),
(27, 1, 6, 11, '2025-02-26 14:47:28.146', 10, 6000, 'Paid'),
(28, 1, 8, 13, '2025-02-26 15:25:52.963', 100, 35000, 'Paid');

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `concert`
--

CREATE TABLE `concert` (
  `id` int(11) NOT NULL,
  `concertName` varchar(100) NOT NULL,
  `venue` varchar(100) NOT NULL,
  `brandId` int(11) DEFAULT NULL,
  `picture` varchar(191) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `seatsAvailable` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `concert`
--

INSERT INTO `concert` (`id`, `concertName`, `venue`, `brandId`, `picture`, `price`, `seatsAvailable`, `createdAt`) VALUES
(1, 'Winter’s Spell Concert', 'Bangkok Live House', NULL, 'picture-1740499576177-392839200.png', 699, 999, '2025-02-25 16:06:16.189'),
(2, 'Uncleben&Loserpop', 'DECOMMUNE', NULL, 'picture-1740508389608-832671870.jpg', 350, 998, '2025-02-25 18:33:09.615'),
(3, 'CAT EXPO ขอนแก่น', 'ศูนย์ประชุมและแสดงสินค้านานาชาติขอนแก่น (ไคซ์)', NULL, 'picture-1740539702608-382284870.jpg', 950, 999, '2025-02-26 03:15:02.620'),
(4, 'ROAD FOR LIFE EP.3: วิถีเพื่อชีวิต', 'ลานกิจกรรมเขาใหญ่มาราธอน ถนนธนะรัชต์ กม.21', NULL, 'picture-1740539995049-836675016.png', 1200, 1000, '2025-02-26 03:19:55.058'),
(5, 'CHANG SONGKRAN PRESENTS รังสิตสาด 3', 'ESC Park Rangsit', NULL, 'picture-1740540201575-793644844.jpg', 499, 1000, '2025-02-26 03:23:21.579'),
(6, 'Cat มือที่สอง', 'MCC HALL, THE MALL LIFESTORE BANGKAPI', NULL, 'picture-1740540308288-768014532.png', 600, 990, '2025-02-26 03:25:08.293'),
(7, 'มาม่า Presents \"ONLYFAM\" NONT TANONT 29TH BIRTHDAY EVENT', 'centralwOrld LIVE', NULL, 'picture-1740543499387-937694411.jpg', 1019, 1000, '2025-02-26 04:18:19.396'),
(8, 'Stoic', 'Campyard ', NULL, 'picture-1740545595325-948545852.jpg', 350, 900, '2025-02-26 04:53:15.328'),
(9, 'Blend Of Brothers (B.O.B) Exclusive Concert', 'Live House at Search Studio', NULL, 'picture-1740588396683-64946408.jpg', 2399, 1000, '2025-02-26 16:46:36.690');

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
(2, 2, '2025-02-27 00:00:00.000', '18:30', '23:59'),
(3, 3, '2025-02-19 00:00:00.000', '12:00', '23:59'),
(4, 1, '2025-03-07 00:00:00.000', '17:00', '23:59'),
(5, 4, '2025-03-01 00:00:00.000', '13:30', '02:40'),
(6, 4, '2025-03-02 00:00:00.000', '01:30', '02:40'),
(7, 5, '2025-04-17 00:00:00.000', '17:00', '23:59'),
(8, 5, '2025-04-18 00:00:00.000', '17:00', '23:59'),
(9, 5, '2025-04-19 00:00:00.000', '17:00', '23:59'),
(10, 5, '2025-04-20 00:00:00.000', '17:00', '23:59'),
(11, 6, '2025-03-01 00:00:00.000', '13:00', '23:00'),
(12, 7, '2025-03-01 00:00:00.000', '13:00', '19:00'),
(13, 8, '2025-02-26 00:00:00.000', '18:00', '23:58'),
(15, 9, '2025-03-01 00:00:00.000', '18:00', '23:59');

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
(1, 'admin', 'test001@gmail.com', '$2a$10$6wddY8fHWMDBQNX6tqZpZOB2SjN8SNNpn/ZdqIDWUItSDLPYcC84K', '0000000000', 'picture-1740544540262-319515291.jpg', 1, 'admin', '2025-02-25 15:52:28.546');

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
('165c660c-5a32-425b-a143-50bd77609591', '3e3650e37c2dd4d45d21a43b0c06e842c16dddb19b6f71ce5171bb3027edc78f', '2025-02-25 15:41:38.527', '20250225154138_update_table', NULL, NULL, '2025-02-25 15:41:38.479', 1),
('535edfa8-1f2d-4532-8a46-4bfb4337c269', '0ca7f87bbb4b6fd3032ddd78ecaa98cdf616220389eafb514069bdf74faf44e1', '2025-02-25 15:41:37.458', '20250225075618_update_table', NULL, NULL, '2025-02-25 15:41:37.118', 1),
('cd65abf2-dac7-42c9-9d06-160548b300ad', 'e6d16d32f6190c84a8f29c18b0a0a044422acfe0b12e6152a53dac1b2313ff8d', '2025-02-25 15:41:37.476', '20250225101915_update_table', NULL, NULL, '2025-02-25 15:41:37.461', 1);

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
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `concert`
--
ALTER TABLE `concert`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Concert_brandId_fkey` (`brandId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `concert`
--
ALTER TABLE `concert`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `Booking_concertId_fkey` FOREIGN KEY (`concertId`) REFERENCES `concert` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Booking_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `schedule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `concert`
--
ALTER TABLE `concert`
  ADD CONSTRAINT `Concert_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brand` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `Schedule_concertId_fkey` FOREIGN KEY (`concertId`) REFERENCES `concert` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
