DROP SCHEMA IF EXISTS `magic_post`;
CREATE SCHEMA `magic_post`;
USE `magic_post`;

SET time_zone = "+00:00";

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
    `s_time` DATE DEFAULT (CURRENT_DATE + INTERVAL 1 YEAR),
    `r_name` VARCHAR(255) NOT NULL,
    `r_phone` INT UNSIGNED NOT NULL,
    `r_address` JSON NOT NULL,
    `r_time` DATE NULL,
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
    
CREATE TABLE `tracking`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `s_staff_id` VARCHAR(255) NOT NULL,
    `s_zip_code` VARCHAR(255) NOT NULL,
    `s_time` DATE DEFAULT (CURRENT_DATE + INTERVAL 1 YEAR),
    `r_zip_code` VARCHAR(255) NOT NULL,
    `parcel_id` VARCHAR(255) NULL,
    `status` ENUM('DELIVERING', 'DELIVERED', 'RETURNED', 'DONE') NOT NULL DEFAULT 'DELIVERING',
    `last_update` DATE DEFAULT (CURRENT_DATE + INTERVAL 1 YEAR),
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
('TRANSACTION_ADMIN', 'transaction_admin4', '$2y$10$VS3CrOvpfpoAY15cM4oDPOoy/2x6TqWj1kus4HefkBkqXQiuZ.Tjy', 123456789), -- password: transaction_admin
('COLLECTION_ADMIN', 'collection_admin4', '$2y$10$YTnZW46IqMlLfGV5UcG7u.UTIQOOhYWorKBmFyiSLdRAx4Tj/5F8C', 123456789), -- password: collection_admin
('TRANSACTION_ADMIN', 'transaction_admin5', '$2y$10$VS3CrOvpfpoAY15cM4oDPOoy/2x6TqWj1kus4HefkBkqXQiuZ.Tjy', 123456789), -- password: transaction_admin
('COLLECTION_ADMIN', 'collection_admin5', '$2y$10$YTnZW46IqMlLfGV5UcG7u.UTIQOOhYWorKBmFyiSLdRAx4Tj/5F8C', 123456789), -- password: collection_admin
('TRANSACTION_ADMIN', 'transaction_admin6', '$2y$10$VS3CrOvpfpoAY15cM4oDPOoy/2x6TqWj1kus4HefkBkqXQiuZ.Tjy', 123456789), -- password: transaction_admin
('COLLECTION_ADMIN', 'collection_admin6', '$2y$10$YTnZW46IqMlLfGV5UcG7u.UTIQOOhYWorKBmFyiSLdRAx4Tj/5F8C', 123456789), -- password: collection_admin
('TRANSACTION_ADMIN', 'transaction_admin7', '$2y$10$VS3CrOvpfpoAY15cM4oDPOoy/2x6TqWj1kus4HefkBkqXQiuZ.Tjy', 123456789), -- password: transaction_admin
('COLLECTION_ADMIN', 'collection_admin7', '$2y$10$YTnZW46IqMlLfGV5UcG7u.UTIQOOhYWorKBmFyiSLdRAx4Tj/5F8C', 123456789), -- password: collection_admin
('TRANSACTION_ADMIN', 'transaction_admin8', '$2y$10$VS3CrOvpfpoAY15cM4oDPOoy/2x6TqWj1kus4HefkBkqXQiuZ.Tjy', 123456789), -- password: transaction_admin
('COLLECTION_ADMIN', 'collection_admin8', '$2y$10$YTnZW46IqMlLfGV5UcG7u.UTIQOOhYWorKBmFyiSLdRAx4Tj/5F8C', 123456789), -- password: collection_admin
('PENDING', 'pending', '$2a$10$iF5hFD1ln8dyDFiRmCjzBuL7.orsoohLCfkbReB7x6BjkgBrDLg1i', 123456789), -- password: 123456789
('PENDING', 'pending2', '$2a$10$iF5hFD1ln8dyDFiRmCjzBuL7.orsoohLCfkbReB7x6BjkgBrDLg1i', 123456789), -- password: 123456789
('PENDING', 'pending3', '$2a$10$iF5hFD1ln8dyDFiRmCjzBuL7.orsoohLCfkbReB7x6BjkgBrDLg1i', 123456789); -- password: 123456789

