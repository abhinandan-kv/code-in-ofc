-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 08, 2025 at 01:05 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `eventtables`
--

DROP TABLE IF EXISTS `eventtables`;
CREATE TABLE
IF NOT EXISTS `eventtables`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `eventName` varchar
(255) NOT NULL,
  `oranizerName` varchar
(255) NOT NULL,
  `timeSlot` varchar
(255) DEFAULT NULL,
  `eventDate` varchar
(255) NOT NULL,
  `price` int DEFAULT '1',
  `ticketLimit` int DEFAULT '10',
  `saleEndDate` varchar
(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `eventtables`
--

INSERT INTO `eventtables` (`
id`,
`eventName`,
`oranizerName
`, `timeSlot`, `eventDate`, `price`, `ticketLimit`, `saleEndDate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'date event', 'lg', '9am-12pm', '10-08-2025', 100, 5, NULL, '2025-08-08 12:27:48', '2025-08-08 12:27:48', NULL),
(2, 'sec event', 'lg', '9am-12pm', '10-08-2025', 100, 5, NULL, '2025-08-08 12:27:51', '2025-08-08 12:27:51', NULL),
(3, 'sec event', 'lg', '9am-12pm', '10-08-2025', 100, 5, NULL, '2025-08-08 12:31:15', '2025-08-08 12:31:15', NULL),
(4, 'third event', 'lg', '9am-12pm', '08-10-2025', 100, 5, NULL, '2025-08-08 12:33:36', '2025-08-08 12:33:36', NULL),
(5, 'third event', 'lg', '9am-12pm', '08-09-2025', 100, 5, NULL, '2025-08-08 12:37:14', '2025-08-08 12:37:14', NULL),
(6, 'sixth event', 'lg,Benq', '1. 9am-12pm, 2. 3pm-6pm', '08-09-2025', 100, 5, NULL, '2025-08-08 12:42:49', '2025-08-08 12:55:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usertables`
--

DROP TABLE IF EXISTS `usertables`;
CREATE TABLE
IF NOT EXISTS `usertables`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar
(255) NOT NULL,
  `email` varchar
(255) NOT NULL,
  `hashedPassword` varchar
(255) NOT NULL,
  `role` enum
('Admin','Organizer','User') DEFAULT 'User',
  `ticketBooked` varchar
(255) DEFAULT NULL,
  `ticketTimeSlot` int DEFAULT NULL,
  `bookingStatus` tinyint
(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usertables`
--

INSERT INTO `usertables` (`
id`,
`name`,
`email
`, `hashedPassword`, `role`, `ticketBooked`, `ticketTimeSlot`, `bookingStatus`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'user2', 'user2@g.com', '$2b$10$JjAQhYQXv1Me8pl7ungdhu7RY39VKVf6eTLCRLTb/NdrGfdB1NvN2', 'User', NULL, NULL, NULL, '2025-08-08 12:40:31', '2025-08-08 12:40:31', NULL),
(2, 'user1', 'user1@g.com', '$2b$10$Du6iq0KNi6ZXOY/j6SHcYuAF14kdWeeJaQnBsQUtGfwWVawO83zWC', 'User', '6', 2, 1, '2025-08-08 12:40:42', '2025-08-08 12:50:07', NULL),
(3, 'admin', "admin@god.com", "$$Du6iq0KNi6ZXOY/j6SHcYuAF14kdWeeJaQnBsQUtGfwWVawO8u6iq0K", 'Admin', '2', 1, 1,'2025-08-08 12:40:42', '2025-08-08 12:50:07', NULL ),
(4, 'organ', "organ@org.com", "$$Du6iq0KNi6ZXOY/j6SHcYuAF14kdWeeJaQnBsQUtGfwWVawO8u6idfwm", 'Organizer', '2', 1, 1,'2025-08-08 12:40:42', '2025-08-08 12:50:07', NULL )

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
