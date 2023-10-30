DROP DATABASE IF EXISTS `magic_post`;
CREATE DATABASE `magic_post`;
USE `magic_post`;

START TRANSACTION;

CREATE TABLE `staff`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` SMALLINT NOT NULL,
    `transaction_zip_code` VARCHAR(255) NULL,
    `collection_zip_code` VARCHAR(255) NULL
);

CREATE TABLE `admin`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role` ENUM('') NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` SMALLINT NOT NULL
);

CREATE TABLE `transaction`(
    `zip_code` VARCHAR(255) NOT NULL PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `collection_zip_code` VARCHAR(255) NOT NULL,
    `admin_id` INT UNSIGNED NOT NULL,
    `address` TEXT NOT NULL
);

ALTER TABLE
    `transaction` ADD UNIQUE `transaction_name_unique`(`name`);
    
CREATE TABLE `track_history`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `from` VARCHAR(255) NOT NULL,
    `to` VARCHAR(255) NOT NULL,
    `sender_name` VARCHAR(255) NOT NULL,
    `sender_time` VARCHAR(255) NOT NULL,
    `receiver_name` VARCHAR(255) NOT NULL,
    `received_time` DATETIME NOT NULL,
    `shipper_name` VARCHAR(255) NOT NULL,
    `shipper_phone` SMALLINT NOT NULL,
    `parcel_ID` VARCHAR(255) NOT NULL,
    `status` ENUM('') NOT NULL
);

CREATE TABLE `parcels`(
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `status` VARCHAR(255) NOT NULL,
    `weight` DOUBLE(8, 2) NOT NULL,
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
);

CREATE TABLE `collection`(
    `zip_code` VARCHAR(255) NOT NULL PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `admin_id` INT UNSIGNED NOT NULL,
    `address` TEXT NOT NULL
);

ALTER TABLE
    `collection` ADD UNIQUE `collection_name_unique`(`name`);
ALTER TABLE
    `collection` ADD UNIQUE `collection_admin_id_unique`(`admin_id`);
ALTER TABLE
    `staff` ADD CONSTRAINT `staff_collection_zip_code_foreign` FOREIGN KEY(`collection_zip_code`) REFERENCES `collection`(`zip_code`);
ALTER TABLE
    `staff` ADD CONSTRAINT `staff_transaction_zip_code_foreign` FOREIGN KEY(`transaction_zip_code`) REFERENCES `transaction`(`zip_code`);
ALTER TABLE
    `collection` ADD CONSTRAINT `collection_admin_id_foreign` FOREIGN KEY(`admin_id`) REFERENCES `admin`(`id`);
ALTER TABLE
    `transaction` ADD CONSTRAINT `transaction_collection_zip_code_foreign` FOREIGN KEY(`collection_zip_code`) REFERENCES `collection`(`zip_code`);
ALTER TABLE
    `track_history` ADD CONSTRAINT `track_history_parcel_id_foreign` FOREIGN KEY(`parcel_ID`) REFERENCES `parcels`(`id`);
ALTER TABLE
	`transaction` ADD CONSTRAINT `transaction_admin_id_foreign` FOREIGN KEY(`admin_id`) REFERENCES `admin`(`id`);
    
COMMIT;