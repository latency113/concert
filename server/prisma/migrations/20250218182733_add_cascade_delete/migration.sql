-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_concertId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_scheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `Schedule_concertId_fkey`;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_concertId_fkey` FOREIGN KEY (`concertId`) REFERENCES `Concert`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Schedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_concertId_fkey` FOREIGN KEY (`concertId`) REFERENCES `Concert`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
