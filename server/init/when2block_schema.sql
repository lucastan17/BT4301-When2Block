-- Create tables
CREATE TABLE IF NOT EXISTS `when2block`.`drift` (
  `model_id` INT NOT NULL,
  `time` DATETIME NOT NULL,
  `accuracy` FLOAT NOT NULL,
  `precision` FLOAT NOT NULL,
  `recall` FLOAT NOT NULL,
  `f1_score` FLOAT NOT NULL,
  `auc` FLOAT NOT NULL,
  PRIMARY KEY (`model_id`, `time`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `when2block`.`users` (
  `user_id` INT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `admin_user` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`user_id`),
  UNIQUE (`email`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `when2block`.`check_in` (
  `user_id` INT NOT NULL,
  `checkin_date` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`, `checkin_date`),
  FOREIGN KEY (`user_id`)
    REFERENCES `when2block`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `when2block`.`results` (
  `model_id` INT NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `time` DATETIME NOT NULL,
  `weather` VARCHAR(45) NOT NULL,
  `uv_index` INT NOT NULL,
  `prediction` VARCHAR(45) NOT NULL,
  `actual` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`model_id`, `location`, `time`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `when2block`.`survey` (
  `survey_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `sunscreen_freq` VARCHAR(45) NOT NULL,
  `skin_type` VARCHAR(45) NOT NULL,
  `created_date` DATETIME NOT NULL,
  PRIMARY KEY (`survey_id`, `user_id`),
  FOREIGN KEY (`user_id`)
    REFERENCES `when2block`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Use when2block schema
USE when2block;

/*
-- Populate tables with dummy data
INSERT INTO Users (`user_id`, `name`, `email`, `password`, `created_date`)
VALUES (1, 'John', 'john@gmail.com', 'john123', NOW()),
	   (2, 'Paul', 'paul@hotmail.com', 'paul123', NOW()),
       (3, 'Alex', 'alex@gmail.com', 'alex123', NOW()),
       (4, 'Jane', 'jane@gmail.com', 'jane123', NOW());
       
INSERT INTO Survey (`survey_id`, `user_id`, `sunscreen_freq`, `skin_type`, `created_date`)
VALUES (1, 3, 'Never', 'Oily Skin', NOW()),
	   (2, 4, 'Daily', 'Dry Skin', NOW()),
       (3, 1, 'Weekly', 'Sensitive Skin', NOW()),
       (4, 2, 'Monthly', 'Normal Skin', NOW());
       
INSERT INTO Check_in (`user_id`, `checkin_date`)
VALUES (1, SUBDATE(NOW(), 5)),
	   (4, SUBDATE(NOW(), 3)),
	   (4, SUBDATE(NOW(), 2)),
       (2, SUBDATE(NOW(), 2)),
	   (4, SUBDATE(NOW(), 1)),
       (4, NOW()),
       (1, NOW());
       
INSERT INTO Drift (`model_id`, `time`, `accuracy`, `precision`, `recall`, `f1_score`, `auc`)
VALUES (1, SUBDATE(NOW(), 3), 0.85, 0.7, 0.8, 0.6, 0.75),
	   (2, SUBDATE(NOW(), 1), 0.88, 0.6, 0.8, 0.7, 0.8);
       
INSERT INTO Results (`model_id`, `location`, `time`, `weather`, `uv_index`, `prediction`, `actual`)
VALUES (1, 'Woodlands', NOW(), 'Sunny', 3, 'Wear', 'Wear'),
	   (1, 'Ang Mo Kio', NOW(), 'Cloudy', 2, 'Optional', 'Optional'),
       (1, 'Bedok', NOW(), 'Light Rain', 2, 'Optional', 'Optional');
       
*/


