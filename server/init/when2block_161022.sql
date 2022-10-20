/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE `when2block`;

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
  `predict_proba` float NOT NULL,
  PRIMARY KEY (`model_id`,`location`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Surveys` (
  `survey_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `sunscreen_freq` varchar(255) NOT NULL,
  `skin_type` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`survey_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `admin_user` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;


-- INSERT DATA

INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(1, 5, 'monthly', 'dry', '2022-10-09 09:06:55', '2022-10-09 09:06:55');
INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(2, 5, 'weekly', 'normal', '2022-10-09 09:10:57', '2022-10-09 09:10:57');
INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(3, 5, 'monthly', 'oily', '2022-10-09 09:17:21', '2022-10-09 09:17:21');
INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(4, 5, 'weekly', 'combination', '2022-10-10 01:52:54', '2022-10-10 01:52:54'),
(5, 5, 'monthly', 'combination', '2022-10-11 13:06:01', '2022-10-11 13:06:01'),
(6, 17, 'monthly', 'dry', '2022-10-15 15:05:07', '2022-10-15 15:05:07'),
(7, 18, 'weekly', 'normal', '2022-10-15 15:57:02', '2022-10-15 15:57:02'),
(8, 19, 'weekly', 'oily', '2022-10-15 16:01:26', '2022-10-15 16:01:26'),
(9, 20, 'daily', 'combination', '2022-10-15 16:17:56', '2022-10-15 16:17:56');

INSERT INTO `Users` (`user_id`, `username`, `email`, `password`, `createdAt`, `updatedAt`, `admin_user`) VALUES
(1, 'test', 'test@gmail.com', '123', '2022-10-08 16:13:25', '2022-10-08 16:13:25', 0);
INSERT INTO `Users` (`user_id`, `username`, `email`, `password`, `createdAt`, `updatedAt`, `admin_user`) VALUES
(6, 'test2', 'test2@gmail.com', '123', '2022-10-08 16:38:36', '2022-10-08 16:38:36', 0);
INSERT INTO `Users` (`user_id`, `username`, `email`, `password`, `createdAt`, `updatedAt`, `admin_user`) VALUES
(7, 'alex', 'alex@gmail.com', 'alex123', '2022-10-08 16:39:16', '2022-10-08 16:39:16', 0);
INSERT INTO `Users` (`user_id`, `username`, `email`, `password`, `createdAt`, `updatedAt`, `admin_user`) VALUES
(8, 'ben', 'ben@gmail.com', 'ben10', '2022-10-08 16:49:36', '2022-10-08 16:49:36', 0),
(9, 'celine', 'celine@hotmail.com', 'celine123', '2022-10-08 17:02:52', '2022-10-08 17:02:52', 0),
(10, 'damian', 'damian@hotmail.com', 'damian123', '2022-10-08 17:05:23', '2022-10-08 17:05:23', 0),
(11, 'ernie', 'ernie@gmail.com', 'ernie123', '2022-10-09 09:06:47', '2022-10-09 09:06:47', 0),
(12, 'faith', 'faith@hotmail.com', 'faith123', '2022-10-09 09:10:50', '2022-10-09 09:10:50', 0),
(13, 'george', 'george@hotmail.com', '123', '2022-10-09 09:17:16', '2022-10-09 09:17:16', 0),
(14, 'hana', 'hana@hotmail.com', 'hana123', '2022-10-10 01:52:33', '2022-10-10 01:52:33', 0),
(16, 'test3', 'test3@gmail.com', 'test1234', '2022-10-11 13:05:57', '2022-10-11 13:05:57', 0),
(17, 'test4', 'test4@gmail.com', '$2b$10$l6MTuT9a5jha7hZQgogYne1fCVfYGdnrZ09w8DfvIFQAgH9KCLK7m', '2022-10-15 15:04:59', '2022-10-15 15:04:59', 0),
(18, 'test5', 'test5@gmail.com', '$2b$10$1/SQ9wQMV7J1CnTbGyJDW.vZQdctndoSPLM63bUmAi50Y9glHjemS', '2022-10-15 15:56:56', '2022-10-15 15:56:56', 0),
(19, 'test6', 'test6@gmail.com', '$2b$10$KsaimtkRLIlmBGqt5Gys6eCJd40X6dtgdMWWCfNzjnpuuIVMumtRW', '2022-10-15 16:01:20', '2022-10-15 16:01:20', 0),
(20, 'test7', 'test7@gmail.com', '$2b$10$K6RDLLwbdmJovrM.qKuHJu/PQeBaUctGfwnKJ.g9yAkpxYdkBlLzq', '2022-10-15 16:17:47', '2022-10-15 16:17:47', 0);

INSERT INTO Check_in (`user_id`, `checkin_date`)
VALUES (1, SUBDATE(NOW(), 5)),
	   (4, SUBDATE(NOW(), 3)),
	   (4, SUBDATE(NOW(), 2)),
       (2, SUBDATE(NOW(), 2)),
	   (4, SUBDATE(NOW(), 1)),
       (4, NOW()),
       (1, NOW());
       
INSERT INTO Drift (`model_id`, `time`, `accuracy`, `precision`, `recall`, `f1_score`)
VALUES (1, SUBDATE(NOW(), 5), 0.85, 0.7, 0.8, 0.6),
	   (2, SUBDATE(NOW(), 2), 0.88, 0.6, 0.8, 0.7),
     (1, SUBDATE(NOW(), 3), 0.85, 0.7, 0.8, 0.6),
	   (2, SUBDATE(NOW(), 1), 0.88, 0.6, 0.8, 0.7);
	   
INSERT INTO Model (`model_id`, `editedTime`, `modelName`, `modelVersion`, `modelDescription`, `inProduction`)
VALUES (1, SUBDATE(NOW(), 3), 'Model 1', 'V0.2', '5 hidden layers', false), 
      (2, SUBDATE(NOW(), 1), 'Model 2', 'V0.5', '10 hidden layers', true);

INSERT INTO Results (`model_id`, `location`, `time`, `weather`, `uv_index`, `prediction`, `actual`, `predict_proba`)
VALUES (1, 'Woodlands', NOW(), 'Sunny', 3, 1, 1, 0.8),
	   (1, 'Ang Mo Kio', NOW(), 'Cloudy', 2, 0, 0, 0.7),
       (1, 'Bedok', NOW(), 'Light Rain', 2, 0, 0, 0.77);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;