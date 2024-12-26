/*
  Warnings:

  - Added the required column `userId` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `seat` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
