/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

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
  `auc` float NOT NULL,
  PRIMARY KEY (`model_id`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Results` (
  `model_id` int NOT NULL,
  `location` varchar(45) NOT NULL,
  `time` datetime NOT NULL,
  `weather` varchar(255) NOT NULL,
  `uv_index` int NOT NULL,
  `prediction` varchar(255) NOT NULL,
  `actual` varchar(255) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `admin_user` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;







INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(1, 5, 'monthly', 'dry', '2022-10-09 09:06:55', '2022-10-09 09:06:55');
INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(2, 5, 'weekly', 'normal', '2022-10-09 09:10:57', '2022-10-09 09:10:57');
INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(3, 5, 'monthly', 'oily', '2022-10-09 09:17:21', '2022-10-09 09:17:21');
INSERT INTO `Surveys` (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `createdAt`, `updatedAt`) VALUES
(4, 5, 'weekly', 'combination', '2022-10-10 01:52:54', '2022-10-10 01:52:54'),
(5, 5, 'monthly', 'combination', '2022-10-11 13:06:01', '2022-10-11 13:06:01');

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
(16, 'test3', 'test3@gmail.com', 'test1234', '2022-10-11 13:05:57', '2022-10-11 13:05:57', 0);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;