DROP SCHEMA IF EXISTS `magic_post`;
CREATE SCHEMA `magic_post`;
USE `magic_post`;

CREATE TABLE `admin`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role` ENUM('ADMIN', 'TRANSACTION_ADMIN', 'COLLECTION_ADMIN', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` INT UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `collection`(
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `zip_code` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `admin_id` INT UNSIGNED,
    `address` TEXT NOT NULL,
    UNIQUE(`name`),
    UNIQUE(`admin_id`),
    UNIQUE(`zip_code`),
    FOREIGN KEY(`admin_id`) REFERENCES `admin`(`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `transaction`(
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `zip_code` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `collection_zip_code` VARCHAR(255),
    `admin_id` INT UNSIGNED,
    `address` TEXT NOT NULL,
    UNIQUE(`name`),
	UNIQUE(`admin_id`),
    UNIQUE(`zip_code`),
    FOREIGN KEY(`admin_id`) REFERENCES `admin`(`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY(`collection_zip_code`) REFERENCES `collection`(`zip_code`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `staff`(
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `staff_id` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` INT UNSIGNED NOT NULL,
    `transaction_zip_code` VARCHAR(255) NULL,
    `collection_zip_code` VARCHAR(255) NULL,
    FOREIGN KEY(`transaction_zip_code`) REFERENCES `transaction`(`zip_code`)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY(`collection_zip_code`) REFERENCES `collection`(`zip_code`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `parcels`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `status` VARCHAR(255) NOT NULL,
    `weight` DOUBLE NOT NULL,
    `sender_name` VARCHAR(255) NOT NULL,
    `sender_phone` SMALLINT NOT NULL,
    `from` VARCHAR(255) NOT NULL,
    `receiver_name` VARCHAR(255) NOT NULL,
    `receiver_phone` SMALLINT NOT NULL,
    `to` VARCHAR(255) NOT NULL,
    `type` ENUM('') NOT NULL,
    `sender_zip_code` VARCHAR(255) NOT NULL,
    `receiver_zip_code` VARCHAR(255) NULL,
    `cost` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    
CREATE TABLE `track_history`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `from` VARCHAR(255) NOT NULL,
    `to` VARCHAR(255) NOT NULL,
    `sender_name` VARCHAR(255) NOT NULL,
    `sender_time` VARCHAR(255) NOT NULL,
    `receiver_name` VARCHAR(255) NOT NULL,
    `received_time` DATETIME NOT NULL,
    `shipper_name` VARCHAR(255) NOT NULL,
    `shipper_phone` INT UNSIGNED NOT NULL,
    `parcel_ID` INT UNSIGNED NOT NULL,
    `status` ENUM('') NOT NULL,
    FOREIGN KEY(`parcel_ID`) REFERENCES `parcels`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TRIGGER
DELIMITER $$
CREATE TRIGGER `add_zip_code_transaction` BEFORE INSERT ON `transaction` FOR EACH ROW
BEGIN
    DECLARE t_id int;
    SELECT auto_increment INTO t_id
    FROM information_schema.tables
    WHERE table_name = 'transaction';

    SET NEW.zip_code = CONCAT('T', LPAD(t_id, 5, '0'));
END$$

CREATE TRIGGER `add_zip_code_collection` BEFORE INSERT ON `collection` FOR EACH ROW
BEGIN
    DECLARE c_id int;
    SELECT auto_increment INTO c_id
    FROM information_schema.tables
    WHERE table_name = 'collection';

    SET NEW.zip_code = CONCAT('C', LPAD(c_id, 5, '0'));
END$$

CREATE TRIGGER `update_collection_admin_role`
AFTER UPDATE ON `collection`
FOR EACH ROW
BEGIN
  IF NEW.admin_id != OLD.admin_id THEN
    UPDATE admin
    SET role = 'PENDING'
    WHERE id = OLD.admin_id;
  END IF;
END$$

CREATE TRIGGER `update_transaction_admin_role`
AFTER UPDATE ON `transaction`
FOR EACH ROW
BEGIN
  IF NEW.admin_id != OLD.admin_id THEN
    UPDATE admin
    SET role = 'PENDING'
    WHERE id = OLD.admin_id;
  END IF;
END$$

CREATE TRIGGER `add_id_staff` BEFORE INSERT ON `staff` FOR EACH ROW
BEGIN
    DECLARE t_id int;
    SELECT auto_increment INTO t_id
    FROM information_schema.tables
    WHERE table_name = 'staff';

    SET NEW.staff_id = CONCAT('S', LPAD(t_id, 5, '0'));
END$$
DELIMITER ;

-- DATA 
START TRANSACTION;

INSERT INTO `admin`(`role`, `username`, `password`, `phone`) VALUES
('ADMIN', 'admin', 'admin', 123456789),
('TRANSACTION_ADMIN', 'transaction_admin', 'transaction_admin', 123456789),
('COLLECTION_ADMIN', 'collection_admin', 'collection_admin', 123456789),
('TRANSACTION_ADMIN', 'transaction_admin2', 'transaction_admin2', 123456789),
('COLLECTION_ADMIN', 'collection_admin2', 'collection_admin2', 123456789),
('TRANSACTION_ADMIN', 'transaction_admin3', 'transaction_admin3', 123456789),
('COLLECTION_ADMIN', 'collection_admin3', 'collection_admin3', 123456789);

-- DO NOT INSERT LIKE THIS BECAUSE OF TRIGGER I USED
-- INSERT INTO `collection`(`name`, `admin_id`, `address`) VALUES
-- ('collection', 3, 'collection'),
-- ('collection2', 5, 'collection2'),
-- ('collection3', 7, 'collection3');

INSERT INTO `collection` (`name`, `admin_id`, `address`) VALUE ('collection', 3, 'collection');
INSERT INTO `collection` (`name`, `admin_id`, `address`) VALUE ('collection2', 5, 'collection2');
INSERT INTO `collection` (`name`, `admin_id`, `address`) VALUE ('collection3', 7, 'collection3');

INSERT INTO `transaction` (`name`, `admin_id`, `address`, `collection_zip_code`) VALUE ('transaction', 2, 'transaction', 'C00001');
INSERT INTO `transaction` (`name`, `admin_id`, `address`, `collection_zip_code`) VALUE ('transaction2', 4, 'transaction2', 'C00002');
INSERT INTO `transaction` (`name`, `admin_id`, `address`, `collection_zip_code`) VALUE ('transaction3', 6, 'transaction3', 'C00003');

COMMIT;