-- DO NOT INSERT LIKE THIS BECAUSE OF TRIGGER I USED
-- INSERT INTO `collection`(`name`, `admin_id`, `address`) VALUES
-- ('collection', 3, 'collection'),
-- ('collection2', 5, 'collection2'),
-- ('collection3', 7, 'collection3');

INSERT INTO `collection` (`name`, `admin_id`, `address`) VALUE ('Hà Nội', 3, 'Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội');
INSERT INTO `collection` (`name`, `admin_id`, `address`) VALUE ('Hà Nam', 5, 'Phường Hai Bà Trưng, Thành phố Phủ Lý, Hà Nam');
INSERT INTO `collection` (`name`, `admin_id`, `address`) VALUE ('Ninh Bình', 7, 'Phường Bích Đào, Thành phố Ninh Bình, Ninh Bình');
INSERT INTO `collection` (`name`, `admin_id`, `address`) VALUE ('Hải Phòng', 9, 'Phường Đông Hải 1, Quận Hải An, Hải Phòng');
INSERT INTO `collection` (`name`, `admin_id`, `address`) VALUE ('Quảng Ninh', 11, 'Phường Hà Khánh, Thành phố Hạ Long, Quảng Ninh');
INSERT INTO `collection` (`name`, `admin_id`, `address`) VALUE ('Thái Bình', 13, 'Phường Tiền Phong, Thành phố Thái Bình, Thái Bình');
INSERT INTO `collection` (`name`, `admin_id`, `address`) VALUE ('Nam Định', 15, 'Phường Trần Đăng Ninh, Thành phố Nam Định, Nam Định');
INSERT INTO `collection` (`name`, `admin_id`, `address`) VALUE ('Thanh Hóa', 17, 'Phường Đông Thọ, Thành phố Thanh Hóa, Thanh Hóa');

INSERT INTO `transaction` (`name`, `admin_id`, `address`, `collection_zip_code`) VALUE ('Hà Nội', 2, 'Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội', 'C00001');
INSERT INTO `transaction` (`name`, `admin_id`, `address`, `collection_zip_code`) VALUE ('Hà Nội 2', 4, 'Phường Quan Hoa, Quận Cầu Giấy, Hà Nội', 'C00001');
INSERT INTO `transaction` (`name`, `admin_id`, `address`, `collection_zip_code`) VALUE ('Ninh Bình', 6, 'Phường Bích Đào, Thành phố Ninh Bình, Ninh Bình', 'C00003');
INSERT INTO `transaction` (`name`, `admin_id`, `address`, `collection_zip_code`) VALUE ('Hải Phòng', 8, 'Phường Đông Hải 1, Quận Hải An, Hải Phòng', 'C00004');
INSERT INTO `transaction` (`name`, `admin_id`, `address`, `collection_zip_code`) VALUE ('Quảng Ninh', 10, 'Phường Hà Khánh, Thành phố Hạ Long, Quảng Ninh', 'C00005');
INSERT INTO `transaction` (`name`, `admin_id`, `address`, `collection_zip_code`) VALUE ('Thái Bình', 12, 'Phường Tiền Phong, Thành phố Thái Bình, Thái Bình', 'C00006');
INSERT INTO `transaction` (`name`, `admin_id`, `address`, `collection_zip_code`) VALUE ('Nam Định', 14, 'Phường Trần Đăng Ninh, Thành phố Nam Định, Nam Định', 'C00007');
INSERT INTO `transaction` (`name`, `admin_id`, `address`, `collection_zip_code`) VALUE ('Thanh Hóa', 16, 'Phường Đông Thọ, Thành phố Thanh Hóa, Thanh Hóa', 'C00008');

INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('staff1', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'T00001'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('staff2', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'T00002'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('staff3', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'T00003'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('staff4', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'C00001'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('staff5', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'C00002'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('staff6', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'C00003'); -- password: 123456

INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('tStaffHanoi', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'T00001'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('tStaffHanoi2', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'T00002'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('tStaffNinhbinh', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'T00003'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('tStaffHaiphong', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'T00004'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('tStaffQuangninh', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'T00005'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('tStaffThaibinh', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'T00006'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `transaction_zip_code`) VALUE ('tStaffNamdinh', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'T00007'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('cStaffHanoi', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'C00001'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('cStaffHanam', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'C00002'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('cStaffNinhbinh', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'C00003'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('cStaffHaiphong', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'C00004'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('cStaffQuangninh', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'C00005'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('cStaffThaibinh', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'C00006'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('cStaffNamdinh', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'C00007'); -- password: 123456
INSERT INTO `staff` (`username`, `password`, `phone`, `collection_zip_code`) VALUE ('cStaffThanhhoa', '$2a$10$ZppbuFh0Z0UqPWcssr23E.J4vcHZcIncVrhRlphfYmniIzP2taRYy', 123456789, 'C00008'); -- password: 123456


INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`) 
VALUE ('DELIVERING', 's_name', 123456789, '{"address": "s_address"}', 'r_name', 123456789, '{"address": "r_address"}', 'DOCUMENT', 1, 'T00001', 'T00002', 100, '{"cod": 100}');
INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`)
VALUE ('PENDING', 's_name2', 123456789, '{"address": "s_address2"}', 'r_name2', 123456789, '{"address": "r_address2"}', 'DOCUMENT', 2, 'T00001', 'T00003', 200, '{"cod": 200}');
INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`)
VALUE ('PENDING', 's_name3', 123456789, '{"address": "s_address3"}', 'r_name3', 123456789, '{"address": "r_address3"}', 'DOCUMENT', 3, 'T00002', 'T00003', 300, '{"cod": 300}');
INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`)
VALUE ('PENDING', 's_name4', 123456789, '{"address": "s_address4"}', 'r_name4', 123456789, '{"address": "r_address4"}', 'DOCUMENT', 4, 'T00002', 'T00004', 400, '{"cod": 400}');
INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`)
VALUE ('PENDING', 's_name5', 123456789, '{"address": "s_address5"}', 'r_name5', 123456789, '{"address": "r_address5"}', 'DOCUMENT', 5, 'T00003', 'T00005', 500, '{"cod": 500}');
INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`)
VALUE ('PENDING', 's_name6', 123456789, '{"address": "s_address6"}', 'r_name6', 123456789, '{"address": "r_address6"}', 'DOCUMENT', 6, 'T00003', 'T00006', 600, '{"cod": 600}');
INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`)
VALUE ('PENDING', 's_name7', 123456789, '{"address": "s_address7"}', 'r_name7', 123456789, '{"address": "r_address7"}', 'DOCUMENT', 7, 'T00004', 'T00007', 700, '{"cod": 700}');
INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`)
VALUE ('PENDING', 's_name8', 123456789, '{"address": "s_address8"}', 'r_name8', 123456789, '{"address": "r_address8"}', 'DOCUMENT', 8, 'T00004', 'T00008', 800, '{"cod": 800}');
INSERT INTO `parcels` (`status`, `s_name`, `s_phone`, `s_address`, `r_name`, `r_phone`, `r_address`, `type`, `weight`, `s_zip_code`, `r_zip_code`, `cost`, `r_cod`)
VALUE ('PENDING', 's_name9', 123456789, '{"address": "s_address9"}', 'r_name9', 123456789, '{"address": "r_address9"}', 'DOCUMENT', 9, 'T00005', 'T00001', 900, '{"cod": 900}');


INSERT INTO `tracking` (`s_staff_id`, `s_zip_code`, `r_zip_code`, `parcel_id`, `status`, `last_staff_id_update`, `description`, `shipper_name`, `shipper_phone`)
VALUE ('T00001S00001', 'T00001', 'C00001', 'P00001', 'DELIVERING', 'T00001S00001', 'description', 'shipper_name', 123456789);

COMMIT;