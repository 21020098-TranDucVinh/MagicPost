DROP SCHEMA IF EXISTS `magic_post`;
CREATE SCHEMA `magic_post`;
USE `magic_post`;

CREATE TABLE `admin`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role` ENUM('ADMIN', 'TRANSACTION_ADMIN', 'COLLECTION_ADMIN', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` INT UNSIGNED NOT NULL,
    UNIQUE(`username`)
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
    `staff_id` VARCHAR(255) NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` INT UNSIGNED NOT NULL,
    `transaction_zip_code` VARCHAR(255) NULL,
    `collection_zip_code` VARCHAR(255) NULL,
    UNIQUE(`staff_id`),
    UNIQUE(`username`),
    FOREIGN KEY(`transaction_zip_code`) REFERENCES `transaction`(`zip_code`)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY(`collection_zip_code`) REFERENCES `collection`(`zip_code`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `parcels`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `parcel_id` VARCHAR(255) NOT NULL,
    `status` ENUM ('PENDING','SHIPPING', 'DELIVERING', 'DELIVERED', 'SUCCESS', 'RETURNED') NOT NULL DEFAULT 'PENDING',
    `s_name` VARCHAR(255) NOT NULL,
    `s_phone` INT UNSIGNED NOT NULL,
    `s_address` JSON NOT NULL,
    `s_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `r_name` VARCHAR(255) NOT NULL,
    `r_phone` INT UNSIGNED NOT NULL,
    `r_address` JSON NOT NULL,
    `r_time` TIMESTAMP NULL,
    `type` ENUM('DOCUMENT', 'PACKAGE') NOT NULL DEFAULT 'PACKAGE',
    `weight` DOUBLE NOT NULL,
    `s_zip_code` VARCHAR(255) NOT NULL,
    `r_zip_code` VARCHAR(255) NULL,
    `cost`  INT UNSIGNED NOT NULL,  -- 9
    `r_cod` JSON NOT NULL, -- 11
    `last_shipper_name` VARCHAR(255) NULL,
    `last_shipper_phone` INT UNSIGNED NULL,
    UNIQUE(`parcel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    
CREATE TABLE `track_history`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `s_staff_id` VARCHAR(255) NOT NULL,
    `s_zip_code` VARCHAR(255) NOT NULL,
    `s_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `r_zip_code` VARCHAR(255) NOT NULL,
    `parcel_id` VARCHAR(255) NULL,
    `status` ENUM('PENDING', 'DELIVERING', 'DELIVERED', 'RETURNED') NOT NULL DEFAULT 'PENDING',
    `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `last_staff_id_update` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `shipper_name` VARCHAR(255) NULL,
    `shipper_phone` INT UNSIGNED NULL,
    FOREIGN KEY(`parcel_id`) REFERENCES `parcels`(`parcel_id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TRIGGER
DELIMITER $$
CREATE TRIGGER `add_zip_code_transaction` BEFORE INSERT ON `transaction` FOR EACH ROW
BEGIN
    DECLARE t_id int;
    SELECT auto_increment INTO t_id
    FROM information_schema.tables
    WHERE table_name = 'transaction' AND table_schema='magic_post' LIMIT 1;

    SET NEW.zip_code = CONCAT('T', LPAD(t_id, 5, '0'));
END$$

CREATE TRIGGER `add_zip_code_collection` BEFORE INSERT ON `collection` FOR EACH ROW
BEGIN
    DECLARE c_id int;
    SELECT auto_increment INTO c_id
    FROM information_schema.tables
    WHERE table_name = 'collection' AND table_schema='magic_post' LIMIT 1;

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

    UPDATE admin
    SET role = 'COLLECTION_ADMIN'
    WHERE id = NEW.admin_id;
  END IF;
END$$

CREATE TRIGGER `insert_collection_admin_role`
AFTER INSERT ON `collection`
FOR EACH ROW
BEGIN
    UPDATE admin
    SET role = 'COLLECTION_ADMIN'
    WHERE id = NEW.admin_id;
END$$

CREATE TRIGGER `update_transaction_admin_role`
AFTER UPDATE ON `transaction`
FOR EACH ROW
BEGIN
  IF NEW.admin_id != OLD.admin_id THEN
    UPDATE admin
    SET role = 'PENDING'
    WHERE id = OLD.admin_id;

    UPDATE admin
    SET role = 'TRANSACTION_ADMIN'
    WHERE id = NEW.admin_id;
  END IF;
END$$

CREATE TRIGGER `insert_transaction_admin_role`
AFTER INSERT ON `transaction`
FOR EACH ROW
BEGIN
    UPDATE admin
    SET role = 'TRANSACTION_ADMIN'
    WHERE id = NEW.admin_id;
END$$

CREATE TRIGGER `add_id_staff` BEFORE INSERT ON `staff` FOR EACH ROW
BEGIN
    DECLARE s_id int;
    SELECT auto_increment INTO s_id
    FROM information_schema.tables
    WHERE table_name = 'staff' AND table_schema='magic_post' LIMIT 1;

    IF NEW.transaction_zip_code IS NOT NULL THEN
        SET NEW.staff_id = CONCAT(NEW.transaction_zip_code, 'S', LPAD(s_id, 5, '0'));
    ELSE
        SET NEW.staff_id = CONCAT(NEW.collection_zip_code, 'S', LPAD(s_id, 5, '0'));
    END IF;
END$$

CREATE TRIGGER `add_id_parcel` BEFORE INSERT ON `parcels` FOR EACH ROW
BEGIN
    DECLARE p_id int;
    SELECT auto_increment INTO p_id
    FROM information_schema.tables
    WHERE table_name = 'parcels' AND table_schema='magic_post' LIMIT 1;

    SET NEW.parcel_id = CONCAT('P', LPAD(p_id, 5, '0'));
END$$

DELIMITER ;

-- DATA 
START TRANSACTION;

INSERT INTO `admin`(`role`, `username`, `password`, `phone`) VALUES
('ADMIN', 'admin', '$2y$10$aQp0IqtCNuos5Dzke6lgkuKSPAHI609VWYh5yNYZoruBLNw0AaIey', 123456789), -- password: admin
('TRANSACTION_ADMIN', 'transaction_admin', '$2y$10$VS3CrOvpfpoAY15cM4oDPOoy/2x6TqWj1kus4HefkBkqXQiuZ.Tjy', 123456789), -- password: transaction_admin
('COLLECTION_ADMIN', 'collection_admin', '$2y$10$YTnZW46IqMlLfGV5UcG7u.UTIQOOhYWorKBmFyiSLdRAx4Tj/5F8C', 123456789), -- password: collection_admin
('TRANSACTION_ADMIN', 'transaction_admin2', '$2y$10$VS3CrOvpfpoAY15cM4oDPOoy/2x6TqWj1kus4HefkBkqXQiuZ.Tjy', 123456789), -- password: transaction_admin
('COLLECTION_ADMIN', 'collection_admin2', '$2y$10$YTnZW46IqMlLfGV5UcG7u.UTIQOOhYWorKBmFyiSLdRAx4Tj/5F8C', 123456789), -- password: collection_admin
('TRANSACTION_ADMIN', 'transaction_admin3', '$2y$10$VS3CrOvpfpoAY15cM4oDPOoy/2x6TqWj1kus4HefkBkqXQiuZ.Tjy', 123456789), -- password: transaction_admin
('COLLECTION_ADMIN', 'collection_admin3', '$2y$10$YTnZW46IqMlLfGV5UcG7u.UTIQOOhYWorKBmFyiSLdRAx4Tj/5F8C', 123456789), -- password: collection_admin
('PENDING', 'pending', 'pending', 123456789),
('PENDING', 'pending2', 'pending2', 123456789),
('PENDING', 'pending3', 'pending3', 123456789);

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

INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('staff', 'staff', 123456789, 'T00001');
INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('staff2', 'staff2', 123456789, 'T00002');
INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('staff3', 'staff3', 123456789, 'T00003');
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('staff4', 'staff4', 123456789, 'C00001');
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('staff5', 'staff5', 123456789, 'C00002');
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('staff6', 'staff6', 123456789, 'C00003');

INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`) 
VALUE ('PENDING', 's_name', 123456789, '{"address": "s_address"}', 'r_name', 123456789, '{"address": "r_address"}', 'DOCUMENT', 1, 'T00001', 'C00001', 100, '{"cod": 100}');
INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`)
VALUE ('PENDING', 's_name2', 123456789, '{"address": "s_address2"}', 'r_name2', 123456789, '{"address": "r_address2"}', 'DOCUMENT', 2, 'T00002', 'C00002', 200, '{"cod": 200}');
INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`)
VALUE ('PENDING', 's_name3', 123456789, '{"address": "s_address3"}', 'r_name3', 123456789, '{"address": "r_address3"}', 'DOCUMENT', 3, 'T00003', 'C00003', 300, '{"cod": 300}');

INSERT INTO `track_history` (`s_staff_id`, `s_zip_code`, `r_zip_code`, `parcel_id`, `last_staff_id_update`, `description`)
VALUE ('T00001S00001', 'T00001', 'C00001', 'P00001', 'T00001S00001', 'Delivering from T00001 to C00001'); 
INSERT INTO `track_history` (`s_staff_id`, `s_zip_code`, `r_zip_code`, `parcel_id`, `last_staff_id_update`, `description`)
VALUE ('T00002S00001', 'T00002', 'C00002', 'P00001', 'T00002S00001', 'Delivering from T00002 to C00002');

COMMIT;