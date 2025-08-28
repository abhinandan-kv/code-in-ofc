-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 27, 2025 at 01:40 PM
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
-- Database: `ecommerce_task`
--

-- --------------------------------------------------------

--
-- Table structure for table `vendorproducts`
--

DROP TABLE IF EXISTS `vendorproducts`;
CREATE TABLE IF NOT EXISTS `vendorproducts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendorId` int NOT NULL,
  `vendorName` varchar(255) NOT NULL,
  `vendorProductDescription` varchar(255) NOT NULL,
  `vendorProductImages` text NOT NULL,
  `vendorAvgDeliveryTime` varchar(255) NOT NULL,
  `vendorProductName` varchar(255) NOT NULL,
  `vendorProductPrice` int NOT NULL,
  `vendorProductSpecifications` varchar(255) NOT NULL,
  `vendorProductStock` int NOT NULL,
  `vendorProductUUID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `vendorProductCategory` varchar(255) DEFAULT 'misc',
  `vendorProductSubCategory` varchar(255) DEFAULT 'others',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `VendorProducts_productId_foreign_idx` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vendorproducts`
--

INSERT INTO `vendorproducts` (`id`, `vendorId`, `vendorName`, `vendorProductDescription`, `vendorProductImages`, `vendorAvgDeliveryTime`, `vendorProductName`, `vendorProductPrice`, `vendorProductSpecifications`, `vendorProductStock`, `vendorProductUUID`, `vendorProductCategory`, `vendorProductSubCategory`, `createdAt`, `updatedAt`, `deletedAt`, `productId`) VALUES
(15, 8, 'vendor1', 'Nike, Inc., is one of the largest and best-recognized global sports and athleticwear brands. Its extensive lineup includes its long-running Air Jordan, Air Force 1, and other “Air” models.', '\"[\\\"vendor8/products/1756102449887-xavier-teo-SxAXphIPWeg-unsplash.jpg\\\",\\\"vendor8/products/1756102449889-andres-jasso-PqbL_mxmaUE-unsplash.jpg\\\",\\\"vendor8/products/1756102449890-domino-studio-164_6wVEHfI-unsplash.jpg\\\"]\"', '2', 'Nike Shoes', 2000, 'Features like Air Max cushioning and React foam make Nike shoes not only stylish but also some of the most comfortable Nike shoes available. These innovations reduce impact during movement, ensuring a smoother, more enjoyable experience for wearers.', 19, '2778f283-c576-4466-afdd-621a4095279b', '1', '1', '2025-08-25 06:14:09', '2025-08-25 11:56:53', NULL, NULL),
(16, 8, 'vendor1', 'The Maruti 800 was an iconic Indian hatchback known for its 796cc, 3-cylinder engine, lightweight design, and compact, 5-seater body that made it easy to maneuver in city traffic. ', '\"[\\\"vendor8/products/1756103325904-imagesasd.jpg\\\",\\\"vendor8/products/1756103325904-imagesa.jpg\\\",\\\"vendor8/products/1756103325904-images.jpg\\\"]\"', '10', 'Maruti 800', 10000, 'A 796cc, 3-cylinder petrol engine was the heart of the Maruti 800, known for its responsiveness and reliability.', 0, '5cda3acf-0d82-449a-b802-1ecb16640e52', '1', '1', '2025-08-25 06:28:45', '2025-08-25 11:58:34', NULL, NULL),
(17, 8, 'vendor1', 'qwe', '\"[\\\"vendor8/products/1756107965392-domino-studio-164_6wVEHfI-unsplash.jpg\\\"]\"', '100', 'shoes nike', 9000, 'qweee', 0, '8dd3451d-aee5-42a5-ac60-85a331b5c027', '1', '1', '2025-08-25 07:46:05', '2025-08-25 11:59:27', NULL, NULL),
(18, 8, 'vendor1', 'supercar ', '\"[\\\"vendor8/products/1756109605813-zan-lazarevic-1BWBiUUT-AA-unsplash.jpg\\\",\\\"vendor8/products/1756109605816-imagesa.jpg\\\"]\"', '365', 'BMW 800', 200000, 'light speed', 1, '91fb9156-312c-4363-ace7-7935360a5d81', '1', '1', '2025-08-25 08:13:25', '2025-08-25 08:13:25', NULL, NULL),
(19, 8, 'vendor1', 'Best monitors.', '\"[\\\"vendor8/products/1756125231530-linus-mimietz-01hQvBUC7rI-unsplash.jpg\\\",\\\"vendor8/products/1756125231536-polina-kuzovkova-M9-dSG3Iswg-unsplash.jpg\\\",\\\"vendor8/products/1756125231538-fernando-hernandez-lVuV7AcfOrY-unsplash.jpg\\\",\\\"vendor8/products/1756125231538-linus-mimietz-gvptKmonylk-unsplash.jpg\\\",\\\"vendor8/products/1756125231540-kitai-zhvaeh-R9rA-unsplash.jpg\\\"]\"', '2', 'Benq Monitor', 1000, '100sRGB rating, ultra bright.', 150, '27aa656a-2e1e-4f6b-b465-3f18fab34811', '2', '3', '2025-08-25 12:33:51', '2025-08-25 12:33:51', NULL, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `vendorproducts`
--
ALTER TABLE `vendorproducts`
  ADD CONSTRAINT `VendorProducts_productId_foreign_idx` FOREIGN KEY (`productId`) REFERENCES `varientproducts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
