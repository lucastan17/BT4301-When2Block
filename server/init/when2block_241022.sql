/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

USE `when2block`;

CREATE TABLE `Check_in` (
  `user_id` int NOT NULL,
  `checkin_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`checkin_date`),
  CONSTRAINT `Check_in_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Drift` (
  `model_id` int NOT NULL,
  `time` datetime NOT NULL,
  `accuracy` float NOT NULL,
  `precision` float NOT NULL,
  `recall` float NOT NULL,
  `f1_score` float NOT NULL,
  `chi_square` float NOT NULL,
  PRIMARY KEY (`model_id`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Model` (
  `model_id` int NOT NULL,
  `editedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modelName` varchar(255) NOT NULL,
  `modelVersion` varchar(255) NOT NULL,
  `modelDescription` varchar(255) NOT NULL,
  `inProduction` tinyint(1) NOT NULL,
  PRIMARY KEY (`model_id`,`editedTime`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Results` (
  `model_id` int NOT NULL,
  `location` varchar(45) NOT NULL,
  `time` datetime NOT NULL,
  `weather` varchar(255) NOT NULL,
  `uv_index` int NOT NULL,
  `prediction` int NOT NULL,
  `actual` int NOT NULL,
  PRIMARY KEY (`model_id`,`location`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Surveys` (
  `survey_id` int NOT NULL,
  `user_id` int NOT NULL,
  `sunscreen_freq` varchar(255) NOT NULL,
  `skin_type` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`survey_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Users` (
  `user_id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `admin_user` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Check_in` (`user_id`, `checkin_date`) VALUES
(1, '2022-10-15 16:20:14');
INSERT INTO `Check_in` (`user_id`, `checkin_date`) VALUES
(1, '2022-10-20 16:20:14');
INSERT INTO `Check_in` (`user_id`, `checkin_date`) VALUES
(2, '2022-10-18 16:20:14');
INSERT INTO `Check_in` (`user_id`, `checkin_date`) VALUES
(4, '2022-10-17 16:20:14'),
(4, '2022-10-18 16:20:14'),
(4, '2022-10-19 16:20:14'),
(4, '2022-10-20 16:20:14'),
(17, '2022-10-24 00:00:00'),
(18, '2022-10-30 00:00:00'),
(19, '2022-10-30 00:00:00');

INSERT INTO `Drift` (`model_id`, `time`, `accuracy`, `precision`, `recall`, `f1_score`, `chi_square`) VALUES
(1, '2022-10-15 16:20:14', 0.8, 0.6, 0.76, 0.5, 0.2);
INSERT INTO `Drift` (`model_id`, `time`, `accuracy`, `precision`, `recall`, `f1_score`, `chi_square`) VALUES
(1, '2022-10-17 16:20:14', 0.85, 0.7, 0.8, 0.6, 0.2);
INSERT INTO `Drift` (`model_id`, `time`, `accuracy`, `precision`, `recall`, `f1_score`, `chi_square`) VALUES
(1, '2022-10-20 00:00:00', 1, 1, 1, 1, 0);
INSERT INTO `Drift` (`model_id`, `time`, `accuracy`, `precision`, `recall`, `f1_score`, `chi_square`) VALUES
(2, '2022-10-18 16:20:14', 0.8, 0.7, 0.78, 0.67, 0.2),
(2, '2022-10-19 16:20:14', 0.88, 0.6, 0.8, 0.7, 0.2),
(3, '2022-10-30 16:53:38', 0.980392, 0.666667, 1, 0.8, 0.520408);

INSERT INTO `Model` (`model_id`, `editedTime`, `modelName`, `modelVersion`, `modelDescription`, `inProduction`) VALUES
(1, '2022-10-17 16:20:14', 'Model 1', 'V0.2', '5 hidden layers', 0);
INSERT INTO `Model` (`model_id`, `editedTime`, `modelName`, `modelVersion`, `modelDescription`, `inProduction`) VALUES
(2, '2022-10-19 16:20:14', 'Model 2', 'V0.5', '10 hidden layers', 0);
INSERT INTO `Model` (`model_id`, `editedTime`, `modelName`, `modelVersion`, `modelDescription`, `inProduction`) VALUES
(3, '2022-10-30 06:37:25', 'Sunscreen Model', 'v1', 'Model to predict Sunscreen Application', 1);

INSERT INTO `Results` (`model_id`, `location`, `time`, `weather`, `uv_index`, `prediction`, `actual`) VALUES
(1, 'Ang Mo Kio', '2022-10-20 16:20:14', 'Cloudy', 2, 0, 0);
INSERT INTO `Results` (`model_id`, `location`, `time`, `weather`, `uv_index`, `prediction`, `actual`) VALUES
(1, 'Bedok', '2022-10-20 16:20:14', 'Light Rain', 2, 0, 0);
INSERT INTO `Results` (`model_id`, `location`, `time`, `weather`, `uv_index`, `prediction`, `actual`) VALUES
(1, 'Woodlands', '2022-10-20 16:20:14', 'Sunny', 3, 1, 1);
INSERT INTO `Results` (`model_id`, `location`, `time`, `weather`, `uv_index`, `prediction`, `actual`) VALUES
(3, 'Ang Mo Kio', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Ang Mo Kio', '2022-10-30 14:55:40', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Ang Mo Kio', '2022-10-30 14:55:53', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Ang Mo Kio', '2022-10-30 14:55:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Ang Mo Kio', '2022-10-30 14:56:51', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Ang Mo Kio', '2022-10-30 14:57:01', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Ang Mo Kio', '2022-10-30 16:53:36', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Ang Mo Kio', '2022-10-30 19:11:49', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Bedok', '2022-10-30 14:55:20', 'Showers', 1, 0, 0),
(3, 'Bedok', '2022-10-30 14:55:40', 'Showers', 1, 0, 0),
(3, 'Bedok', '2022-10-30 14:55:53', 'Showers', 1, 0, 0),
(3, 'Bedok', '2022-10-30 14:55:55', 'Showers', 1, 0, 0),
(3, 'Bedok', '2022-10-30 14:56:51', 'Showers', 1, 0, 0),
(3, 'Bedok', '2022-10-30 14:57:01', 'Showers', 1, 0, 0),
(3, 'Bedok', '2022-10-30 16:53:36', 'Showers', 1, 0, 0),
(3, 'Bedok', '2022-10-30 19:11:49', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Bishan', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bishan', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bishan', '2022-10-30 14:55:53', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bishan', '2022-10-30 14:55:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bishan', '2022-10-30 14:56:51', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bishan', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bishan', '2022-10-30 16:53:36', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bishan', '2022-10-30 19:11:49', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Boon Lay', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Boon Lay', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Boon Lay', '2022-10-30 14:55:53', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Boon Lay', '2022-10-30 14:55:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Boon Lay', '2022-10-30 14:56:51', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Boon Lay', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Boon Lay', '2022-10-30 16:53:36', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Boon Lay', '2022-10-30 19:11:49', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Bukit Batok', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Batok', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Batok', '2022-10-30 14:55:53', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Batok', '2022-10-30 14:55:56', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Batok', '2022-10-30 14:56:51', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Batok', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Batok', '2022-10-30 16:53:36', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Batok', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Bukit Merah', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Merah', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Merah', '2022-10-30 14:55:53', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Merah', '2022-10-30 14:55:56', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Merah', '2022-10-30 14:56:51', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Merah', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Merah', '2022-10-30 16:53:36', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Merah', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Bukit Panjang', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Panjang', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Panjang', '2022-10-30 14:55:53', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Panjang', '2022-10-30 14:55:56', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Panjang', '2022-10-30 14:56:51', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Panjang', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Panjang', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Panjang', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Bukit Timah', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Timah', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Timah', '2022-10-30 14:55:53', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Timah', '2022-10-30 14:55:56', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Timah', '2022-10-30 14:56:51', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Timah', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Timah', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Bukit Timah', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Central Water Catchment', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Central Water Catchment', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Central Water Catchment', '2022-10-30 14:55:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Central Water Catchment', '2022-10-30 14:55:56', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Central Water Catchment', '2022-10-30 14:56:52', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Central Water Catchment', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Central Water Catchment', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Central Water Catchment', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Changi', '2022-10-30 14:55:20', 'Showers', 1, 0, 0),
(3, 'Changi', '2022-10-30 14:55:41', 'Showers', 1, 0, 0),
(3, 'Changi', '2022-10-30 14:55:54', 'Showers', 1, 0, 0),
(3, 'Changi', '2022-10-30 14:55:56', 'Showers', 1, 0, 0),
(3, 'Changi', '2022-10-30 14:56:52', 'Showers', 1, 0, 0),
(3, 'Changi', '2022-10-30 14:57:02', 'Showers', 1, 0, 0),
(3, 'Changi', '2022-10-30 16:53:37', 'Showers', 1, 0, 0),
(3, 'Changi', '2022-10-30 19:11:50', 'Cloudy', 1, 0, 0),
(3, 'Choa Chu Kang', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Choa Chu Kang', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Choa Chu Kang', '2022-10-30 14:55:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Choa Chu Kang', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Choa Chu Kang', '2022-10-30 14:56:52', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Choa Chu Kang', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Choa Chu Kang', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Choa Chu Kang', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'City', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'City', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'City', '2022-10-30 14:55:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'City', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'City', '2022-10-30 14:56:52', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'City', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'City', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'City', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Clementi', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Clementi', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Clementi', '2022-10-30 14:55:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Clementi', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Clementi', '2022-10-30 14:56:52', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Clementi', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Clementi', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Clementi', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Geylang', '2022-10-30 14:55:20', 'Showers', 1, 0, 0),
(3, 'Geylang', '2022-10-30 14:55:41', 'Showers', 1, 0, 0),
(3, 'Geylang', '2022-10-30 14:55:54', 'Showers', 1, 0, 0),
(3, 'Geylang', '2022-10-30 14:55:57', 'Showers', 1, 0, 0),
(3, 'Geylang', '2022-10-30 14:56:52', 'Showers', 1, 0, 0),
(3, 'Geylang', '2022-10-30 14:57:02', 'Showers', 1, 0, 0),
(3, 'Geylang', '2022-10-30 16:53:37', 'Showers', 1, 0, 0),
(3, 'Geylang', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Hougang', '2022-10-30 14:55:20', 'Showers', 1, 0, 0),
(3, 'Hougang', '2022-10-30 14:55:41', 'Showers', 1, 0, 0),
(3, 'Hougang', '2022-10-30 14:55:54', 'Showers', 1, 0, 0),
(3, 'Hougang', '2022-10-30 14:55:57', 'Showers', 1, 0, 0),
(3, 'Hougang', '2022-10-30 14:56:52', 'Showers', 1, 0, 0),
(3, 'Hougang', '2022-10-30 14:57:02', 'Showers', 1, 0, 0),
(3, 'Hougang', '2022-10-30 16:53:37', 'Showers', 1, 0, 0),
(3, 'Hougang', '2022-10-30 19:11:50', 'Cloudy', 1, 0, 0),
(3, 'Jalan Bahar', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jalan Bahar', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jalan Bahar', '2022-10-30 14:55:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jalan Bahar', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jalan Bahar', '2022-10-30 14:56:52', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jalan Bahar', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jalan Bahar', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jalan Bahar', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Jurong East', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong East', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong East', '2022-10-30 14:55:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong East', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong East', '2022-10-30 14:56:52', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong East', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong East', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong East', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Jurong Island', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong Island', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong Island', '2022-10-30 14:55:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong Island', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong Island', '2022-10-30 14:56:52', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong Island', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong Island', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong Island', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Jurong West', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong West', '2022-10-30 14:55:41', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong West', '2022-10-30 14:55:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong West', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong West', '2022-10-30 14:56:52', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong West', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong West', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Jurong West', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Kallang', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Kallang', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Kallang', '2022-10-30 14:55:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Kallang', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Kallang', '2022-10-30 14:56:52', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Kallang', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Kallang', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Kallang', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Lim Chu Kang', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Lim Chu Kang', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Lim Chu Kang', '2022-10-30 14:55:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Lim Chu Kang', '2022-10-30 14:55:58', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Lim Chu Kang', '2022-10-30 14:56:52', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Lim Chu Kang', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Lim Chu Kang', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Lim Chu Kang', '2022-10-30 19:11:50', 'Cloudy', 1, 0, 0),
(3, 'Mandai', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Mandai', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Mandai', '2022-10-30 14:55:56', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Mandai', '2022-10-30 14:55:58', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Mandai', '2022-10-30 14:56:52', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Mandai', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Mandai', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Mandai', '2022-10-30 19:11:50', 'Cloudy', 1, 0, 0),
(3, 'Marine Parade', '2022-10-30 14:55:20', 'Showers', 1, 0, 0),
(3, 'Marine Parade', '2022-10-30 14:55:42', 'Showers', 1, 0, 0),
(3, 'Marine Parade', '2022-10-30 14:55:56', 'Showers', 1, 0, 0),
(3, 'Marine Parade', '2022-10-30 14:55:58', 'Showers', 1, 0, 0),
(3, 'Marine Parade', '2022-10-30 14:56:52', 'Showers', 1, 0, 0),
(3, 'Marine Parade', '2022-10-30 14:57:02', 'Showers', 1, 0, 0),
(3, 'Marine Parade', '2022-10-30 16:53:37', 'Showers', 1, 0, 0),
(3, 'Marine Parade', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Novena', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Novena', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Novena', '2022-10-30 14:55:56', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Novena', '2022-10-30 14:55:58', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Novena', '2022-10-30 14:56:53', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Novena', '2022-10-30 14:57:02', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Novena', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Novena', '2022-10-30 19:11:50', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Pasir Ris', '2022-10-30 14:55:20', 'Showers', 1, 0, 0),
(3, 'Pasir Ris', '2022-10-30 14:55:42', 'Showers', 1, 0, 0),
(3, 'Pasir Ris', '2022-10-30 14:55:56', 'Showers', 1, 0, 0),
(3, 'Pasir Ris', '2022-10-30 14:55:58', 'Showers', 1, 0, 0),
(3, 'Pasir Ris', '2022-10-30 14:56:53', 'Showers', 1, 0, 0),
(3, 'Pasir Ris', '2022-10-30 14:57:02', 'Showers', 1, 0, 0),
(3, 'Pasir Ris', '2022-10-30 16:53:37', 'Showers', 1, 0, 0),
(3, 'Pasir Ris', '2022-10-30 19:11:50', 'Cloudy', 1, 0, 0),
(3, 'Paya Lebar', '2022-10-30 14:55:20', 'Showers', 1, 0, 0),
(3, 'Paya Lebar', '2022-10-30 14:55:42', 'Showers', 1, 0, 0),
(3, 'Paya Lebar', '2022-10-30 14:55:56', 'Showers', 1, 0, 0),
(3, 'Paya Lebar', '2022-10-30 14:55:58', 'Showers', 1, 0, 0),
(3, 'Paya Lebar', '2022-10-30 14:56:53', 'Showers', 1, 0, 0),
(3, 'Paya Lebar', '2022-10-30 14:57:02', 'Showers', 1, 0, 0),
(3, 'Paya Lebar', '2022-10-30 16:53:37', 'Showers', 1, 0, 0),
(3, 'Paya Lebar', '2022-10-30 19:11:51', 'Cloudy', 1, 0, 0),
(3, 'Pioneer', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Pioneer', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Pioneer', '2022-10-30 14:55:56', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Pioneer', '2022-10-30 14:55:59', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Pioneer', '2022-10-30 14:56:53', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Pioneer', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Pioneer', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Pioneer', '2022-10-30 19:11:51', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Pulau Tekong', '2022-10-30 14:55:20', 'Showers', 1, 0, 0),
(3, 'Pulau Tekong', '2022-10-30 14:55:42', 'Showers', 1, 0, 0),
(3, 'Pulau Tekong', '2022-10-30 14:55:56', 'Showers', 1, 0, 0),
(3, 'Pulau Tekong', '2022-10-30 14:55:59', 'Showers', 1, 0, 0),
(3, 'Pulau Tekong', '2022-10-30 14:56:53', 'Showers', 1, 0, 0),
(3, 'Pulau Tekong', '2022-10-30 14:57:03', 'Showers', 1, 0, 0),
(3, 'Pulau Tekong', '2022-10-30 16:53:37', 'Showers', 1, 0, 0),
(3, 'Pulau Tekong', '2022-10-30 19:11:51', 'Cloudy', 1, 0, 0),
(3, 'Pulau Ubin', '2022-10-30 14:55:20', 'Showers', 1, 0, 0),
(3, 'Pulau Ubin', '2022-10-30 14:55:42', 'Showers', 1, 0, 0),
(3, 'Pulau Ubin', '2022-10-30 14:55:57', 'Showers', 1, 0, 0),
(3, 'Pulau Ubin', '2022-10-30 14:55:59', 'Showers', 1, 0, 0),
(3, 'Pulau Ubin', '2022-10-30 14:56:53', 'Showers', 1, 0, 0),
(3, 'Pulau Ubin', '2022-10-30 14:57:03', 'Showers', 1, 0, 0);
INSERT INTO `Results` (`model_id`, `location`, `time`, `weather`, `uv_index`, `prediction`, `actual`) VALUES
(3, 'Pulau Ubin', '2022-10-30 16:53:37', 'Showers', 1, 0, 0),
(3, 'Pulau Ubin', '2022-10-30 19:11:51', 'Cloudy', 1, 0, 0),
(3, 'Punggol', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Punggol', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Punggol', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Punggol', '2022-10-30 14:55:59', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Punggol', '2022-10-30 14:56:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Punggol', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Punggol', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Punggol', '2022-10-30 19:11:51', 'Cloudy', 1, 0, 0),
(3, 'Queenstown', '2022-10-30 14:55:20', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Queenstown', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Queenstown', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Queenstown', '2022-10-30 14:55:59', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Queenstown', '2022-10-30 14:56:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Queenstown', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Queenstown', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Queenstown', '2022-10-30 19:11:51', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Seletar', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Seletar', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Seletar', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Seletar', '2022-10-30 14:55:59', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Seletar', '2022-10-30 14:56:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Seletar', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Seletar', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Seletar', '2022-10-30 19:11:51', 'Cloudy', 1, 0, 0),
(3, 'Sembawang', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sembawang', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sembawang', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sembawang', '2022-10-30 14:56:00', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sembawang', '2022-10-30 14:56:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sembawang', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sembawang', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sembawang', '2022-10-30 19:11:51', 'Cloudy', 1, 0, 0),
(3, 'Sengkang', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sengkang', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sengkang', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sengkang', '2022-10-30 14:56:00', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sengkang', '2022-10-30 14:56:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sengkang', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sengkang', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sengkang', '2022-10-30 19:11:51', 'Cloudy', 1, 0, 0),
(3, 'Sentosa', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sentosa', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sentosa', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sentosa', '2022-10-30 14:56:00', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sentosa', '2022-10-30 14:56:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sentosa', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sentosa', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sentosa', '2022-10-30 19:11:52', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Serangoon', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Serangoon', '2022-10-30 14:55:42', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Serangoon', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Serangoon', '2022-10-30 14:56:00', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Serangoon', '2022-10-30 14:56:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Serangoon', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Serangoon', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Serangoon', '2022-10-30 19:11:52', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Southern Islands', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Southern Islands', '2022-10-30 14:55:43', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Southern Islands', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Southern Islands', '2022-10-30 14:56:00', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Southern Islands', '2022-10-30 14:56:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Southern Islands', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Southern Islands', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Southern Islands', '2022-10-30 19:11:52', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Sungei Kadut', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sungei Kadut', '2022-10-30 14:55:43', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sungei Kadut', '2022-10-30 14:55:57', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sungei Kadut', '2022-10-30 14:56:00', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sungei Kadut', '2022-10-30 14:56:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sungei Kadut', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sungei Kadut', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Sungei Kadut', '2022-10-30 19:11:52', 'Cloudy', 1, 0, 0),
(3, 'Tampines', '2022-10-30 14:55:21', 'Showers', 1, 0, 0),
(3, 'Tampines', '2022-10-30 14:55:43', 'Showers', 1, 0, 0),
(3, 'Tampines', '2022-10-30 14:55:58', 'Showers', 1, 0, 0),
(3, 'Tampines', '2022-10-30 14:56:00', 'Showers', 1, 0, 0),
(3, 'Tampines', '2022-10-30 14:56:54', 'Showers', 1, 0, 0),
(3, 'Tampines', '2022-10-30 14:57:03', 'Showers', 1, 0, 0),
(3, 'Tampines', '2022-10-30 16:53:37', 'Showers', 1, 0, 0),
(3, 'Tampines', '2022-10-30 19:11:52', 'Cloudy', 1, 0, 0),
(3, 'Tanglin', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tanglin', '2022-10-30 14:55:43', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tanglin', '2022-10-30 14:55:58', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tanglin', '2022-10-30 14:56:00', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tanglin', '2022-10-30 14:56:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tanglin', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tanglin', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tanglin', '2022-10-30 19:11:52', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Tengah', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tengah', '2022-10-30 14:55:43', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tengah', '2022-10-30 14:55:58', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tengah', '2022-10-30 14:56:00', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tengah', '2022-10-30 14:56:54', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tengah', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tengah', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tengah', '2022-10-30 19:11:52', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Toa Payoh', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Toa Payoh', '2022-10-30 14:55:43', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Toa Payoh', '2022-10-30 14:55:58', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Toa Payoh', '2022-10-30 14:56:00', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Toa Payoh', '2022-10-30 14:56:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Toa Payoh', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Toa Payoh', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Toa Payoh', '2022-10-30 19:11:52', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Tuas', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tuas', '2022-10-30 14:55:43', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tuas', '2022-10-30 14:55:58', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tuas', '2022-10-30 14:56:01', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tuas', '2022-10-30 14:56:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tuas', '2022-10-30 14:57:03', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tuas', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Tuas', '2022-10-30 19:11:52', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Western Islands', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Islands', '2022-10-30 14:55:43', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Islands', '2022-10-30 14:55:58', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Islands', '2022-10-30 14:56:01', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Islands', '2022-10-30 14:56:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Islands', '2022-10-30 14:57:04', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Islands', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Islands', '2022-10-30 19:11:52', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Western Water Catchment', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Water Catchment', '2022-10-30 14:55:43', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Water Catchment', '2022-10-30 14:55:58', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Water Catchment', '2022-10-30 14:56:01', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Water Catchment', '2022-10-30 14:56:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Water Catchment', '2022-10-30 14:57:04', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Water Catchment', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Western Water Catchment', '2022-10-30 19:11:52', 'Partly Cloudy (Night)', 1, 0, 0),
(3, 'Woodlands', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Woodlands', '2022-10-30 14:55:44', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Woodlands', '2022-10-30 14:55:59', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Woodlands', '2022-10-30 14:56:01', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Woodlands', '2022-10-30 14:56:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Woodlands', '2022-10-30 14:57:04', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Woodlands', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Woodlands', '2022-10-30 19:11:52', 'Cloudy', 1, 0, 0),
(3, 'Yishun', '2022-10-30 14:55:21', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Yishun', '2022-10-30 14:55:44', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Yishun', '2022-10-30 14:55:59', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Yishun', '2022-10-30 14:56:01', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Yishun', '2022-10-30 14:56:55', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Yishun', '2022-10-30 14:57:04', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Yishun', '2022-10-30 16:53:37', 'Partly Cloudy (Day)', 1, 0, 0),
(3, 'Yishun', '2022-10-30 19:11:53', 'Cloudy', 1, 0, 0);

INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(1, 5, 'monthly', 'dry', '2022-10-09 09:06:55', '2022-10-09 09:06:55');
INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(2, 5, 'weekly', 'normal', '2022-10-09 09:10:57', '2022-10-09 09:10:57');
INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(3, 5, 'monthly', 'oily', '2022-10-09 09:17:21', '2022-10-09 09:17:21');
INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(4, 5, 'weekly', 'combination', '2022-10-10 01:52:54', '2022-10-10 01:52:54'),
(5, 5, 'monthly', 'combination', '2022-10-11 13:06:01', '2022-10-11 13:06:01'),
(6, 12, 'monthly', 'dry', '2022-10-15 15:05:07', '2022-10-15 15:05:07'),
(7, 14, 'weekly', 'normal', '2022-10-15 15:57:02', '2022-10-15 15:57:02'),
(8, 15, 'weekly', 'oily', '2022-10-15 16:01:26', '2022-10-15 16:01:26'),
(9, 16, 'daily', 'combination', '2022-10-15 16:17:56', '2022-10-15 16:17:56'),
(10, 17, 'weekly', 'combination', '2022-10-24 09:48:04', '2022-10-24 09:48:04'),
(11, 18, 'daily', 'dry', '2022-10-30 06:17:48', '2022-10-30 06:17:48'),
(12, 19, 'monthly', 'oily', '2022-10-30 10:29:04', '2022-10-30 10:29:04');

INSERT INTO `Users` (`user_id`, `username`, `email`, `password`, `createdAt`, `updatedAt`, `admin_user`) VALUES
(1, 'test', 'test@gmail.com', '123', '2022-10-08 16:13:25', '2022-10-08 16:13:25', 0);
INSERT INTO `Users` (`user_id`, `username`, `email`, `password`, `createdAt`, `updatedAt`, `admin_user`) VALUES
(2, 'test2', 'test2@gmail.com', '123', '2022-10-08 16:38:36', '2022-10-08 16:38:36', 0);
INSERT INTO `Users` (`user_id`, `username`, `email`, `password`, `createdAt`, `updatedAt`, `admin_user`) VALUES
(3, 'alex', 'alex@gmail.com', 'alex123', '2022-10-08 16:39:16', '2022-10-08 16:39:16', 0);
INSERT INTO `Users` (`user_id`, `username`, `email`, `password`, `createdAt`, `updatedAt`, `admin_user`) VALUES
(4, 'ben', 'ben@gmail.com', 'ben10', '2022-10-08 16:49:36', '2022-10-08 16:49:36', 0),
(5, 'celine', 'celine@hotmail.com', 'celine123', '2022-10-08 17:02:52', '2022-10-08 17:02:52', 0),
(6, 'damian', 'damian@hotmail.com', 'damian123', '2022-10-08 17:05:23', '2022-10-08 17:05:23', 0),
(7, 'ernie', 'ernie@gmail.com', 'ernie123', '2022-10-09 09:06:47', '2022-10-09 09:06:47', 0),
(8, 'faith', 'faith@hotmail.com', 'faith123', '2022-10-09 09:10:50', '2022-10-09 09:10:50', 0),
(9, 'george', 'george@hotmail.com', '123', '2022-10-09 09:17:16', '2022-10-09 09:17:16', 0),
(10, 'hana', 'hana@hotmail.com', 'hana123', '2022-10-10 01:52:33', '2022-10-10 01:52:33', 0),
(11, 'test3', 'test3@gmail.com', 'test1234', '2022-10-11 13:05:57', '2022-10-11 13:05:57', 0),
(12, 'test4', 'test4@gmail.com', '$2b$10$l6MTuT9a5jha7hZQgogYne1fCVfYGdnrZ09w8DfvIFQAgH9KCLK7m', '2022-10-15 15:04:59', '2022-10-15 15:04:59', 0),
(13, 'test5', 'test5@gmail.com', '$2b$10$1/SQ9wQMV7J1CnTbGyJDW.vZQdctndoSPLM63bUmAi50Y9glHjemS', '2022-10-15 15:56:56', '2022-10-15 15:56:56', 0),
(14, 'test6', 'test6@gmail.com', '$2b$10$KsaimtkRLIlmBGqt5Gys6eCJd40X6dtgdMWWCfNzjnpuuIVMumtRW', '2022-10-15 16:01:20', '2022-10-15 16:01:20', 0),
(15, 'test7', 'test7@gmail.com', '$2b$10$K6RDLLwbdmJovrM.qKuHJu/PQeBaUctGfwnKJ.g9yAkpxYdkBlLzq', '2022-10-15 16:17:47', '2022-10-15 16:17:47', 0),
(16, 'admin1', 'admin123@gmail.com', '$2b$10$uvF4ccv643XP2wg29Z8OEeMJZvk28jR8VzciL90x2Ty6mOK4soIsW', '2022-10-20 16:37:37', '2022-10-20 16:37:37', 1),
(17, 'test8', 'test8@gmail.com', '$2b$10$7rw6qe6GkVn3jfOQ.s9my.onZ2R5JWrcAGgF/ebxDZ48bQMNFiQvS', '2022-10-24 09:47:58', '2022-10-24 09:47:58', 0),
(18, 'test9', 'test9@gmail.com', '$2b$10$yjTHp1yI1mxGbCp9Aj2PVuwWirOU4dhalERHs5QaYQjcvF.F4D0Tq', '2022-10-30 06:15:02', '2022-10-30 06:15:02', 0),
(19, 'test10', 'test10@gmail.com', '$2b$10$JfOuXaVzoV.Jf2zpv/KjAeuUMWe/z/489AOISdR9lIPilViNWAZhe', '2022-10-30 10:28:56', '2022-10-30 10:28:56', 0);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;