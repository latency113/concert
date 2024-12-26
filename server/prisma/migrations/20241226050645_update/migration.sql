-- AlterTable
ALTER TABLE `booking` ADD COLUMN `ticketType` ENUM('assignedSeat', 'generalAdmission') NOT NULL DEFAULT 'generalAdmission';

-- AlterTable
ALTER TABLE `concert` ADD COLUMN `ticketType` ENUM('assignedSeat', 'generalAdmission') NOT NULL DEFAULT 'generalAdmission';
