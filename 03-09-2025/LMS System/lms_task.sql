-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 03, 2025 at 02:12 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms_task`
--

-- --------------------------------------------------------

--
-- Table structure for table `booktables`
--

DROP TABLE IF EXISTS `booktables`;
CREATE TABLE IF NOT EXISTS `booktables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookName` varchar(255) NOT NULL,
  `authorName` varchar(255) NOT NULL,
  `publicationName` varchar(255) DEFAULT NULL,
  `publicationYear` int NOT NULL,
  `availability` int DEFAULT NULL,
  `isbn` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `image` text,
  `references` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `booktables`
--

INSERT INTO `booktables` (`id`, `bookName`, `authorName`, `publicationName`, `publicationYear`, `availability`, `isbn`, `image`, `references`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(2, 'worldmovie', 'postman', 'arihant', 2020, 1, '9dfa5cf5-3109-4b62-ab6a-3027862c769b', NULL, 'Book added by user having id:2', '2025-09-03 08:01:06', '2025-09-03 13:04:45', NULL),
(3, 'abc', 'postman', 'arihant', 2015, 10, 'f5b2665d-7f9a-477a-b54c-b10c4c6cee73', NULL, 'Book added by admingod having id:1', '2025-09-03 08:01:18', '2025-09-03 08:01:18', '2025-09-03 10:53:51'),
(4, 'chrome browser', 'google', 'Alphabet', 2004, 96, 'adc0567c-dc82-4b48-81dd-87a3ce71c360', NULL, 'Book added by user having id:2', '2025-09-03 09:29:46', '2025-09-03 12:34:47', NULL),
(5, 'robinhood', 'Edison Wade', 'DK', 1980, 1, '77156339-d86e-4d4d-bda1-d1f9c1b0b4ff', NULL, 'Book added by user having id:2', '2025-09-03 09:35:25', '2025-09-03 12:36:07', NULL),
(6, 'robinhood- Refresh', 'Edison Wade', 'DK', 2000, 1, '731a0e63-bbcb-4e9a-9b5c-6b8fbb2a32dd', NULL, 'Book added by user having id:2', '2025-09-03 09:41:30', '2025-09-03 09:41:30', '2025-09-03 10:55:17'),
(7, 'milton the steelgod', 'milton hawkings', 'pearson', 2004, 14, '9463ba98-b4eb-4a6d-9ba8-cd356a94f156', NULL, 'Book added by user having id:2', '2025-09-03 09:46:24', '2025-09-03 12:59:34', NULL),
(8, 'milton the steelgod 2', 'milton hawkings', 'pearson', 2004, 20, 'fc943bdc-220d-43e9-92d2-b44a7ffe4a80', NULL, 'Book added by user having id:2', '2025-09-03 09:47:01', '2025-09-03 09:47:01', NULL),
(9, 'milton the steelgod 3', 'milton hawkings', 'pearson', 2004, 20, 'c4ca9465-4393-416c-b30c-34d8115490c8', NULL, 'Book added by user having id:2', '2025-09-03 09:47:49', '2025-09-03 09:47:49', NULL),
(10, 'timex the expendition', 'timeX', 'NCERT', 2005, 20, 'a6242225-8f15-49a7-a055-cbf6d93de43c', NULL, 'Book added by user having id:2', '2025-09-03 09:51:25', '2025-09-03 09:51:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userbooktables`
--

DROP TABLE IF EXISTS `userbooktables`;
CREATE TABLE IF NOT EXISTS `userbooktables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookId` int NOT NULL,
  `bookName` varchar(255) NOT NULL,
  `bookPublicationName` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  `issueDate` date DEFAULT NULL,
  `dueDate` bigint NOT NULL,
  `returned` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userbooktables`
--

INSERT INTO `userbooktables` (`id`, `bookId`, `bookName`, `bookPublicationName`, `userId`, `issueDate`, `dueDate`, `returned`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 2, 'worldmovie', 'arihant', 1, '2025-09-03', 1758113969034, 1, '2025-09-03 12:59:29', '2025-09-03 13:29:42', NULL),
(3, 2, 'worldmovie', 'arihant', 2, '2025-09-03', 1758114285454, 0, '2025-09-03 13:04:45', '2025-09-03 13:04:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usertables`
--

DROP TABLE IF EXISTS `usertables`;
CREATE TABLE IF NOT EXISTS `usertables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usertables`
--

INSERT INTO `usertables` (`id`, `name`, `email`, `phoneNumber`, `password`, `address`, `role`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'admingod', 'admin@god.com', '9874657819', '$2b$10$mO.B1CAnBp6stO/zQPVkv.zS8cYjeJU34uGXoicsH0I/GEp5WFPKS', 'india redgear', 'admin', '2025-09-03 06:51:50', '2025-09-03 06:51:50', NULL),
(2, 'user', 'user@used.com', '987465719', '$2b$10$oersjh/DWTInBoJrt8a8TuOkwh75rKgu3NiGsGptIjajXyGU6IqHy', 'india post', 'user', '2025-09-03 06:53:08', '2025-09-03 06:53:08', NULL),
(3, 'user1 ', 'user1@isused.com', '12049867', '$2b$10$1q3yVtp6L4O3enBg/iJNZ.JWnw1h.CBAUkQPH8bVmI0cvel00Y2vG', 'adm india', 'user', '2025-09-03 07:03:12', '2025-09-03 07:03:12', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
